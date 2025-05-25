import api from '../../services/apis';

/**
 * Lấy tất cả users của một device
 * @param deviceId ID của device
 * @returns Promise trả về danh sách users
 */
export const getUsersByDevice = async (deviceId: number) => {
  return await api.get(`/users-devices/device/${deviceId}`, {});
};
