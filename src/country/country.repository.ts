import { Injectable } from '@nestjs/common';
import { CreateCountryInput } from './inputs/create-country.input';
import { Country, CountryDocument } from './schema/country.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(Country.name)
    private countrySchema: AggregatePaginateModel<CountryDocument>,
  ) {
    super(countrySchema);
  }

  async create(input: CreateCountryInput, logo: Express.Multer.File) {
    return await this.countrySchema.create({
      ...input,
      ...(logo && { logo: `${process.env.HOST}${logo.filename}` }),
    });
  }
}
