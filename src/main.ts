import {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  nativeImage,
  shell,
} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { updateElectronApp } from 'update-electron-app';
import Store from 'electron-store';

import { windowControl } from './ipcProtocol/windowControl';
import { openExternal } from './ipcProtocol/openExternal';
import { googleSignin } from './ipcProtocol/googleSignin';
import { getUserData } from './ipcProtocol/getUserData';
import { exec } from 'child_process';
import { updateStorage } from './ipcProtocol/updateStorage';

const store = new Store();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
updateElectronApp({
  repo: 'pillrock/VietNam-Legacy',
  updateInterval: '1 hour', // Kiểm tra cập nhật mỗi giờ
});

const BASE_PATH = app.isPackaged
  ? path.join(process.cwd(), './src/assets')
  : path.join(process.cwd(), './src/assets');

// Xác định file icon dựa trên hệ điều hành
let iconPath: string;
if (process.platform === 'win32') {
  iconPath = path.join(BASE_PATH, 'images/logo.ico');
} else if (process.platform === 'darwin') {
  iconPath = path.join(BASE_PATH, 'images/logo.icns');
} else {
  iconPath = path.join(BASE_PATH, 'images/logo.png');
}
let mainWindow: BrowserWindow | null = null;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,

    height: 700,
    resizable: false,
    maximizable: false,
    fullscreen: false,
    icon: iconPath,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false,
    },
    frame: false,
    transparent: true,
  });

  // Không cho resize
  mainWindow.setResizable(false);
  // Mở full màn hình ngay từ đầu
  mainWindow.maximize();
  mainWindow.setFullScreenable(false);

  // Gửi trạng thái ban đầu ngay sau khi tạo cửa sổ
  mainWindow.webContents.on('did-finish-load', () => {
    const isMaximized = Boolean(mainWindow.isMaximized());
    mainWindow.webContents.send('window-state-changed', isMaximized);
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Chỉ mở DevTools trong môi trường development
  if (process.env.ENV_MODE == 'dev') {
    if (!app.isPackaged) mainWindow.webContents.openDevTools();
  }

  // Window controls
  windowControl(ipcMain, mainWindow);
  // Window state handlers

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });

  // Handle external links
  openExternal(shell, dialog);
  googleSignin(mainWindow, store);
  getUserData(store);
  ipcMain.handle('remove-user-data', () => {
    store.delete('userData');
  });
  updateStorage(store);
  ipcMain.on('open-fivem-server', () => {
    exec('start "" "fivem://connect/g35qox"');
    console.log('Opening FiveM server...');
  });
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
