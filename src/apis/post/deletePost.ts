import api from '../../services/apis';
/**
 * Xóa bài đăng.
 * @param id ID bài đăng
 * @returns Promise trả về kết quả xóa
 * @permission  Admin
 */
export const deletePost = async (id: number) => {
  return await api.delete(`/posts/${id}`, {}, { isAdmin: true });
};
