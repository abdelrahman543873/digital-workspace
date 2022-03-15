import { Body, Controller, Post, UseGuards, Put, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateDepartmentInput } from './inputs/create-department.input';
import { DepartmentService } from './department.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { UpdateDepartmentInput } from './inputs/update-department.input';
import { DeleteDepartmentInput } from './inputs/delete-department.input';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiBearerAuth()
  @ApiTags('department')
  @UseGuards(AuthGuard)
  @Post()
  async createDepartment(@Body() input: CreateDepartmentInput) {
    return await this.departmentService.createDepartment(input);
  }

  @ApiBearerAuth()
  @ApiTags('department')
  @UseGuards(AuthGuard)
  @Put()
  async updateDepartment(@Body() input: UpdateDepartmentInput) {
    return await this.departmentService.updateDepartment(input);
  }

  @ApiBearerAuth()
  @ApiTags('department')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteDepartment(@Body() input: DeleteDepartmentInput) {
    return await this.departmentService.deleteDepartment(input);
  }
}
