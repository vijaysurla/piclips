'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface VideoPlayerProps {
  src: string;
  thumbnailUrl?: string;
  isActive: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, thumbnailUrl, isActive }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setError(null);
    
    if (videoRef.current) {
      const video = videoRef.current;

      const onLoadedMetadata = () => {
        console.log('Video metadata loaded:', src);
      };

      const onLoadedData = () => {
        console.log('Video data loaded:', src);
        setShowThumbnail(false);
      };

      const onPlay = () => {
        console.log('Video started playing:', src);
        setIsPlaying(true);
        setShowThumbnail(false);
      };

      const onPause = () => {
        console.log('Video paused:', src);
        setIsPlaying(false);
      };

      const onError = (e: Event) => {
        const target = e.target as HTMLVideoElement;
        console.error('Video error:', target.error);
        setError(`Error: ${target.error?.message || 'Unknown error'}`);
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('loadeddata', onLoadedData);
      video.addEventListener('play', onPlay);
      video.addEventListener('pause', onPause);
      video.addEventListener('error', onError);

      return () => {
        video.removeEventListener('loadedmetadata', onLoadedMetadata);
        video.removeEventListener('loadeddata', onLoadedData);
        video.removeEventListener('play', onPlay);
        video.removeEventListener('pause', onPause);
        video.removeEventListener('error', onError);
      };
    }
  }, [src]);

  useEffect(() => {
    if (isActive && videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error('Autoplay prevented:', err);
        // If autoplay fails, we'll keep the video muted and try again
        if (!isMuted) {
          setIsMuted(true);
          videoRef.current!.muted = true;
          videoRef.current!.play().catch(err => {
            console.error('Muted autoplay also prevented:', err);
            setError('Autoplay prevented. Please tap to play.');
          });
        }
      });
    } else if (!isActive && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isActive, isMuted]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(err => {
          console.error('Play prevented:', err);
          setError('Unable to play video. Please try again.');
        });
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      setIsMuted(!isMuted);
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <div className="relative w-full h-full">
      {showThumbnail && thumbnailUrl && (
        <div className="absolute inset-0">
          <Image
            src={thumbnailUrl}
            alt="Video thumbnail"
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        loop
        playsInline
        muted={isMuted}
        preload="auto"
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <p className="text-white text-center p-4">{error}</p>
        </div>
      )}
      <div 
        className="absolute inset-0 flex items-center justify-center cursor-pointer" 
        onClick={togglePlay}
      >
        {!isPlaying && (
          <div className="bg-black bg-opacity-50 rounded-full p-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </div>
        )}
      </div>
      <div 
        className="absolute bottom-4 right-4 bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
        onClick={toggleMute}
      >
        {isMuted ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;





















