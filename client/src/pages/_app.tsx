import React from 'react';
import { AppProps } from 'next/app';
import RootProvider from '@/contexts/Root.Context';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <RootProvider>
      <Component {...pageProps} />
    </RootProvider>
  );
};

export default App;
