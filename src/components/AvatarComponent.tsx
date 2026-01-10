'use client';

import { useEffect, useRef, useState } from 'react';
import StreamingAvatar, {
  AvatarQuality,
  StreamingEvents,
  TaskType,
  VoiceChatTransport,
} from '@heygen/streaming-avatar';

export default function AvatarComponent() {
  const [isLoadingSession, setIsLoadingSession] = useState(false);
  const [isLoadingRepeat, setIsLoadingRepeat] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [text, setText] = useState('');
  const [chatMode, setChatMode] = useState('text');
  const [isUserTalking, setIsUserTalking] = useState(false);
  const avatarId = process.env.NEXT_PUBLIC_AVATAR_ID || 'ba7401f5391344f3a1769ad024c7205d';
  const voiceId = process.env.NEXT_PUBLIC_VOICE_ID || '84d29094d8c8472885624bd30c06459e';
  
  const mediaStream = useRef<HTMLVideoElement>(null);
  const avatar = useRef<StreamingAvatar | null>(null);

  async function fetchAccessToken() {
    try {
      const response = await fetch('/api/token', {
        method: 'POST',
      });
      const data = await response.json();
      return data.data.token;
    } catch (error) {
      console.error('Error fetching access token:', error);
      throw error;
    }
  }

  async function startSession() {
    setIsLoadingSession(true);
    try {
      const token = await fetchAccessToken();
      
      avatar.current = new StreamingAvatar({ token });
      
      avatar.current.on(StreamingEvents.AVATAR_START_TALKING, (e) => {
        console.log('Avatar started talking', e);
      });
      
      avatar.current.on(StreamingEvents.AVATAR_STOP_TALKING, (e) => {
        console.log('Avatar stopped talking', e);
      });
      
      avatar.current.on(StreamingEvents.STREAM_DISCONNECTED, () => {
        console.log('Stream disconnected');
        endSession();
      });
      
      avatar.current.on(StreamingEvents.STREAM_READY, (event) => {
        console.log('Stream ready:', event);
        setStream(event.detail);
      });
      
      avatar.current.on(StreamingEvents.USER_START, () => {
        console.log('User started talking');
        setIsUserTalking(true);
      });
      
      avatar.current.on(StreamingEvents.USER_STOP, () => {
        console.log('User stopped talking');
        setIsUserTalking(false);
      });

      const sessionInfo = await avatar.current.createStartAvatar({
        quality: AvatarQuality.Low,
        avatarName: avatarId || 'default',
        voice: {
          voiceId: voiceId || 'default',
        },
        language: 'en',
        knowledgeId: process.env.NEXT_PUBLIC_KNOWLEDGE_BASE_ID,
        voiceChatTransport: VoiceChatTransport.WEBSOCKET,
      });

      console.log('Session started:', sessionInfo);
    } catch (error) {
      console.error('Error starting session:', error);
    } finally {
      setIsLoadingSession(false);
    }
  }

  async function handleSpeak() {
    setIsLoadingRepeat(true);
    if (!avatar.current) {
      console.error('Avatar not initialized');
      return;
    }
    
    try {
      await avatar.current.speak({
        text: text,
        task_type: TaskType.TALK,
      });
      setText('');
    } catch (error) {
      console.error('Error speaking:', error);
    } finally {
      setIsLoadingRepeat(false);
    }
  }

  async function handleInterrupt() {
    if (!avatar.current) {
      console.error('Avatar not initialized');
      return;
    }
    await avatar.current.interrupt();
  }

  async function endSession() {
    if (!avatar.current) {
      return;
    }
    await avatar.current.stopAvatar();
    setStream(null);
  }

  async function startVoiceChat() {
    if (!avatar.current) {
      console.error('Avatar not initialized');
      return;
    }
    await avatar.current.startVoiceChat();
    setChatMode('voice');
  }

  async function closeVoiceChat() {
    if (!avatar.current) {
      console.error('Avatar not initialized');
      return;
    }
    await avatar.current.closeVoiceChat();
    setChatMode('text');
  }

  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [stream]);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex gap-2 justify-center">
        {!stream ? (
          <img
            src="https://i.postimg.cc/dtzVr981/IMG-6934.jpg"
            alt="Start Session"
            onClick={!isLoadingSession ? startSession : undefined}
            className={`w-[800px] h-[800px] object-cover cursor-pointer ${isLoadingSession ? 'opacity-50 cursor-not-allowed' : ''}`}
          />
        ) : (
          <button
            onClick={endSession}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            End Session
          </button>
        )}
      </div>

      {stream && (
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-lg">
            <video
              ref={mediaStream}
              autoPlay
              playsInline
              className="w-full h-auto"
              style={{ 
                objectFit: 'cover',
                clipPath: 'inset(0 0 15% 0)'
              }}
            >
              <track kind="captions" />
            </video>
            {isUserTalking && (
              <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded z-10">
                Speaking...
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {chatMode === 'text' ? (
              <button
                onClick={startVoiceChat}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Start Voice Chat
              </button>
            ) : (
              <button
                onClick={closeVoiceChat}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Stop Voice Chat
              </button>
            )}
          </div>

          {chatMode === 'text' && (
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSpeak();
                  }
                }}
                className="flex-1 border rounded px-4 py-2"
              />
              <button
                onClick={handleSpeak}
                disabled={!text || isLoadingRepeat}
                className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
              >
                {isLoadingRepeat ? 'Sending...' : 'Send'}
              </button>
              <button
                onClick={handleInterrupt}
                className="bg-orange-500 text-white px-4 py-2 rounded"
              >
                Interrupt
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
