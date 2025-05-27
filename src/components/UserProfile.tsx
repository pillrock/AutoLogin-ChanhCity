import { useState, useEffect } from 'react';
import { User2Icon } from 'lucide-react';
import AccountPage from './AccountPage';
import { useUser } from '../contexts/UserContext';

export interface UserData {
  name: string;
  email: string;
  picture: string;
  deviceId?: string;
  cccd?: string;
  isVerified?: boolean;
}
export const UserProfile = ({ setActiveTab, handleTabChange }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const { userDataContext, login, logout } = useUser();
  useEffect(() => {
    window.electron?.onGoogleToken((token: any) => {
      setUserData(token);
      // Gửi token lên server, hoặc decode ID token nếu cần
    });
  }, []);
  useEffect(() => {
    window.electron.checkDataUser((data: UserData) => {
      if (data) {
        setUserData(data);
      } else {
        setUserData(null);
      }
    });
  }, []);
  useEffect(() => {
    login(userData);
  }, [userData]);
  // Dummy data bổ sung cho demo (bạn thay bằng dữ liệu thực tế)
  const fullUserData = {
    ...userData,
    deviceId: 'ABC123456',
    cccd: '012345678901',
    isVerified: false,
  };

  return (
    <div className="relative ml-[1rem]">
      {!userData ? (
        <span className="group flex aspect-square cursor-pointer items-center rounded-full border-[1px] border-gray-300 px-2 py-1">
          <User2Icon size={19} />
          {/* MODAL */}
          <div className="absolute top-[30%] right-0 h-[5rem] w-[10rem] translate-y-0 rounded-xl bg-black/20 opacity-0 transition-all delay-100 duration-200 group-hover:pointer-events-auto group-hover:translate-y-6 group-hover:opacity-100">
            <button
              className="relative flex cursor-pointer items-center gap-x-2 p-3"
              onClick={() => window.electron?.googleSignIn()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 32 32"
                data-name="Layer 1"
                id="Layer_1"
              >
                <path
                  d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16"
                  fill="#00ac47"
                />
                <path
                  d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16"
                  fill="#4285f4"
                />
                <path
                  d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z"
                  fill="#ffba00"
                />
                <polygon
                  fill="#2ab2db"
                  points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"
                />
                <path
                  d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z"
                  fill="#ea4435"
                />
                <polygon
                  fill="#2ab2db"
                  points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"
                />
                <path
                  d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z"
                  fill="#4285f4"
                />
              </svg>
              <p className="text-xs font-semibold">Đăng nhập với Google</p>
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full" />
            </button>
          </div>
        </span>
      ) : (
        <div className="flex items-center gap-x-2">
          <div className="flex flex-col justify-end border-r-[1px] border-gray-300 px-2">
            <p className="text-xs font-semibold">
              {userData.name.toUpperCase()}
            </p>
            <p className="text-xs">Level 1</p>
          </div>
          <div className="group relative">
            <img
              src={userData.picture}
              alt="avt"
              width={35}
              height={35}
              className="aspect-square rounded-full"
            />
            <div className="absolute top-[30%] right-0 h-[5rem] w-[10rem] translate-y-0 rounded-xl bg-black/20 opacity-0 transition-all delay-100 duration-200 group-hover:pointer-events-auto group-hover:translate-y-6 group-hover:opacity-100">
              <button
                className="group/button relative flex w-full cursor-pointer items-center gap-x-2 p-3"
                onClick={() => {
                  setActiveTab('TÀI KHOẢN');
                  handleTabChange('TÀI KHOẢN');
                }}
              >
                <p className="text-[10px] font-semibold text-gray-300 group-hover/button:text-white">
                  TÀI KHOẢN
                </p>
                <span className="bg-neon-blue absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover/button:w-full" />
              </button>
              {userDataContext?.isAdmin && (
                <button
                  className="group/button relative flex w-full cursor-pointer items-center gap-x-2 p-3"
                  onClick={() => {
                    setActiveTab('ADMIN');
                    handleTabChange('ADMIN');
                  }}
                >
                  <p className="text-[10px] font-semibold text-gray-300 group-hover/button:text-white">
                    ADMIN
                  </p>
                  <span className="bg-neon-blue absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover/button:w-full" />
                </button>
              )}
              <button
                onClick={() => {
                  setUserData(null);
                  window.electron.ipcRenderer.invoke('remove-user-data');
                  logout();
                }}
                className="group/button relative flex w-full cursor-pointer items-center gap-x-2 p-3"
              >
                <p className="text-[10px] font-semibold text-gray-300 group-hover/button:text-white">
                  ĐĂNG XUẤT
                </p>
                <span className="bg-neon-blue absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-300 group-hover/button:w-full" />
              </button>
            </div>
          </div>
          {/* Modal AccountPage */}
          {showAccountModal && (
            <h1>c</h1>
            // <div
            //   className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md transition-all"
            //   onClick={() => setShowAccountModal(false)}
            // >
            //   <div
            //     onClick={(e) => e.stopPropagation()}
            //     className="h-[40%] w-[60%]"
            //   >
            //     <AccountPage
            //       user={fullUserData}
            //       onLogout={() => {
            //         setUserData(null);
            //         setShowAccountModal(false);
            //         window.electron.ipcRenderer.invoke('remove-user-data');
            //       }}
            //       onUpdateName={(name) => {
            //         setUserData((prev) => (prev ? { ...prev, name } : prev));
            //       }}
            //       onSendProfile={() => {
            //         // Xử lý gửi hồ sơ xác thực
            //       }}
            //       onClose={() => setShowAccountModal(false)}
            //     />
            //   </div>
            //   {/* <div
            //     className="relative"
            //     onClick={(e) => e.stopPropagation()} // Ngăn click vào modal bị tắt
            //   >
            //     <AccountPage
            //       user={fullUserData}
            //       onLogout={() => {
            //         setUserData(null);
            //         setShowAccountModal(false);
            //         window.electron.ipcRenderer.invoke('remove-user-data');
            //       }}
            //       onUpdateName={(name) => {
            //         setUserData((prev) => (prev ? { ...prev, name } : prev));
            //       }}
            //       onSendProfile={() => {
            //         // Xử lý gửi hồ sơ xác thực
            //       }}
            //       onClose={() => setShowAccountModal(false)}
            //     />
            //   </div> */}
            // </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
