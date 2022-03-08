import { Injectable } from '@nestjs/common';
import { CountryRepository } from './country.repository';
import { CreateCountryInput } from './inputs/create-country.input';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { Pagination } from '../shared/utils/pagination.input';
import { SearchCountryInput } from './inputs/search-country.input';
@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async create(input: CreateCountryInput) {
    return await this.countryRepository.create(input);
  }

  async deleteCountry(input: DeleteCountryInput) {
    return await this.countryRepository.deleteCountry(input);
  }

  async getCountries(input: Pagination) {
    return await this.countryRepository.getCountries(input);
  }

  async searchCountries(input: SearchCountryInput) {
    return await this.countryRepository.searchCountries(input);
  }
}
