import api from '../../services/apis';

/**
 * Cập nhật bài đăng.
 * @param id ID bài đăng
 * @param data Dữ liệu cập nhật (title, content, type, ...)
 * @returns Promise trả về bài đăng đã cập nhật
 * @permission Chủ sở hữu  (x-admin: true)
 */
export const updatePost = async (
  id: number,
  data: { title: string; content: string; type: string }
) => {
  return await api.put(`/posts/${id}`, data, { isAdmin: true });
};
