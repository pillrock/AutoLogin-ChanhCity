import { contextBridge, ipcRenderer, shell } from 'electron';
import { UserData } from './components/UserProfile';
contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, data: any) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel: string, func: (...args: any[]) => void) => {
      const subscription = (_event: any, ...args: any[]) => {
        const value = args[0];
        func(value);
      };
      ipcRenderer.on(channel, subscription);
      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    invoke: (channel: string, data: any) => {
      return ipcRenderer.invoke(channel, data);
    },
    removeListener: (channel: string, func: (...args: any[]) => void) => {
      ipcRenderer.removeListener(channel, func);
    },
  },
  window: {
    getState: () => {
      ipcRenderer.send('window-get-state');
    },
  },
  shell: {
    openExternal: (url: string) => shell.openExternal(url),
  },
  googleSignIn: () => ipcRenderer.send('google-signin'),
  onGoogleToken: (callback: (token: string) => void) =>
    ipcRenderer.on('google-token', (_event, token) => callback(token)),
  removeUserData: () => {
    ipcRenderer.invoke('remove-user-data');
  },
  checkDataUser: (callback: (data: UserData | null, error?: Error) => void) => {
    ipcRenderer
      .invoke('check-data-user')
      .then((data: UserData | null) => {
        callback(data);
      })
      .catch((error: Error) => {
        console.error('Preload: Error fetching user data:', error);
        callback(null, error);
      });
  },
  openServerFiveM: () => {
    ipcRenderer.send('open-fivem-server');
  },
  updateStorage: (data: Record<string, any>) => {
    return ipcRenderer.invoke('update-storage', data);
  },
});
