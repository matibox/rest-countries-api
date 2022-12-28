import {
  type GetStaticPaths,
  type GetStaticProps,
  type InferGetStaticPropsType,
  type NextPage,
} from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { type ParsedUrlQuery } from 'querystring';
import { CountryInfo } from '../../components/CountryInfo';
import { Country } from '../../types/Country';
import formatPopulation from '../../utils/formatPopulation';

interface IParams extends ParsedUrlQuery {
  name: string;
}

const SingleCountry: NextPage<
  InferGetStaticPropsType<typeof getStaticProps>
> = ({ country, borders }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{country.name.common}</title>
      </Head>
      <main className='p-8 pt-[5rem]'>
        <button
          onClick={() => router.back()}
          className='my-12 flex w-32 items-center gap-4 bg-white px-5 py-1 drop-shadow-md dark:bg-blue-dark'
        >
          <span className='material-symbols-outlined'>arrow_back</span>
          <span>Back</span>
        </button>
        <Image
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          width={600}
          height={300}
          priority
          className='h-auto w-full drop-shadow-lg'
        />
        <section className='mt-8 flex flex-col gap-8'>
          <h1 className='text-2xl font-semibold'>{country.name.common}</h1>
          <CountryInfo
            properties={[
              {
                key: 'Native Name',
                value:
                  country.name.nativeName[
                    `${Object.keys(country.name.nativeName)[0]}`
                  ]?.common,
              },
              {
                key: 'Population',
                value: formatPopulation(country.population),
              },
              {
                key: 'Region',
                value: country.region,
              },
              {
                key: 'Sub Region',
                value: country.subregion,
              },
              {
                key: 'Capital',
                value: country.capital,
              },
            ]}
          />
          <CountryInfo
            properties={[
              { key: 'Top Level Domain', value: country.tld[0] },
              {
                key: 'Currencies',
                value: Object.keys(country.currencies).map(
                  key => country.currencies[`${key}`]?.name
                ),
              },
              {
                key: 'Languages',
                value: Object.keys(country.languages)
                  .map(key => country.languages[`${key}`])
                  .join(', '),
              },
            ]}
          />
          <div>
            <h3 className='mb-4 text-lg font-semibold text-blue-very-dark dark:text-white'>
              Border Countries:
            </h3>
            <div className='flex w-full flex-wrap gap-2'>
              {borders.length === 0 ? (
                <p>None</p>
              ) : (
                <>
                  {borders.map(border => (
                    <Link
                      href={`/countries/${border}`}
                      key={border}
                      className='text-md flex w-32 justify-center rounded-sm bg-white p-2 text-blue-very-dark drop-shadow-md dark:bg-blue-dark dark:text-white'
                    >
                      {border}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://restcountries.com/v3.1/all?fields=name');
  const countries = await res.json();

  return {
    paths: countries.map((country: Country) => ({
      params: {
        name: country.name.common,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<{
  country: Country;
  borders: string[];
}> = async ({ params }) => {
  const res = await fetch(
    `https://restcountries.com/v3.1/name/${(params as IParams).name}`
  );
  const data: Country = (await res.json())[0];

  let borders: Country[] = [];

  if (data.borders) {
    for (const border of data.borders) {
      const res = await fetch(`
      https://restcountries.com/v3.1/alpha/${border}?fields=name`);
      const data: Country = await res.json();
      borders.push(data);
    }
  }

  return {
    props: {
      country: data,
      borders: borders.map(border => border.name.common),
    },
  };
};

export default SingleCountry;
