import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { AuthProvider } from '../auth/AuthContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>With Auth</title>
      </Head>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}

export default CustomApp;
