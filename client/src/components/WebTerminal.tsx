import React, { useEffect, useRef, useState } from 'react';
import 'xterm/css/xterm.css';
import { io } from "socket.io-client";
import debug from 'debug';

debug.enable('socket.io-client:socket');
const log = debug('socket.io-client:url');

interface WebTerminalProps {
  ingressPath?: string;
  onClose?: () => void;
}

const WebTerminal: React.FC<WebTerminalProps> = ({ ingressPath, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<any>(null);
  const socket = useRef<any>(null);

  useEffect(() => {
    const initialiseTerminal = async () => {
      const { Terminal } = await import('xterm');
      const { FitAddon } = await import('xterm-addon-fit');

      const term = new Terminal();
      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);

      term.open(terminalRef.current!);
      fitAddon.fit();

      const appUrl = `ws://20.121.178.15`;
      console.log(appUrl)
      socket.current = io(appUrl, {  path: '/socket.io', transports: ['websocket'] });
      console.log(socket.current)
      socket.current.on('error', (error: any) => {
        console.log('Error', error);
      });
      socket.current.on('connect', () => {
        console.log('Connected to socket.io server');
      });

      socket.current.on('output', (data: any) => {
        term.write(data);
      });

      term.onData(data => {
        socket.current.emit('input', data);
      });

      socket.current.on('disconnect', () => {
        console.log('Disconnected from socket.io server');
      });

      setTerminal(term);
    };

    if (terminalRef.current) {
      initialiseTerminal();
    }

    return () => {
      terminal?.dispose();
      socket.current?.disconnect();
      // onClose();
    };
  }, [ingressPath, onClose]);

  return <div ref={terminalRef} />;
};

export default WebTerminal;
