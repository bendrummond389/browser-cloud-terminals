import { Box, IconButton, Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import * as React from 'react';

interface DashboardDrawerProps {
  open: boolean;
}

export const DashboardDrawer: React.FC<DashboardDrawerProps> = ({ open }) => {
  const theme = useTheme();
  return (
    <Box sx={{ width: open ? 240 : 0, flexGrow: 1, p: 3 }}>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: 360,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 360,
            boxSizing: 'border-box'
          }
        }}>
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <AddCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Create New Environment"/>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
