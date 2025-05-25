import api from '../../services/apis';

/**
 * Cập nhật quan hệ user-device
 * @param id ID của quan hệ cần cập nhật
 * @param data Dữ liệu cập nhật {userId?, deviceId?}
 * @returns Promise trả về quan hệ đã cập nhật
 */
export const updateUserDevice = async (
  id: number,
  data: {
    userId?: number;
    deviceId?: number;
  }
) => {
  return await api.put(`/users-devices/${id}`, data, {});
};
