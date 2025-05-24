import api from '../../services/apis';
/**
 * Lấy tất cả vai trò của một profile.
 * @param userId ID user
 * @returns Promise trả về danh sách vai trò
 * @permission Công khai
 */
export const getAllRolesOfProfile = async (userId: number) => {
  return await api.get(`/roles/${userId}`);
};
