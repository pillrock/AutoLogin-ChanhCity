import api from '../../services/apis';

/**
 * Cập nhật hồ sơ người dùng.
 * @param userId ID người dùng cần cập nhật
 * @param data Thông tin cập nhật: { fullName, CCCD, phone }
 * @param isAdmin Nếu là admin thì truyền true để thêm header x-admin
 * @param xUserId Nếu là chủ sở hữu thì truyền userId để thêm header x-user-id
 * @returns Promise trả về dữ liệu hồ sơ đã cập nhật
 * @permission Chủ sở hữu (x-user-id) hoặc Admin (x-admin: true)
 */
export const updateProfile = async (
  userId: number,
  data: { fullName: string; CCCD: string; phone: string }
) => {
  return await api.put(`/profiles/${userId}`, data, {
    userId: userId.toString(),
  });
};
