import api from '../../services/apis';
/**
 * Xóa hướng dẫn.
 * @param id ID hướng dẫn
 * @returns Promise trả về kết quả xóa
 * @permission Tác giả hoặc Admin
 */
export const deleteTutorial = async (id: number) => {
  return await api.delete(`/tutorials/${id}`, {}, { isAdmin: true });
};
