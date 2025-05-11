const ffi = require('ffi-napi');
import ref from 'ref-napi';

// Load user32.dll để gọi các hàm WinAPI
const user32 = new ffi.Library('user32', {
  FindWindowA: ['pointer', ['string', 'string']],
  SetForegroundWindow: ['bool', ['pointer']],
  SendMessageA: ['int', ['pointer', 'uint', 'int', 'int']],
});

// Tìm cửa sổ theo tên
const hwnd = user32.FindWindowA(null, 'Tên cửa sổ ứng dụng');
if (!hwnd.isNull()) {
  // Đưa cửa sổ lên foreground
  user32.SetForegroundWindow(hwnd);

  // Gửi một thông điệp click chuột
  const WM_LBUTTONDOWN = 0x0201;
  const WM_LBUTTONUP = 0x0202;
  user32.SendMessageA(hwnd, WM_LBUTTONDOWN, 0, 0);
  user32.SendMessageA(hwnd, WM_LBUTTONUP, 0, 0);
}
