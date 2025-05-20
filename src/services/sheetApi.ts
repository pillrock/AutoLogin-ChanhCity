import { google } from 'googleapis';
import fs from 'node:fs/promises';
import path from 'node:path';

const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');
const TOKEN_PATH = path.join(__dirname, 'token.json');
const SPREADSHEET_ID = '1qNyKttLzcDy3nI_Go5AQb1TXSJmAk09CBrQQc3n7aR4';
const SHEET_NAME = 'Database tools';

async function authorize() {
  const credentials = JSON.parse(await fs.readFile(CREDENTIALS_PATH, 'utf-8'));
  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  );
  const token = JSON.parse(await fs.readFile(TOKEN_PATH, 'utf-8'));
  oAuth2Client.setCredentials(token);
  return oAuth2Client;
}

export async function loginWithSheet(username: string, password: string) {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:G`,
    });
    const rows = res.data.values;
    if (!rows) return { success: false, message: 'No data found.' };
    const user = rows.find(
      (row) =>
        row[0] === username && row[1] === password && row[2] === 'Hoạt động'
    );
    if (user) {
      return {
        success: true,
        user: {
          username: user[0],
          email: user[5],
          isAdmin: user[6] === 'TRUE',
        },
      };
    }
    return {
      success: false,
      message: 'Sai tài khoản hoặc mật khẩu hoặc tài khoản không hoạt động.',
    };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'Đã xảy ra lỗi khi đăng nhập.' };
  }
}

export async function registerWithSheet(user: {
  username: string;
  password: string;
  email: string;
  idMayTinh?: string;
}) {
  try {
    const auth = await authorize();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:A`,
    });
    const usernames = res.data.values?.map((row) => row[0]) || [];
    if (usernames.includes(user.username)) {
      return { success: false, message: 'Tên tài khoản đã tồn tại.' };
    }
    const newRow = [
      user.username,
      user.password,
      'Hoạt động',
      Date.now().toString(),
      user.idMayTinh || '',
      user.email,
      'FALSE',
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A2:G`,
      valueInputOption: 'USER_ENTERED',
      requestBody: { values: [newRow] },
    });
    return {
      success: true,
      user: { username: user.username, email: user.email },
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'Đã xảy ra lỗi khi đăng ký.' };
  }
}
