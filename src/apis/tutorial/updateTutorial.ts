import api from '../../services/apis';
/**
 * Cập nhật hướng dẫn.
 * @param id ID hướng dẫn
 * @param data Dữ liệu cập nhật
 * @returns Promise trả về hướng dẫn đã cập nhật
 * @permission Tác giả (x-user-id) hoặc Admin (x-admin: true)
 */
export const updateTutorial = async (
  id: number,
  data: { title: string; content: string }
) => {
  return await api.put(`/tutorials/${id}`, data, { isAdmin: true });
};
