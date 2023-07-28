import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import DashboardDrawer from '@/components/DashboardDrawer';
import DashboardPage from '@/components/DashboardPage';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';
import CreateInstanceModal from '@/components/CreateInstanceModal';

export default function Dashboard() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <div>
      <CssBaseline />
      <DashboardDrawer open={open} />
      <DashboardPage open={open} toggleDrawer={toggleDrawer} />
      <CreateInstanceModal />
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
