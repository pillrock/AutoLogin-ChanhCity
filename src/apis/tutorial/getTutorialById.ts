import api from '../../services/apis';
/**
 * Lấy hướng dẫn theo ID.
 * @param id ID hướng dẫn
 * @returns Promise trả về hướng dẫn
 * @permission Công khai
 */
export const getTutorialById = async (id: number) => {
  return await api.get(`/tutorials/${id}`);
};
