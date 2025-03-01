import React, { createContext, useContext, useState, useEffect } from 'react';
import { Message } from '../types';
import { generateUniqueId } from '../utils/helpers';

interface ChatContextType {
  messages: Message[];
  addMessage: (content: string, role: 'user' | 'assistant' | 'system') => void;
  clearMessages: () => void;
  isTyping: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const INITIAL_MESSAGES: Message[] = [
  {
    id: generateUniqueId(),
    role: 'assistant',
    content: "Hi there! I'm Lumi, your mental health companion. How are you feeling today?",
    timestamp: new Date(),
  },
];

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('chat-messages');
    return savedMessages ? JSON.parse(savedMessages) : INITIAL_MESSAGES;
  });
  
  const [isTyping, setIsTyping] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('chat-messages', JSON.stringify(messages));
  }, [messages]);
  
  const addMessage = (content: string, role: 'user' | 'assistant' | 'system') => {
    const newMessage: Message = {
      id: generateUniqueId(),
      role,
      content,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    if (role === 'user') {
      handleUserMessage(content);
    }
  };
  
  const clearMessages = () => {
    setMessages(INITIAL_MESSAGES);
  };
  
  const handleUserMessage = async (content: string) => {
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(content, messages);
      addMessage(response, 'assistant');
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };
  
  return (
    <ChatContext.Provider value={{ messages, addMessage, clearMessages, isTyping }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Enhanced response generation function with more conversational flow
function generateResponse(userMessage: string, messageHistory: Message[]): string {
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Crisis detection
  if (
    lowercaseMessage.includes('suicide') ||
    lowercaseMessage.includes('kill myself') ||
    lowercaseMessage.includes('end my life') ||
    lowercaseMessage.includes('don\'t want to live')
  ) {
    return "I'm really concerned about what you're sharing. If you're having thoughts of harming yourself, please reach out to a crisis helpline immediately. In the US, you can call or text 988 to reach the Suicide & Crisis Lifeline, available 24/7. Would you like me to provide more resources that might help? Remember that you're not alone, and there are people who care about you and want to help.";
  }
  
  // Greeting detection
  if (
    lowercaseMessage.includes('hello') ||
    lowercaseMessage.includes('hi') ||
    lowercaseMessage.includes('hey')
  ) {
    return "Hello! It's really good to connect with you today. How are you feeling right now? I'm here to listen and support you in any way I can.";
  }
  
  // Positive mood responses
  if (
    lowercaseMessage.includes('good') || 
    lowercaseMessage.includes('great') || 
    lowercaseMessage.includes('happy') || 
    lowercaseMessage.includes('wonderful') ||
    lowercaseMessage.includes('excellent') ||
    lowercaseMessage.includes('amazing')
  ) {
    return "I'm so glad to hear you're feeling good! What's contributing to your positive mood today? Recognizing these positive factors can help reinforce them in your life. Is it something specific that happened, or maybe some positive changes you've been making? I'd love to hear more about what's going well for you.";
  }
  
  // Neutral mood responses
  if (
    lowercaseMessage.includes('okay') || 
    lowercaseMessage.includes('fine') || 
    lowercaseMessage.includes('alright') ||
    lowercaseMessage.includes('not bad')
  ) {
    return "Thanks for sharing that you're feeling okay. Sometimes a neutral day is perfectly fine. Is there anything specific on your mind today that you'd like to talk about? Or perhaps there's something you're looking forward to that might brighten your day a bit more?";
  }
  
  // Negative mood responses - more detailed and supportive
  if (
    lowercaseMessage.includes('sad') || 
    lowercaseMessage.includes('depressed') ||
    lowercaseMessage.includes('down') ||
    lowercaseMessage.includes('unhappy') ||
    lowercaseMessage.includes('miserable')
  ) {
    return "I'm really sorry to hear you're feeling down. That's difficult, and I appreciate you sharing this with me. Would you like to talk about what might be contributing to these feelings? Sometimes putting our thoughts into words can help us process them better. Remember that feeling sad is a normal part of being human, and these feelings won't last forever. Would it help to explore some gentle activities that might lift your mood a bit, or would you prefer to talk more about what's troubling you?";
  }
  
  // Anxiety and stress responses - more detailed and supportive
  if (
    lowercaseMessage.includes('anxious') || 
    lowercaseMessage.includes('stressed') ||
    lowercaseMessage.includes('overwhelmed') ||
    lowercaseMessage.includes('worried') ||
    lowercaseMessage.includes('nervous') ||
    lowercaseMessage.includes('panic')
  ) {
    return "I can hear that you're feeling anxious or stressed right now, and that's really tough to experience. Let's take a moment to pause together. Could you try taking a slow, deep breath with me? Breathe in for 4 counts, hold for 4, and exhale for 6. How are you feeling physically right now? Sometimes anxiety shows up in our bodies as tension, racing heart, or shallow breathing. Would it help to talk about what's triggering these feelings for you? I'm here to listen without judgment and help you work through this.";
  }
  
  // Tired or exhausted
  if (
    lowercaseMessage.includes('tired') || 
    lowercaseMessage.includes('exhausted') ||
    lowercaseMessage.includes('fatigued') ||
    lowercaseMessage.includes('no energy')
  ) {
    return "I hear that you're feeling tired or exhausted. That can make everything else feel more difficult to handle. Have you been able to get enough rest lately? Sometimes our mental and physical energy are closely connected. What do you think might be contributing to this fatigue? Is it physical, emotional, or perhaps both? Taking small breaks throughout the day and being gentle with yourself can sometimes help when you're feeling depleted.";
  }
  
  // Loneliness
  if (
    lowercaseMessage.includes('lonely') || 
    lowercaseMessage.includes('alone') ||
    lowercaseMessage.includes('no friends') ||
    lowercaseMessage.includes('isolated')
  ) {
    return "Feeling lonely can be really painful, and I'm sorry you're experiencing that. Even when we're surrounded by people, we can sometimes feel disconnected or misunderstood. Would you like to talk about what's contributing to these feelings of loneliness? Are there any small connections you might be able to make today - perhaps reaching out to someone, even briefly? Remember that many people feel lonely at times, and it doesn't mean there's anything wrong with you. Would it help to explore some ways to feel more connected?";
  }
  
  // Anger or frustration
  if (
    lowercaseMessage.includes('angry') || 
    lowercaseMessage.includes('mad') ||
    lowercaseMessage.includes('frustrated') ||
    lowercaseMessage.includes('annoyed') ||
    lowercaseMessage.includes('irritated')
  ) {
    return "I can understand feeling angry or frustrated - these are completely valid emotions. Sometimes anger is telling us that a boundary has been crossed or a need isn't being met. Would you like to talk about what's triggering these feelings for you? Taking a moment to acknowledge your anger without judgment can sometimes help process it. What do you think might help you release some of this tension in a healthy way?";
  }
  
  // Help request
  if (
    lowercaseMessage.includes('help') ||
    lowercaseMessage.includes('advice') ||
    lowercaseMessage.includes('suggestion') ||
    lowercaseMessage.includes('need support')
  ) {
    return "I'm here to help and support you. To better understand what you're going through, could you share a bit more about the specific situation or feelings you're experiencing? The more I understand about what you're facing, the better I can tailor my support to your needs. Would you feel comfortable sharing a little more about what's on your mind?";
  }
  
  // Gratitude or appreciation
  if (
    lowercaseMessage.includes('thank') ||
    lowercaseMessage.includes('appreciate') ||
    lowercaseMessage.includes('grateful')
  ) {
    return "You're very welcome. It means a lot to me that our conversation is helpful for you. I'm here whenever you need someone to talk to. Is there anything specific you'd like to explore or discuss further today?";
  }
  
  // If the user is sharing something about their day or life
  if (
    lowercaseMessage.includes('today') ||
    lowercaseMessage.includes('happened') ||
    lowercaseMessage.includes('work') ||
    lowercaseMessage.includes('school') ||
    lowercaseMessage.includes('family') ||
    lowercaseMessage.includes('friend')
  ) {
    return "Thank you for sharing that with me. It sounds like this is something significant in your life right now. How has this been affecting you emotionally? Sometimes talking through our experiences can help us process them better. Is there a particular aspect of this situation that's been on your mind the most?";
  }
  
  // Default responses - more varied and conversational
  const defaultResponses = [
    "Thank you for sharing that with me. Could you tell me more about how that makes you feel? I'm interested in understanding your experience better.",
    
    "I appreciate you opening up. What do you think might help you navigate this situation? Sometimes talking through options can help clarify our thoughts.",
    
    "I'm here to listen and support you. Would you like to explore some potential strategies together, or would you prefer to continue sharing what's on your mind?",
    
    "That sounds challenging. Remember to be kind to yourself during difficult times - you deserve compassion. Is there a specific aspect of this you'd like to focus on?",
    
    "I'm following what you're saying. How long have you been feeling this way? Sometimes understanding patterns in our emotions can be helpful.",
    
    "Thank you for trusting me with this. What would feel most supportive for you right now - exploring some coping strategies, simply being heard, or something else entirely?",
    
    "I'm listening and I care about what you're going through. Would it help to talk about how these feelings or experiences are affecting your daily life?",
    
    "I hear you. Sometimes just putting our thoughts into words can help us see things more clearly. Is there anything else on your mind that you'd like to share?"
  ];
  
  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}