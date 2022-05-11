import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from './schema/role.schema';
import { ExistingRoleIdValidator } from './validators/existing-role-id.validator';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
  ],
  providers: [RoleService, RoleRepository, ExistingRoleIdValidator],
  controllers: [RoleController],
})
export class RoleModule {}
