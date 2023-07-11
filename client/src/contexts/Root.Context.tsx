'use client';

import React from 'react';
import { UserProvider } from './UserContext';

const RootContext: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <UserProvider>{children}</UserProvider>;
};

export default RootContext;
