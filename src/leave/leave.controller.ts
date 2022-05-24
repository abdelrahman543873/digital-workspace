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
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileCloudUploadInterceptor } from '../shared/interceptors/file-cloud-upload.interceptor';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RequestInBodyInterceptor } from '../shared/interceptors/request-in-body.interceptor';
import { CreateLeaveTypeInput } from './inputs/create-leave-type.input';
import { Get, Query, Delete, Put } from '@nestjs/common';
import { Pagination } from '../shared/utils/pagination.input';
import { DeleteLeaveTypeInput } from './inputs/delete-levae-type.input';
import { UpdateLeaveTypeInput } from './inputs/update-leave-type.input';
import { UpdateLeaveInput } from './inputs/update-leave.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
import { ManageLeaveInput } from './inputs/manage-leave.input';
import { CancelLeaveInput } from './inputs/cancel-leave.input';
import { GetLeavesListInput } from './inputs/get-leaves-list.input';
import { GetLeavesAssignedListInput } from './inputs/get-leaves-assigned-list.input';
import { AddRejectionReasonInput } from './inputs/add-rejection-reason.input';
import { CreateLeaveCriteriaInput } from './inputs/create-leave-criteria.input';
import { DeleteLeaveCriteriaInput } from './inputs/delete-leave-criteria.input';

@UseGuards(ActiveUserGuard)
@ApiTags('leave')
@ApiBearerAuth()
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @ApiConsumes('multipart/form-data')
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

  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(RequestInBodyInterceptor)
  @UseInterceptors(FilesInterceptor('attachments'))
  @Put()
  async updateLeave(
    @Body() input: UpdateLeaveInput,
    @UploadedFiles() attachments: Array<Express.Multer.File>,
  ) {
    return await this.leaveService.updateLeave(input, attachments);
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  @Put('manage')
  async manageLeave(@Body() input: ManageLeaveInput) {
    return await this.leaveService.manageLeave(input);
  }

  @UseGuards(AuthGuard)
  @Get('list')
  async getLeavesList(@Query() input: GetLeavesListInput) {
    return await this.leaveService.getLeavesList(input);
  }

  @UseGuards(AuthGuard)
  @Get('hr/list')
  async getHrLeavesList(@Query() input: GetLeavesListInput) {
    return await this.leaveService.getHrLeavesList(input);
  }

  @UseGuards(AuthGuard)
  @Get('assigned-list')
  async getAssignedLeavesList(@Query() input: GetLeavesAssignedListInput) {
    return await this.leaveService.getAssignedLeavesList(input);
  }

  @UseGuards(AuthGuard)
  @Post('type')
  async createLeaveType(@Body() input: CreateLeaveTypeInput) {
    return await this.leaveService.createLeaveType(input);
  }

  @UseGuards(AuthGuard)
  @Put('type')
  async updateLeaveType(@Body() input: UpdateLeaveTypeInput) {
    return await this.leaveService.updateLeaveType(input);
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

  @UseGuards(AuthGuard)
  @UseInterceptors(RequestInBodyInterceptor)
  @Post('cancel')
  async cancelLeave(@Body() input: CancelLeaveInput) {
    return await this.leaveService.cancelLeave(input);
  }

  @UseGuards(AuthGuard)
  @Post('rejection-reason')
  async addRejectionReason(@Body() input: AddRejectionReasonInput) {
    return await this.leaveService.addRejectionReason(input);
  }

  @UseGuards(AuthGuard)
  @Get('rejection-reasons/list')
  async getRejectionReasonsList(@Query() input: Pagination) {
    return await this.leaveService.getRejectionReasonsList(input);
  }

  @UseGuards(AuthGuard)
  @Post('criteria')
  async createLeaveCriteria(@Body() input: CreateLeaveCriteriaInput) {
    return await this.leaveService.createLeaveCriteria(input);
  }

  @UseGuards(AuthGuard)
  @Delete('criteria')
  async deleteLeaveCriteria(@Body() input: DeleteLeaveCriteriaInput) {
    return await this.leaveService.deleteLeaveCriteria(input);
  }

  @UseGuards(AuthGuard)
  @Get('balance')
  async getLeaveBalance() {
    return await this.leaveService.getLeaveBalance();
  }
}
