import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from '@/components/Navbar'
import SideDrawer from '@/components/SideDrawer';

export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <CssBaseline />
      <Navbar open={open} handleDrawerOpen={handleDrawerOpen} />
      <SideDrawer open={open} handleDrawerClose={handleDrawerClose} />
    </div>
  );
}