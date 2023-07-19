import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

interface NavbarProps {
  handleDrawerOpen: () => void;
  open: boolean;
}

export default function Navbar({ handleDrawerOpen, open }: NavbarProps) {
  const theme = useTheme();
  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
        >
          <MenuIcon />
        </IconButton>
        <Typography 
          variant="h6" 
          noWrap 
          component="div"
          style={{
            transition: theme.transitions.create(['transform', 'marginLeft']),
            transform: open ? 'translateX(20ch)' : 'translateX(0)',
            marginLeft: theme.spacing(5),
          }}
        >
          Persistent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}