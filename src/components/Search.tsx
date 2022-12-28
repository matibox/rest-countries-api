import { useSearch } from '../context/SearchContext';

export default function Search() {
  const { query, setQuery } = useSearch();

  return (
    <div className='flex w-full items-center gap-5 rounded-md bg-white px-10 py-3 drop-shadow-md dark:bg-blue-dark md:w-96'>
      <span className='material-symbols-outlined text-gray-dark dark:text-white'>
        search
      </span>
      <input
        type='text'
        placeholder='Search for a country...'
        className='w-full bg-white text-gray-dark focus:outline-none focus-visible:ring-1 dark:bg-blue-dark dark:text-white'
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
    </div>
  );
}
