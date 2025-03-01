import React, { useState } from 'react';
import { X, Volume2, VolumeX, Globe, Type } from 'lucide-react';
import { useChat } from '../context/ChatContext';
import { useTheme } from '../context/ThemeContext';

interface SettingsProps {
  onClose: () => void;
}

const Settings: React.FC<SettingsProps> = ({ onClose }) => {
  const { clearMessages } = useChat();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    textToSpeech: false,
    fontSize: 'medium',
    language: 'english',
    notifications: true,
  });
  
  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat messages? This cannot be undone.')) {
      clearMessages();
      onClose();
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Settings</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Appearance</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Theme</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setTheme('light')}
                      className={`p-3 rounded-lg border ${
                        theme === 'light'
                          ? 'border-primary-600 bg-primary-50 dark:border-primary-500 dark:bg-primary-900'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      }`}
                    >
                      Light
                    </button>
                    <button
                      onClick={() => setTheme('dark')}
                      className={`p-3 rounded-lg border ${
                        theme === 'dark'
                          ? 'border-primary-600 bg-primary-50 dark:border-primary-500 dark:bg-primary-900'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setTheme('system')}
                      className={`p-3 rounded-lg border ${
                        theme === 'system'
                          ? 'border-primary-600 bg-primary-50 dark:border-primary-500 dark:bg-primary-900'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      }`}
                    >
                      System
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Font Size</label>
                  <div className="flex items-center">
                    <Type size={16} className="text-gray-500 mr-2" />
                    <input
                      type="range"
                      min="0"
                      max="2"
                      step="1"
                      value={settings.fontSize === 'small' ? 0 : settings.fontSize === 'medium' ? 1 : 2}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        handleChange('fontSize', value === 0 ? 'small' : value === 1 ? 'medium' : 'large');
                      }}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                    <Type size={24} className="text-gray-500 ml-2" />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Small</span>
                    <span>Medium</span>
                    <span>Large</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Accessibility</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {settings.textToSpeech ? (
                      <Volume2 size={20} className="text-gray-500 mr-2" />
                    ) : (
                      <VolumeX size={20} className="text-gray-500 mr-2" />
                    )}
                    <span>Text to Speech</span>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.textToSpeech}
                      onChange={(e) => handleChange('textToSpeech', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <Globe size={20} className="text-gray-500 mr-2" />
                    <label className="block text-sm font-medium">Language</label>
                  </div>
                  <select
                    value={settings.language}
                    onChange={(e) => handleChange('language', e.target.value)}
                    className="input"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Data</h3>
              <button
                onClick={handleClearChat}
                className="w-full btn btn-outline border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900"
              >
                Clear Chat History
              </button>
              <p className="text-xs text-gray-500 mt-2">
                This will permanently delete all your conversation history with Lumi.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;