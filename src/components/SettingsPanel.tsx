import React, { useState } from 'react';

interface SettingsPanelProps {
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ onClose }) => {
  const [settings, setSettings] = useState({
    autoUpdate: true,
    launchOnStartup: false,
    notifications: true,
    language: 'en',
    theme: 'dark',
  });

  const handleChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg bg-gray-800 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Settings</h2>
          <button
            onClick={onClose}
            className="rounded-lg bg-gray-700 px-4 py-2 hover:bg-gray-600"
          >
            Close
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Auto Update</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.autoUpdate}
                onChange={(e) => handleChange('autoUpdate', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-neon-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Launch on Startup</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.launchOnStartup}
                onChange={(e) => handleChange('launchOnStartup', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-neon-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Notifications</span>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={settings.notifications}
                onChange={(e) => handleChange('notifications', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-700 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-neon-blue peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <span>Language</span>
            <select
              value={settings.language}
              onChange={(e) => handleChange('language', e.target.value)}
              className="rounded-lg bg-gray-700 px-4 py-2"
            >
              <option value="en">English</option>
              <option value="vi">Tiếng Việt</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <span>Theme</span>
            <select
              value={settings.theme}
              onChange={(e) => handleChange('theme', e.target.value)}
              className="rounded-lg bg-gray-700 px-4 py-2"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 