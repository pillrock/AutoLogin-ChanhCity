import api from '../../services/apis';
/**
 * Lấy tất cả hướng dẫn.
 * @returns Promise trả về danh sách hướng dẫn
 * @permission Công khai
 */
export const getAllTutorials = async () => {
  return await api.get('/tutorials');
};
