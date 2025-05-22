import React, { useState, useEffect } from 'react';
import { FaTimes, FaEdit } from 'react-icons/fa';

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
  console.log('Data user:', dataUser);

  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(dataUser?.name);
  const [showModal, setShowModal] = useState(false);

  // Animation for modal entry
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

  return (
    <div className="flex w-full items-center justify-center bg-black/30 backdrop-blur-md">
      <div
        className={`font-cyber relative mx-4 w-full transform overflow-hidden rounded-xl border border-cyan-500/30 bg-black/70 backdrop-blur-md transition-all duration-300 ${
          showModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        <div className="p-6">
          {/* Avatar and Name */}
          <div className="flex flex-col items-center">
            <div className="mb-4 h-24 w-24 overflow-hidden rounded-full border-2 border-cyan-500/50">
              <img
                src={dataUser?.picture}
                alt="avatar"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="mb-2 text-center">
              {editName ? (
                <div>
                  <input
                    className="w-full rounded bg-black/60 px-3 py-1 text-lg font-semibold text-cyan-100 ring-1 ring-cyan-500/50 outline-none focus:ring-2 focus:ring-cyan-400"
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
                  <div className="mt-2 flex justify-center space-x-3">
                    <button
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                      onClick={handleSaveName}
                    >
                      Lưu
                    </button>
                    <button
                      className="text-xs text-gray-400 hover:text-gray-300"
                      onClick={() => {
                        setNameInput(dataUser?.name);
                        setEditName(false);
                      }}
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              ) : (
                <div className="group">
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
                      <span>Sửa</span>
                    </span>
                  </button>
                </div>
              )}
            </div>

            <span
              className={`mb-4 rounded-full px-3 py-1 text-xs font-semibold ${
                dataUser?.isVerified
                  ? 'bg-green-700/60 text-green-200'
                  : 'bg-yellow-600/60 text-yellow-200'
              }`}
            >
              {dataUser?.isVerified ? 'Đã xác thực' : 'Chưa xác thực'}
            </span>
          </div>

          {/* Info Fields */}
          <div className="mt-4 mb-6 grid gap-4">
            <Field label="Email" value={dataUser?.email} />
            <Field label="ID thiết bị" value={dataUser?.deviceId} />
            <Field
              label="Số CCCD"
              value={
                dataUser?.cccd || (
                  <span className="text-gray-400 italic">Chưa cập nhật</span>
                )
              }
            />
          </div>

          {/* Divider */}
          <div className="mb-6 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>

          {/* Actions */}
          <div className="grid gap-3">
            {!dataUser?.isVerified && (
              <button
                onClick={onSendProfile}
                className="w-full rounded bg-gradient-to-r from-yellow-600/80 to-amber-600/80 px-4 py-2 font-semibold text-amber-100 transition-all hover:from-yellow-500/90 hover:to-amber-500/90"
              >
                Gửi hồ sơ xác thực
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Field = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div className="rounded border border-cyan-800/30 bg-black/40 p-3">
    <label className="mb-1 block text-sm font-semibold text-cyan-400">
      {label}
    </label>
    <div className="text-sm text-cyan-100 select-text">{value}</div>
  </div>
);

export default AccountPage;
