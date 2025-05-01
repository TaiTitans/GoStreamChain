import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';
import { useRoom } from '../context/RoomContext';
import { ChatProvider, useChat } from '../context/ChatContext';
import { useConnection } from '../context/ConnectionContext';

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const ChatContent: React.FC = () => {
  const { isJoined } = useRoom(); // Remove unused clientId
  const { messages, sendMessage } = useChat();
  const { ethereum } = useConnection();
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    if (ethereum !== 'connected') {
      alert('Please connect to Ethereum network first');
      return;
    }
    
    try {
      await sendMessage(newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Rest of the component remains unchanged
  if (!isJoined) {
    return (
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center text-slate-400">
        <MessageSquare size={48} className="mx-auto mb-4 text-slate-500" />
        <h3 className="text-xl font-medium text-white mb-2">Chat Unavailable</h3>
        <p>Join a room to use the chat</p>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-4 h-full flex flex-col fade-in">
      <h2 className="text-xl font-semibold text-white mb-4">Chat</h2>
      
      <div className="messages-container flex-grow mb-4 p-2">
        {messages.length === 0 ? (
          <div className="text-center py-8 text-slate-400">
            <MessageSquare size={32} className="mx-auto mb-2 opacity-50" />
            <p>No messages yet</p>
            <p className="text-sm">Start the conversation</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`mb-3 max-w-[85%] ${msg.isLocal ? 'ml-auto' : 'mr-auto'} slide-up`}
            >
              <div 
                className={`rounded-lg px-3 py-2 ${
                  msg.isLocal 
                    ? 'bg-indigo-600/70 text-white rounded-br-none' 
                    : 'bg-slate-700 text-white rounded-bl-none'
                }`}
              >
                {msg.content}
              </div>
              <div className={`text-xs mt-1 text-slate-400 flex items-center ${
                msg.isLocal ? 'justify-end' : 'justify-start'
              }`}>
                <span>{msg.isLocal ? 'You' : msg.sender}</span>
                <span className="mx-1">•</span>
                <span>{formatTime(msg.timestamp)}</span>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a message..."
          className="flex-grow bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={!newMessage.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

const ChatInterface: React.FC = () => {
  return (
    <ChatProvider>
      <ChatContent />
    </ChatProvider>
  );
};

export default ChatInterface;