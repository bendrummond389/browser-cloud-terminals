import Link from 'next/link';
import styles from '../styles/Home.module.css';
import { Button, Typography } from '@mui/material';

export default function Home() {
    return (
        <div>
            <Typography variant="h1">Welcome to our App</Typography>
            <Typography variant="h5">
                Manage Docker containers in a Kubernetes cluster via a web terminal
            </Typography>
            
            <Typography variant="h6">Features</Typography>
            <ul>
                <li>Create Docker containers</li>
                <li>Manage via web terminal</li>
                <li>Dashboard to monitor and manage containers</li>
            </ul>
        
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
        </div>
    );
}
