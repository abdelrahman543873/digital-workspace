import { Pagination } from './../shared/utils/pagination.input';
import { DeleteCountryInput } from './inputs/delete-country.input';
import { Injectable } from '@nestjs/common';
import { CreateCountryInput } from './inputs/create-country.input';
import { Country, CountryDocument } from './schema/country.schema';
import { BaseRepository } from '../shared/generics/repository.abstract';
import { InjectModel } from '@nestjs/mongoose';
import {
  AggregatePaginateModel,
  HydratedDocument,
  QueryWithHelpers,
} from 'mongoose';
import { LookupSchemasEnum } from '../app.const';
import { SearchCountryInput } from './inputs/search-country.input';

@Injectable()
export class CountryRepository extends BaseRepository<Country> {
  constructor(
    @InjectModel(Country.name)
    private countrySchema: AggregatePaginateModel<CountryDocument>,
  ) {
    super(countrySchema);
  }

  async create(
    input: CreateCountryInput,
  ): Promise<HydratedDocument<Country, any>> {
    return await this.countrySchema.create({
      ...input,
    });
  }

  deleteCountry(input: DeleteCountryInput): QueryWithHelpers<any, any> {
    return this.countrySchema.deleteOne({ name: input.name });
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

  async searchCountries(input: SearchCountryInput) {
    const aggregation = this.countrySchema.aggregate([
      {
        $match: { name: { $regex: input.name, $options: 'i' } },
      },
    ]);
    return await this.countrySchema.aggregatePaginate(aggregation, {
      offset: input.offset * input.limit,
      limit: input.limit,
    });
  }
}
