import { Pagination } from './../shared/utils/pagination.input';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { Injectable } from '@nestjs/common';
import { CreateCountryInput } from './inputs/create-country.input';
import { Country, CountryDocument } from './schema/country.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import { AggregatePaginateModel } from 'mongoose';
import { LookupSchemasEnum } from '../app.const';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(Country.name)
    private countrySchema: AggregatePaginateModel<CountryDocument>,
  ) {
    super(countrySchema);
  }

  async create(input: CreateCountryInput) {
    return await this.countrySchema.create({
      ...input,
    });
  }

  async deleteCountry(input: DeleteCountryInput) {
    return await this.countrySchema.deleteOne({ name: input.name });
  }

  async getCountries(input: Pagination) {
    const aggregation = this.countrySchema.aggregate([
      {
        $match: {},
      },
      {
        $lookup: {
          from: LookupSchemasEnum.users,
          as: 'countryMembers',
          let: { countryId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $eq: ['$$countryId', '$country'],
                },
              },
            },
          ],
        },
      },
      {
        $addFields: {
          members: { $size: '$countryMembers' },
        },
      },
      {
        $project: {
          countryMembers: 0,
        },
      },
    ]);
    return await this.countrySchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
