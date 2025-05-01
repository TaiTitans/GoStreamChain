import React, { createContext, useContext, useState } from 'react';
import { useConnection } from './ConnectionContext';

interface RoomState {
  isJoined: boolean;
  roomId: string | null;
  clientId: string | null;
  joinRoom: (roomId: string, clientId: string) => void;
  leaveRoom: () => void;
  sendOffer: (offer: RTCSessionDescriptionInit) => void;
}

const initialState: RoomState = {
  isJoined: false,
  roomId: null,
  clientId: null,
  joinRoom: () => {},
  leaveRoom: () => {},
  sendOffer: () => {}
};

export const RoomContext = createContext<RoomState>(initialState);

export const useRoom = () => {
  const context = useContext(RoomContext);
  if (context === undefined) {
    throw new Error('useRoom must be used within a RoomProvider');
  }
  return context;
};

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { ws, connectWebsocket } = useConnection();
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [clientId, setClientId] = useState<string | null>(null);

  const joinRoom = (roomId: string, clientId: string) => {
    if (!ws) {
      // Connect WebSocket first with clientId
      connectWebsocket(clientId);
      return;
    }

    // Send join message with correct format
    ws.send(JSON.stringify({
      type: 'join',
      roomID: roomId
    }));

    setRoomId(roomId);
    setClientId(clientId);
    setIsJoined(true);
  };

  const sendOffer = (offer: RTCSessionDescriptionInit) => {
    if (!ws || !roomId) return;

    ws.send(JSON.stringify({
      type: 'offer',
      roomID: roomId,
      payload: offer
    }));
  };

  return (
    <RoomContext.Provider value={{
      isJoined,
      roomId,
      clientId,
      joinRoom,
      leaveRoom: () => {
        setIsJoined(false);
        setRoomId(null);
        setClientId(null);
      },
      sendOffer
    }}>
      {children}
    </RoomContext.Provider>
  );
};