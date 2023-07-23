import React, { createContext, useContext, useState } from 'react';

interface WebTerminalProps {
  ingressPath: string;
  setIngressPath: (value: string) => void;
  terminalOpen: boolean;
  setTerminalOpen: (value: boolean) => void;
}

const WebTerminalContext = createContext<WebTerminalProps>({
  ingressPath: "",
  setIngressPath: () => {},
  terminalOpen: false,
  setTerminalOpen: () => {}
});

export function useWebTerminalContext() {
  return useContext(WebTerminalContext);
}

const WebTerminalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [ingressPath, setIngressPath] = useState<string>("");
  const [terminalOpen, setTerminalOpen] = useState<boolean>(false);

  return (
    <WebTerminalContext.Provider value={{ ingressPath, setIngressPath, terminalOpen, setTerminalOpen }}>
      {children}
    </WebTerminalContext.Provider>
  );
};

export default WebTerminalProvider;
