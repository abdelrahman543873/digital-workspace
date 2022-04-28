import { ActiveUserGuard } from './../shared/guards/active-user.guard';
import { Pagination } from './../shared/utils/pagination.input';
import { AuthGuard } from './../shared/guards/auth.guard';
import { EventService } from './event.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEventInput } from './inputs/create-event.input';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateEventSwagger } from './swagger/create-event.swagger';
import { GetEventsInput } from './inputs/get-events.input';
import { ManageJoinEventInput } from './inputs/manage-join.input';
import { DeleteEventInput } from './inputs/delete-event.input';
import { UpdateEventInput } from './inputs/update-event.input';
import { UpdateEventSwagger } from './swagger/update-event.swagger';
import { SearchEventInput } from './inputs/search-events.input';
import { Param } from '@nestjs/common';
import { FileCloudUploadInterceptor } from '../shared/interceptors/file-cloud-upload.interceptor';

@UseGuards(ActiveUserGuard)
@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateEventSwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Post('create')
  async createEvent(
    @Body() input: CreateEventInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.eventService.createEvent(input, logo);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Get('events')
  async getEvents(@Query() input: GetEventsInput) {
    return await this.eventService.getEvents(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Get('AllEvents')
  async getAllEvents(@Query() input: Pagination) {
    return await this.eventService.getAllEvents(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Post('join')
  async manageJoinEvent(@Body() input: ManageJoinEventInput) {
    return await this.eventService.manageJoinEvent(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Delete('remove')
  async deleteEvent(@Body() input: DeleteEventInput) {
    return await this.eventService.deleteEvent(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Delete('removeById')
  async deleteEventById(@Body() input: DeleteEventInput) {
    return await this.eventService.deleteEventById(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Get('search/:keyword')
  async searchEvents(@Param() input: SearchEventInput) {
    return await this.eventService.searchEvents(input);
  }

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(UpdateEventSwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Put('update')
  async updateEvent(
    @Body() input: UpdateEventInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.eventService.updateEvent(input, logo);
  }
}
