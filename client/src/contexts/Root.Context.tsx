import React from 'react';
import { UserProvider } from './User.Context';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from "../themes/theme";

const RootProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>{children}</UserProvider>
    </ThemeProvider>
  );
};

export default RootProvider;
