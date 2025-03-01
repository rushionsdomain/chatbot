import React from 'react';
import { Bot, BarChart, HelpCircle, Settings } from 'lucide-react';

interface WelcomeMessageProps {
  onOpenMoodTracker: () => void;
  onOpenSettings: () => void;
  onOpenResources: () => void;
}

const WelcomeMessage: React.FC<WelcomeMessageProps> = ({ 
  onOpenMoodTracker, 
  onOpenSettings,
  onOpenResources
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md mb-6">
      <div className="flex items-center mb-4">
        <div className="h-10 w-10 bg-primary-100 dark:bg-primary-900 rounded-full flex items-center justify-center mr-3">
          <Bot size={24} className="text-primary-600 dark:text-primary-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Welcome to Lumi</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Your AI mental health companion</p>
        </div>
      </div>
      
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        I'm here to provide support, guidance, and a listening ear whenever you need it. You can talk to me about how you're feeling, get coping strategies, or just chat.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <button
          onClick={onOpenMoodTracker}
          className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <BarChart size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
          <span>Track Your Mood</span>
        </button>
        
        <button
          onClick={onOpenResources}
          className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <HelpCircle size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
          <span>Mental Health Resources</span>
        </button>
        
        <button
          onClick={onOpenSettings}
          className="flex items-center p-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Settings size={20} className="text-primary-600 dark:text-primary-400 mr-2" />
          <span>Customize Lumi</span>
        </button>
      </div>
      
      <div className="text-sm text-gray-500 dark:text-gray-400">
        <p>
          <strong>Privacy Note:</strong> Your conversations are stored locally in your browser. No data is sent to external servers.
        </p>
      </div>
    </div>
  );
};

export default WelcomeMessage;