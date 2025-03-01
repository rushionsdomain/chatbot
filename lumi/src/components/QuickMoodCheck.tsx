import React from 'react';
import { useMood } from '../context/MoodContext';
import { useChat } from '../context/ChatContext';

const QuickMoodCheck: React.FC = () => {
  const { addMoodLog } = useMood();
  const { addMessage } = useChat();
  
  const handleMoodSelection = (mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible') => {
    addMoodLog(mood);
    
    // Add a more detailed message to the chat based on the selected mood
    const moodMessages = {
      great: "I'm feeling really great today! I have a lot of positive energy and things are going well.",
      good: "I'm feeling pretty good today. Things are going smoothly and I'm in a positive mood.",
      okay: "I'm feeling okay today - not particularly good or bad, just somewhere in the middle.",
      bad: "I'm not feeling very well today. I've been experiencing some negative emotions that are bringing me down.",
      terrible: "I'm feeling really terrible right now. It's been a very difficult time and I'm struggling emotionally."
    };
    
    addMessage(moodMessages[mood], 'user');
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md mb-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
        How are you feeling right now?
      </h3>
      <div className="flex justify-between">
        <button
          onClick={() => handleMoodSelection('great')}
          className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Feeling great"
        >
          <span className="text-xl mb-1">😄</span>
          <span className="text-xs">Great</span>
        </button>
        
        <button
          onClick={() => handleMoodSelection('good')}
          className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Feeling good"
        >
          <span className="text-xl mb-1">🙂</span>
          <span className="text-xs">Good</span>
        </button>
        
        <button
          onClick={() => handleMoodSelection('okay')}
          className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Feeling okay"
        >
          <span className="text-xl mb-1">😐</span>
          <span className="text-xs">Okay</span>
        </button>
        
        <button
          onClick={() => handleMoodSelection('bad')}
          className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Feeling bad"
        >
          <span className="text-xl mb-1">😔</span>
          <span className="text-xs">Bad</span>
        </button>
        
        <button
          onClick={() => handleMoodSelection('terrible')}
          className="flex flex-col items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          aria-label="Feeling terrible"
        >
          <span className="text-xl mb-1">😢</span>
          <span className="text-xs">Terrible</span>
        </button>
      </div>
    </div>
  );
};

export default QuickMoodCheck;