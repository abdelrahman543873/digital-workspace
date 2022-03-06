import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CreateCountryInput } from './inputs/create-country.input';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { UpdateCountryInput } from './inputs/update-country.input';
@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async create(input: CreateCountryInput, logo: Express.Multer.File) {
    return await this.countryRepository.create(input, logo);
  }

  async updateCountry(input: UpdateCountryInput, logo: Express.Multer.File) {
    return await this.countryRepository.updateCountry(input, logo);
  }

  async deleteCountry(input: DeleteCountryInput) {
    return await this.countryRepository.deleteCountry(input);
  }
}
