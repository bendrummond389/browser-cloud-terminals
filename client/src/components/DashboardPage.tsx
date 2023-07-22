import { Box, Button, Typography } from '@mui/material';
import Navbar from './Navbar';
import { useUserContext } from '@/contexts/User.Context';

interface DashboardPageProps {
  open: boolean;
  toggleDrawer: () => void;
}



export const DashboardPage: React.FC<DashboardPageProps> = ({ open, toggleDrawer }) => {

  const { user, loading } = useUserContext();

  const createInstance = async () => {
    const res = await fetch("../pages/api/kubernetes/instances", {
      method: "POST"
    })
  }

  const handleCreateInstance = async () => {
    const res = await fetch("/api/kubernetes/instances", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user), // Convert the object to a JSON string
    });
  }

  if (loading) return "loading..."


  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${open ? 360 : 0}px)` },
        ml: { sm: `${open ? 360 : 0}px` },
      }}
    >
      <Navbar open={open} toggleDrawer={toggleDrawer} />
      <Button onClick={handleCreateInstance}>Create Instance</Button>
      <Typography>hello</Typography>
    </Box>
  );
};
