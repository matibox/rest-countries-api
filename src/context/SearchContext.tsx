import { createContext, useContext, useState } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { Country, isCountries } from '../types/Country';
import { isError } from '../types/Error';

function createCtx<A extends {} | null>() {
  const ctx = createContext<A | undefined>(undefined);

  const useCtx = () => {
    const c = useContext(ctx);
    if (c === undefined) {
      throw new Error('Not allowed to use a context outside of a provider');
    }
    return c;
  };

  return { useCtx, Provider: ctx.Provider } as const;
}

type SearchContext = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createCtx<SearchContext>();

export function useSearch() {
  return SearchContext.useCtx();
}

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

  useDebounce(
    async () => {
      setError(undefined);

      if (query === '') {
        setCountries(initialData);
        return;
      }

      const res = await fetch(`https://restcountries.com/v3.1/name/${query}`);
      const data: unknown = await res.json();

      if (isError(data)) {
        setError(data.message);
        return;
      }

      if (isCountries(data)) {
        setCountries(data);
      }
    },
    500,
    [query]
  );

  return (
    <SearchContext.Provider
      value={{
        query,
        setQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
