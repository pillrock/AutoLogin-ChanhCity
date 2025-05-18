import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaWindowMinimize,
  FaTimes,
  FaExpand,
  FaSquare,
  FaVolumeUp,
  FaVolumeMute,
} from 'react-icons/fa';
import './index.css';
import Button from './components/Button';
import UserProfile from './components/UserProfile';
import NewsCard from './components/NewsCard';
import GameCard from './components/GameCard';
import SettingsPanel from './components/SettingsPanel';
import { animate, utils, createDraggable, createSpring } from 'animejs';
import Button from './components/Button';
import logo from './assets/images/logo.png';
import bg from './assets/images/bg.avif';
import bgVideo from './assets/videos/background.mp4';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import ServerPage from './components/ServerPage';
import RoadmapPage from './components/RoadmapPage';
import AudioPlayer from './components/AudioPlayer';
import AuthModal from './components/AuthModal';
declare global {
  interface Window {
    electron?: any;
  }
}

const fakeUser = {
  username: 'cyberpunker',
  avatar: '',
  level: 7,
};
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const onlineUsers = 5715;
  const [isMuted, setIsMuted] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

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

  // Handle login
  const handleLogin = async (username: string, password: string) => {
    try {
      // TODO: Implement actual login logic with backend
      // For now, just simulate a successful login
      const userData = {
        username,
        avatar: '',
        level: 1,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  // Handle register
  const handleRegister = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      // TODO: Implement actual registration logic with backend
      // For now, just simulate a successful registration
      const userData = {
        username,
        avatar: '',
        level: 1,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // CSS classes
  const getDragClass = () => {
    return isFullscreen ? '' : 'app-region-drag';
  };

  // Main container style
  const containerClass =
    'relative z-10 w-full max-w-4xl mx-auto my-12 rounded-3xl border-4 border-neon-blue bg-black/70 shadow-neon-blue flex flex-col min-h-[600px] overflow-hidden';

  // Audio control handlers
  const handleAudioControl = () => {
    if (isMuted) {
      window.electron?.audio.play();
    } else {
      window.electron?.audio.pause();
    }
    setIsMuted(!isMuted);
  };

  // Handle forgot password
  const handleForgotPassword = async (email: string) => {
    try {
      // TODO: Implement actual password reset logic with backend
      console.log('Password reset requested for:', email);
      // Show success message in modal
    } catch (error) {
      console.error('Password reset failed:', error);
    }
  };

  // Handle social login
  const handleSocialLogin = async (
    provider: 'google' | 'facebook' | 'github'
  ) => {
    try {
      // TODO: Implement actual social login logic with backend
      console.log('Social login with:', provider);
      // For now, just simulate a successful login
      const userData = {
        username: `user_${provider}`,
        avatar: '',
        level: 1,
      };
      setUser(userData);
      setIsAuthenticated(true);
      setShowAuthModal(false);
    } catch (error) {
      console.error('Social login failed:', error);
    }
  };

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
          <img
            src={bg}
            alt="bg"
            className="absolute inset-0 z-0 h-full w-full object-cover object-center opacity-20"
            style={{ pointerEvents: 'none' }}
          />
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
              {/* User avatar/Login button */}
              {isAuthenticated ? (
                <div className="group relative">
                  <div className="from-neon-pink to-neon-purple border-neon-blue shadow-neon-pink flex cursor-pointer items-center justify-center rounded-full border-2 bg-gradient-to-r transition-all duration-300 md:h-8 md:w-8 xl:h-12 xl:w-12">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="h-full w-full rounded-full"
                      />
                    ) : (
                      <FaUser className="text-white md:text-lg xl:text-2xl" />
                    )}
                  </div>
                  {/* Dropdown menu */}
                  <div className="border-neon-blue invisible absolute right-0 mt-2 w-48 rounded-lg border bg-black/90 opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
                    <div className="py-2">
                      <div className="px-4 py-2 text-sm text-gray-300">
                        {user.username}
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20"
                      >
                        Đăng Xuất
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="from-neon-pink to-neon-purple border-neon-blue shadow-neon-pink flex items-center justify-center rounded-full border-2 bg-gradient-to-r transition-all duration-300 hover:scale-110 md:h-8 md:w-8 xl:h-12 xl:w-12"
                >
                  <FaUser className="text-white md:text-lg xl:text-2xl" />
                </button>
              )}
            </div>
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

          {/* Bottom bar: online left, JOIN right */}
          <div
            className={`absolute bottom-0 left-0 z-20 flex w-full transform items-center justify-between bg-black/30 px-8 pt-2 pb-2 transition-all duration-500 ease-in-out ${showBottomBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          >
            <div className="text-neon-green shadow-neon-blue flex items-center space-x-2 rounded-full bg-black/40 px-4 py-2 text-base">
              <span className="logo text-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    className="fill-green-500"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </span>
              <span className="font-cyber md:text-xs xl:text-lg">
                {onlineUsers} ONLINE
              </span>
            </div>
            <div className="flex flex-col items-end">
              <div className="mb-5 flex cursor-pointer flex-col items-center transition-all duration-200 hover:scale-[1.2] hover:rotate-[-20deg]">
                <span className="font-medium text-gray-400 md:text-xs xl:text-lg">
                  ĐÃ SẴN SÀNG
                </span>
                <span className="font-bold text-white md:text-xs xl:text-lg">
                  CHƠI NGAY
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
