import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='fixed top-0 left-0 z-20 flex h-20 min-w-full items-center justify-between bg-gray-very-light px-4 shadow-lg dark:bg-blue-dark'>
      <Link href='/' className='text-lg font-semibold'>
        Where in the world?
      </Link>
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
