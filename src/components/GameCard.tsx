import React from 'react';
import { FaPlay, FaStop, FaDownload } from 'react-icons/fa';

interface GameCardProps {
  title: string;
  version: string;
  thumbnail: string;
  isInstalled: boolean;
  isRunning: boolean;
  downloadProgress?: number;
  onPlay: () => void;
  onStop: () => void;
  onDownload: () => void;
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  version,
  thumbnail,
  isInstalled,
  isRunning,
  downloadProgress,
  onPlay,
  onStop,
  onDownload,
}) => {
  return (
    <div className="rounded-lg bg-gray-800/50 p-4">
      <div className="flex items-center space-x-4">
        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
          <img
            src={thumbnail}
            alt={title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm text-gray-400">Version {version}</p>
          {downloadProgress !== undefined && (
            <div className="mt-2">
              <div className="mb-1 flex items-center justify-between">
                <span className="text-xs">Downloading...</span>
                <span className="text-xs">{downloadProgress}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-neon-blue"
                  style={{ width: `${downloadProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
        <div className="flex-shrink-0">
          {isInstalled ? (
            <button
              onClick={isRunning ? onStop : onPlay}
              className={`rounded-lg px-4 py-2 font-bold ${
                isRunning
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-neon-blue hover:bg-neon-blue/80'
              }`}
            >
              {isRunning ? <FaStop /> : <FaPlay />}
            </button>
          ) : (
            <button
              onClick={onDownload}
              className="rounded-lg bg-neon-blue px-4 py-2 font-bold hover:bg-neon-blue/80"
            >
              <FaDownload />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameCard; 