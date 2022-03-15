import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { DepartmentInput } from './inputs/department.input';
import { DepartmentService } from './department.service';
import { AuthGuard } from '../shared/guards/auth.guard';

@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiBearerAuth()
  @ApiTags('department')
  @UseGuards(AuthGuard)
  @Post()
  async createDepartment(@Body() input: DepartmentInput) {
    return await this.departmentService.createDepartment(input);
  }
}
