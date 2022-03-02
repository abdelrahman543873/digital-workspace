import { Inject, Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { REQUEST } from '@nestjs/core';
import { RequestContext } from '../shared/request.interface';
import { CreateCountryInput } from './inputs/create-country.input';
@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async create(input: CreateCountryInput, logo: Express.Multer.File) {
    return await this.countryRepository.create(input, logo);
  }

  findAll() {
    return `This action returns all country`;
  }

  findOne(id: number) {
    return `This action returns a #${id} country`;
  }

  update(id: number, updateCountryDto) {
    return `This action updates a #${id} country`;
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
