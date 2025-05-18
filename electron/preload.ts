import { contextBridge, ipcRenderer } from 'electron';

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'electron',
  {
    ipcRenderer: {
      send: (channel: string, data: any) => {
        // whitelist channels
        let validChannels = ['window-control', 'window-state-changed'];
        if (validChannels.includes(channel)) {
          ipcRenderer.send(channel, data);
        }
      },
      on: (channel: string, func: Function) => {
        let validChannels = ['window-state-changed'];
        if (validChannels.includes(channel)) {
          // Deliberately strip event as it includes `sender` 
          ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
      }
    },
    shell: {
      openExternal: (url: string) => {
        ipcRenderer.send('open-external', url);
      }
    }
  }
); 