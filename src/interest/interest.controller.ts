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
import { InterestService } from './interest.service';
import { AuthGuard } from '../shared/guards/auth.guard';
import { CreateInterestInput } from './inputs/create-interest.input';
import { UpdateInterestInput } from './inputs/update-interest.input';
import { DeleteInterestInput } from './inputs/delete-interest.input';
import { Pagination } from '../shared/utils/pagination.input';
import { ActiveUserGuard } from '../shared/guards/active-user.guard';
@UseGuards(ActiveUserGuard)
@Controller('interest')
export class InterestController {
  constructor(private interestService: InterestService) {}

  @ApiBearerAuth()
  @ApiTags('interest')
  @UseGuards(AuthGuard)
  @Post()
  async createInterest(@Body() input: CreateInterestInput) {
    return await this.interestService.createInterest(input);
  }

  @ApiBearerAuth()
  @ApiTags('interest')
  @UseGuards(AuthGuard)
  @Put()
  async updateInterest(@Body() input: UpdateInterestInput) {
    return await this.interestService.updateInterest(input);
  }

  @ApiBearerAuth()
  @ApiTags('interest')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteInterest(@Body() input: DeleteInterestInput) {
    return await this.interestService.deleteInterest(input);
  }

  @ApiBearerAuth()
  @ApiTags('interest')
  @UseGuards(AuthGuard)
  @Get('list')
  async getInterestsList(@Query() input: Pagination) {
    return await this.interestService.getInterestsList(input);
  }
}
