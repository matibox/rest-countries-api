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
      <main className='md items-center p-8 pt-[5rem] md:relative md:flex md:h-[calc(100vh_-_5rem)] md:justify-between md:gap-32 md:p-20 md:pt-48'>
        <button
          onClick={() => router.back()}
          className='my-12 flex w-32 items-center gap-4 bg-white px-5 py-1 drop-shadow-md transition-colors hover:bg-[#38bdf8] hover:text-white dark:bg-blue-dark dark:text-white dark:hover:bg-[#38bdf8] dark:hover:text-blue-very-dark md:absolute md:top-20 md:left-20'
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
          className='h-auto w-full drop-shadow-lg md:w-2/5 md:shrink-0'
        />
        <section className='mt-8 flex flex-col gap-8 md:flex-row md:flex-wrap md:gap-y-12 md:gap-x-32'>
          <h1 className='text-2xl font-semibold md:basis-full md:text-4xl md:font-extrabold'>
            {country.name.common}
          </h1>
          <CountryInfo
            properties={[
              {
                key: 'Native Name',
                value: country.name.nativeName
                  ? country.name.nativeName[
                      `${Object.keys(country.name.nativeName)[0]}`
                    ]?.common
                  : '-',
              },
              {
                key: 'Population',
                value: formatPopulation(country.population) ?? '-',
              },
              {
                key: 'Region',
                value: country.region ?? '-',
              },
              {
                key: 'Sub Region',
                value: country.subregion ?? '-',
              },
              {
                key: 'Capital',
                value: country.capital ?? '-',
              },
            ]}
          />
          <CountryInfo
            properties={[
              { key: 'Top Level Domain', value: country.tld[0] },
              {
                key: 'Currencies',
                value: country.currencies
                  ? Object.keys(country.currencies).map(key => {
                      if (country.currencies) {
                        //@ts-ignore
                        return country.currencies[`${key}`].name;
                      }
                      return '';
                    })
                  : '-',
              },
              {
                key: 'Languages',
                value: country.languages
                  ? Object.keys(country.languages)
                      .map(key => {
                        if (country.languages) {
                          return country.languages[`${key}`];
                        }
                        return '';
                      })
                      .join(', ')
                  : '-',
              },
            ]}
          />
          <div className='md:flex md:basis-full md:items-center md:gap-10'>
            <h3 className='mb-4 text-lg font-semibold text-blue-very-dark dark:text-white md:mb-0'>
              Border Countries:
            </h3>
            <div className='flex w-full flex-wrap gap-2 md:w-auto'>
              {borders.length === 0 ? (
                <p>None</p>
              ) : (
                <>
                  {borders.map(border => (
                    <Link
                      href={`/countries/${border}`}
                      key={border}
                      className='text-md flex w-32 justify-center rounded-sm bg-white p-2 text-blue-very-dark drop-shadow-md transition-colors hover:bg-[#38bdf8] hover:text-white dark:bg-blue-dark dark:text-white dark:hover:bg-[#38bdf8] dark:hover:text-blue-very-dark'
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
