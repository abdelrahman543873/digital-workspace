import { AuthGuard } from './../shared/guards/auth.guard';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryInput } from './inputs/create-country.input';
import { CreateCountrySwagger } from './swagger/create-country.schema';
import { FileCloudUploadInterceptor } from '../shared/interceptors/file-cloud-upload.interceptor';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, updateCountryDto) {
    return this.countryService.update(+id, updateCountryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }
}
