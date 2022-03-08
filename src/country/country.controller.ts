import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryInput } from './inputs/create-country.input';
import { UpdateCountryInput } from './inputs/update-country.input';
import { Put } from '@nestjs/common';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { Pagination } from '../shared/utils/pagination.input';
@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiTags('country')
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() input: CreateCountryInput) {
    return await this.countryService.create(input);
  }

  @ApiTags('country')
  @UseGuards(AuthGuard)
  @Delete()
  async deleteCountry(@Body() input: DeleteCountryInput) {
    return await this.countryService.deleteCountry(input);
  }

  @ApiTags('country')
  @UseGuards(AuthGuard)
  @Get()
  async getCountries(@Param() input: Pagination) {
    return await this.countryService.getCountries(input);
  }
}
