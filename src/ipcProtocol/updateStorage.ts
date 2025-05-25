import { ipcMain } from 'electron';
import Store from 'electron-store';

export const updateStorage = (store: Store) => {
  ipcMain.handle(
    'update-storage',
    async (_event, data: Record<string, any>) => {
      try {
        Object.entries(data).forEach(([key, value]) => {
          store.set(`userData.${key}`, value);
        });
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      }
    }
  );
};
