import api from '../../services/apis';

/**
 * Tạo vai trò mới.
 * @param name Tên vai trò
 * @param hexColor màu hex, màu nền
 * @param icon icon
 * @returns Promise trả về vai trò vừa tạo
 * @permission Yêu cầu header x-admin: true
 */
export const createRole = async (
  name: string,
  hexColor: string,
  icon: string
) => {
  return await api.post('/roles', { name, hexColor, icon }, { isAdmin: true });
};
