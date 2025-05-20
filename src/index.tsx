import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const root = createRoot(document.body);
root.render(
  <GoogleOAuthProvider clientId="614557039618-it7j2cv9c0ouknl48923ce1gh2b9edpk.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
