import api from '../../services/apis';

export const deleteProfileRole = async (id: number) => {
  return await api.delete(`/profile-roles/${id}`, {}, { isAdmin: true });
};
