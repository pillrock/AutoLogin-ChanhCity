import api from '../../services/apis';

/**
 * Lấy thông tin user theo ID.
 * @param id string ID của user cần lấy thông tin
 * @returns Promise trả về dữ liệu user
 */
export const getUserById = async (id: string) => {
  return await api.get(`/users/${id}`, {}, { isAdmin: true });
};
