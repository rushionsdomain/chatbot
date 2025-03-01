import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { formatFullDate, getEmotionColor } from '../utils/helpers';

interface MoodTrackerProps {
  onClose: () => void;
}

const MoodTracker: React.FC<MoodTrackerProps> = ({ onClose }) => {
  const { moodLogs, addMoodLog, getMoodTrend } = useMood();
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [view, setView] = useState<'input' | 'history'>('input');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedMood) return;
    
    addMoodLog(selectedMood as any, note);
    setSelectedMood(null);
    setNote('');
    setView('history');
  };
  
  const moodOptions = [
    { value: 'great', label: 'Great', emoji: '😄' },
    { value: 'good', label: 'Good', emoji: '🙂' },
    { value: 'okay', label: 'Okay', emoji: '😐' },
    { value: 'bad', label: 'Bad', emoji: '😔' },
    { value: 'terrible', label: 'Terrible', emoji: '😢' },
  ];
  
  const trend = getMoodTrend();
  const trendMessages = {
    improving: "Your mood seems to be improving. Keep up the good work!",
    declining: "Your mood appears to be declining. Would you like to talk about what's bothering you?",
    stable: "Your mood has been stable lately.",
    fluctuating: "Your mood has been fluctuating. This is normal - emotions naturally vary.",
    insufficient: "Log your mood regularly to see trends and patterns.",
  };
  
  const sortedLogs = [...moodLogs].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold">Mood Tracker</h2>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setView('input')}
            className={`flex-1 py-2 px-4 text-center ${
              view === 'input' 
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500' 
                : 'text-gray-500'
            }`}
          >
            Log Mood
          </button>
          <button
            onClick={() => setView('history')}
            className={`flex-1 py-2 px-4 text-center ${
              view === 'history' 
                ? 'border-b-2 border-primary-600 text-primary-600 dark:border-primary-500 dark:text-primary-500' 
                : 'text-gray-500'
            }`}
          >
            History
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {view === 'input' ? (
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  How are you feeling right now?
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {moodOptions.map((mood) => (
                    <button
                      key={mood.value}
                      type="button"
                      onClick={() => setSelectedMood(mood.value)}
                      className={`flex flex-col items-center p-3 rounded-lg border ${
                        selectedMood === mood.value
                          ? 'border-primary-600 bg-primary-50 dark:border-primary-500 dark:bg-primary-900'
                          : 'border-gray-300 hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-2xl mb-1">{mood.emoji}</span>
                      <span className="text-xs">{mood.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="note" className="block text-sm font-medium mb-2">
                  Add a note (optional)
                </label>
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="What's contributing to your mood?"
                  className="input h-24 resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={!selectedMood}
                className={`w-full btn ${
                  selectedMood ? 'btn-primary' : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-gray-700'
                }`}
              >
                Save Mood
              </button>
            </form>
          ) : (
            <div>
              <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4">
                <h3 className="font-medium mb-1">Mood Trend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {trendMessages[trend]}
                </p>
              </div>
              
              {sortedLogs.length > 0 ? (
                <div className="space-y-3">
                  {sortedLogs.map((log) => (
                    <div 
                      key={log.id} 
                      className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-sm"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full ${getEmotionColor(log.mood)} mr-2`}></div>
                          <span className="font-medium capitalize">{log.mood}</span>
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatFullDate(log.timestamp)}
                        </span>
                      </div>
                      {log.note && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">{log.note}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No mood logs yet.</p>
                  <p className="text-sm mt-1">Start tracking your mood to see your history.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoodTracker;