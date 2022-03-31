import { AuthGuard } from './../shared/guards/auth.guard';
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmploymentTypeService } from './employment-type.service';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';

@Controller('employment-type')
export class EmploymentTypeController {
  constructor(private employmentTypeService: EmploymentTypeService) {}

  @ApiBearerAuth()
  @ApiTags('employment-type')
  @UseGuards(AuthGuard)
  @Post()
  async createEmploymentType(@Body() input: CreateEmploymentTypeInput) {
    return await this.employmentTypeService.createEmploymentType(input);
  }
}
