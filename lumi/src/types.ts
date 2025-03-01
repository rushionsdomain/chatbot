export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

export interface MoodLog {
  id: string;
  mood: 'great' | 'good' | 'okay' | 'bad' | 'terrible';
  note?: string;
  timestamp: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
  textToSpeech: boolean;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: 'article' | 'video' | 'exercise' | 'hotline' | 'other';
  tags: string[];
}