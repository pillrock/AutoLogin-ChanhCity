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
  const onlineUsers = 5715;

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
    })
  }, [])
  // Window control
  const handleWindowControl = (action: string) => {
    window.electron?.ipcRenderer.send('window-control', action);
  };

  // Double click vùng drag để maximize/restore
  const handleDoubleClickDrag = () => {
    if (isFullscreen) {
      handleWindowControl('maximize'); // sẽ restore
      setIsFullscreen(false);
    } else {
      handleWindowControl('maximize'); // sẽ maximize
      setIsFullscreen(true);
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

  // Main container style
  const containerClass =
    'relative z-10 w-full max-w-4xl mx-auto my-12 rounded-3xl border-4 border-neon-blue bg-black/70 shadow-neon-blue flex flex-col min-h-[600px] overflow-hidden';

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
          className="absolute app-region-drag inset-0 w-full h-full object-cover  object-center z-0 "
          style={{ pointerEvents: 'none' }}
          onDoubleClick={handleDoubleClickDrag}
        />
        <div className='absolute inset-0 w-full h-full object-cover object-center z-0 bg-black opacity-50 '></div></div>
        {/* Window controls (no-drag) */}
        <div className="absolute right-0 top-0 flex items-center justify-center space-x-2 ml-4 app-region-no-drag">
          <button className="text-gray-400 hover:text-white px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.minimize)}}><FaWindowMinimize /></button>
          <button className="text-gray-400 hover:text-white px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.maximize)}}><FaSquare /></button>
          <button className="text-gray-400 hover:text-red-500 px-2 py-1" onClick={() => {handleWindowControl(ActionWindowControl.close)}}><FaTimes /></button>
        </div>
      {/* Container chính */}
      <img className='w-[200px] absolute z-30 left-[5%] rotate-[-15deg] top-[2%] ' src={logo}/>

      <div  className="relative max-w-[80%]  w-full  app-region-no-drag rounded-3xl overflow-hidden shadow-neon-blue border-2 border-black bg-black/70" style={{ aspectRatio: '16/9' }}>
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
        <div className=" relative z-20 bg-black/30  justify-end flex items-center  px-8 py-4 select-none ">

          {/* Logo */}
          {/* <div className="flex items-center space-x-2 text-4xl font-bold drop-shadow-[0_0_10px_#00f3ff]">
            <span className="text-neon-blue">my</span>
            <span className="text-neon-pink">META</span>
            <span className="text-neon-blue text-lg ml-1">GTA</span>
          </div> */}
          {/* Menu + avatar + window controls */}
          <div className="flex items-center space-x-6">
            <svg className='size-7' xmlns="http://www.w3.org/2000/svg" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 512"><g fillRule="nonzero"><path fill="#4D4D4D" d="M256-.001c70.684 0 134.69 28.664 181.013 74.988C483.337 121.31 512.001 185.316 512.001 256c0 70.684-28.664 134.69-74.988 181.013C390.69 483.337 326.684 512.001 256 512.001c-70.677 0-134.69-28.664-181.013-74.988C28.663 390.69-.001 326.676-.001 256c0-70.684 28.664-134.69 74.988-181.013C121.31 28.663 185.316-.001 256-.001z"/><path fill="#fff" d="M256.001 19.596c65.278 0 124.383 26.466 167.163 69.243 42.776 42.779 69.243 101.884 69.243 167.162s-26.467 124.383-69.246 167.16c-42.777 42.779-101.882 69.246-167.16 69.246-65.278 0-124.383-26.467-167.162-69.243-42.777-42.78-69.243-101.885-69.243-167.163S46.062 131.618 88.839 88.839c42.779-42.777 101.884-69.243 167.162-69.243z"/><path fill="#DA251D" d="M256.001 39.594c119.518 0 216.408 96.886 216.408 216.407 0 119.518-96.89 216.408-216.408 216.408-119.521 0-216.407-96.89-216.407-216.408 0-119.521 96.886-216.407 216.407-216.407z"/><path fill="#ff0" d="M252.273 294.553l51.249 37.218-19.567-60.264 51.271-37.235h-63.365l-19.588-60.337-19.589 60.337H169.32l51.271 37.235-19.567 60.264z"/></g></svg>
            <div className="flex items-center space-x-2">
              {['HOME', 'NEWS', 'SERVER', 'ROADMAP'].map((tab) => (
                <Button
                  key={tab}
                  className={`text-base font-cyber px-2 py-1 transition-all duration-200 border-b-2 border-transparent hover:text-neon-blue hover:border-neon-blue ${
                    activeTab === tab ? 'text-neon-pink border-neon-pink' : 'text-white'
                  } app-region-no-drag`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </Button>
              ))}
            </div>
            {/* Avatar user */}
            <div className="ml-4 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-neon-pink to-neon-purple border-2 border-neon-blue shadow-neon-pink">
              <FaUser className="text-white text-xl" />
            </div>
         
          </div>
        </div>
        {/* Bottom bar: online left, JOIN right */}
        <div className="absolute bottom-0 left-0 w-full flex items-center justify-between px-8 pb-6 pt-2 z-20">
          <div  className="flex items-center space-x-2 text-neon-blue text-base bg-black/40 px-4 py-2 rounded-full shadow-neon-blue">
            <span className=' logo text-green-700'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" className='fill-green-500 ' strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
            </span>
            <span  className="font-cyber text-lg">{onlineUsers} ONLINE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-white/80 text-base font-cyber">DISCOVER THE NEW</span>
            <Button
              className="join mt-1 font-cyber border-neon-blue hover:border-neon-pink hover:bg-neon-pink/20 hover:text-neon-pink rounded border-2 bg-transparent px-10 py-2 text-lg font-bold text-neon-blue shadow-neon-blue transition-all duration-300"
              onClick={() => alert('JOIN!')}
            >
              JOIN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
