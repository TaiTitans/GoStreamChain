import React, { createContext, useContext, useState } from 'react';
import { useRoom } from './RoomContext';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isLocal: boolean;
}

interface ChatState {
  messages: Message[];
  sendMessage: (content: string) => void;
}

const ChatContext = createContext<ChatState | undefined>(undefined);

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { clientId } = useRoom();
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = (content: string) => {
    if (!content.trim() || !clientId) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      sender: clientId,
      content,
      timestamp: new Date(),
      isLocal: true,
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Here you would send the message via WebRTC data channel
    // For demo purposes, let's simulate receiving a response
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'Remote User',
        content: `Response to: ${content}`,
        timestamp: new Date(),
        isLocal: false,
      };
      setMessages(prev => [...prev, response]);
    }, 1000);
  };

  const value = {
    messages,
    sendMessage,
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};