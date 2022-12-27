import Image from 'next/image';
import { type Country } from '../types/Country';

interface CountryProps {
  country: Country;
}

export default function Country({ country }: CountryProps) {
  // TODO light mode
  // TODO country details

  return (
    <div className='h-min w-9/12 overflow-hidden rounded-md bg-blue-dark'>
      <div className='w-full'>
        <Image
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          height={200}
          width={300}
          className='min-w-full'
          loading='lazy'
        />
      </div>
      <div className='flex w-full flex-col gap-3 px-6 py-8 '>
        <h2 className='text-lg font-extrabold leading-5 text-white'>
          {country.name.common}
        </h2>
        <div className='flex flex-col gap-2'>
          <p>
            <span className='text-very-dark font-semibold text-white'>
              Population:{' '}
            </span>
            <span className='text-gray-very-light'>{country.population}</span>
          </p>
          <p>
            <span className='text-very-dark font-semibold text-white'>
              Region:{' '}
            </span>
            <span className='text-gray-very-light'>{country.region}</span>
          </p>
          <p>
            <span className='text-very-dark font-semibold text-white'>
              Capital:{' '}
            </span>
            <span className='text-gray-very-light'>{country.capital}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
