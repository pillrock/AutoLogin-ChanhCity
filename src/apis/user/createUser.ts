import api from '../../services/apis';

/**
 * Tạo user
 * @param data {email, name, idDevice}
 * @returns Promise trả về dữ liệu user
 */
export const createUser = async (data: { email: string; name: string }) => {
  return await api.post('/users', data, { isAdmin: true });
};
