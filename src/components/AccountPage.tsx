import React, { useState, useEffect, useCallback } from 'react';
import { BadgeCheck, CircleAlert, Crown, Send } from 'lucide-react';
import { ProfileApis, Profiles_Roles_apis } from '../apis';
import { useNotification } from '../contexts/NotificationContext';
interface AccountProps {
  onLogout: () => void;
  onUpdateName: (name: string) => void;
  onSendProfile: () => void;
  onClose: () => void;
}

const AccountPage: React.FC<AccountProps> = ({ onSendProfile }) => {
  const [tagsRole, setTagsRole] = useState<any[]>([]);
  const [dataUser, setDataUser] = useState<any>(null);
  const [dataProfile, setDataProfile] = useState({
    fullName: '',
    phone: '',
    CCCD: '',
    userId: '',
  });

  const { notify } = useNotification();
  useEffect(() => {
    // 1. Lấy dữ liệu từ local (có sẵn ID)
    window.electron.checkDataUser(async (localData: any) => {
      if (!localData?.id) return;

      try {
        // 2. Gọi API server để lấy profile theo ID
        const profileRes = await ProfileApis.getProfileByUserId(localData.id);
        const profile = profileRes?.data || {};
        console.log('Profile từ server:', profile);

        // GỌI API lấy TAGROLE
        const tagsRoleRes = await Profiles_Roles_apis.getRolesByProfile(
          profile.id
        );
        const tagsRole = tagsRoleRes?.data || [];
        setTagsRole(tagsRole);

        // 3. Cập nhật lại local storage
        await window.electron.updateStorage({
          fullName: profile.fullName || '',
          phone: profile.phone || '',
          CCCD: profile.CCCD || '',
          status: profile.status || '',
        });

        // 4. Gộp dữ liệu lại vào `dataUser` (ưu tiên thông tin từ server)
        const updatedUser = {
          ...localData,
          fullName: profile.fullName || '',
          phone: profile.phone || '',
          CCCD: profile.CCCD || '',
          status: profile.status || '',
        };

        setDataUser(updatedUser);

        // 5. Set `dataProfile` để hiển thị lên input
        setDataProfile({
          fullName: profile.fullName || '',
          phone: profile.phone || '',
          CCCD: profile.CCCD || '',
          userId: localData.id || '',
        });
      } catch (err) {
        console.error('Lỗi lấy profile:', err);
      }
    });
  }, []);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataProfile({ ...dataProfile, [e.target.name]: e.target.value });
  };
  const handleSaveProfile = useCallback(
    async (e) => {
      e.preventDefault();
      const localData = {
        fullName: dataUser?.fullName || '',
        phone: dataUser?.phone || '',
        CCCD: dataUser?.CCCD || '',
      };

      if (localData?.fullName || localData?.CCCD || localData?.phone) {
        if (
          dataProfile?.fullName == localData?.fullName &&
          dataProfile?.CCCD == localData?.CCCD &&
          dataProfile?.phone == localData?.phone
        ) {
          return notify('THÀNH CÔNG');
        }
        const res = await ProfileApis.updateProfile(dataUser?.id, {
          fullName: dataProfile.fullName,
          phone: dataProfile.phone,
          CCCD: dataProfile.CCCD,
        });
        console.log('Cập nhật thành công', res);

        if (res.status === 200) {
          // await window.electron?.updateStorage({
          //   fullName: dataProfile.fullName,
          //   CCCD: dataProfile.CCCD,
          //   phone: dataProfile.phone,
          // });
          notify('THÀNH CÔNG');
        } else {
          notify('THẤT BẠI, MÃ LỖI: #CPN-ACC-079');
        }
        return;
      }

      const res = await ProfileApis.createProfile({
        ...dataProfile,
        userId: parseInt(dataProfile.userId),
      });
      console.log(res);
      if (res.status === 200) {
        // noti
        //update storage
        await window.electron?.updateStorage({
          fullName: dataProfile.fullName,
          CCCD: dataProfile.CCCD,
          phone: dataProfile.phone,
        });
        notify('THÀNH CÔNG');
      } else {
        notify('THẤT BẠI, MÃ LỖI: #CPN-ACC-099');
      }

      // await ProfileApis.createProfile({});
    },
    [dataProfile]
  );

  const [showModal, setShowModal] = useState(false);
  console.log(dataUser);

  useEffect(() => {
    setShowModal(true);
  }, []);

  // Danh hiệu mẫu, màu đơn giản, quyền lực cao màu đậm hơn
  // const badges = [
  //   {
  //     label: 'CHỦ TỊCH NƯỚC',
  //     color: 'bg-red-700 text-white',
  //     icon: <Crown className="mr-1 inline" />,
  //   },
  //   {
  //     label: 'THỦ TƯỚNG',
  //     color: 'bg-blue-700 text-white',
  //     icon: <FaUserSecret className="mr-1 inline" />,
  //   },
  //   {
  //     label: 'DEV',
  //     color: 'bg-black text-[#00f0ff]',
  //     icon: <FaUserEdit className="mr-1 inline" />,
  //   },
  //   {
  //     label: 'DESIGN',
  //     color: 'bg-yellow-300 text-yellow-900',
  //     icon: <FaPaintBrush className="mr-1 inline" />,
  //   },
  //   {
  //     label: 'NGƯỜI KỂ CHUYỆN',
  //     color: 'bg-purple-700 text-white',
  //     icon: <FaBookOpen className="mr-1 inline" />,
  //   },
  //   {
  //     label: 'CÔNG DÂN',
  //     color: 'bg-green-600 text-white',
  //     icon: <FaUserTie className="mr-1 inline" />,
  //   },
  // ];
  // console.log(dataUser);

  return (
    <div className="flex w-full items-center justify-center backdrop-blur-md">
      <div
        className={`font-cyber relative mx-4 w-full transform overflow-hidden backdrop-blur-md transition-all duration-300 ${
          showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-6">
          {/* Avatar and Name */}
          <div className="flex items-center gap-x-6">
            <div className="mb-4 flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-cyan-500/50 bg-cyan-950">
              <img
                src={dataUser?.picture}
                alt="avatar"
                className="h-24 w-24 rounded-full object-cover"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="mb-2 text-left">
                <div className="group flex items-center gap-x-2">
                  <h2 className="text-xl font-bold text-cyan-100">
                    {dataUser?.name.toUpperCase()}
                  </h2>
                </div>
              </div>
              {/* Badge xác thực và các danh hiệu liền nhau */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`flex h-min w-max items-center gap-1 rounded-full px-3 py-1 font-semibold md:text-[10px] xl:text-xs ${
                    dataUser?.status == 'da_xu_ly'
                      ? 'bg-green-600 text-white'
                      : 'bg-yellow-600 text-yellow-200'
                  }`}
                >
                  {dataUser?.status == 'da_xu_ly' ? (
                    <>
                      <BadgeCheck
                        size={19}
                        className="mr-1 inline text-white"
                      />
                      ĐÃ XÁC THỰC
                    </>
                  ) : (
                    <>
                      <CircleAlert
                        size={19}
                        className="mr-1 inline text-yellow-200"
                      />
                      CHƯA XÁC THỰC
                    </>
                  )}
                </span>
                {tagsRole.map((badge) => (
                  <span
                    key={badge?.label}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 font-semibold shadow md:text-[10px] xl:text-xs ${badge.color}`}
                  >
                    {badge?.icon}
                    {badge?.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Info Fields */}
          <form onSubmit={handleSaveProfile} method="post">
            <div className="mt-4 mb-6 grid gap-4 text-xs">
              <Field label="EMAIL" value={dataUser?.email} />
              <div className="rounded border border-cyan-800/30 p-3">
                <label className="mb-1 block text-xs font-semibold text-cyan-400">
                  ID THIẾT BỊ
                </label>
                {dataUser?.IDDevices &&
                  dataUser?.IDDevices.map((IDDevice: string) => (
                    <input
                      key={IDDevice}
                      type="text"
                      value={IDDevice || ''}
                      readOnly
                      className="w-full border-none bg-transparent py-1 text-sm text-cyan-100 outline-none select-text placeholder:text-xs"
                    />
                  ))}
              </div>
              <Field
                label="SỐ CCCD"
                value={dataProfile?.CCCD}
                name="CCCD"
                read={dataUser?.status == 'da_xu_ly' ? true : false}
                handleChangeInput={handleChangeInput}
              />
              <Field
                label="HỌ VÀ TÊN"
                value={dataProfile?.fullName}
                name="fullName"
                read={dataUser?.status == 'da_xu_ly' ? true : false}
                handleChangeInput={handleChangeInput}
              />
              <Field
                label="SỐ ĐIỆN THOẠI"
                value={dataProfile?.phone}
                read={dataUser?.status == 'da_xu_ly' ? true : false}
                name="phone"
                handleChangeInput={handleChangeInput}
              />
            </div>

            {/* Divider */}
            <div className="mb-6 h-px bg-cyan-900/40"></div>

            {/* Actions */}
            {!(dataUser?.status == 'da_xu_ly') && (
              <div className="grid gap-3">
                {!dataUser?.isVerified && (
                  <button
                    type="submit"
                    onClick={onSendProfile}
                    className="flex w-full items-center justify-center gap-2 rounded bg-gradient-to-r from-transparent via-[#00c6d4] to-transparent px-4 py-2 font-semibold text-white opacity-90 transition-all hover:opacity-100"
                  >
                    <span className="text-xs">GỬI HỒ SƠ XÁC THỰC</span>
                  </button>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  value,
  name,
  read = false,
  handleChangeInput,
}: {
  label: string;
  value: string;
  name?: string;
  read?: boolean;
  handleChangeInput?: (e: any) => void;
}) => (
  <div className="rounded border border-cyan-800/30 p-3">
    <label className="mb-1 block text-xs font-semibold text-cyan-400">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value || ''}
      onChange={handleChangeInput}
      readOnly={read}
      required={!!handleChangeInput}
      className="w-full border-none bg-transparent py-1 text-sm text-cyan-100 outline-none select-text placeholder:text-xs"
      placeholder="CHƯA CẬP NHẬT"
    />
  </div>
);

export default AccountPage;
