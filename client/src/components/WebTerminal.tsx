import React from 'react';
import 'xterm/css/xterm.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useWebTerminalContext } from '@/contexts/WebTerminal.Context';
import { Grid } from '@mui/material';

interface WebTerminalProps {
  ingressPath?: string;
  onClose?: () => void;
}

const WebTerminal: React.FC<WebTerminalProps> = ({ ingressPath, onClose }) => {
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const terminalInstance = React.useRef<any>(null);
  const socket = React.useRef<WebSocket | null>(null);
  const { setTerminalOpen } = useWebTerminalContext();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const initializeTerminal = async () => {
        const { Terminal } = await import('xterm');
        const { FitAddon } = await import('xterm-addon-fit');

        const term = new Terminal();
        const fitAddon = new FitAddon();
        term.loadAddon(fitAddon);

        term.open(terminalRef.current!);
        fitAddon.fit();
        const appUrl = `ws://20.121.178.15${ingressPath}`;
        socket.current = new WebSocket(appUrl);

        socket.current.onopen = () => {
          console.log('Connected to WebSocket server');
        };

        socket.current.onerror = error => {
          console.log('Error', error);
        };

        socket.current.onmessage = event => {
          term.write(event.data);
        };

        socket.current.onclose = () => {
          console.log('Disconnected from WebSocket server');
        };

        term.onData(data => {
          if (socket.current) {
            socket.current.send(data);
          }
        });

        terminalInstance.current?.dispose();
        terminalInstance.current = term;
      };

      const closeTerminal = () => {
        if (socket.current) {
          socket.current.close();
        }
      };

      if (ingressPath) {
        closeTerminal();
        initializeTerminal();
      }

      return () => {
        terminalInstance.current?.dispose();
        closeTerminal();
      };
    }
  }, [ingressPath, onClose]);

  return (
    <Grid
      container
      style={{
        position: 'relative',
        backgroundColor: '#000000',
        height: '80%',
        width: '90%',
        padding: '10px',
        color: '#FFFFFF',
        overflowY: 'auto',
        borderRadius: '10px'
      }}
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch">
      <IconButton
        style={{
          color: '#FFFFFF',
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000
        }}
        onClick={() => setTerminalOpen(false)}>
        <CloseIcon />
      </IconButton>
      <Grid item style={{ flexGrow: 1 }}>
        <div ref={terminalRef} style={{ height: '100%' }} />
      </Grid>
    </Grid>
  );
};

export default WebTerminal;
