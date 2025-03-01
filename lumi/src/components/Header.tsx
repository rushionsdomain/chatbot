import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { 
  Sun, 
  Moon, 
  Monitor, 
  Menu, 
  X, 
  Settings, 
  BarChart, 
  HelpCircle, 
  Sparkles 
} from 'lucide-react';

interface HeaderProps {
  onOpenMoodTracker: () => void;
  onOpenSettings: () => void;
  onOpenResources: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onOpenMoodTracker, 
  onOpenSettings,
  onOpenResources
}) => {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  const handleAction = (callback: () => void) => {
    callback();
    setMenuOpen(false);
  };
  
  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm py-3 px-4 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center">
            <Sparkles size={18} className="text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-xl font-semibold text-primary-700 dark:text-primary-400">Lumi</h1>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="hidden md:flex items-center space-x-1">
            <button 
              onClick={onOpenMoodTracker}
              className="btn btn-outline p-2"
              aria-label="Mood Tracker"
              title="Mood Tracker"
            >
              <BarChart size={20} />
            </button>
            
            <button 
              onClick={onOpenResources}
              className="btn btn-outline p-2"
              aria-label="Resources"
              title="Resources"
            >
              <HelpCircle size={20} />
            </button>
            
            <button 
              onClick={onOpenSettings}
              className="btn btn-outline p-2"
              aria-label="Settings"
              title="Settings"
            >
              <Settings size={20} />
            </button>
            
            <div className="border-l border-gray-300 dark:border-gray-600 h-6 mx-1"></div>
            
            <button
              onClick={() => setTheme('light')}
              className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="Light mode"
              title="Light mode"
            >
              <Sun size={20} className="text-yellow-500" />
            </button>
            
            <button
              onClick={() => setTheme('dark')}
              className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="Dark mode"
              title="Dark mode"
            >
              <Moon size={20} className="text-indigo-400" />
            </button>
            
            <button
              onClick={() => setTheme('system')}
              className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
              aria-label="System theme"
              title="System theme"
            >
              <Monitor size={20} />
            </button>
          </div>
          
          <button 
            onClick={toggleMenu} 
            className="md:hidden btn btn-outline p-2"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-20 py-2 px-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col space-y-2">
            <button 
              onClick={() => handleAction(onOpenMoodTracker)}
              className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <BarChart size={20} />
              <span>Mood Tracker</span>
            </button>
            
            <button 
              onClick={() => handleAction(onOpenResources)}
              className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HelpCircle size={20} />
              <span>Resources</span>
            </button>
            
            <button 
              onClick={() => handleAction(onOpenSettings)}
              className="flex items-center space-x-2 py-2 px-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <Settings size={20} />
              <span>Settings</span>
            </button>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Theme</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    setTheme('light');
                    setMenuOpen(false);
                  }}
                  className={`p-2 rounded-full ${theme === 'light' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  aria-label="Light mode"
                >
                  <Sun size={20} className="text-yellow-500" />
                </button>
                
                <button
                  onClick={() => {
                    setTheme('dark');
                    setMenuOpen(false);
                  }}
                  className={`p-2 rounded-full ${theme === 'dark' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  aria-label="Dark mode"
                >
                  <Moon size={20} className="text-indigo-400" />
                </button>
                
                <button
                  onClick={() => {
                    setTheme('system');
                    setMenuOpen(false);
                  }}
                  className={`p-2 rounded-full ${theme === 'system' ? 'bg-gray-200 dark:bg-gray-700' : ''}`}
                  aria-label="System theme"
                >
                  <Monitor size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;