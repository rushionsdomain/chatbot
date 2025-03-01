import React, { useState, useRef, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ChatProvider, useChat } from './context/ChatContext';
import { MoodProvider } from './context/MoodContext';
import Header from './components/Header';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import MoodTracker from './components/MoodTracker';
import Settings from './components/Settings';
import Resources from './components/Resources';
import QuickMoodCheck from './components/QuickMoodCheck';
import WelcomeMessage from './components/WelcomeMessage';

const ChatContainer: React.FC = () => {
  const { messages } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showMoodTracker, setShowMoodTracker] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showResources, setShowResources] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="flex flex-col h-screen">
      <Header 
        onOpenMoodTracker={() => setShowMoodTracker(true)}
        onOpenSettings={() => setShowSettings(true)}
        onOpenResources={() => setShowResources(true)}
      />
      
      <main className="flex-1 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto p-4">
          <div className="max-w-3xl mx-auto">
            {showWelcome && (
              <WelcomeMessage 
                onOpenMoodTracker={() => setShowMoodTracker(true)}
                onOpenSettings={() => setShowSettings(true)}
                onOpenResources={() => setShowResources(true)}
              />
            )}
            
            {messages.length > 0 && showWelcome && (
              <QuickMoodCheck />
            )}
            
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  isLatest={index === messages.length - 1}
                />
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="max-w-3xl mx-auto">
            <ChatInput />
          </div>
        </div>
      </main>
      
      {showMoodTracker && <MoodTracker onClose={() => setShowMoodTracker(false)} />}
      {showSettings && <Settings onClose={() => setShowSettings(false)} />}
      {showResources && <Resources onClose={() => setShowResources(false)} />}
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <ChatProvider>
        <MoodProvider>
          <ChatContainer />
        </MoodProvider>
      </ChatProvider>
    </ThemeProvider>
  );
}

export default App;