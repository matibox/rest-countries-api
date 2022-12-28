import Image from 'next/image';
import Link from 'next/link';
import { type Country } from '../types/Country';
import formatPopulation from '../utils/formatPopulation';
import { CountryInfo } from './CountryInfo';

type CountryProps = {
  country: Country;
  index: number;
};

export default function Country({ country, index }: CountryProps) {
  return (
    <Link
      href={`/countries/${country.name.common}`}
      className='flex h-96 flex-col self-stretch overflow-hidden rounded-md bg-white drop-shadow-lg dark:bg-blue-dark'
    >
      <Image
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        height={200}
        width={300}
        className='w-min-full h-auto'
        priority={index < 4}
      />
      <div className='flex h-auto w-full shrink grow basis-auto flex-col justify-center gap-5 px-4'>
        <h2 className='text-lg font-extrabold leading-5 text-blue-very-dark dark:text-white'>
          {country.name.common}
        </h2>
        <CountryInfo
          properties={[
            {
              key: 'Population',
              value: formatPopulation(country.population),
            },
            {
              key: 'Region',
              value: country.region === 'Americas' ? 'America' : country.region,
            },
            {
              key: 'Capital',
              value: country.capital,
            },
          ]}
        />
      </div>
    </Link>
  );
}
