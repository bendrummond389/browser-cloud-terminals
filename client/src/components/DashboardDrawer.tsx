import { Box,  Drawer, List, ListItemButton, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useCreateInstanceModalContext } from '@/contexts/CreateInstanceModal.Context';
import React from 'react';

interface DashboardDrawerProps {
  open: boolean;
}

const DashboardDrawer: React.FC<DashboardDrawerProps> = ({ open }) => {
  const { setCreateInstanceModalOpen} = useCreateInstanceModalContext()
  const theme = useTheme();

  const handleOpenModal = () => {
    setCreateInstanceModalOpen(true)
  }
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
            <ListItemButton onClick={handleOpenModal}>
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

export default DashboardDrawer