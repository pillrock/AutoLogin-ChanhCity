import api from '../../services/apis';

/**
 * Xóa quan hệ user-device
 * @param id ID của quan hệ cần xóa
 * @returns Promise trả về thông báo thành công
 */
export const deleteUserDevice = async (id: number) => {
  return await api.delete(`/users-devices/${id}`, { isAdmin: true });
};
