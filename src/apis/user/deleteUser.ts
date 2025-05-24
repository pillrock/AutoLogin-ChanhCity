import api from '../../services/apis';

/**
 * Xóa thông tin user theo ID.
 * @param id string ID của user cần lấy thông tin
 * @returns Promise trả về dữ liệu user
 */
export const deleteUser = async (id: string) => {
  return await api.delete(`/users/${id}`, {}, { isAdmin: true });
};
