import api from '../../services/apis';

/**
 * Kiểm tra thông tin user theo email và idDevice.
 * @param email Email của user cần kiểm tra
 * @param idDevice ID thiết bị của user
 * @returns Promise trả về dữ liệu user nếu tồn tại
 */
export const checkUser = async (email?: string, idDevice?: string) => {
  return await api.get('/users/check', { email, IDDevice: idDevice });
};
