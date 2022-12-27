import { useTheme } from 'next-themes';
import { Suspense } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='absolute top-0 left-0 flex h-20 min-w-full items-center justify-between bg-gray-very-light px-4 shadow-lg dark:bg-blue-dark'>
      <span className='text-lg font-semibold'>Where in the world?</span>
      <button
        className='flex items-center justify-center gap-2'
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        <span className='material-symbols-outlined'>
          <Suspense fallback={null}>
            {theme === 'dark' ? 'light_mode' : 'dark_mode'}
          </Suspense>
        </span>
        <span>
          <Suspense fallback={null}>
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </Suspense>
        </span>
      </button>
    </header>
  );
}
