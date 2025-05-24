import api from '../../services/apis';

/**
 * Lấy tất cả devices
 * @returns Promise trả về danh sách devices
 */
export const getAllDevices = async () => {
  return await api.get('/devices', { isAdmin: true });
};
