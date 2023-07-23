import { Box, Button, Typography, Grid } from '@mui/material';
import Navbar from './Navbar';
import { useUserContext } from '@/contexts/User.Context';
import { Instance, User } from '@prisma/client';
import InstanceCardContainer from './InstanceCardContainer';
import { useState } from 'react';
import React from 'react';
import WebTerminal from './WebTerminal';
import { useWebTerminalContext } from '@/contexts/WebTerminal.Context';

interface DashboardPageProps {
  open: boolean;
  toggleDrawer: () => void;
}

export interface CreateInstanceRequestBody {
  user: User;
  name: string;
  podImage: string;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ open, toggleDrawer }) => {
  const { user, loading } = useUserContext();
  const { ingressPath, terminalOpen } = useWebTerminalContext();

  if (loading) return 'loading...';

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${open ? 360 : 0}px)` },
        ml: { sm: `${open ? 360 : 0}px` },
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
      }}>
      <Navbar open={open} toggleDrawer={toggleDrawer} />
      <Grid container style={{ flexGrow: 1, overflowY: 'auto' }}>
        <InstanceCardContainer />
      </Grid>
      {terminalOpen && (
        <Box
          sx={{ height: '50%', mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2%' }}>
          <WebTerminal ingressPath={ingressPath} />
        </Box>
      )}
    </Box>
  );
};
