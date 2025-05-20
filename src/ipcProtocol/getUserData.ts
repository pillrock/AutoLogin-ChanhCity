import { ipcMain } from 'electron';

export const getUserData = (store) => {
  ipcMain.handle('check-data-user', async () => {
    try {
      // Giả sử bạn lấy dữ liệu từ một nguồn (database, file, v.v.)
      const userData = store.get('userData');
      return userData || null;
    } catch (error) {
      console.error('Main: Error fetching user data:', error);
      throw error;
    }
  });
};
