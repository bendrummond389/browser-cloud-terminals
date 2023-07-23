import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useUserContext } from '@/contexts/User.Context';
import { Instance } from '@prisma/client';
import { Button, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useCreateInstanceModalContext } from '@/contexts/CreateInstanceModal.Context';
import { useWebTerminalContext } from '@/contexts/WebTerminal.Context';

const InstanceCardContainer = () => {
  const { user, loading } = useUserContext();
  const [instances, setInstances] = React.useState<Instance[]>([]);
  const [deletingInstance, setDeletingInstance] = React.useState<number | null>(null);
  const theme = useTheme();
  const { submitSuccess, setSubmitSuccess } = useCreateInstanceModalContext();
  const { ingressPath, setIngressPath, terminalOpen, setTerminalOpen } = useWebTerminalContext();

  const distroImages: { [key: string]: string } = {
    'ubuntu-ws': 'https://assets.ubuntu.com/v1/a7e3c509-Canonical%20Ubuntu.svg',
    'debian-ws': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Debian_logo.png'
  };

  const deleteInstance = async (instanceToDelete: Instance) => {
    setDeletingInstance(instanceToDelete.id);

    // switch ingresspath to a different instance
    if (instanceToDelete.ingressPath == ingressPath) {
      const nextInstance = instances.find((instance: Instance) => instance.id != instanceToDelete.id);
      if (nextInstance != null) {
        setIngressPath(nextInstance.ingressPath);
      } else {
          setTerminalOpen(false)
      }
    }

    try {
      const response = await fetch(`/api/kubernetes/instances?id=${instanceToDelete.id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        setInstances(instances.filter((instance: Instance) => instance.id !== instanceToDelete.id));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDeletingInstance(null);
    }
  };

  const getInstances = async (userId: number) => {
    const response = await fetch(`/api/kubernetes/instances?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (data.length === 0) {
      setTerminalOpen(false);
    }
    setInstances(data);
  };

  const handleSetIngressPath = (path: string) => {
    setIngressPath(path);
    setTerminalOpen(true);
  };

  React.useEffect(() => {
    if (user && user.sub) {
      getInstances(user.id);
    }
  }, [user, submitSuccess, deletingInstance]);

  return (
    <Grid container spacing={2} justifyContent="center">
      {instances.map((instance: Instance, index) => (
        <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Card
            sx={{
              minWidth: 200,
              height: '360px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: deletingInstance === instance.id ? 0.5 : 1,
            }}>
            <CardMedia
              component="img"
              height="140"
              image={distroImages[instance.distro.toLowerCase()] || 'default-image-url'}
              alt={instance.distro}
              style={{ objectFit: 'contain' }}
              sx={{ padding: 3 }}
            />

            <CardContent>
              <p>{instance.name}</p>
              <Button onClick={() => deleteInstance(instance)} disabled={deletingInstance === instance.id}> Delete </Button>
              <Button onClick={() => handleSetIngressPath(instance.ingressPath)} disabled={deletingInstance === instance.id}> Open </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default InstanceCardContainer;
