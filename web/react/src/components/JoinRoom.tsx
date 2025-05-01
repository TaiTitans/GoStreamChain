import React, { useState } from 'react';
import { DoorOpen as Door, X, RefreshCw } from 'lucide-react';
import { useRoom } from '../context/RoomContext';

const JoinRoom: React.FC = () => {
  const { isJoined, joinRoom, leaveRoom } = useRoom();
  const [roomIdInput, setRoomIdInput] = useState('');
  const [clientIdInput, setClientIdInput] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!roomIdInput.trim()) {
      setError('Room ID is required');
      return;
    }
    
    if (!clientIdInput.trim()) {
      setError('Client ID is required');
      return;
    }
    
    setError('');
    joinRoom(roomIdInput, clientIdInput);
  };

  if (isJoined) {
    return (
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-4 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-white">Connected to Room</h2>
            <p className="text-slate-400 mt-1">Room ID: <span className="text-indigo-400">{roomIdInput}</span></p>
          </div>
          <button 
            onClick={leaveRoom}
            className="bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-full p-2 transition-colors"
            title="Leave Room"
          >
            <X size={18} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-6 fade-in">
      <h2 className="text-xl font-semibold text-white mb-4">Join a Stream</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor="roomId" className="block text-sm font-medium text-slate-300 mb-1">
            Room ID
          </label>
          <input
            type="text"
            id="roomId"
            value={roomIdInput}
            onChange={(e) => setRoomIdInput(e.target.value)}
            placeholder="Enter room identifier"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="clientId" className="block text-sm font-medium text-slate-300 mb-1">
            Client ID
          </label>
          <input
            type="text"
            id="clientId"
            value={clientIdInput}
            onChange={(e) => setClientIdInput(e.target.value)}
            placeholder="Enter your identifier"
            className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>
      
      {error && (
        <div className="bg-red-900/20 text-red-400 text-sm p-2 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="flex items-center gap-3">
        <button
          onClick={handleJoin}
          disabled={!roomIdInput || !clientIdInput}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Door size={18} />
          Join Room
        </button>
        
        <button
          onClick={() => {
            setRoomIdInput(Math.random().toString(36).substring(2, 8));
            setClientIdInput(`user-${Math.random().toString(36).substring(2, 6)}`);
          }}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          <RefreshCw size={16} />
          Generate Random IDs
        </button>
      </div>
    </div>
  );
};

export default JoinRoom;