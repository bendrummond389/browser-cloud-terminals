import Link from 'next/link';
import { Button, Container, Typography, Box } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Typography variant="h1">Welcome to Cloud Terminals</Typography>
      <Typography variant="h5">A cloud based Kubernetes management tool designed by Ben Drummond</Typography>

      <Box sx={{ margin: '2' }}>
        <Typography variant="h6">Features</Typography>
        <ul>
          <li>Create Docker containers</li>
          <li>Manage via web terminal</li>
          <li>Dashboard to monitor and manage containers</li>
        </ul>
      </Box>

      <Box>
        <Link href="/dashboard">
          <Button variant="contained" color="primary">
            Get Started
          </Button>
        </Link>

        <Link href="/login">
          <Button variant="outlined" color="primary" style={{ marginLeft: '1em' }}>
            Login
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
