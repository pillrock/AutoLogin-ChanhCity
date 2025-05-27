import api from '../../services/apis';

export const createProfileRole = async (data: {
  profileId: number;
  roleId: number;
}) => {
  return await api.post('/profile-roles', data, { isAdmin: true });
};
