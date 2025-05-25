import api from '../../services/apis';

/**
 * Lấy danh sách devices của một user
 * @param userId ID của user
 * @returns Promise trả về danh sách devices của user
 */
export const getDevicesByUserId = async (userId: number) => {
  return await api.get(`/devices/user/${userId}`, { isAdmin: true });
};
