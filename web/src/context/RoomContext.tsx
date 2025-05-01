import React, { createContext, useContext, useState } from 'react';

interface RoomState {
  isJoined: boolean;
  roomId: string | null;
  clientId: string | null;
  joinRoom: (roomId: string, clientId: string) => void;
  leaveRoom: () => void;
}

const RoomContext = createContext<RoomState | undefined>(undefined);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const joinRoom = (roomId: string, clientId: string) => {
    setRoomId(roomId);
    setClientId(clientId);
    setIsJoined(true);
    // Here you would add the actual WebRTC connection logic
  };

  const leaveRoom = () => {
    setIsJoined(false);
    setRoomId(null);
    setClientId(null);
    // Here you would add the actual WebRTC disconnection logic
  };

  const value = {
    isJoined,
    roomId,
    clientId,
    joinRoom,
    leaveRoom,
  };

  return (
    <RoomContext.Provider value={value}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};