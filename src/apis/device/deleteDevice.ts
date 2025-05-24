import api from '../../services/apis';

/**
 * Xóa device
 * @param id ID của device cần xóa
 * @returns Promise trả về thông báo thành công
 */
export const deleteDevice = async (id: number) => {
  return await api.delete(`/devices/${id}`, { isAdmin: true });
};
