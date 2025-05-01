import React from 'react';
import { Layers, MessageSquare, Video, Wifi, WifiOff } from 'lucide-react';
import ConnectionStatus from './components/ConnectionStatus';
import JoinRoom from './components/JoinRoom';
import VideoConference from './components/VideoConference';
import ChatInterface from './components/ChatInterface';
import { ConnectionProvider } from './context/ConnectionContext';
import { RoomProvider } from './context/RoomContext';
import './App.css';

function App() {
  return (
    <ConnectionProvider>
      <RoomProvider>
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
          <header className="px-4 py-4 border-b border-slate-700 bg-slate-800/70 backdrop-blur-sm">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-2 mb-3 md:mb-0">
                <Layers className="h-8 w-8 text-indigo-500" />
                <h1 className="text-2xl font-bold tracking-tight">GoStreamChain</h1>
              </div>
              <ConnectionStatus />
            </div>
          </header>

          <main className="container mx-auto px-4 py-6">
            <JoinRoom />
            
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <VideoConference />
              </div>
              <div className="lg:col-span-1">
                <ChatInterface />
              </div>
            </div>
          </main>
          
          <footer className="container mx-auto px-4 py-4 text-center text-slate-400 border-t border-slate-700 text-sm">
            <p>GoStreamChain Demo - WebRTC + Blockchain Technology</p>
          </footer>
        </div>
      </RoomProvider>
    </ConnectionProvider>
  );
}

export default App;