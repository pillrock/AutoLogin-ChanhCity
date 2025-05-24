import api from '../../services/apis';
/**
 * Gán vai trò cho profile.
 * @param email Email user
 * @param roleId ID vai trò
 * @returns Promise trả về kết quả gán
 * @permission Chủ sở hữu hoặc Admin
 */
export const assignRoleForProfile = async (email: string, roleId: number) => {
  return await api.post('/roles/assign', { email, roleId }, { isAdmin: true });
};
