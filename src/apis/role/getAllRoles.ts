import api from '../../services/apis';
/**
 * Lấy tất cả vai trò.
 * @returns Promise trả về danh sách vai trò
 * @permission Công khai
 */
export const getAllRoles = async () => {
  return await api.get('/roles');
};
