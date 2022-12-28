import { Region } from './Region';

export type Country = {
  flags: {
    png: string;
  };
  name: {
    common: string;
    nativeName: {
      [key: string]: {
        common: string;
      };
    };
  };
  population: number;
  region: Region;
  capital: string;
  borders?: string[];
  subregion: string;
  languages: {
    [key: string]: string;
  };
  tld: string[];
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
};

export function isCountries(array: unknown): array is Country[] {
  return (
    array instanceof Array &&
    'flags' in array[0] &&
    'name' in array[0] &&
    'population' in array[0] &&
    'region' in array[0] &&
    'capital' in array[0]
  );
}
