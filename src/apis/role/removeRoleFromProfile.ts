import api from '../../services/apis';
/**
 * Xóa vai trò khỏi profile.
 * @param email Email user
 * @param roleId ID vai trò
 * @returns Promise trả về kết quả xóa
 * @permission Chủ sở hữu hoặc Admin
 */
export const removeRoleFromProfile = async (email: string, roleId: number) => {
  return await api.post('/roles/remove', { email, roleId }, { isAdmin: true });
};
