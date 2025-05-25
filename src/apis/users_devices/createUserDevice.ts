import api from '../../services/apis';

/**
 * Tạo quan hệ user-device
 * @param data {userId, deviceId}
 * @returns Promise trả về quan hệ vừa tạo
 */
export const createUserDevice = async (data: {
  userId: number;
  deviceId: number;
}) => {
  return await api.post('/users-devices', data, { isAdmin: true });
};
