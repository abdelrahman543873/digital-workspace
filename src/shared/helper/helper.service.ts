import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { getAuthToken } from '../utils/token-utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../../user/schema/user.schema';
import { ENV_VARIABLE_NAMES } from '../../app.const';
import { IncomingHttpHeaders } from 'http';

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
    const { _id } = <TokenPayload>(
      jwt.verify(
        token,
        this.configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
      )
    );
    return await this.userSchema.findById(_id);
  }
}
