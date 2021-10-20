import { ENV_VARIABLE_NAMES } from './../../app.const';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(ENV_VARIABLE_NAMES.JWT_SECRET),
        signOptions: {
          expiresIn: configService.get<string>(
            ENV_VARIABLE_NAMES.JWT_EXPIRY_TIME,
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
