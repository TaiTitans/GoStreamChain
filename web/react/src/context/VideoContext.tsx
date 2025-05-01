import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRoom } from './RoomContext';

interface VideoState {
  localStream: MediaStream | null;
  remoteStream: MediaStream | null;
  localVideoEnabled: boolean;
  localAudioEnabled: boolean;
  toggleVideo: () => void;
  toggleAudio: () => void;
}

const VideoContext = createContext<VideoState | undefined>(undefined);

export const VideoProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { isJoined } = useRoom();
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [localVideoEnabled, setLocalVideoEnabled] = useState(true);
  const [localAudioEnabled, setLocalAudioEnabled] = useState(true);

  useEffect(() => {
    const setupLocalStream = async () => {
      if (isJoined) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ 
            video: true, 
            audio: true 
          });
          setLocalStream(stream);
        } catch (error) {
          console.error('Error accessing media devices:', error);
        }
      } else {
        if (localStream) {
          localStream.getTracks().forEach(track => track.stop());
          setLocalStream(null);
        }
        setRemoteStream(null);
      }
    };

    setupLocalStream();

    // Cleanup function
    return () => {
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isJoined]);

  // Mock the remote stream for demo purposes
  useEffect(() => {
    if (isJoined && localStream) {
      // In a real app, this would come from WebRTC peer connection
      // For demo, we'll set remote stream after a delay
      const timer = setTimeout(() => {
        setRemoteStream(localStream);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isJoined, localStream]);

  const toggleVideo = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setLocalVideoEnabled(videoTrack.enabled);
      }
    }
  };

  const toggleAudio = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setLocalAudioEnabled(audioTrack.enabled);
      }
    }
  };

  const value = {
    localStream,
    remoteStream,
    localVideoEnabled,
    localAudioEnabled,
    toggleVideo,
    toggleAudio,
  };

  return (
    <VideoContext.Provider value={value}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (context === undefined) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};