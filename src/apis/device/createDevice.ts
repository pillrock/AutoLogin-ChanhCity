import api from '../../services/apis';

/**
 * Tạo mới device
 * @param data Gồm IDDevice và userId
 * @returns Promise trả về dữ liệu device vừa tạo
 */
export const createDevice = async (data: {
  IDDevice: string;
  userId: number;
}) => {
  return await api.post('/devices', data, { isAdmin: true });
};
