import api from '../../services/apis';

export const getRolesByProfile = async (profileId: number) => {
  return await api.get(
    `/profile-roles/profile/${profileId}`,
    {},
    { isAdmin: true }
  );
};
