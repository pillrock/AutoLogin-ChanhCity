import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    send: (channel: string, data: any) => {
      ipcRenderer.send(channel, data);
    },
    on: (channel: string, func: (...args: any[]) => void) => {
      const subscription = (_event: any, ...args: any[]) => {
        console.log('Preload received event:', channel, args);
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
    }
  },
  window: {
    getState: () => {
      console.log('Preload: Requesting window state');
      ipcRenderer.send('window-get-state');
    }
  }
});
