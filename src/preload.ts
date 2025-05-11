// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Mở hộp thoại
  openDialog: () => ipcRenderer.invoke('dialog:open'),

  // Lắng nghe sự kiện 'update_available'
  onUpdateAvailable: (callback: (message: string) => void) => {
    ipcRenderer.on('update_available', (_, message) => callback(message));
  },

  // Lắng nghe sự kiện 'update_downloaded'
  onUpdateDownloaded: (callback: (message: string) => void) => {
    ipcRenderer.on('update_downloaded', (_, message) => callback(message));
  },
});
