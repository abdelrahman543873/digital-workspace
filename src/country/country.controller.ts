import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Param,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryInput } from './inputs/create-country.input';
import { CreateCountrySwagger } from './swagger/create-country.schema';
import { FileCloudUploadInterceptor } from '../shared/interceptors/file-cloud-upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateCountryInput } from './inputs/update-country.input';
import { Put } from '@nestjs/common';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { Pagination } from '../shared/utils/pagination.input';

@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @ApiTags('country')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiBody(CreateCountrySwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Post()
  async create(
    @Body() input: CreateCountryInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.countryService.create(input, logo);
  }

  @ApiTags('country')
  @ApiConsumes('multipart/form-data')
  @UseGuards(AuthGuard)
  @ApiBody(CreateCountrySwagger)
  @UseInterceptors(FileCloudUploadInterceptor)
  @UseInterceptors(FileInterceptor('logo'))
  @Put()
  async updateCountry(
    @Body() input: UpdateCountryInput,
    @UploadedFile() logo: Express.Multer.File,
  ) {
    return await this.countryService.updateCountry(input, logo);
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
