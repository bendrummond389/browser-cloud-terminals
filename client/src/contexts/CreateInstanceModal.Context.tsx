import { User } from '@prisma/client';
import React, { createContext, useContext, useState } from 'react';

interface CreateInstanceModalContextProps {
  createInstanceModalOpen: boolean;
  setCreateInstanceModalOpen: (value: boolean) => void;
  submitSuccess: boolean;
  setSubmitSuccess: (value: boolean) => void;
}

const CreateInstanceModalContext = createContext<CreateInstanceModalContextProps>({
  createInstanceModalOpen: false,
  setCreateInstanceModalOpen: () => {},
  submitSuccess: false,
  setSubmitSuccess: () => {},
});

export function useCreateInstanceModalContext() {
  return useContext(CreateInstanceModalContext);
}

const CreateInstanceModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [createInstanceModalOpen, setCreateInstanceModalOpen] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  return (
    <CreateInstanceModalContext.Provider value={{ createInstanceModalOpen, setCreateInstanceModalOpen, submitSuccess, setSubmitSuccess }}>
      {children}
    </CreateInstanceModalContext.Provider>
  );
};

export default CreateInstanceModalProvider;
