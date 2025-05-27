import api from '../../services/apis';

export const getProfileRoles = async () => {
  return await api.get('/profile-roles', {}, { isAdmin: true });
};
