import React from 'react';
import { FaShare } from 'react-icons/fa';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  image,
  link,
}) => {
  const handleShare = () => {
    // Sử dụng shell của Electron để mở link trong trình duyệt mặc định
    window.electron?.shell.openExternal(link);
  };

  return (
    <div className="rounded-lg bg-black/30 p-4 hover:bg-gray-800/50 transition-all duration-300">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-base font-simibold text-neon-blue">{title}</h3>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <div className="flex-shrink-0">
          <button
            onClick={handleShare}
            className="rounded-lg bg-neon-blue px-4 py-2 font-bold hover:bg-neon-blue/80 transition-all duration-300"
          >
            <FaShare />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard; 