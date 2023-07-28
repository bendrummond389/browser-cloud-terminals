import React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useUserContext } from '@/contexts/User.Context';

import { useRouter } from 'next/router';

interface NavbarProps {
  toggleDrawer?: () => void;
  open?: boolean;
}

const drawerWidth = 360;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

export default function Navbar({ toggleDrawer, open }: NavbarProps) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { user } = useUserContext();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const router = useRouter();

  const settings = ['Dashboard', 'Logout'];

  const settingsUrls: { [key: string]: string } = {
    Dashboard: '/dashboard',
    Logout: '/logout'
  };

  const handleSettingClick = (setting: string) => {
    const url = settingsUrls[setting];
    if (url) {
      router.push(url);
      handleCloseUserMenu();
    }
  };

  return (
    <AppBar position="fixed" open={open}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <IconButton color="inherit" aria-label="open drawer" onClick={toggleDrawer} edge="start">
            {!open ? <MenuIcon /> : <ArrowLeftIcon />}
          </IconButton>
          <Typography variant="h4" sx={{ marginLeft: 5 }}>
            Cloud Terminals
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <Avatar alt="Remy Sharp" src={user?.picture} />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}>
            {settings.map(setting => (
              <MenuItem key={setting} onClick={() => handleSettingClick(setting)}>
                <Typography textAlign="center">{setting}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
