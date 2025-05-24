import api from '../../services/apis';

/**
 * Xóa hồ sơ theo userId.
 * @param userId ID người dùng cần xóa hồ sơ
 * @returns Promise trả về kết quả xóa
 * @permission Yêu cầu header x-admin: true
 */
export const deleteProfile = async (userId: number) => {
  return await api.delete(`/profiles/${userId}`, {}, { isAdmin: true });
};
