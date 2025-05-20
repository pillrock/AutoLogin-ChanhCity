import React, { useState, useEffect } from 'react';
import { FaWindowMinimize, FaTimes, FaSquare } from 'react-icons/fa';
import './index.css';
import { UserProfile } from './components/UserProfile';
import { animate, createSpring } from 'animejs';
import logo from './assets/images/logo.png';
import bg from './assets/images/bg.avif';
import bgVideo from './assets/videos/background.mp4';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import ServerPage from './components/ServerPage';
import RoadmapPage from './components/RoadmapPage';
import AudioPlayer from './components/AudioPlayer';
import FooterHome from './components/FooterHome';
declare global {
  interface Window {
    electron?: any;
  }
}

const ListPages = {
  home: 'TRANG CHỦ',
  post: 'BÀI ĐĂNG',
  server: 'MÁY CHỦ',
  tutorial: 'HƯỚNG DẪN',
};
const ActionWindowControl = {
  minimize: 'minimize',
  maximize: 'maximize',
  close: 'close',
};

function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);

  const [isMuted, setIsMuted] = useState(false);

  console.log(activeTab);

  // Handle tab change with loading animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;

    // Hide bottom bar with slide down animation
    if (tab === ListPages.home) {
      setShowBottomBar(true);
    } else {
      setShowBottomBar(false);
    }

    setShowContent(false);
    setIsLoading(true);

    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setShowContent(true);
        }, 200);
      }, 500);
    }, 300);
  };

  // Render active page content
  const renderPageContent = () => {
    switch (activeTab) {
      case ListPages.home:
        return <HomePage />;
      case ListPages.post:
        return <NewsPage />;
      case ListPages.server:
        return <ServerPage />;
      case ListPages.tutorial:
        return <RoadmapPage />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    animate('.logo', {
      scale: [
        { to: 1.25, ease: 'inOut(3)', duration: 100 },
        { to: 1, ease: createSpring({ stiffness: 500 }) },
      ],
      loop: true,
      loopDelay: 100,
    });
    animate('.join', {
      opacity: { from: '.1' },
      x: { from: '46rem' },
      duration: '1000',
    });

    // Lắng nghe sự kiện từ main process
    const handleWindowStateChange = (isMaximized: boolean) => {
      if (typeof isMaximized === 'boolean') {
        setIsFullscreen(isMaximized);
      }
    };

    // Đăng ký listener và lưu cleanup function
    const cleanup = window.electron?.ipcRenderer.on(
      'window-state-changed',
      handleWindowStateChange
    );

    // Yêu cầu trạng thái ban đầu
    window.electron?.window.getState();

    // Cleanup
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  // Window control
  const handleWindowControl = (action: string) => {
    console.log('Window control:', action);
    window.electron?.ipcRenderer.send('window-control', action);
  };

  // Double click vùng drag để maximize/restore
  const handleDoubleClickDrag = () => {
    if (!isFullscreen) {
      handleWindowControl('maximize');
    }
  };

  // CSS classes
  const getDragClass = () => {
    return isFullscreen ? '' : 'app-region-drag';
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers((prev) => {
        // Tăng hoặc giảm ngẫu nhiên từ -5 đến +5
        let next = prev + Math.floor(Math.random() * 11) - 5;
        // Giới hạn trong khoảng 1000 - 1200
        if (next < 1000) next = 1000;
        if (next > 1200) next = 1200;
        return next;
      });
    }, 1500); // Cập nhật mỗi 1.5 giây

    return () => clearInterval(interval);
  }, []);

  // Main app after login
  return (
    <div className="font-cyber bg-cyber-dark relative flex h-screen w-screen items-center justify-center overflow-hidden text-white">
      <div className="">
        <video
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 z-0 h-full w-full object-cover object-center ${getDragClass()}`}
          style={{
            pointerEvents: 'none',
            animation: 'slowPlay 20s linear infinite',
          }}
          onDoubleClick={handleDoubleClickDrag}
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-0 h-full w-full bg-black object-cover object-center opacity-30"></div>
      </div>
      {/* Window controls (no-drag) */}
      <div className="app-region-no-drag absolute top-1 right-1 flex items-center justify-center space-x-2">
        <AudioPlayer />
        <button
          className="px-2 py-1 text-gray-400 hover:text-white"
          onClick={() => {
            handleWindowControl(ActionWindowControl.minimize);
          }}
        >
          <FaWindowMinimize />
        </button>
        <button
          className="px-2 py-1 text-gray-400 hover:text-white"
          onClick={() => {
            handleWindowControl(ActionWindowControl.maximize);
          }}
        >
          <FaSquare />
        </button>
        <button
          className="px-2 py-1 text-gray-400 hover:text-red-500"
          onClick={() => {
            handleWindowControl(ActionWindowControl.close);
          }}
        >
          <FaTimes />
        </button>
      </div>
      {/* Container chính */}
      <div className="relative w-full max-w-[80%]">
        <img
          className="absolute -top-[8%] -left-[7%] z-30 rotate-[-15deg] md:w-[8rem] xl:w-[14rem]"
          src={logo}
          style={{ pointerEvents: 'none' }}
        />
        <div
          className="app-region-no-drag shadow-neon-blue relative overflow-hidden rounded-3xl border-4 border-black bg-black/40 backdrop-blur-sm md:h-[80%]"
          style={{ aspectRatio: '16/9' }}
        >
          {/* Ảnh game làm nền container */}
          {/* <img
            src={bg}
            alt="bg"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-20"
            style={{ pointerEvents: 'none' }}
          /> */}
          {/* Overlay gradient nhẹ nếu muốn */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/20 to-black/40"></div>
          {/* Top bar: logo + menu + avatar + window controls */}
          <div className="relative z-20 flex items-center justify-end bg-black/30 select-none md:px-4 md:py-2 xl:px-8 xl:py-4">
            <div className="flex items-center md:space-x-4 xl:space-x-8">
              <svg
                className="md:size-6 xl:size-8"
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 512 512"
              >
                <g fillRule="nonzero">
                  <path
                    fill="#4D4D4D"
                    d="M256-.001c70.684 0 134.69 28.664 181.013 74.988C483.337 121.31 512.001 185.316 512.001 256c0 70.684-28.664 134.69-74.988 181.013C390.69 483.337 326.684 512.001 256 512.001c-70.677 0-134.69-28.664-181.013-74.988C28.663 390.69-.001 326.676-.001 256c0-70.684 28.664-134.69 74.988-181.013C121.31 28.663 185.316-.001 256-.001z"
                  />
                  <path
                    fill="#fff"
                    d="M256.001 19.596c65.278 0 124.383 26.466 167.163 69.243 42.776 42.779 69.243 101.884 69.243 167.162s-26.467 124.383-69.246 167.16c-42.777 42.779-101.882 69.246-167.16 69.246-65.278 0-124.383-26.467-167.162-69.243-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.618 88.839 88.839c42.779-42.777 101.884-69.243 167.162-69.243z"
                  />
                  <path
                    fill="#DA251D"
                    d="M256.001 39.594c119.518 0 216.408 96.886 216.408 216.407 0 119.518-96.89 216.408-216.408 216.408-119.521 0-216.407-96.89-216.407-216.408 0-119.521 96.886-216.407 216.407-216.407z"
                  />
                  <path
                    fill="#ff0"
                    d="M252.273 294.553l51.249 37.218-19.567-60.264 51.271-37.235h-63.365l-19.588-60.337-19.589 60.337H169.32l51.271 37.235-19.567 60.264z"
                  />
                </g>
              </svg>
              <div className="flex items-center md:space-x-2 xl:space-x-4">
                {Object.entries(ListPages).map(([key, value]) => (
                  <button
                    key={value}
                    className={`font-cyber relative overflow-hidden transition-all duration-300 ease-in-out md:px-2 md:py-1 md:text-sm xl:px-4 xl:py-2 xl:text-base ${
                      activeTab === value
                        ? 'text-neon-blue'
                        : 'text-white/60 hover:text-white'
                    } app-region-no-drag group`}
                    onClick={() => handleTabChange(value)}
                  >
                    <span className="relative z-10">{value}</span>
                    {activeTab === value && (
                      <>
                        <div className="bg-neon-blue absolute bottom-0 left-0 h-0.5 w-full animate-pulse"></div>
                        <div className="bg-neon-blue/10 absolute inset-0 rounded-lg"></div>
                      </>
                    )}
                    <div className="bg-neon-blue absolute bottom-0 left-0 h-0.5 w-0 transition-all duration-300 group-hover:w-full"></div>
                  </button>
                ))}
              </div>
            </div>
            <UserProfile />
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 mt-4 md:h-[calc(100%-70px)] xl:h-[calc(100%-120px)]">
            <div className="custom-scrollbar h-full overflow-y-auto px-6">
              <div
                className={`transform transition-all duration-300 ${showContent ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
              >
                {renderPageContent()}
              </div>
            </div>
          </div>

          {/* Loading Bar */}
          {isLoading && (
            <div className="absolute bottom-0 left-0 z-30 h-1 w-full bg-black/50">
              <div className="rainbow-loading h-full w-full"></div>
            </div>
          )}

          {/* FOOTER HOME */}
          <FooterHome showBottomBar={showBottomBar} />
        </div>
      </div>
    </div>
  );
}

export default App;
