import React from 'react';
import { ExternalLink, ShieldCheck, Building2, Calendar } from 'lucide-react';
import { JainLogo } from './JainLogo';

interface NavbarProps {
  activeTab: 'home' | 'story' | 'tech';
  onTabChange: (tab: 'home' | 'story' | 'tech') => void;
  onOpenOrientation: () => void;
  onOpenAdmin?: () => void;
  onOpenHostel?: () => void;
  onOpenTimetable?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onTabChange,
  onOpenOrientation,
  onOpenAdmin,
  onOpenHostel,
  onOpenTimetable,
}) => {
  return (
    <header className="w-full px-6 md:px-12 lg:px-16 pt-5 pb-2 z-50 relative bg-transparent pointer-events-auto">
      <nav className="flex items-center justify-between gap-4">
        {/* Left: Brand Logo */}
        <button
          type="button"
          onClick={() => onTabChange('home')}
          className="text-left select-none hover:opacity-90 transition-opacity cursor-pointer bg-transparent border-0 p-0 focus:outline-none"
        >
          <JainLogo />
        </button>

        {/* Center: Tabs & Official Site Link */}
        <div className="hidden md:flex items-center gap-2 bg-black/70 backdrop-blur-xl border border-white/20 rounded-full p-1.5 shadow-2xl">
          <button
            type="button"
            onClick={() => onTabChange('home')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'home'
                ? 'bg-white text-black shadow-md'
                : 'text-white/80 hover:text-white hover:bg-white/15'
            }`}
          >
            Home
          </button>
          <button
            type="button"
            onClick={() => onTabChange('story')}
            className={`px-5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'story'
                ? 'bg-white text-black shadow-md'
                : 'text-white/80 hover:text-white hover:bg-white/15'
            }`}
          >
            Story & Campus
          </button>
          <div className="w-px h-4 bg-white/20 my-auto" />
          <a
            href="https://www.jainuniversity.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full text-xs font-semibold text-gray-200 hover:text-white hover:bg-white/15 transition-all flex items-center gap-1.5"
          >
            <span>Visit Official Site</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {onOpenTimetable && (
            <button
              type="button"
              onClick={onOpenTimetable}
              className="bg-amber-400/15 border border-amber-400/40 text-amber-300 hover:bg-amber-400/25 px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="All Classes Timetable & Adjustments (#adjustments)"
            >
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Timetables</span>
              <span className="sm:hidden">TT</span>
            </button>
          )}

          {onOpenHostel && (
            <button
              type="button"
              onClick={onOpenHostel}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-gray-200 hover:text-white px-3 sm:px-3.5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Hostel & Residential Accommodation"
            >
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Hostel Info</span>
              <span className="sm:hidden">Hostel</span>
            </button>
          )}

          {onOpenAdmin && (
            <button
              type="button"
              onClick={onOpenAdmin}
              className="bg-amber-400/10 border border-amber-400/40 text-amber-300 px-3.5 py-2 rounded-full text-xs font-bold hover:bg-amber-400/20 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              title="Admin Access Backend"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Access</span>
            </button>
          )}

          <button
            type="button"
            onClick={onOpenOrientation}
            className="bg-white text-black px-4 sm:px-5 py-2 rounded-full text-xs font-extrabold hover:bg-gray-100 transition-all cursor-pointer shadow-md hover:scale-[1.02] active:scale-98"
          >
            Orientation Prog
          </button>
        </div>
      </nav>
    </header>
  );
};



