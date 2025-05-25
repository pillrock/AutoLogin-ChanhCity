//  USER API
import { checkUser } from './user/checkUser';
import { getAllUsers } from './user/getAllUsers';
import { deleteUser } from './user/deleteUser';
import { updateUser } from './user/updateUser';
import { createUser } from './user/createUser';
import { getUserById } from './user/getUserById';

// PROFILE API
import { createProfile } from './profile/createProfile';
import { deleteProfile } from './profile/deleteProfile';
import { getProfileByUserId } from './profile/getProfileByUserId';
import { updateProfile } from './profile/updateProfile';

// ROLE API
import { createRole } from './role/createRole';
import { getAllRoles } from './role/getAllRoles';
import { getAllRolesOfProfile } from './role/getAllRolesOfProfile';
import { assignRoleForProfile } from './role/assignRoleForProfile';
import { removeRoleFromProfile } from './role/removeRoleFromProfile';
import { deleteRole } from './role/deleteRole';

// POST API
import { createPost } from './post/createPost';
import { deletePost } from './post/deletePost';
import { getAllPosts } from './post/getAllPosts';
import { getPostById } from './post/getPostById';
import { updatePost } from './post/updatePost';

// TUTORIAL API
import { createTutorial } from './tutorial/createTutorial';
import { getTutorialById } from './tutorial/getTutorialById';
import { getAllTutorials } from './tutorial/getAllTutorials';
import { updateTutorial } from './tutorial/updateTutorial';
import { deleteTutorial } from './tutorial/deleteTutorial';

// DEVICE API
import { createDevice } from './device/createDevice';
import { getAllDevices } from './device/getAllDevices';
import { getDeviceById } from './device/getDeviceById';
import { getDevicesByUserId } from './device/getDevicesByUser';
import { deleteDevice } from './device/deleteDevice';
import { checkDevice } from './device/checkDevice';

// USER_DEVICES API
import { createUserDevice } from './users_devices/createUserDevice';
import { deleteUserDevice } from './users_devices/deleteUserDevice';
import { getDevicesByUser } from './users_devices/getDevicesByUser';
import { getUserDeviceById } from './users_devices/getUserDeviceById';
import { getUserDevices } from './users_devices/getUserDevices';
import { getUsersByDevice } from './users_devices/getUsersByDevice';
import { updateUserDevice } from './users_devices/updateUserDevice';

export const Users_Devices_apis = {
  createUserDevice,
  deleteUserDevice,
  getDevicesByUser,
  getUserDeviceById,
  getUserDevices,
  getUsersByDevice,
  updateUserDevice,
};
export const DeviceApis = {
  createDevice,
  getAllDevices,
  getDeviceById,
  getDevicesByUserId,
  deleteDevice,
  checkDevice,
};
export const UserApis = {
  checkUser,
  getAllUsers,
  deleteUser,
  updateUser,
  createUser,
  getUserById,
};

export const ProfileApis = {
  createProfile,
  deleteProfile,
  getProfileByUserId,
  updateProfile,
};
export const RoleApis = {
  createRole,
  getAllRoles,
  getAllRolesOfProfile,
  assignRoleForProfile,
  removeRoleFromProfile,
  deleteRole,
};
export const PostApis = {
  createPost,
  deletePost,
  getAllPosts,
  getPostById,
  updatePost,
};
export const TutorialApis = {
  createTutorial,
  getTutorialById,
  getAllTutorials,
  updateTutorial,
  deleteTutorial,
};
