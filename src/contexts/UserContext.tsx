import { createContext, useContext, useState } from 'react';

type UserStatus = 'online' | 'offline' | 'nothing';

interface UserContextType {
  status: UserStatus;
  userDataContext: any;
  login: (userData: any) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [status, setStatus] = useState<UserStatus>('nothing');
  const [userDataContext, setUserDataContext] = useState<any>(null);

  const login = (data: any) => {
    setUserDataContext(data);
    setStatus('online');
  };

  const logout = () => {
    setUserDataContext(null);
    setStatus('nothing');
  };

  return (
    <UserContext.Provider value={{ status, userDataContext, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
