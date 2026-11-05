import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  Sun, 
  Wind, 
  MapPin, 
  GraduationCap
} from 'lucide-react';

export const LiveCampusWidget: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const [visitorCount, setVisitorCount] = useState<number>(1488);

  // Live IST Clock Update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setTime(now.toLocaleTimeString('en-IN', options) + ' IST');
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Subtle live visitor counter simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setVisitorCount((prev) => prev + (Math.random() > 0.5 ? 1 : -1));
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-zinc-950 via-zinc-900 to-black border-y border-white/15 px-3 sm:px-6 md:px-12 py-2.5 sm:py-3 shadow-xl text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-grotesk">
        
        {/* Left: Campus Status & Clock */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2 bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 px-2.5 sm:px-3 py-1 rounded-full font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="tracking-wide uppercase text-[10px] sm:text-[11px]">JAIN SET Active</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-300 font-mono bg-white/5 border border-white/10 px-2.5 sm:px-3 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{time || 'IST'}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-gray-300 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            <span>Kanakapura Road, Bengaluru</span>
          </div>
        </div>

        {/* Right: Live Weather, AQI & Live Freshmen counter */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-gray-300">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <Sun className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
            <span className="font-semibold text-white">27°C</span>
            <span className="text-gray-400 text-[11px]">Partly Sunny</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <Wind className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-gray-400">AQI:</span>
            <span className="font-bold text-emerald-400">38 (Good)</span>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1 rounded-full text-amber-300">
            <GraduationCap className="w-3.5 h-3.5" />
            <span className="font-semibold">{visitorCount.toLocaleString()} Freshmen Live</span>
          </div>
        </div>

      </div>
    </div>
  );
};
