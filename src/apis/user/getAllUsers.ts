import api from '../../services/apis';

/**
 * Lấy tất cả thông tin user.
 * @param id string ID của user cần lấy thông tin
 * @returns Promise trả về dữ liệu user
 */
export const getAllUsers = async () => {
  return await api.get(`/users`, {}, { isAdmin: true });
};
