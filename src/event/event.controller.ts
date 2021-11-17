import { AuthGuard } from './../shared/guards/auth.guard';
import { EventService } from './event.service';
import {
  Body,
  Controller,
  Get,
  Post,
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

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @ApiBearerAuth()
  @ApiTags('event')
  @UseGuards(AuthGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody(CreateEventSwagger)
  @UseInterceptors(FileInterceptor('logo'))
  @Post('create')
  async createEvent(
    @Body() input: CreateEventInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.eventService.createEvent(input, logo);
  }

  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Get('events')
  async getEvents(@Query() input: GetEventsInput) {
    return await this.eventService.getEvents(input);
  }

  @ApiTags('event')
  @UseGuards(AuthGuard)
  @Post('join')
  async manageJoinEvent(@Body() input: ManageJoinEventInput) {
    return await this.eventService.manageJoinEvent(input);
  }
}
