import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const drawerWidth = 300;

interface DrawerProps {
  open: boolean;
  handleDrawerClose: () => void;
}

export default function SideDrawer({ open, handleDrawerClose }: DrawerProps) {
  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
    >
      <div>
        <IconButton onClick={handleDrawerClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
          <ListItemButton >
            <ListItemIcon> <AddCircleOutlineIcon /> </ListItemIcon>
            <ListItemText primary="Create New Environment" />
          </ListItemButton>
      </List>
    </Drawer>
  );
}
