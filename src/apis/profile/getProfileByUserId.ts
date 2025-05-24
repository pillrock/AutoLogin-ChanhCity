import api from '../../services/apis';

/**
 * Lấy hồ sơ theo userId.
 * @param userId ID người dùng cần lấy hồ sơ
 * @returns Promise trả về dữ liệu hồ sơ
 * @permission Công khai
 */
export const getProfileByUserId = async (userId: number) => {
  return await api.get(`/profiles/${userId}`);
};
