import React from 'react';
import { Message } from '../types';
import { formatDate } from '../utils/helpers';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
  isLatest: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isLatest }) => {
  const isUser = message.role === 'user';
  
  return (
    <div 
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-in`}
      style={{ animationDelay: isLatest ? '0.1s' : '0s' }}
    >
      <div className={`flex max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${
          isUser ? 'ml-2 bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300' : 
          'mr-2 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
        }`}>
          {isUser ? <User size={20} /> : <Bot size={20} />}
        </div>
        
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 rounded-2xl ${
            isUser ? 
            'bg-primary-600 text-white dark:bg-primary-700' : 
            'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
          }`}>
            <div className="prose dark:prose-invert max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          <span className="text-xs text-gray-500 mt-1">
            {formatDate(message.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;