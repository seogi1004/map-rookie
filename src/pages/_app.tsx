import React, { FC, ReactNode, useEffect, useState } from 'react';
import Head from 'next/head';
import App, { AppProps } from 'next/app';
import { Provider } from 'mobx-react';
import { AppContext } from 'next/dist/pages/_app';
import { useStorageStore } from '@stores/StorageStore';
import { SITE_TITLE } from '@constants/site';

interface PropsType {
  pathname: string | null;
}

const MyApp = ({ Component, pageProps }: AppProps<PropsType>) => {
  // const [stores, setStores] = useState<Stores>({
  //   userStore: useUserStore(pageProps.user),
  //   storageStore: useStorageStore(),
  // });

  // useEffect(() => {
  //   void stores.userStore.init();
  // });

  const Layout = (Component as any).layout || Empty;

  return (
    <>
      <Head>
        <title>{SITE_TITLE}</title>
        <meta charSet="utf-8" />
        <meta name="google" content="notranslate" />
        <meta name="Referrer" content="origin" />
        <meta name="referrer" content="always" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="apple-touch-icon" sizes="57x57" href="/favicon/apple-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/favicon/apple-icon-60x60.png" />
        <link rel="apple-touch-icon" sizes="72x72" href="/favicon/apple-icon-72x72.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/favicon/apple-icon-76x76.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/favicon/apple-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/favicon/apple-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/favicon/apple-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/favicon/apple-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-icon-180x180.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/favicon/android-icon-192x192.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon/favicon-96x96.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/manifest.json" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="msapplication-TileImage" content="/public/ms-icon-144x144.png" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <Provider>
        <Layout active={pageProps.pathname}>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </>
  );
};

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  const user: UserInterface | null = (appContext.ctx.req as any)?.state?.user || null;
  return {
    ...appProps,
    pageProps: {
      user,
      pathname: appContext.ctx.pathname,
    },
  };
};

export default MyApp;

const Empty: FC<{ children: ReactNode }> = ({ children }) => <>{children}</>;
