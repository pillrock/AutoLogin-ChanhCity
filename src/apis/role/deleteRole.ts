import api from '../../services/apis';
/**
 * Xóa vai trò.
 * @param id ID vai trò
 * @returns Promise trả về kết quả xóa
 * @permission Yêu cầu header x-admin: true
 */
export const deleteRole = async (id: number) => {
  return await api.delete(`/roles/${id}`, undefined, { isAdmin: true });
};
