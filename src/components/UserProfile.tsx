import React from 'react';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';

interface UserProfileProps {
  username: string;
  avatar?: string;
  level: number;
  onSettings: () => void;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  username,
  avatar,
  level,
  onSettings,
  onLogout,
}) => {
  return (
    <div className="rounded-lg bg-gray-800/50 p-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 overflow-hidden rounded-full">
          {avatar ? (
            <img
              src={avatar}
              alt={username}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-700">
              <FaUser className="text-2xl text-gray-400" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{username}</h3>
          <p className="text-sm text-gray-400">Level {level}</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSettings}
            className="rounded-lg bg-gray-700 p-2 hover:bg-gray-600"
          >
            <FaCog />
          </button>
          <button
            onClick={onLogout}
            className="rounded-lg bg-red-500 p-2 hover:bg-red-600"
          >
            <FaSignOutAlt />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 