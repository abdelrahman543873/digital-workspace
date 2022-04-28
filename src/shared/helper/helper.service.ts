import { GetExistingUserInput } from './inputs/get-existing-user.input';
import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { getAuthToken } from '../utils/token-utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../../user/schema/user.schema';
import { ENV_VARIABLE_NAMES } from '../../app.const';
import { IncomingHttpHeaders } from 'http';
import { BaseHttpException } from '../exceptions/base-http-exception';

export interface TokenPayload {
  _id: string;
}
@Injectable()
export class HelperService {
  constructor(
    @InjectModel(User.name) private userSchema: Model<UserDocument>,
    private configService: ConfigService,
  ) {}
  async getCurrentUser(req: IncomingHttpHeaders): Promise<User> {
    const token = getAuthToken(req);
    if (!token) return null;
    try {
      const { _id } = <TokenPayload>(
        jwt.verify(
          token,
          this.configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        )
      );
      return await this.userSchema.findById(_id);
    } catch (error) {
      throw new BaseHttpException('EN', 400, error);
    }
  }

  async getExistingUser(input: GetExistingUserInput): Promise<User> {
    return await this.userSchema.findOne(
      {
        ...(input._id && { _id: new Types.ObjectId(input._id) }),
        ...(input.email && { email: input.email }),
        ...(input.mobile && { mobile: input.mobile }),
      },
      {},
      { lean: true },
    );
  }

  async getExistingUserEncryptedPassword(
    input: GetExistingUserInput,
  ): Promise<User> {
    return await this.userSchema
      .findOne({
        ...(input._id && { _id: new Types.ObjectId(input._id) }),
        ...(input.email && { email: input.email }),
        ...(input.mobile && { mobile: input.mobile }),
      })
      .select('password');
  }
}
