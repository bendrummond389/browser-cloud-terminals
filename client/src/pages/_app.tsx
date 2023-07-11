import React from 'react';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppProps } from 'next/app';
import RootContext from '@/contexts/Root.Context';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RootContext>
      <Component {...pageProps} />
    </RootContext>
  );
};

export default App;
