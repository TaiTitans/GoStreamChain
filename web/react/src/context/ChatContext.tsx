import React, { createContext, useState, useEffect } from 'react';
import { useConnection } from './ConnectionContext';
import { useRoom } from './RoomContext';
import { getContract } from '../utils/contract';
import { ethers } from 'ethers';

// Define Message interface
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isLocal: boolean;
}

// Define ChatContext type
interface ChatContextType {
  messages: Message[];
  sendMessage: (content: string) => Promise<void>;
}

// Create and export ChatContext
export const ChatContext = createContext<ChatContextType>({
  messages: [],
  sendMessage: async () => {}
});

// Export useChat hook
export const useChat = () => {
  const context = React.useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { provider } = useConnection();
  const { clientId, roomId } = useRoom();
  const [messages, setMessages] = useState<Message[]>([]);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);

  // Initialize signer when provider is available
  useEffect(() => {
    const initializeSigner = async () => {
      if (provider) {
        try {
          const ethersProvider = new ethers.providers.Web3Provider(provider as any);
          const signerInstance = ethersProvider.getSigner();
          setSigner(signerInstance);
        } catch (error) {
          console.error('Failed to initialize signer:', error);
        }
      }
    };
    initializeSigner();
  }, [provider]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || !clientId || !roomId || !provider || !signer) {
      console.error('Missing required parameters:', { 
        content: !!content.trim(), 
        clientId: !!clientId, 
        roomId: !!roomId,
        provider: !!provider,
        signer: !!signer 
      });
      return;
    }

    try {
      const contract = getContract(provider).connect(signer);
      console.log('Sending message:', { roomId, clientId, content });
      
      const tx = await contract.sendMessage(roomId, clientId, content);
      console.log('Transaction sent:', tx.hash);
      
      await tx.wait();
      console.log('Transaction confirmed');

      const newMessage: Message = {
        id: Date.now().toString(),
        sender: clientId,
        content,
        timestamp: new Date(),
        isLocal: true,
      };
      
      setMessages(prev => [...prev, newMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    if (!provider || !roomId || !clientId) return;

    const contract = getContract(provider);
    const filter = contract.filters.MessageSent(roomId);
    
    const handler = (_roomId: string, senderId: string, content: string, timestamp: any) => {
      if (senderId !== clientId) {
        const newMessage: Message = {
          id: `${timestamp.toString()}-${senderId}`,
          sender: senderId,
          content,
          timestamp: new Date(timestamp.toNumber() * 1000),
          isLocal: false,
        };
        setMessages(prev => [...prev, newMessage]);
      }
    };

    contract.on(filter, handler);
    return () => {
      contract.off(filter, handler);
    };
  }, [provider, roomId, clientId]);

  return (
    <ChatContext.Provider value={{ messages, sendMessage }}>
      {children}
    </ChatContext.Provider>
  );
};