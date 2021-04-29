import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import { Layout } from '../components/layout';
import { AppBar, Toolbar } from '@material-ui/core';

import * as Colors from '@material-ui/core/colors';

export const cache = createCache({ key: 'css', prepend: true });

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#35466b',
    },
    secondary: {
      main: '#e65100',
    },
  },
});

function CustomApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={cache}>
      <Head>
        <title>Welcome to next-apollo-client!</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </CacheProvider>
  );
}

export default CustomApp;
