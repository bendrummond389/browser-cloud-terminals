import React, { useEffect, useRef, useState } from 'react';
import 'xterm/css/xterm.css';

interface WebTerminalProps {
  ingressPath?: string;
  onClose?: () => void;
}

const WebTerminal: React.FC<WebTerminalProps> = ({ ingressPath, onClose }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [terminal, setTerminal] = useState<any>(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialiseTerminal = async () => {
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
          console.log(socket)
        };

        socket.current.onerror = (error) => {
          console.log('Error', error);
        };

        socket.current.onmessage = (event) => {
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

        setTerminal(term);
      };

      initialiseTerminal();

      return () => {
        terminal?.dispose();
        if (socket.current) {
          socket.current.close();
        }
        // onClose();
      };
    }
  }, [ingressPath, onClose]);

  return <div ref={terminalRef} />;
};

export default WebTerminal;
