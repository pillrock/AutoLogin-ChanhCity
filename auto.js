const { user32 } = require('win32-api');
const { SW_SHOW, WM_LBUTTONDOWN, WM_LBUTTONUP } = require('win32-def');
const { mouse } = require('@nut-tree-fork/nut-js');
const readline = require('readline');

// Cấu hình
const CLICK_INTERVAL_MS = 3000;

// Biến trạng thái
let windowHandle = null;
let selectedPoint = null;
let windowTitle = null;
let isWaitingForPoint = false;
let clickInterval = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Khai báo các hàm Windows API cần thiết
const { FindWindowA, ShowWindow, GetWindowRect, SendMessageA } = user32;

/**
 * Tìm cửa sổ theo tiêu đề
 * @param {string} title Tiêu đề cửa sổ
 * @returns {number} Handle của cửa sổ (0 nếu không tìm thấy)
 */
async function findWindow(title) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const handle = FindWindowA(null, title);
      resolve(handle || 0);
    }, 0);
  });
}

/**
 * Lấy kích thước và vị trí cửa sổ
 * @param {number} handle Handle cửa sổ
 * @returns {Promise<{left: number, top: number, right: number, bottom: number}>}
 */
async function getWindowRect(handle) {
  const rect = { left: 0, top: 0, right: 0, bottom: 0 };
  const success = GetWindowRect(handle, rect);
  return success ? rect : null;
}

/**
 * Gửi click chuột tới cửa sổ
 * @param {number} handle Handle cửa sổ
 * @param {number} x Tọa độ X (tương đối)
 * @param {number} y Tọa độ Y (tương đối)
 */
function sendClick(handle, x, y) {
  const lParam = (y << 16) | x;
  SendMessageA(handle, WM_LBUTTONDOWN, 0, lParam);
  SendMessageA(handle, WM_LBUTTONUP, 0, lParam);
}

/**
 * Bắt đầu tự động click
 */
function startAutoClicker() {
  if (!windowHandle || !selectedPoint) return;

  console.log(
    `🟢 Bắt đầu click tại (${selectedPoint.x}, ${selectedPoint.y}) mỗi ${CLICK_INTERVAL_MS / 1000} giây`
  );

  stopAutoClicker(); // Dừng nếu đang chạy

  clickInterval = setInterval(() => {
    console.log(`👉 Click tại (${selectedPoint.x}, ${selectedPoint.y})`);
    sendClick(windowHandle, selectedPoint.x, selectedPoint.y);
  }, CLICK_INTERVAL_MS);
}

/**
 * Dừng tự động click
 */
function stopAutoClicker() {
  if (clickInterval) {
    clearInterval(clickInterval);
    clickInterval = null;
    console.log('🔴 Đã dừng tự động click');
  }
}

/**
 * Xử lý đầu vào từ bàn phím
 */
function setupInputHandling() {
  process.stdin.setRawMode(true);
  process.stdin.on('data', async (key) => {
    const keyStr = key.toString().toLowerCase();

    // Thoát chương trình (Ctrl+C)
    if (keyStr === '\u0003') {
      stopAutoClicker();
      console.log('\n👋 Đóng chương trình');
      process.exit();
    }

    // Chốt tọa độ click (phím 1)
    if (keyStr === '1' && isWaitingForPoint && windowHandle) {
      try {
        const mousePos = await mouse.getPosition();
        const windowRect = await getWindowRect(windowHandle);

        if (!windowRect) throw new Error('Không lấy được vị trí cửa sổ');

        selectedPoint = {
          x: mousePos.x - windowRect.left,
          y: mousePos.y - windowRect.top,
        };

        console.log(
          `📍 Đã đặt vị trí click: (${selectedPoint.x}, ${selectedPoint.y})`
        );
        console.log('⌨️ Nhấn "A" để bắt đầu, "S" để dừng');
        isWaitingForPoint = false;
      } catch (error) {
        console.error('❌ Lỗi:', error.message);
      }
    }

    // Bắt đầu (phím A)
    if (keyStr === 'a' && selectedPoint) {
      startAutoClicker();
    }

    // Dừng (phím S)
    if (keyStr === 's') {
      stopAutoClicker();
    }
  });
}

/**
 * Chương trình chính
 */
async function main() {
  console.log('🪟 Tự động hóa click chuột trên cửa sổ');
  console.log('====================================');

  // Bước 1: Nhập tiêu đề cửa sổ
  rl.question('Nhập tiêu đề cửa sổ: ', async (title) => {
    windowTitle = title.trim();

    // Bước 2: Tìm cửa sổ
    console.log(`🔍 Đang tìm cửa sổ "${windowTitle}"...`);
    windowHandle = await findWindow(windowTitle);

    if (!windowHandle) {
      console.log('❌ Không tìm thấy cửa sổ');
      rl.close();
      return;
    }

    console.log(`✅ Đã tìm thấy cửa sổ (Handle: ${windowHandle})`);

    // Bước 3: Hiển thị cửa sổ
    const shown = ShowWindow(windowHandle, SW_SHOW);
    console.log(
      shown ? '🖥️ Đã hiển thị cửa sổ' : '⚠️ Không thể hiển thị cửa sổ'
    );

    // Bước 4: Hướng dẫn chọn vị trí click
    console.log('\n🖱️ Di chuột đến vị trí cần click và nhấn phím "1"');
    isWaitingForPoint = true;
  });

  setupInputHandling();
}

// Khởi chạy
main().catch((err) => {
  console.error('💥 Lỗi nghiêm trọng:', err);
  process.exit(1);
});
