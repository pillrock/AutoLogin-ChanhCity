import env from '../../env.json';
const clientId = env.googleClientId || '';
const clientSecret = env.googleClientSecret || '';
const redirectUri = 'http://localhost:2409';

import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { BrowserWindow, ipcMain } from 'electron';
export const googleSignin = (mainWindow: BrowserWindow, store, env) => {
  ipcMain.on('google-signin', async () => {
    const authWin = new BrowserWindow({
      width: 500,
      height: 600,
      webPreferences: { nodeIntegration: false },
    });

    const authUrl = `https://accounts.google.com/o/oauth2/auth/oauthchooseaccoun?client_id=${clientId}&response_type=code&redirect_uri=${redirectUri}&scope=openid%20email%20profile&access_type=offline&prompt=consent`;
    authWin.loadURL(authUrl);

    authWin.webContents.on('will-redirect', async (event, newUrl) => {
      if (newUrl.startsWith(redirectUri)) {
        const urlObj = new URL(newUrl);
        const code = urlObj.searchParams.get('code');

        if (code) {
          authWin.close();

          try {
            // Đổi code lấy access_token + id_token
            const tokenResponse = await axios.post(
              'https://oauth2.googleapis.com/token',
              null,
              {
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                params: {
                  code,
                  client_id: clientId,
                  client_secret: clientSecret,
                  redirect_uri: redirectUri,
                  grant_type: 'authorization_code',
                },
              }
            );

            const tokenData = tokenResponse.data;

            const dataDecode: any = jwtDecode(tokenData.id_token);

            const userInfo = {
              name: dataDecode.name,
              picture: dataDecode.picture,
              email: dataDecode.email,
            };

            // lưu trứ vào bộ nhớ electron
            store.set('userData', userInfo);
            console.log('Du lieu', dataDecode);
            // Gửi về frontend nếu cần:
            mainWindow.webContents.send('google-token', userInfo);
          } catch (err) {
            console.error(
              'Lỗi khi lấy token từ Google:',
              err.response?.data || err.message
            );
          }
        }
      }
    });
  });
};
