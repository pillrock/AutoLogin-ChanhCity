import api from '../../services/apis';

export const updateProfileRole = async (
  id: number,
  data: { profileId: number; roleId: number }
) => {
  return await api.put(`/profile-roles/${id}`, data, { isAdmin: true });
};
