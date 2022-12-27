import { ThemeProvider } from 'next-themes';
import { type AppType } from 'next/dist/shared/lib/utils';
import Navbar from '../components/Navbar';

import '../styles/globals.css';

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <ThemeProvider attribute='class'>
        <Navbar />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default MyApp;
