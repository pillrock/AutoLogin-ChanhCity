import { createContext, useContext, useState } from 'react';
import Notifications from '../components/Notifications';
type NotificationContextType = {
  notify: (message: string) => void;
};
const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context)
    throw new Error('useNotification must be used within NotificationProvider');
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [message, setMessage] = useState('');
  const notify = (msg: string) => {
    setMessage(msg);
  };
  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Notifications
        message={message}
        onClear={() => {
          setMessage('');
        }}
      />
    </NotificationContext.Provider>
  );
};
