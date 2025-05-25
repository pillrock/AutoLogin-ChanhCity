import api from '../../services/apis';

/**
 * Lấy tất cả quan hệ user-device
 * @returns Promise trả về danh sách quan hệ
 */
export const getUserDevices = async () => {
  return await api.get('/users-devices', { isAdmin: true });
};
