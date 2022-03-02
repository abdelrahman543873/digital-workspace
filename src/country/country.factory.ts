import { PageRepo } from '../../test/page/page-test-repo';
import { name, address } from 'faker';
import { CountryRepo } from '../../test/country/country-test-repo';
import { Country } from './schema/country.schema';

interface CountryType {
  name?: string;
  logo?: string;
}

export const buildCountryParams = (obj: CountryType = {}): CountryType => {
  return {
    name: obj.name || address.countryCode(),
    logo: obj.logo || `${process.env.HOST}/defaults/avatar.jpg`,
  };
};

export const countriesFactory = async (
  count = 10,
  obj: CountryType = {},
): Promise<Country[]> => {
  const pages: CountryType[] = [];
  for (let i = 0; i < count; i++) {
    pages.push(await buildCountryParams(obj));
  }
  return await PageRepo().addMany(pages);
};

export const countryFactory = async (
  obj: CountryType = {},
): Promise<Country> => {
  const params: CountryType = buildCountryParams(obj);
  return await CountryRepo().add(params);
};
