import api from '../../services/apis';

/**
 * Lấy tất cả devices của một user
 * @param userId ID của user
 * @returns Promise trả về danh sách devices
 */
export const getDevicesByUser = async (userId: number) => {
  return await api.get(`/users-devices/user/${userId}`, {});
};
