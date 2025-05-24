import api from '../../services/apis';

/**
 * Tạo hướng dẫn mới.
 * @param data Dữ liệu hướng dẫn (title, content, authorId, ...)
 * @returns Promise trả về hướng dẫn vừa tạo
 * @permission Yêu cầu header x-user-id
 */
export const createTutorial = async (data: {
  title: string;
  content: string;
  authorId: number;
}) => {
  return await api.post('/tutorials', data, { isAdmin: true });
};
