import api from '../../services/apis';

/**
 * Lấy quan hệ user-device theo ID
 * @param id ID của quan hệ
 * @returns Promise trả về thông tin quan hệ
 */
export const getUserDeviceById = async (id: number) => {
  return await api.get(`/users-devices/${id}`, { isAdmin: true });
};
