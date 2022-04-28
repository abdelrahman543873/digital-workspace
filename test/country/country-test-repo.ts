import { CountryRepository } from '../../src/country/country.repository';
export const CountryRepo = (): CountryRepository => global.countryRepository;
