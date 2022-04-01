import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TitleService } from './title.service';
import { DeleteTitleInput } from './inputs/delete-title.input';
import { UpdateTitleInput } from './inputs/update-title.input';
import { Pagination } from '../shared/utils/pagination.input';
import { CreateTitleInput } from './inputs/create-title.input';

@Controller('title')
export class TitleController {
  constructor(private titleService: TitleService) {}

  @ApiBearerAuth()
  @ApiTags('title')
  @UseGuards(AuthGuard)
  @Post()
  async createTitle(@Body() input: CreateTitleInput) {
    return await this.titleService.createTitle(input);
  }

  @ApiBearerAuth()
  @ApiTags('title')
  @UseGuards(AuthGuard)
  @Put()
  async updateTitle(@Body() input: UpdateTitleInput) {
    return await this.titleService.updateTitle(input);
  }

  @ApiBearerAuth()
  @ApiTags('title')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteTitle(@Body() input: DeleteTitleInput) {
    return await this.titleService.deleteTitle(input);
  }

  @ApiBearerAuth()
  @ApiTags('title')
  @UseGuards(AuthGuard)
  @Get('list')
  async getTitlesList(@Query() input: Pagination) {
    return await this.titleService.getTitlesList(input);
  }
}
