import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { type Country } from '../types/Country';
import { Region } from '../types/Region';

function createCtx<A extends object | null>() {
  const ctx = createContext<A | undefined>(undefined);

  const useCtx = () => {
    const c = useContext(ctx);
    if (c === undefined) {
      throw new Error('Not allowed to use a context outside of a provider');
    }
    return c;
  };

  return [useCtx, ctx.Provider] as const;
}

type Option = {
  id: number;
  name: Region | 'Filter by Region';
};

const options: Option[] = [
  { id: 0, name: 'Filter by Region' },
  { id: 1, name: 'Africa' },
  { id: 2, name: 'Americas' },
  { id: 3, name: 'Asia' },
  { id: 4, name: 'Europe' },
  { id: 5, name: 'Oceania' },
];

type SearchContext = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectedFilter: Option;
  setSelectedFilter: React.Dispatch<React.SetStateAction<Option>>;
  filters: Option[];
};

const [useCtx, Provider] = createCtx<SearchContext>();

export const useSearch = useCtx;

type ProviderProps = {
  children: JSX.Element;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
  initialData: Country[];
};

export default function SearchContextProvider({
  children,
  setError,
  setCountries,
  initialData,
}: ProviderProps) {
  const [query, setQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<Option>(
    options[0] as Option
  );

  const [countriesByQ, setCountriesByQ] = useState<Country[]>([]);
  const [countriesByRegion, setCountriesByRegion] = useState<Country[]>([]);

  useDebounce(
    () => {
      setCountriesByQ(
        initialData.filter(country => {
          if (!query) return true;
          return country.name.common.toLowerCase().includes(query);
        })
      );

      setCountriesByRegion(
        initialData.filter(country => {
          if (selectedFilter.id === 0) return true;
          return country.region === selectedFilter.name;
        })
      );
    },
    500,
    [query, selectedFilter]
  );

  useEffect(() => {
    setError(undefined);

    const result = countriesByQ.filter(c1 =>
      countriesByRegion.some(c2 => c1.name.common === c2.name.common)
    );

    if (result.length === 0) {
      if (query === '' && selectedFilter.id === 0) {
        setCountries(initialData);
        return;
      }
      setError('Not Found');
    }

    setCountries(result);
  }, [
    countriesByQ,
    countriesByRegion,
    initialData,
    query,
    selectedFilter.id,
    setCountries,
    setError,
  ]);

  return (
    <Provider
      value={{
        query,
        setQuery,
        selectedFilter,
        setSelectedFilter,
        filters: options,
      }}
    >
      {children}
    </Provider>
  );
}
