import React from 'react';
import { FaUser } from 'react-icons/fa';

const Navbar = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const tabs = ['HOME', 'NEWS', 'SERVER', 'ROADMAP'];

  return (
    <nav className="flex items-center justify-between px-4 py-2">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`font-cyber px-2 py-1 transition-all duration-200 ${
              activeTab === tab
                ? 'text-neon-pink border-neon-pink border-b-2'
                : 'text-gray-300 hover:text-white'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* User indicators and profile */}
      <div className="flex items-center">
        <div className="flex items-center space-x-2">
          <span className="text-red-500">●</span>
          <span className="text-blue-500">●</span>
          <span className="text-green-500">+1</span>
        </div>
        <div className="from-neon-pink to-neon-purple ml-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-r">
          <FaUser className="text-white" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
