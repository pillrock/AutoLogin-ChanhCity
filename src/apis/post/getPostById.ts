import api from '../../services/apis';
/**
 * Lấy bài đăng theo ID.
 * @param id ID bài đăng
 * @returns Promise trả về bài đăng
 * @permission Công khai
 */
export const getPostById = async (id: number) => {
  return await api.get(`/posts/${id}`);
};
