import React, { useState, useEffect } from 'react';
import {
  FaTimes,
  FaEdit,
  FaCheckCircle,
  FaExclamationCircle,
  FaCrown,
  FaUserTie,
  FaUserSecret,
  FaUserEdit,
  FaPaintBrush,
  FaBookOpen,
} from 'react-icons/fa';

interface AccountProps {
  onLogout: () => void;
  onUpdateName: (name: string) => void;
  onSendProfile: () => void;
  onClose: () => void;
}

const AccountPage: React.FC<AccountProps> = ({
  onLogout,
  onUpdateName,
  onSendProfile,
  onClose,
}) => {
  const [dataUser, setDataUser] = useState<any>(null);
  useEffect(() => {
    window.electron.checkDataUser((data: any) => {
      if (data) {
        setDataUser({
          ...data,
          isVerified: false,
          deviceId: '>>>>>>>>',
          cccd: '>>>>>>>>>>>',
        });
      } else {
        setDataUser(null);
      }
    });
  }, []);
  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(dataUser?.name);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
  }, []);

  const handleSaveName = () => {
    if (nameInput.trim() && nameInput !== dataUser?.name) {
      onUpdateName(nameInput);
    }
    setEditName(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Danh hiệu mẫu, màu đơn giản, quyền lực cao màu đậm hơn
  const badges = [
    {
      label: 'CHỦ TỊCH NƯỚC',
      color: 'bg-red-700 text-white',
      icon: <FaCrown className="mr-1 inline" />,
    },
    {
      label: 'THỦ TƯỚNG',
      color: 'bg-blue-700 text-white',
      icon: <FaUserSecret className="mr-1 inline" />,
    },
    {
      label: 'DEV',
      color: 'bg-black text-[#00f0ff]',
      icon: <FaUserEdit className="mr-1 inline" />,
    },
    {
      label: 'DESIGN',
      color: 'bg-yellow-300 text-yellow-900',
      icon: <FaPaintBrush className="mr-1 inline" />,
    },
    {
      label: 'NGƯỜI KỂ CHUYỆN',
      color: 'bg-purple-700 text-white',
      icon: <FaBookOpen className="mr-1 inline" />,
    },
    {
      label: 'CÔNG DÂN',
      color: 'bg-green-600 text-white',
      icon: <FaUserTie className="mr-1 inline" />,
    },
  ];

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
                {editName ? (
                  <div className="flex items-center">
                    <input
                      className="w-full rounded px-3 py-1 text-lg font-semibold text-cyan-100 ring-1 ring-cyan-500/50 outline-none focus:ring-2 focus:ring-cyan-400"
                      value={nameInput}
                      onChange={(e) => setNameInput(e.target.value)}
                      autoFocus
                      maxLength={32}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleSaveName();
                        if (e.key === 'Escape') {
                          setNameInput(dataUser?.name);
                          setEditName(false);
                        }
                      }}
                    />
                    <div className="ml-3 flex space-x-3">
                      <button
                        className="text-xs text-cyan-400 hover:text-cyan-300"
                        onClick={handleSaveName}
                      >
                        LƯU
                      </button>
                      <button
                        className="text-xs text-gray-400 hover:text-gray-300"
                        onClick={() => {
                          setNameInput(dataUser?.name);
                          setEditName(false);
                        }}
                      >
                        HỦY
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="group flex items-center gap-x-2">
                    <h2 className="text-xl font-bold text-cyan-100">
                      {dataUser?.name}
                    </h2>
                    <button
                      type="button"
                      className="mt-1 text-xs text-cyan-400 hover:text-cyan-300"
                      onClick={() => setEditName(true)}
                    >
                      <span className="flex items-center justify-center gap-1">
                        <FaEdit size={12} />
                        <span>SỬA</span>
                      </span>
                    </button>
                  </div>
                )}
              </div>
              {/* Badge xác thực và các danh hiệu liền nhau */}
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`flex h-min w-max items-center gap-1 rounded-full px-3 py-1 font-semibold md:text-[10px] xl:text-xs ${
                    dataUser?.isVerified
                      ? 'bg-neon-blue/80 text-white'
                      : 'bg-yellow-600/60 text-yellow-200'
                  }`}
                >
                  {dataUser?.isVerified ? (
                    <>
                      <FaCheckCircle className="mr-1 inline text-white" />
                      ĐÃ XÁC THỰC
                    </>
                  ) : (
                    <>
                      <FaExclamationCircle className="mr-1 inline text-yellow-200" />
                      CHƯA XÁC THỰC
                    </>
                  )}
                </span>
                {badges.map((badge) => (
                  <span
                    key={badge.label}
                    className={`flex items-center gap-1 rounded-full px-3 py-1 font-semibold shadow md:text-[10px] xl:text-xs ${badge.color}`}
                  >
                    {badge.icon}
                    {badge.label}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Info Fields */}
          <div className="mt-4 mb-6 grid gap-4 text-xs">
            <Field label="EMAIL" value={dataUser?.email} />
            <Field label="ID THIẾT BỊ" value={dataUser?.deviceId} />
            <Field
              label="SỐ CCCD"
              value={
                dataUser?.cccd || (
                  <span className="text-xs text-gray-400 italic">
                    CHƯA CẬP NHẬT
                  </span>
                )
              }
            />
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-cyan-900/40"></div>

          {/* Actions */}
          <div className="grid gap-3">
            {!dataUser?.isVerified && (
              <button
                onClick={onSendProfile}
                className="flex w-full items-center justify-center gap-2 rounded bg-yellow-600 px-4 py-2 font-semibold text-white opacity-90 transition-all hover:opacity-100"
              >
                <FaExclamationCircle className="text-white" />
                <span className="text-xs">GỬI HỒ SƠ XÁC THỰC</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="rounded border border-cyan-800/30 p-3">
    <label className="mb-1 block text-xs font-semibold text-cyan-400">
      {label}
    </label>
    <div className="text-sm text-cyan-100 select-text">{value}</div>
  </div>
);

export default AccountPage;
