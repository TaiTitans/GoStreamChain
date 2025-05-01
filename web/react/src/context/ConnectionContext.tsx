import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { ethers } from 'ethers';

// Declare ethereum interface with correct event types
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string }) => Promise<string[]>;
      on: (event: string, callback: (...args: any[]) => void) => void;
      removeListener: (event: string, callback: (...args: any[]) => void) => void;
    };
  }
}

const ETH_NODE_URL = import.meta.env.VITE_ETH_NODE_URL || 'http://localhost:8545';
const RECONNECT_DELAY = 5000;

type ConnectionStatus = 'disconnected' | 'connecting' | 'connected';

interface ConnectionState {
  websocket: ConnectionStatus;
  ethereum: ConnectionStatus;
  connectWebsocket: (clientId: string) => void;
  connectEthereum: () => Promise<void>;
  ws: WebSocket | null;
  provider: ethers.providers.Provider | null;
}

export const ConnectionContext = createContext<ConnectionState>({
  websocket: 'disconnected',
  ethereum: 'disconnected',
  connectWebsocket: () => {},
  connectEthereum: async () => {},
  ws: null,
  provider: null
});

export const useConnection = () => {
  const context = useContext(ConnectionContext);
  if (!context) {
    throw new Error('useConnection must be used within a ConnectionProvider');
  }
  return context;
};

export const ConnectionProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [websocket, setWebsocketStatus] = useState<ConnectionStatus>('disconnected');
  const [ethereum, setEthereumStatus] = useState<ConnectionStatus>('disconnected');
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [provider, setProvider] = useState<ethers.providers.Provider | null>(null);

  const connectWebsocket = useCallback((clientId: string) => {
    if (websocket === 'connecting') return;
    
    try {
      setWebsocketStatus('connecting');
      const newWs = new WebSocket(`ws://localhost:8080/ws?clientId=${clientId}`);
      
      newWs.onopen = () => {
        console.log('WebSocket connected');
        setWs(newWs);
        setWebsocketStatus('connected');
      };
      
      newWs.onclose = () => {
        console.log('WebSocket disconnected');
        setWebsocketStatus('disconnected');
        setWs(null);
        setTimeout(() => connectWebsocket(clientId), RECONNECT_DELAY);
      };
      
      newWs.onerror = (error) => {
        console.error('WebSocket error:', error);
        setWebsocketStatus('disconnected');
        setWs(null);
        setTimeout(() => connectWebsocket(clientId), RECONNECT_DELAY);
      };
    } catch (error) {
      console.error('WebSocket connection error:', error);
      setWebsocketStatus('disconnected');
      setTimeout(() => connectWebsocket(clientId), RECONNECT_DELAY);
    }
  }, [websocket]);

  const connectEthereum = useCallback(async () => {
    if (ethereum === 'connecting') return;

    try {
      setEthereumStatus('connecting');
      const ethereum = window.ethereum;

      if (ethereum) {
        try {
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts'
          });

          if (!accounts?.length) {
            throw new Error('No accounts available');
          }

          const provider = new ethers.providers.Web3Provider(ethereum, 'any');
          const network = await provider.getNetwork();
          console.log('Connected to network:', network.name);

          setProvider(provider);
          setEthereumStatus('connected');

        } catch (error) {
          console.error('MetaMask connection error:', error);
          setEthereumStatus('disconnected');
          setTimeout(connectEthereum, RECONNECT_DELAY);
        }
      } else {
        console.log('Using local node:', ETH_NODE_URL);
        const provider = new ethers.providers.JsonRpcProvider(ETH_NODE_URL);
        await provider.getNetwork();
        setProvider(provider);
        setEthereumStatus('connected');
      }
    } catch (error) {
      console.error('Ethereum connection error:', error);
      setEthereumStatus('disconnected');
      setTimeout(connectEthereum, RECONNECT_DELAY);
    }
  }, [ethereum]);

  useEffect(() => {
    const ethereum = window.ethereum;
    if (!ethereum) return;

    const handleChainChanged = () => {
      window.location.reload();
    };

    const handleAccountsChanged = (accounts: string[]) => {
      if (!accounts.length) {
        setEthereumStatus('disconnected');
      }
    };

    ethereum.on('chainChanged', handleChainChanged);
    ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      ethereum.removeListener('chainChanged', handleChainChanged);
      ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, []);

  useEffect(() => {
    connectEthereum();
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [connectEthereum, ws]);

  return (
    <ConnectionContext.Provider value={{
      websocket,
      ethereum,
      connectWebsocket,
      connectEthereum,
      ws,
      provider
    }}>
      {children}
    </ConnectionContext.Provider>
  );
};