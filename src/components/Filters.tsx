import { useState } from 'react';
import { useSearch } from '../context/SearchContext';

export default function Filters() {
  const { selectedFilter, setSelectedFilter, filters } = useSearch();
  const [filtersOpened, setFiltersOpened] = useState(false);

  return (
    <div className='relative z-10 h-12'>
      <button
        className='flex h-full w-48 items-center justify-between rounded-md bg-white px-4 drop-shadow-md dark:bg-blue-dark'
        onClick={() => setFiltersOpened(prev => !prev)}
      >
        <span className='font-semibold text-blue-very-dark dark:text-white'>
          {selectedFilter.name}
        </span>
        <span className='material-symbols-outlined text-blue-very-dark dark:text-white'>
          expand_more
        </span>
      </button>
      {filtersOpened && (
        <div className='absolute top-[calc(100%_+_5px)] flex w-full flex-col items-start gap-2 rounded-md bg-white p-4 drop-shadow-md dark:bg-blue-dark'>
          {filters.map(filter => (
            <button
              key={filter.id}
              className='font-semibold'
              onClick={() => {
                setSelectedFilter(filter);
                setFiltersOpened(false);
              }}
            >
              {filter.name === 'Filter by Region' ? 'None' : filter.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
