import { useCreateInstanceModalContext } from '@/contexts/CreateInstanceModal.Context';
import { useUserContext } from '@/contexts/User.Context';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { User } from '@prisma/client';
import React, { useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export interface CreateInstanceRequestBody {
  user: User;
  name: string;
  podImage: string;
}

export const CreateNewInstanceModal = () => {
  const { createInstanceModalOpen, setCreateInstanceModalOpen, submitSuccess, setSubmitSuccess } = useCreateInstanceModalContext();
  const [selectedLinux, setSelectedLinux] = useState<string>('debian-ws'); 
  const [instanceName, setInstanceName] = useState<string>(''); 
  const [submitting, setSubmitting] = useState<boolean>(false)

  const {user} = useUserContext()

  const handleClose = () => {
    setCreateInstanceModalOpen(false);
  };

  const createInstance = async () => {
    if (!user) return;

    const createInstanceRequestBody: CreateInstanceRequestBody = {
      user,
      name: instanceName,
      podImage: selectedLinux,
    };

    const res = await fetch('/api/kubernetes/instances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(createInstanceRequestBody)
    });

    return res;
  };

  const handleLinuxButtonClick = (linux: string) => {
    setSelectedLinux(linux);
  };

  const handleInstanceNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedValue = event.target.value.replace(/[^a-zA-Z0-9]/g, '');
    setInstanceName(sanitizedValue);
  };

  const handleSubmit = async () => {
    setSubmitSuccess(false)
    setSubmitting(true);
    try {
      const response = await createInstance();
      if (response && response.ok) {
        setCreateInstanceModalOpen(false);
        setSubmitSuccess(true);
      }
    } catch (error) {
    } finally {
      setSubmitting(false);
      setInstanceName('');
      setSelectedLinux('debian-ws');
    }
  };

  return (
    <div>
      <Modal
        open={createInstanceModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style} noValidate autoComplete="off">
          <div style={{ marginBottom: '20px' }}>
            <Typography variant="h6" gutterBottom>
              Create New Instance
            </Typography>
            <Typography variant="body1">
            Note: name can only contain alphanumeric characters 
            </Typography>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <TextField
              required
              id="instance-name"
              label="Instance Name"
              variant="outlined"
              value={instanceName}
              onChange={handleInstanceNameChange}
            />
            <div style={{ display: 'flex', gap: '20px' }}>
              <Button
                variant={selectedLinux === 'ubuntu-ws' ? 'contained' : 'outlined'}
                onClick={() => handleLinuxButtonClick('ubuntu-ws')}
              >
                Ubuntu
              </Button>
              <Button
                variant={selectedLinux === 'debian-ws' ? 'contained' : 'outlined'}
                onClick={() => handleLinuxButtonClick('debian-ws')}
              >
                Debian
              </Button>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? 'Creating Instance...' : 'Submit'}
            </Button>
          </div>  
        </Box>
      </Modal>
    </div>
  );
};
