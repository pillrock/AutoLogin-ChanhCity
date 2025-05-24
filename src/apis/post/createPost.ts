import api from '../../services/apis';

/**
 * Tạo bài đăng mới.
 * @param data Dữ liệu bài đăng (title, content, type, userId, ...)
 * @returns Promise trả về bài đăng vừa tạo
 * @permission Yêu cầu header x-admin
 */
export const createPost = async (data: {
  userId: number;
  title: string;
  content: string;
  type: string;
}) => {
  return await api.post('/posts', data, { isAdmin: true });
};
