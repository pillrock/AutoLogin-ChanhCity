import React, { useEffect } from 'react';
import GameCard from './GameCard';
import NewsCard from './NewsCard';
import fivem from '../assets/images/fivem.png';
import discord from '../assets/images/discord.png';
import { GoogleLogin } from '@react-oauth/google';
const HomePage: React.FC = () => {
  return (
    <div className="h-full w-full overflow-y-auto p-6">
      <div className="grid gap-6 md:grid-cols-1 xl:grid-cols-2">
        {/* Featured Games Section */}
        <div className="space-y-4">
          <h2 className="text-base font-medium">LIÊN KẾT</h2>
          <div className="grid gap-4 md:grid-cols-1 xl:grid-cols-1">
            <GameCard
              title="Tải FiveM"
              image={fivem}
              description="FiveM là bản sửa đổi của Grand Theft Auto V cho phép bạn chơi nhiều người chơi trên các máy chủ chuyên dụng được tùy chỉnh , do Cfx.re cung cấp."
              link="https://fivem.net"
            />
            <GameCard
              title="Discord của chúng tôi"
              image={discord}
              description="🇻🇳 VIỆT NAM LEGACY PRO 🇻🇳!"
              link="https://discord.gg/zkgntFfF"
            />
          </div>
        </div>

        {/* Latest News Section */}
        <div className="space-y-4">
          <h2 className="text-base font-medium">TIN TỨC</h2>
          <div className="space-y-4">
            <NewsCard
              title="Bản Cập nhật VietNam Legacy Laucher v1.0.5"
              date="20-05-2025"
              content={`
                Thay đổi video nền kèm nhạc nền cho nó hào hùng | Chức năng đăng nhập bằng GOOGLE | HẾT :)) !!
                `}
            />
            <NewsCard
              title="Bản Cập nhật VietNam Legacy 1.0.3"
              date="18-05-2025"
              content={`
                + Video nền
                + Nhạc nền 
                + UI trang chủ
                `}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
