import React from 'react';

const GameDisplay = ({ onlineUsers }: { onlineUsers: number }) => {
  return (
    <div className="relative mx-4 my-2 flex-1 overflow-hidden rounded-lg">
      {/* Hình nền game với nhân vật */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/src/assets/game-background.jpg')",
          backgroundPosition: 'center center',
        }}
      >
        {/* Bạn có thể thêm overlay gradient ở đây nếu cần */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      {/* Nội dung overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6">
        {/* Phần trên để trống - nơi hiển thị nhân vật */}
        <div className="flex-1"></div>

        {/* Phần dưới với thông tin và nút */}
        <div className="flex items-end justify-between">
          {/* Số người chơi online */}
          <div className="flex items-center">
            <div className="mr-2 h-3 w-3 rounded-full bg-green-500"></div>
            <span className="font-cyber text-sm">{onlineUsers} ONLINE</span>
          </div>

          {/* Call-to-action */}
          <div className="text-right">
            <p className="font-cyber mb-1 text-sm">DISCOVER THE NEW</p>
            <button className="hover:bg-neon-blue/20 font-cyber border-neon-blue hover:border-neon-blue hover:shadow-neon-blue rounded border-2 bg-transparent px-8 py-2 font-bold text-white transition-all duration-300">
              JOIN
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDisplay;
