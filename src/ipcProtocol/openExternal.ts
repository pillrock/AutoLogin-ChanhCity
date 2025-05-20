import { ipcMain } from 'electron';
export const openExternal = (shell, dialog) => {
  ipcMain.on('open-external', async (_, url) => {
    try {
      await shell.openExternal(url);
    } catch (error) {
      console.error('Failed to open external link:', error);
      dialog.showErrorBox(
        'Error',
        'Could not open the link in your default browser.'
      );
    }
  });
};
