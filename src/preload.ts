// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';
interface UpdateInfo {
  releaseName: string;
  releaseNotes: string;
  releaseDate: string;
  updateURL: string;
}
contextBridge.exposeInMainWorld('electronAPI', {
  openDialog: () => ipcRenderer.invoke('dialog:open'),
  // Lắng nghe sự kiện cập nhật từ main process

  onUpdateDownloaded: (callback: (message: string) => void) => {
    console.log('Listening for update_downloaded');
    ipcRenderer.on('update_downloaded', (_, message) => callback(message));
  },
  onUpdateAvailable: (callback: (event: any, info: UpdateInfo) => void) =>
    ipcRenderer.on('update-available', callback),
  restartApp: () => ipcRenderer.send('restart-app'),
  dismissUpdate: () => ipcRenderer.send('dismiss-update'),
});
