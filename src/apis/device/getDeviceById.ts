import api from '../../services/apis';

/**
 * Lấy device theo ID
 * @param id ID của device cần lấy
 * @returns Promise trả về thông tin device
 */
export const getDeviceById = async (id: number) => {
  return await api.get(`/devices/${id}`, { isAdmin: true });
};
