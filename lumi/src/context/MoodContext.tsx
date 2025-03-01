import React, { createContext, useContext, useState, useEffect } from 'react';
import { MoodLog } from '../types';
import { generateUniqueId } from '../utils/helpers';

interface MoodContextType {
  moodLogs: MoodLog[];
  addMoodLog: (mood: MoodLog['mood'], note?: string) => void;
  clearMoodLogs: () => void;
  getMoodTrend: () => 'improving' | 'declining' | 'stable' | 'fluctuating' | 'insufficient';
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    const savedLogs = localStorage.getItem('mood-logs');
    return savedLogs ? JSON.parse(savedLogs) : [];
  });
  
  useEffect(() => {
    localStorage.setItem('mood-logs', JSON.stringify(moodLogs));
  }, [moodLogs]);
  
  const addMoodLog = (mood: MoodLog['mood'], note?: string) => {
    const newLog: MoodLog = {
      id: generateUniqueId(),
      mood,
      note,
      timestamp: new Date(),
    };
    
    setMoodLogs((prev) => [...prev, newLog]);
  };
  
  const clearMoodLogs = () => {
    setMoodLogs([]);
  };
  
  const getMoodTrend = (): 'improving' | 'declining' | 'stable' | 'fluctuating' | 'insufficient' => {
    if (moodLogs.length < 3) {
      return 'insufficient';
    }
    
    const moodValues = {
      'terrible': 1,
      'bad': 2,
      'okay': 3,
      'good': 4,
      'great': 5,
    };
    
    // Get the last 7 logs or all if less than 7
    const recentLogs = [...moodLogs]
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 7);
    
    const moodScores = recentLogs.map(log => moodValues[log.mood]);
    
    // Calculate trend
    let improving = true;
    let declining = true;
    let stable = true;
    
    for (let i = 1; i < moodScores.length; i++) {
      if (moodScores[i] < moodScores[i - 1]) {
        improving = false;
      }
      if (moodScores[i] > moodScores[i - 1]) {
        declining = false;
      }
      if (moodScores[i] !== moodScores[i - 1]) {
        stable = false;
      }
    }
    
    if (improving) return 'improving';
    if (declining) return 'declining';
    if (stable) return 'stable';
    return 'fluctuating';
  };
  
  return (
    <MoodContext.Provider value={{ moodLogs, addMoodLog, clearMoodLogs, getMoodTrend }}>
      {children}
    </MoodContext.Provider>
  );
};

export const useMood = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};