import React, { createContext, useContext, useState, useEffect } from 'react';

type ConnectionStatus = 'connected' | 'disconnected' | 'connecting';

interface ConnectionState {
  websocket: ConnectionStatus;
  ethereum: ConnectionStatus;
  connectWebsocket: () => void;
  connectEthereum: () => void;
}

const ConnectionContext = createContext<ConnectionState | undefined>(undefined);

export const ConnectionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [websocketStatus, setWebsocketStatus] = useState<ConnectionStatus>('disconnected');
  const [ethereumStatus, setEthereumStatus] = useState<ConnectionStatus>('disconnected');

  const connectWebsocket = () => {
    // This would be replaced with actual WebSocket connection logic
    setWebsocketStatus('connecting');
    setTimeout(() => {
      setWebsocketStatus('connected');
    }, 1500);
  };

  const connectEthereum = () => {
    // This would be replaced with actual Ethereum connection logic
    setEthereumStatus('connecting');
    setTimeout(() => {
      setEthereumStatus('connected');
    }, 2000);
  };

  useEffect(() => {
    // Auto-connect websocket on component mount
    connectWebsocket();
  }, []);

  const value = {
    websocket: websocketStatus,
    ethereum: ethereumStatus,
    connectWebsocket,
    connectEthereum,
  };

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
};

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (context === undefined) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};