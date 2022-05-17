import { Injectable } from '@nestjs/common';
import { bcryptCheckPass } from '../../shared/utils/bcryptHelper';
import { HelperService } from '../../shared/helper/helper.service';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'CorrectPassValidator' })
@Injectable()
export class CorrectPassValidator implements ValidatorConstraintInterface {
  constructor(private helperService: HelperService) {}
  async validate(
    password: string,
    validationArguments: ValidationArguments,
  ): Promise<boolean> {
    const currentUser = JSON.parse(validationArguments.object['currentUser']);
    const userPassword =
      await this.helperService.getExistingUserEncryptedPassword({
        email: currentUser.email,
      });
    const passwordValidation = await bcryptCheckPass(
      password,
      userPassword.password,
    );
    if (!passwordValidation) return false;
    return true;
  }

  defaultMessage() {
    return 'incorrect password';
  }
}
