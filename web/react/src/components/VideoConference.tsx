import React, { useRef, useEffect } from 'react';
import { useRoom } from '../context/RoomContext';
import { VideoProvider, useVideo } from '../context/VideoContext';
import VideoControls from './VideoControls';
import { VideoOff, User } from 'lucide-react';

const VideoDisplay: React.FC<{
  stream: MediaStream | null;
  title: string;
  isLocal: boolean;
}> = ({ stream, title, isLocal }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  
  return (
    <div className="video-container bg-slate-900 rounded-lg overflow-hidden shadow-lg">
      {stream ? (
        <video 
          ref={videoRef}
          autoPlay
          playsInline
          muted={isLocal} // Mute local video to prevent echo
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="no-video">
          {isLocal ? (
            <>
              <VideoOff size={40} className="text-slate-500" />
              <p className="text-slate-400 text-center">
                Camera not connected
              </p>
            </>
          ) : (
            <>
              <User size={40} className="text-slate-500" />
              <p className="text-slate-400 text-center">
                Waiting for participant...
              </p>
            </>
          )}
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded text-xs">
        {title}
      </div>
    </div>
  );
};

const VideoConferenceContent: React.FC = () => {
  const { isJoined, clientId } = useRoom();
  const { localStream, remoteStream } = useVideo();
  
  if (!isJoined) {
    return (
      <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center text-slate-400">
        <VideoOff size={48} className="mx-auto mb-4 text-slate-500" />
        <h3 className="text-xl font-medium text-white mb-2">No Active Session</h3>
        <p>Join a room to start streaming</p>
      </div>
    );
  }
  
  return (
    <div className="bg-slate-800/70 backdrop-blur-sm border border-slate-700 rounded-lg p-4 fade-in">
      <h2 className="text-xl font-semibold text-white mb-4">Video Conference</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <VideoDisplay stream={localStream} title={`You (${clientId})`} isLocal={true} />
        <VideoDisplay stream={remoteStream} title="Remote Participant" isLocal={false} />
      </div>
      
      <VideoControls />
    </div>
  );
};

const VideoConference: React.FC = () => {
  return (
    <VideoProvider>
      <VideoConferenceContent />
    </VideoProvider>
  );
};

export default VideoConference;