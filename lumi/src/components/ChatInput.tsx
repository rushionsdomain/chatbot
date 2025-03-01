import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, X } from 'lucide-react';
import { useChat } from '../context/ChatContext';

const ChatInput: React.FC = () => {
  const [message, setMessage] = useState('');
  const { addMessage, isTyping } = useChat();
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [isRecording, setIsRecording] = useState(false);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() === '') return;
    
    addMessage(message.trim(), 'user');
    setMessage('');
    
    // Auto-focus the input after sending
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };
  
  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize the textarea
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
  };
  
  const toggleRecording = () => {
    // This would be implemented with actual speech recognition in a production app
    setIsRecording(!isRecording);
    
    if (!isRecording) {
      // Simulate starting recording
      setTimeout(() => {
        setMessage(prev => prev + "I'm feeling a bit anxious today.");
        setIsRecording(false);
      }, 3000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center">
        <textarea
          ref={inputRef}
          value={message}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder={isTyping ? "Lumi is typing..." : "Type your message..."}
          disabled={isTyping}
          className="input pr-24 py-3 min-h-[50px] max-h-[150px] resize-none"
          rows={1}
        />
        
        <div className="absolute right-2 flex space-x-1">
          {isRecording ? (
            <button
              type="button"
              onClick={toggleRecording}
              className="p-2 text-red-500 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700"
            >
              <X size={20} />
            </button>
          ) : (
            <button
              type="button"
              onClick={toggleRecording}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full dark:hover:bg-gray-700"
              aria-label="Voice input"
            >
              <Mic size={20} />
            </button>
          )}
          
          <button
            type="submit"
            disabled={message.trim() === '' || isTyping}
            className={`p-2 rounded-full ${
              message.trim() === '' || isTyping
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-primary-600 hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-gray-700'
            }`}
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
      
      {isTyping && (
        <div className="absolute -top-6 left-0 w-full text-center">
          <div className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-t-lg text-xs text-gray-500">
            Lumi is typing...
          </div>
        </div>
      )}
    </form>
  );
};

export default ChatInput;