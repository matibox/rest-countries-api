import { Region } from './Region';

export type Country = {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  population: number;
  region: Region;
  capital: string;
};
