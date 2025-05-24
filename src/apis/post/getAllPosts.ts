import api from '../../services/apis';
/**
 * Lấy tất cả bài đăng.
 * @returns Promise trả về danh sách bài đăng
 * @permission Công khai
 */
export const getAllPosts = async () => {
  return await api.get('/posts');
};
