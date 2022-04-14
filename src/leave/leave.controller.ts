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

@ApiTags('leave')
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @ApiBearerAuth()
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
}
