import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  ChevronDown,
  ExternalLink
} from 'lucide-react';
import { JainLogo } from './JainLogo';

interface LithosSpotlightHeroProps {
  onBackToHome?: () => void;
  onSwitchToCampusStory?: () => void;
  onOpenOrientation?: () => void;
  onOpenAdmin?: () => void;
  onOpenTimetable?: () => void;
  onOpenHostel?: () => void;
  initialOpenDrawer?: boolean;
}

export const LithosSpotlightHero: React.FC<LithosSpotlightHeroProps> = ({
  onBackToHome,
  onSwitchToCampusStory,
  onOpenOrientation,
  onOpenAdmin,
  onOpenTimetable,
  onOpenHostel,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  // Auto-play the video and play on continuous loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().then(() => {
      setIsPlaying(true);
    }).catch(() => {
      video.muted = true;
      setIsMuted(true);
      video.play().catch(() => {});
    });
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
    } else {
      video.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full bg-black tracking-[-0.02em] overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* 1. Official Top Navigation Bar */}
      <header className="absolute top-0 left-0 right-0 z-50 px-4 sm:px-10 py-3 sm:py-4 flex items-center justify-between bg-gradient-to-b from-black/85 via-black/40 to-transparent backdrop-blur-xs">
        {/* Left: JAIN Brand Logo */}
        <button
          type="button"
          onClick={() => {
            if (onBackToHome) onBackToHome();
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="text-left select-none hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-0 p-0"
        >
          <JainLogo size="md" />
        </button>

        {/* Right: Only Official Portal */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href="https://www.jainuniversity.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 bg-white/10 hover:bg-white/20 text-white font-bold border border-white/20 px-3.5 sm:px-4 py-2 rounded-full text-xs transition-all cursor-pointer backdrop-blur-md shadow-md active:scale-95"
          >
            <span>Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* 2. Hero Video Container: Completely free of text overlays, playing continuously on loop */}
      <section className="relative w-full overflow-hidden h-[100dvh] min-h-[500px] sm:min-h-[640px] max-h-[1080px] bg-black">
        {/* Background Campus Drone Video: loops continuously */}
        <video
          ref={videoRef}
          src="https://erpfet.jainuniversity.ac.in/uploads/banner/jain_main.mp4"
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          preload="auto"
        />

        {/* Subtle, soft top vignette to guarantee top bar readability without darkening the video footage */}
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-black/75 to-transparent pointer-events-none z-20" />

        {/* Bottom subtle scroll indicator button to navigate to campus details below */}
        {onSwitchToCampusStory && (
          <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30">
            <button
              type="button"
              onClick={onSwitchToCampusStory}
              className="group flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-black/70 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white text-xs font-semibold shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer whitespace-nowrap"
            >
              <span>Explore Campus Details</span>
              <ChevronDown className="w-4 h-4 text-amber-400 group-hover:translate-y-0.5 transition-transform" />
            </button>
          </div>
        )}

        {/* Minimalist Floating Audio & Playback Controls in Bottom Right */}
        <div className="absolute bottom-6 sm:bottom-8 right-3.5 sm:right-10 z-30 flex items-center gap-1.5 sm:gap-2 bg-black/70 backdrop-blur-xl border border-white/20 p-1 sm:p-1.5 rounded-full shadow-2xl">
          <button
            type="button"
            onClick={togglePlay}
            title={isPlaying ? 'Pause Video' : 'Play Video'}
            aria-label={isPlaying ? 'Pause Video' : 'Play Video'}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center text-white transition-all cursor-pointer active:scale-95"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
          </button>

          <button
            type="button"
            onClick={toggleMute}
            title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all cursor-pointer active:scale-95 ${
              isMuted 
                ? 'bg-white/10 text-gray-300 hover:bg-white/25' 
                : 'bg-amber-400 text-black shadow-md hover:bg-amber-300'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Soft Bottom Gradient Transition to Campus Content Below */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent pointer-events-none z-20" />
      </section>
    </div>
  );
};
