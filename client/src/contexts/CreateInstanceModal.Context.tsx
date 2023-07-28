import React from 'react';

interface CreateInstanceModalContextProps {
  createInstanceModalOpen: boolean;
  setCreateInstanceModalOpen: (value: boolean) => void;
  submitSuccess: boolean;
  setSubmitSuccess: (value: boolean) => void;
}

const CreateInstanceModalContext = React.createContext<CreateInstanceModalContextProps>({
  createInstanceModalOpen: false,
  setCreateInstanceModalOpen: () => {},
  submitSuccess: false,
  setSubmitSuccess: () => {},
});

export function useCreateInstanceModalContext() {
  return React.useContext(CreateInstanceModalContext);
}

const CreateInstanceModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [createInstanceModalOpen, setCreateInstanceModalOpen] = React.useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = React.useState<boolean>(false);

  return (
    <CreateInstanceModalContext.Provider value={{ createInstanceModalOpen, setCreateInstanceModalOpen, submitSuccess, setSubmitSuccess }}>
      {children}
    </CreateInstanceModalContext.Provider>
  );
};

export default CreateInstanceModalProvider;
