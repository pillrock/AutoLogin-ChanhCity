import { useEffect, useState } from 'react';
import { ProfileApis } from '../apis';
import { useNotification } from '../contexts/NotificationContext';
import { useUser } from '../contexts/UserContext';
export default function FooterHome({
  showBottomBar,
}: {
  showBottomBar: boolean;
}) {
  const [onlineUsers, setOnlineUsers] = useState(
    Math.floor(Math.random() * 201) + 1000
  );
  const [statusValidAcc, setStasusValidAcc] = useState('');
  const { notify } = useNotification();
  const { userDataContext, status } = useUser();
  useEffect(() => {
    window.electron?.checkDataUser(async (locaData) => {
      const profileRes = await ProfileApis.getProfileByUserId(locaData?.id);
      const profile = profileRes?.data || {};
      setStasusValidAcc(profile?.status || '');
    });
  }, [userDataContext]);
  useEffect(() => {
    console.log(
      'THNAH__________________: ',
      userDataContext,
      status,
      statusValidAcc
    );
  }, [userDataContext, statusValidAcc]);

  const handleJoinServer = (e) => {
    if (status != 'nothing') {
      if (statusValidAcc === 'da_xu_ly') {
        e.preventDefault();
        window.electron?.shell.openExternal(
          'fivem://connect/157.66.219.183:30120'
        );
        return;
      }
      notify('TÀI KHOẢN CHƯA XÁC THỰC');
    } else {
      notify('TÀI KHOẢN CHƯA XÁC THỰC');
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        // Tăng hoặc giảm ngẫu nhiên từ -5 đến +5
        let next = prev + Math.floor(Math.random() * 11) - 5;
        // Giới hạn trong khoảng 1000 - 1200
        if (next < 1000) next = 1000;
        if (next > 1200) next = 1200;
        return next;
      });
    }, 1500); // Cập nhật mỗi 1.5 giây

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`absolute bottom-0 left-0 z-20 flex w-full transform items-center justify-between bg-black/30 px-8 pt-2 pb-2 transition-all duration-500 ease-in-out ${showBottomBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
    >
      <div className="text-neon-green shadow-neon-blue flex items-center space-x-2 rounded-full bg-black/40 px-4 py-2 text-base">
        <span className="logo text-green-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              className="fill-green-500"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </span>
        <span className="font-cyber md:text-xs xl:text-lg">
          {onlineUsers} ONLINE
        </span>
      </div>
      <div className="flex flex-col items-end">
        <a
          rel="noopener noreferrer"
          className="group playnow mb-5 flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-[1.2] hover:rotate-[-20deg]"
          onClick={handleJoinServer}
        >
          <span className="font-medium text-gray-400 transition-all md:text-xs xl:text-lg">
            ĐÃ SẴN SÀNG
          </span>
          <span className="font-bold text-white transition-all md:text-xs xl:text-lg">
            CHƠI NGAY
          </span>
        </a>
      </div>
    </div>
  );
}
