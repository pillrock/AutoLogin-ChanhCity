import { machineIdSync } from 'node-machine-id';
import { DeviceApis, Users_Devices_apis } from '../apis';

type dataDevice = {
  id: number;
  IDDevice: string;
  userId: number;
  createdAt: string;
};
const handleGetDevicesByUser = async (userInfo: any) => {
  let data: dataDevice[] = null;
  const res = await Users_Devices_apis.getDevicesByUser(userInfo.id);
  data = res.data;
  return data;
};

const handleUserFirstConnect = async (userInfo: any) => {
  /// check device
  const checkDeviceRes = await DeviceApis.checkDevice(machineIdSync());
  if (checkDeviceRes.status == 200) {
    console.log('Device exists:', checkDeviceRes.data);
    // so sánh thiết bị của người dùng hiện có và thiết bị mới đăng nhập
    const listDevicesOfUser: dataDevice[] =
      await handleGetDevicesByUser(userInfo);
    console.log('listDevicesOfUser: ', listDevicesOfUser);

    if (!(listDevicesOfUser.length === 0)) {
      for (const device of listDevicesOfUser) {
        if (device.id == checkDeviceRes.data.id) {
          console.log('ID THIẾT BỊ TRÙNG NHAU: ', device.IDDevice);
          userInfo = {
            ...userInfo,
            IDDevices: [...userInfo.IDDevices, device.IDDevice],
          };
          break;
        } else {
          await Users_Devices_apis.createUserDevice({
            userId: userInfo.id,
            deviceId: checkDeviceRes.data.id,
          });
          userInfo = {
            ...userInfo,
            IDDevices: listDevicesOfUser
              .map((device) => device)
              .push(checkDeviceRes.data.id),
          };
          break;
        }
      }
    } else {
      await Users_Devices_apis.createUserDevice({
        userId: userInfo.id,
        deviceId: checkDeviceRes.data.id,
      });
      console.log('ĐÃ TẠO ');
      userInfo = {
        ...userInfo,
        IDDevices: [...userInfo.IDDevices, checkDeviceRes.data.IDDevice],
      };
    }
  } else {
    // nếu khong tìm thấy thiết bị mới truy cập thì sẽ tạo thiết bị
    // và gán thiết bị với người dùng
    const createDeviceRes = await DeviceApis.createDevice({
      IDDevice: machineIdSync(),
      userId: userInfo.id,
    });
    await Users_Devices_apis.createUserDevice({
      userId: userInfo.id,
      deviceId: createDeviceRes.data.id,
    });
    console.error('Error checking device:', checkDeviceRes);
    const listDevicesOfUser = await handleGetDevicesByUser(userInfo);
    console.log('list DEVICES: ', listDevicesOfUser);

    userInfo = {
      ...userInfo,
      IDDevices: listDevicesOfUser.map((device) => device.IDDevice),
    };
  }
  return userInfo;
};
const deviceService = { handleUserFirstConnect };
export default deviceService;
