import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { autoUpdater } from 'electron-updater';
import fs from 'fs';
import dotenv from 'dotenv';
dotenv.config();
import { updateElectronApp, IUpdateInfo } from 'update-electron-app';
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}
const createAppUpdateConfig = () => {
  const appUpdatePath = path.join(process.resourcesPath, 'app-update.yml');
  if (!fs.existsSync(appUpdatePath)) {
    const content = `
provider: github
owner: ${process.env.GITHUB_OWNER}
repo: ${process.env.GITHUB_REPO}
`.trim();
    fs.writeFileSync(appUpdatePath, content, 'utf8');
  } else {
    console.log(`app-update.yml already exists at ${appUpdatePath}`);
  }
};

const logFile = path.join(app.getPath('userData'), 'update-log.txt');
const log = (message: string) => {
  fs.appendFileSync(logFile, `${new Date().toISOString()} - ${message}\n`);
};
let mainWindow: BrowserWindow | null = null;
const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  log('Checking for updates...');
  autoUpdater.checkForUpdatesAndNotify();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createAppUpdateConfig();
  createWindow();
  autoUpdater.on('update-available', () => {
    log('Update available');
    mainWindow?.webContents.send('update_available');
  });

  autoUpdater.on('update-downloaded', () => {
    log('Update downloaded');
    mainWindow?.webContents.send('update_downloaded', 'Bản cập nhật đã được tải xuống.');
  });

  autoUpdater.on('error', (error) => {
    log(`Update error: ${error.message}`);
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

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.handle('dialog:open', async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'], // hoặc ['openFile'] nếu chọn file
  });
  if (canceled) {
    return null;
  } else {
    return filePaths[0];
  }
});
ipcMain.handle('restart_app', () => {
  autoUpdater.quitAndInstall();
});
