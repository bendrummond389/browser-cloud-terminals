import { User } from '@prisma/client';
import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext<UserContextType | null>(null);

type UserContextType = {
  user: User | null;
  loading: boolean;
};

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
}

interface UserContextProviderProps {
  children: React.ReactNode;
}

export function UserProvider({ children }: UserContextProviderProps) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/users/user')
      .then(response => response.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  return <UserContext.Provider value={{ user, loading }}>{children}</UserContext.Provider>;
}
