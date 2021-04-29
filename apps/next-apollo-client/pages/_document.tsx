import createEmotionServer from '@emotion/server/create-instance';
import { ServerStyleSheets } from '@material-ui/core';
import { NextPageContext } from 'next';
import { RenderPage } from 'next/dist/next-server/lib/utils';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React, { ReactElement } from 'react';

import { cache } from './_app';

const { extractCritical } = createEmotionServer(cache);

export default class CustomDocument extends Document<{
  styleTags: ReactElement[];
}> {
  static async getInitialProps(
    ctx: NextPageContext & { renderPage: RenderPage }
  ) {
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

    const initialProps = await Document.getInitialProps(ctx);
    const styles = extractCritical(initialProps.html);

    return {
      ...initialProps,
      styles: [
        ...React.Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
        <style
          key="emotion-style-tag"
          data-emotion={`css ${styles.ids.join(' ')}`}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: styles.css }}
        />,
      ],
    };
  }

  render() {
    return (
      <Html lang={'ja'}>
        <Head>
          {this.props.styleTags}
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
