import { ProfileApis, UserApis, DeviceApis } from '../apis';
import deviceService from './deviceService';
const handleUserFirstConnect = async (dataDecode: any, userInfo: any) => {
  console.log(dataDecode);

  try {
    const res = await UserApis.checkUser(dataDecode.email);

    if (res.status === 200) {
      userInfo = {
        ...res.data,
        picture: dataDecode.picture,
      };
      const resProfile = await ProfileApis.getProfileByUserId(
        parseInt(res.data.id)
      );
      if (resProfile.status === 200) {
        userInfo = {
          ...userInfo,
          fullName: resProfile.data.fullName || '',
          phone: resProfile.data.phone || '',
          CCCD: resProfile.data.CCCD || '',
        };
      } else {
        if (resProfile.status === 404) {
          console.log('notProfile');
        }
      }
    } else {
      const createRes = await UserApis.createUser({
        email: dataDecode.email,
        name: dataDecode.name,
      });
      console.log('createUser: ', createRes);

      if (createRes.status === 200) {
        console.log('User created:', createRes.data);
        userInfo = {
          ...createRes.data,
          picture: dataDecode.picture,
        };
      } else {
        console.error('Error creating user:', createRes);
      }
    }
    userInfo = {
      ...userInfo,
      IDDevices: [],
    };
    userInfo = await deviceService.handleUserFirstConnect(userInfo);
    console.log('userInfo', userInfo);
    return userInfo;
  } catch (err) {
    console.error('Lỗi khi gọi API:', err);
  }
};

const userService = {
  handleUserFirstConnect,
};

export default userService;
