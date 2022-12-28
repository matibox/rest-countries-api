import Image from 'next/image';
import { type Country } from '../types/Country';

interface CountryProps {
  country: Country;
}

export default function Country({ country }: CountryProps) {
  // TODO country details

  return (
    <div className='h-96 self-stretch overflow-hidden rounded-md bg-white drop-shadow-lg dark:bg-blue-dark'>
      <div className='h-48 w-full'>
        <Image
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          height={200}
          width={300}
          className='h-full min-w-full'
          loading='lazy'
        />
      </div>
      <div className='flex h-1/2 w-full flex-col justify-center gap-5 px-4'>
        <h2 className='text-lg font-extrabold leading-5 text-blue-very-dark dark:text-white'>
          {country.name.common}
        </h2>
        <div className='flex flex-col gap-2'>
          <p>
            <span className='text-very-dark font-semibold text-blue-very-dark dark:text-white'>
              Population:{' '}
            </span>
            <span className='text-blue-very-dark dark:text-gray-very-light'>
              {country.population}
            </span>
          </p>
          <p>
            <span className='font-semibold text-blue-very-dark dark:text-white'>
              Region:{' '}
            </span>
            <span className='text-blue-very-dark dark:text-gray-very-light'>
              {country.region}
            </span>
          </p>
          <p>
            <span className='font-semibold text-blue-very-dark dark:text-white'>
              Capital:{' '}
            </span>
            <span className='text-blue-very-dark dark:text-gray-very-light'>
              {country.capital}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
