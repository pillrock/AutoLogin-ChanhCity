import api from '../../services/apis';

export const getProfileRoleById = async (id: number) => {
  return await api.get(`/profile-roles/${id}`, {}, { isAdmin: true });
};
