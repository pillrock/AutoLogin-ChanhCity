import api from '../../services/apis';

/**
 * Tạo vai trò mới.
 * @param name Tên vai trò
 * @returns Promise trả về vai trò vừa tạo
 * @permission Yêu cầu header x-admin: true
 */
export const createRole = async (name: string) => {
  return await api.post('/roles', { name }, { isAdmin: true });
};
