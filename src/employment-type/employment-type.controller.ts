import { ActiveUserGuard } from './../shared/guards/active-user.guard';
import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EmploymentTypeService } from './employment-type.service';
import { CreateEmploymentTypeInput } from './inputs/create-employment-type.input';
import { UpdateEmploymentTypeInput } from './inputs/update-employment-type.input';
import { DeleteEmploymentTypeInput } from './inputs/delete-employment-type.input';
import { Query } from '@nestjs/common';
import { Pagination } from '../shared/utils/pagination.input';

@UseGuards(ActiveUserGuard)
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

  @ApiBearerAuth()
  @ApiTags('employment-type')
  @UseGuards(AuthGuard)
  @Put()
  async updateEmploymentType(@Body() input: UpdateEmploymentTypeInput) {
    return await this.employmentTypeService.updateEmploymentType(input);
  }

  @ApiBearerAuth()
  @ApiTags('employment-type')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteEmploymentType(@Body() input: DeleteEmploymentTypeInput) {
    return await this.employmentTypeService.deleteEmploymentType(input);
  }

  @ApiBearerAuth()
  @ApiTags('employment-type')
  @UseGuards(AuthGuard)
  @Get('list')
  async getEmploymentTypesList(@Query() input: Pagination) {
    return await this.employmentTypeService.getEmploymentTypesList(input);
  }
}
