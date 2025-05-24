import api from '../../services/apis';

/**
 * Cập nhật thông tin User
 * @param data Gồn dữ liệu cần cập nhật, trong đó trường id là bắt buộc
 * @returns Promise trả về dữ liệu user
 */
export const updateUser = async (data: {
  id: string;
  email: string;
  password: string;
  name: string;
}) => {
  return await api.put(`/users/${data.id}`, data, { isAdmin: true });
};
