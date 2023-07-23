import React from 'react';
import { UserProvider } from './User.Context';
import { ThemeProvider } from '@mui/material/styles';
import WebTerminalProvider from './WebTerminal.Context';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '../themes/theme';
import CreateInstanceModalProvider from './CreateInstanceModal.Context';

const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <CreateInstanceModalProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <WebTerminalProvider>
          <UserProvider>{children}</UserProvider>
        </WebTerminalProvider>
      </ThemeProvider>
    </CreateInstanceModalProvider>
  );
};

export default RootProvider;
