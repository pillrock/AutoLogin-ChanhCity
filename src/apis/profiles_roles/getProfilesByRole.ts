import api from '../../services/apis';

export const getProfilesByRole = async (roleId: number) => {
  return await api.get(`/profile-roles/role/${roleId}`, {}, { isAdmin: true });
};
