import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveInput } from './inputs/create-leave.input';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CreateLeaveSwagger } from './swagger/create-leave.swagger';
import { FileCloudUploadInterceptor } from '../shared/interceptors/file-cloud-upload.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Get, Query, Delete } from '@nestjs/common';
import { Pagination } from '../shared/utils/pagination.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';

@UseGuards(ActiveUserGuard)
@ApiTags('leave')
@ApiBearerAuth()
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateLeaveSwagger)
  @UseGuards(AuthGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FilesInterceptor('attachments'))
  @Post()
  async createLeave(
    @Body() input: CreateLeaveInput,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return await this.leaveService.createLeave(input, attachments);
  }

  @UseGuards(AuthGuard)
  @Post('type')
  async createLeaveType(@Body() input: CreateLeaveTypeInput) {
    return await this.leaveService.createLeaveType(input);
  }

  @UseGuards(AuthGuard)
  @Delete('type')
  async deleteLeaveType(@Body() input: DeleteLeaveTypeInput) {
    return await this.leaveService.deleteLeaveType(input);
  }

  @UseGuards(AuthGuard)
  @Get('types')
  async getLeaveTypes(@Query() input: Pagination) {
    return await this.leaveService.getLeaveTypes(input);
  }
}
