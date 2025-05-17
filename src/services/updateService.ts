import { ipcRenderer } from 'electron';

class UpdateService {
  async checkForUpdates(): Promise<boolean> {
    return ipcRenderer.invoke('check-for-updates');
  }

  async downloadUpdate(): Promise<void> {
    return ipcRenderer.invoke('download-update');
  }

  async installUpdate(): Promise<void> {
    return ipcRenderer.invoke('install-update');
  }

  onUpdateAvailable(callback: (info: any) => void): void {
    ipcRenderer.on('update-available', (_, info) => callback(info));
  }

  onUpdateDownloaded(callback: (info: any) => void): void {
    ipcRenderer.on('update-downloaded', (_, info) => callback(info));
  }

  onUpdateError(callback: (error: Error) => void): void {
    ipcRenderer.on('update-error', (_, error) => callback(error));
  }
}

export const updateService = new UpdateService(); 