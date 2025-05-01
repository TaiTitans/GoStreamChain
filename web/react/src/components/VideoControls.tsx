import React from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff } from 'lucide-react';
import { useVideo } from '../context/VideoContext';
import { useRoom } from '../context/RoomContext';

const VideoControls: React.FC = () => {
  const { localVideoEnabled, localAudioEnabled, toggleVideo, toggleAudio } = useVideo();
  const { leaveRoom } = useRoom();
  
  return (
    <div className="flex items-center justify-center gap-3 mt-4">
      <button
        onClick={toggleAudio}
        className={`p-3 rounded-full transition-colors ${
          localAudioEnabled 
            ? 'bg-slate-700 hover:bg-slate-600 text-white' 
            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
        }`}
        title={localAudioEnabled ? 'Mute Microphone' : 'Unmute Microphone'}
      >
        {localAudioEnabled ? <Mic size={20} /> : <MicOff size={20} />}
      </button>
      
      <button
        onClick={toggleVideo}
        className={`p-3 rounded-full transition-colors ${
          localVideoEnabled 
            ? 'bg-slate-700 hover:bg-slate-600 text-white' 
            : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
        }`}
        title={localVideoEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
      >
        {localVideoEnabled ? <Video size={20} /> : <VideoOff size={20} />}
      </button>
      
      <button
        onClick={leaveRoom}
        className="p-3 bg-red-600 hover:bg-red-700 text-white rounded-full transition-colors"
        title="End Call"
      >
        <PhoneOff size={20} />
      </button>
    </div>
  );
};

export default VideoControls;