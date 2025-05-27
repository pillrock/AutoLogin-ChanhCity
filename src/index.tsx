import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { NotificationProvider } from './contexts/NotificationContext';
import { UserProvider } from './contexts/UserContext';
const root = createRoot(document.body);
root.render(
  <GoogleOAuthProvider clientId="614557039618-it7j2cv9c0ouknl48923ce1gh2b9edpk.apps.googleusercontent.com">
    <React.StrictMode>
      <UserProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </UserProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
