import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel='stylesheet'
          href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;600;800&display=swap'
          rel='stylesheet'
        />
      </Head>
      <body className='bg-gray-very-light font-nunito dark:bg-blue-very-dark-dm'>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
