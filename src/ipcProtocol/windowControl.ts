export const windowControl = (ipcMain, mainWindow) => {
  ipcMain.on('window-control', (_: any, action: string) => {
    console.log('Received window control:', action);
    switch (action) {
      case 'minimize':
        mainWindow.minimize();
        break;
      case 'maximize':
        if (mainWindow.isMaximized()) {
          mainWindow.unmaximize();
          mainWindow.setSize(800, 700);
          mainWindow.webContents.send('window-state-changed', false);
        } else {
          mainWindow.maximize();
          mainWindow.webContents.send('window-state-changed', true);
        }
        break;
      case 'close':
        mainWindow.close();
        break;
    }
  });
  ipcMain.on('window-get-state', () => {
    const isMaximized = Boolean(mainWindow.isMaximized());
    mainWindow.webContents.send('window-state-changed', isMaximized);
  });

  // Thêm event listener cho sự kiện maximize/unmaximize
  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('window-state-changed', true);
  });

  mainWindow.on('unmaximize', () => {
    mainWindow.webContents.send('window-state-changed', false);
  });
};
