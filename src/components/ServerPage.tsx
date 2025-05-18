import React from 'react';
import {
  FaDiscord,
  FaFacebook,
  FaYoutube,
  FaUsers,
  FaClock,
  FaCode,
} from 'react-icons/fa';
import bg from '../assets/images/bg.avif';
const ServerPage: React.FC = () => {
  const serverInfo = {
    name: 'VIETNAM',
    subName: 'LEGACY',
    description: 'Khám phá thế giới mở rộng lớn, tự do, đậm chất Việt Nam.',
    features: [
      { title: 'Nhiệm vụ', icon: <FaCode />, desc: '100+ nhiệm vụ' },
      { title: 'Kinh tế', icon: <FaUsers />, desc: 'Thị trường tự do' },
      { title: 'Cộng đồng', icon: <FaDiscord />, desc: 'Thân thiện, hỗ trợ' },
      { title: 'Cập nhật', icon: <FaClock />, desc: 'Liên tục' },
    ],
    stats: {
      players: '1000+',
      uptime: '99.9%',
      version: '1.0.0',
    },
  };

  const serverImages = [
    { url: bg, title: 'Thành phố' },
    { url: bg, title: 'Vùng quê' },
    { url: bg, title: 'Bãi biển' },
  ];

  const developers = [
    { name: 'Nguyễn Văn A', role: 'Lead Dev', avatar: '/images/team/dev1.jpg' },
    { name: 'Trần Thị B', role: 'Designer', avatar: '/images/team/dev2.jpg' },
    { name: 'Lê Văn C', role: 'Community', avatar: '/images/team/dev3.jpg' },
  ];

  return (
    <div className="min-h-screen font-sans text-white">
      {/* Hero */}
      <div className="relative mb-8 flex h-[320px] flex-col items-center justify-center overflow-hidden rounded-b-3xl shadow-lg">
        <img
          src={bg}
          alt="VietNamLegacy"
          className="absolute inset-0 h-full w-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0fffc3]/40 via-transparent to-[#00bfff]/30" />
        <div className="relative z-10 flex flex-col items-center">
          <div className="flex items-center">
            <h1 className="text-neon-red glow-text mb-2 font-bold tracking-widest md:text-3xl xl:text-5xl">
              {serverInfo.name}
            </h1>
            <h1 className="glow-text-cyan mb-2 font-bold tracking-widest text-[#00fff7] md:text-3xl xl:text-5xl">
              {serverInfo.subName}
            </h1>
          </div>
          <p className="rounded-xl bg-black/20 px-4 py-2 text-[#b2fefa] md:text-base xl:text-lg">
            {serverInfo.description}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 flex justify-center gap-8">
        <div className="flex items-center gap-2 rounded border-l-4 border-[#00fff7] bg-black/20 px-4 py-2 shadow">
          <FaUsers className="text-[#00fff7]" />
          <span className="font-bold">{serverInfo.stats.players}</span>
        </div>
        <div className="flex items-center gap-2 rounded border-l-4 border-[#ff00cc] bg-black/20 px-4 py-2 shadow">
          <FaClock className="text-[#ff00cc]" />
          <span className="font-bold">{serverInfo.stats.uptime}</span>
        </div>
        <div className="flex items-center gap-2 rounded border-l-4 border-[#00bfff] bg-black/20 px-4 py-2 shadow">
          <FaCode className="text-[#00bfff]" />
          <span className="font-bold">{serverInfo.stats.version}</span>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto mb-10 max-w-4xl">
        <div className="flex overflow-hidden rounded-2xl shadow-lg">
          {serverImages.map((img, idx) => (
            <div key={idx} className="group relative flex-1">
              <img
                src={img.url}
                alt={img.title}
                className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                style={{
                  borderRight:
                    idx !== serverImages.length - 1
                      ? '2px solid #00fff7'
                      : undefined,
                }}
              />
              <div className="absolute bottom-2 left-2 rounded px-3 py-1 text-xs text-[#00fff7]">
                {img.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="mx-auto mb-10 max-w-4xl">
        <div className="flex flex-wrap justify-center gap-4">
          {serverInfo.features.map((f, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 rounded-lg border border-[#00fff7]/30 bg-black/20 px-4 py-2 shadow-sm"
            >
              <span className="text-[#00fff7]">{f.icon}</span>
              <span className="font-simibold">{f.title}</span>
              <span className="text-xs text-[#b2fefa]">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServerPage;
