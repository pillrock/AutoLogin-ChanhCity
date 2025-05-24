import api from '../../services/apis';

/**
 * Tạo hồ sơ mới cho người dùng.
 * @param data Thông tin hồ sơ: { fullName, CCCD, phone, userId }
 * @param userId ID người dùng (dùng cho header x-user-id)
 * @returns Promise trả về dữ liệu hồ sơ vừa tạo
 * @permission Yêu cầu header x-user-id
 */
export const createProfile = async (data: {
  fullName: string;
  CCCD: string;
  phone: string;
  userId: number;
}) => {
  return await api.post('/profiles', data, { userId: data.userId.toString() });
};
