import React from 'react';
import { Wifi, Database, WifiOff, Shield } from 'lucide-react';
import { useConnection } from '../context/ConnectionContext';

const ConnectionStatus: React.FC = () => {
  const { websocket, ethereum, connectWebsocket, connectEthereum } = useConnection();

  return (
    <div className="flex flex-wrap items-center gap-4">
      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full 
          transition-all duration-300 
          ${websocket === 'connected' ? 'bg-green-900/40 text-green-400' : 
            websocket === 'connecting' ? 'bg-yellow-900/40 text-yellow-400' : 
            'bg-red-900/40 text-red-400'}`}
      >
        {websocket === 'connected' ? (
          <Wifi size={16} className="animate-pulse-slow" />
        ) : websocket === 'connecting' ? (
          <Wifi size={16} className="animate-pulse" />
        ) : (
          <WifiOff size={16} />
        )}
        <span className="text-sm font-medium">
          {websocket === 'connected' ? 'WebSocket Connected' : 
            websocket === 'connecting' ? 'Connecting...' : 
            'WebSocket Disconnected'}
        </span>
      </div>

      <div 
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full 
          transition-all duration-300 
          ${ethereum === 'connected' ? 'bg-green-900/40 text-green-400' : 
            ethereum === 'connecting' ? 'bg-yellow-900/40 text-yellow-400' : 
            'bg-red-900/40 text-red-400'}`}
      >
        {ethereum === 'connected' ? (
          <Database size={16} className="animate-pulse-slow" />
        ) : ethereum === 'connecting' ? (
          <Database size={16} className="animate-pulse" />
        ) : (
          <Database size={16} />
        )}
        <span className="text-sm font-medium">
          {ethereum === 'connected' ? 'Blockchain Connected' : 
            ethereum === 'connecting' ? 'Connecting...' : 
            'Blockchain Disconnected'}
        </span>
        {ethereum === 'disconnected' && (
          <button 
            onClick={connectEthereum}
            className="ml-2 text-xs bg-indigo-600/70 hover:bg-indigo-600 px-2 py-0.5 rounded transition-colors"
          >
            Connect
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;