import React, { useState, useEffect } from 'react';
import {
  FaUser,
  FaWindowMinimize,
  FaTimes,
  FaExpand,
  FaSquare,
} from 'react-icons/fa';
import './index.css';
import Button from './components/Button';
import UserProfile from './components/UserProfile';
import NewsCard from './components/NewsCard';
import GameCard from './components/GameCard';
import SettingsPanel from './components/SettingsPanel';
import { animate, utils, createDraggable, createSpring } from 'animejs'
import Button from './components/Button';
import logo from './assets/images/logo.png';
import bg from './assets/images/bg.avif';
import HomePage from './components/HomePage';
import NewsPage from './components/NewsPage';
import ServerPage from './components/ServerPage';
import RoadmapPage from './components/RoadmapPage';
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

const ActionWindowControl = {minimize : 'minimize', maximize: 'maximize',close: 'close'}

function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [showRegister, setShowRegister] = useState(false);
  const [user, setUser] = useState<any>(fakeUser);
  const [showSettings, setShowSettings] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [showBottomBar, setShowBottomBar] = useState(true);
  const onlineUsers = 5715;

  console.log(activeTab);
  
  
  // Handle tab change with loading animation
  const handleTabChange = (tab: string) => {
    if (tab === activeTab) return;
    
    // Hide bottom bar with slide down animation
    if (tab === 'HOME') {
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
      case 'HOME':
        return <HomePage />;
      case 'NEWS':
        return <NewsPage />;
      case 'SERVER':
        return <ServerPage />;
      case 'ROADMAP':
        return <RoadmapPage />;
      default:
        return <HomePage />;
    }
  };

  useEffect(() => {
    animate('.logo', {
      scale: [
        { to: 1.25, ease: 'inOut(3)', duration: 100 },
        { to: 1, ease: createSpring({ stiffness: 500 }) }
      ],
      loop: true,
      loopDelay: 100,
    });
    animate('.join', {
      opacity: {from: '.1'},
      x: {from: '46rem'},
      duration: '1000'
    });

    
    // Lắng nghe sự kiện từ main process
    const handleWindowStateChange = (isMaximized: boolean) => {
      if (typeof isMaximized === 'boolean') {
        setIsFullscreen(isMaximized);
      }
    };

    // Đăng ký listener và lưu cleanup function
    const cleanup = window.electron?.ipcRenderer.on('window-state-changed', handleWindowStateChange);

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

  // Fake login/register logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(fakeUser);
    setIsAuthenticated(true);
  };
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(fakeUser);
    setIsAuthenticated(true);
  };
  const handleLogout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  // CSS classes
  const getDragClass = () => {
    return isFullscreen ? '' : 'app-region-drag';
  };

  // Main container style
  const containerClass = 'relative z-10 w-full max-w-4xl mx-auto my-12 rounded-3xl border-4 border-neon-blue bg-black/70 shadow-neon-blue flex flex-col min-h-[600px] overflow-hidden';

  // Cyberpunk login/register form
  if (!isAuthenticated) {
    return null;
  }

  // Main app after login
  return (
    <div className="relative h-screen w-screen overflow-hidden font-cyber bg-cyber-dark text-white flex items-center justify-center">
      <div className=''>
        <img
          src={bg}
          alt="cyberpunk game"
          className={`absolute inset-0 w-full h-full object-cover object-center z-0 ${getDragClass()}`}
          style={{ pointerEvents: 'none' }}
          onDoubleClick={handleDoubleClickDrag}
        />
        <div className='absolute inset-0 w-full h-full object-cover object-center z-0 bg-black opacity-50 '></div></div>
        {/* Window controls (no-drag) */}
        <div className="absolute right-0 top-0 flex items-center justify-center space-x-2  app-region-no-drag">
          <button className="text-gray-400 hover:text-white px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.minimize)}}><FaWindowMinimize /></button>
          <button className="text-gray-400 hover:text-white px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.maximize)}}><FaSquare /></button>
          <button className="text-gray-400 hover:text-red-500 px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.close)}}><FaTimes /></button>
        </div>
      {/* Container chính */}
      <div className="relative max-w-[80%] w-full ">
        <img className='md:w-[8rem] xl:w-[14rem] absolute z-30 -left-[10%] -top-[8%] rotate-[-15deg]' src={logo} style={{ pointerEvents: 'none' }}/>
        <div className="relative md:h-[80%] app-region-no-drag rounded-3xl overflow-hidden shadow-neon-blue border-4 border-black bg-black/70" style={{ aspectRatio: '16/9' }}>
          {/* Ảnh game làm nền container */}
          <img
            src={bg}
            alt="bg"
            className="absolute inset-0 w-full h-full object-cover object-center z-0"
            style={{ pointerEvents: 'none' }}
          />
          {/* Overlay gradient nhẹ nếu muốn */}
          {/* <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60 z-10" /> */}
          {/* Top bar: logo + menu + avatar + window controls */}
          <div className="relative z-20 bg-black/30 justify-end flex items-center xl:px-8 xl:py-4 md:px-4 md:py-2 select-none">
            <div className="flex items-center xl:space-x-8 md:space-x-4">
              <svg className='xl:size-8 md:size-6' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512">
                <g fillRule="nonzero">
                  <path fill="#4D4D4D" d="M256-.001c70.684 0 134.69 28.664 181.013 74.988C483.337 121.31 512.001 185.316 512.001 256c0 70.684-28.664 134.69-74.988 181.013C390.69 483.337 326.684 512.001 256 512.001c-70.677 0-134.69-28.664-181.013-74.988C28.663 390.69-.001 326.676-.001 256c0-70.684 28.664-134.69 74.988-181.013C121.31 28.663 185.316-.001 256-.001z"/>
                  <path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.466 167.163 69.243 42.776 42.779 69.243 101.884 69.243 167.162s-26.467 124.383-69.246 167.16c-42.777 42.779-101.882 69.246-167.16 69.246-65.278 0-124.383-26.467-167.162-69.243-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.618 88.839 88.839c42.779-42.777 101.884-69.243 167.162-69.243z"/>
                  <path fill="#DA251D" d="M256.001 39.594c119.518 0 216.408 96.886 216.408 216.407 0 119.518-96.89 216.408-216.408 216.408-119.521 0-216.407-96.89-216.407-216.408 0-119.521 96.886-216.407 216.407-216.407z"/>
                  <path fill="#ff0" d="M252.273 294.553l51.249 37.218-19.567-60.264 51.271-37.235h-63.365l-19.588-60.337-19.589 60.337H169.32l51.271 37.235-19.567 60.264z"/>
                </g>
              </svg>
              <div className="flex items-center xl:space-x-4 md:space-x-2">
                {['HOME', 'NEWS', 'SERVER', 'ROADMAP'].map((tab) => (
                  <button
                    key={tab}
                    className={`xl:text-base md:text-sm font-cyber xl:px-4 xl:py-2 md:px-2 md:py-1 
                      transition-all duration-300 ease-in-out
                      relative overflow-hidden
                      ${activeTab === tab 
                        ? 'text-neon-pink' 
                        : 'text-white/60 hover:text-white'
                      }
                      app-region-no-drag
                      group`}
                    onClick={() => handleTabChange(tab)}
                  >
                    <span className="relative z-10">{tab}</span>
                    {activeTab === tab && (
                      <>
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-neon-pink animate-pulse"></div>
                        <div className="absolute inset-0 bg-neon-pink/10 rounded-lg"></div>
                      </>
                    )}
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-neon-blue group-hover:w-full transition-all duration-300"></div>
                  </button>
                ))}
              </div>
              {/* Avatar user */}
              <div className="ml-4 flex xl:h-12 xl:w-12 md:h-8 md:w-8 items-center justify-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple border-2 border-neon-blue shadow-neon-pink transition-all duration-300">
                <FaUser className="text-white xl:text-2xl md:text-lg" />
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="relative z-10 xl:h-[calc(100%-120px)] md:h-[calc(100%-70px)] mt-4">
            <div className="h-full overflow-y-auto px-6 custom-scrollbar">
              <div className={`transition-all duration-300 transform ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {renderPageContent()}
              </div>
            </div>
          </div>

          {/* Loading Bar */}
          {isLoading && (
            <div className="absolute bottom-0 left-0 w-full h-1 bg-black/50 z-30">
              <div className="h-full w-full rainbow-loading"></div>
            </div>
          )}

          {/* Bottom bar: online left, JOIN right */}
          <div className={`absolute bottom-0 left-0 w-full flex items-center justify-between px-8 pb-2 pt-2 z-20 bg-black/30 
            transition-all duration-500 ease-in-out transform
            ${showBottomBar ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
            <div className="flex items-center space-x-2 text-neon-blue text-base bg-black/40 px-4 py-2 rounded-full shadow-neon-blue">
              <span className='logo text-green-700'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" className='fill-green-500' strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </span>
              <span className="font-cyber xl:text-lg md:text-xs">{onlineUsers} ONLINE</span>
            </div>
            <div className="flex flex-col items-end">
              <div className='flex flex-col items-center hover:scale-[1.2] hover:rotate-[-20deg] cursor-pointer duration-200 transition-all'>
                <span className="text-gray-400 xl:text-lg md:text-xs font-medium">DISCOVER THE NEW</span>
                <span className="text-white xl:text-lg md:text-xs font-bold">JOIN</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
