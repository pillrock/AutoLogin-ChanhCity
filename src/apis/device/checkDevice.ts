import api from '../../services/apis';

/**
 * Kiểm tra device theo IDDevice
 * @param IDDevice Chuỗi IDDevice cần kiểm tra
 * @returns Promise trả về thông tin device nếu tồn tại
 */
export const checkDevice = async (IDDevice: string) => {
  return await api.get(`/devices/check/${IDDevice}`);
};
