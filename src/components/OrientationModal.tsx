import React, { useState, useMemo } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CheckCircle, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink,
  Trophy,
  Tag,
  Search,
  Music,
  Tv,
  Layers,
  ArrowRight,
  Flame,
  Award,
  Video
} from 'lucide-react';
import { addStudentRegistration } from '../lib/studentStorage';
import { FET_TIMELINE_EVENTS, TimelineEvent } from '../data/orientationEventsData';

interface OrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
  initialCohort?: 'Freshers' | 'Lateral Entry';
  initialView?: 'register' | 'timeline';
}

export const OrientationModal: React.FC<OrientationModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  initialCohort = 'Freshers',
  initialView = 'register',
}) => {
  const [activeModalTab, setActiveModalTab] = useState<'register' | 'timeline'>(initialView);
  const [submitted, setSubmitted] = useState(false);
  const [cohort, setCohort] = useState<'Freshers' | 'Lateral Entry'>(initialCohort);
  const [eventCategoryFilter, setEventCategoryFilter] = useState<string>('All');
  const [eventSearch, setEventSearch] = useState<string>('');
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    program: 'B.Tech Computer Science & Engineering',
    hostelPreference: 'Not Required (Day Scholar)',
  });

  // Sync cohort whenever initialCohort changes
  React.useEffect(() => {
    setCohort(initialCohort);
  }, [initialCohort]);

  React.useEffect(() => {
    if (initialView) setActiveModalTab(initialView);
  }, [initialView, isOpen]);

  // Filtered timeline events
  const filteredEvents = useMemo(() => {
    return FET_TIMELINE_EVENTS.filter((e) => {
      const matchesCategory = eventCategoryFilter === 'All' || e.category === eventCategoryFilter;
      const matchesSearch = 
        e.name.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.club.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.description.toLowerCase().includes(eventSearch.toLowerCase()) ||
        e.venue.toLowerCase().includes(eventSearch.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [eventCategoryFilter, eventSearch]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      addStudentRegistration({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone || '+91 98000 00000',
        program: formData.program,
        admissionType: cohort,
        hostelPreference: formData.hostelPreference,
      });
    }
    setSubmitted(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-zinc-950 border border-white/20 rounded-3xl p-6 md:p-8 text-white shadow-2xl max-h-[92vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 shrink-0 pr-8">
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/10 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>School of Engineering & Technology (FET)</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://jain-fet-hub.vercel.app/timeline#2026-April"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span>Source: jain-fet-hub.vercel.app/timeline</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>

            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{cohort === 'Freshers' ? 'Freshers: 14 Seats' : 'Lateral Entry: 8 Seats'}</span>
            </div>
          </div>
        </div>

        {/* Top View Switcher Tabs: Registration vs Timeline Events */}
        <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-3 shrink-0 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveModalTab('register')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeModalTab === 'register'
                ? 'bg-white text-black font-extrabold shadow-md scale-[1.02]'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Send className="w-4 h-4 text-amber-600" />
            <span>Orientation Registration & Schedule</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModalTab('timeline')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeModalTab === 'timeline'
                ? 'bg-amber-400 text-black font-extrabold shadow-md scale-[1.02]'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Campus Events & Timeline (#2026-April)</span>
            <span className="px-1.5 py-0.2 rounded-md bg-black/40 text-[10px] font-mono text-amber-300">
              {FET_TIMELINE_EVENTS.length}
            </span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* VIEW 1: ORIENTATION REGISTRATION & SCHEDULE FORM                          */}
        {/* ========================================================================= */}
        {activeModalTab === 'register' && (
          <div className="space-y-6">
            
            {/* Cohort Selector Tabs inside modal */}
            <div className="flex items-center p-1 bg-white/5 border border-white/15 rounded-xl w-fit">
              <button
                type="button"
                onClick={() => setCohort('Freshers')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  cohort === 'Freshers'
                    ? 'bg-white text-black shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                🎓 Freshers (1st Year)
              </button>
              <button
                type="button"
                onClick={() => setCohort('Lateral Entry')}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  cohort === 'Lateral Entry'
                    ? 'bg-amber-400 text-black shadow-md'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                ⚡ Lateral Entry (2nd Year)
              </button>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-bold font-grotesk tracking-wide mb-1 text-white">
                {cohort === 'Freshers'
                  ? 'Freshers Orientation & Induction 2026'
                  : 'Lateral Entry Induction & Bridge Program 2026'}
              </h2>
              <p className="text-gray-300 text-xs sm:text-sm">
                {cohort === 'Freshers'
                  ? 'JAIN (Deemed-to-be University) — Kanakapura Road Global Campus (4-Year B.Tech Track)'
                  : 'JAIN (Deemed-to-be University) — Direct 3rd Semester Admission (Diploma & B.Sc to B.Tech)'}
              </p>
            </div>

            {/* Quick Induction Timeline Highlights Card */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Calendar className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-mono">Date</div>
                  <div className="text-xs font-bold text-white">
                    {cohort === 'Freshers' ? 'August 18 – 20, 2026' : 'August 22 – 24, 2026'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <Clock className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-mono">Timing</div>
                  <div className="text-xs font-bold text-white">
                    {cohort === 'Freshers' ? '09:30 AM – 04:30 PM' : '10:00 AM – 04:00 PM'}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <MapPin className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-gray-400 uppercase font-mono">Venue</div>
                  <div className="text-xs font-bold text-white">
                    {cohort === 'Freshers'
                      ? 'Main Auditorium, Kanakapura Campus'
                      : 'Room 111 & Seminar Hall, Kanakapura Campus'}
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Spring Fest Teaser Banner */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-400/15 via-purple-500/10 to-transparent border border-amber-400/30 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs font-bold text-white">
                    Upcoming Campus Flagship: Infinity 2026 (April 22 – 30)
                  </div>
                  <div className="text-[11px] text-gray-300">
                    Live Concerts with DJ Kayra & Raag The Band, plus 20+ cultural & tech competitions with ₹1,00,000+ in prizes.
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModalTab('timeline')}
                className="px-3 py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-colors shrink-0 cursor-pointer flex items-center gap-1"
              >
                <span>View Events</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Registration Form */}
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-white/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white font-grotesk">
                  Confirm Student Attendance & Induction Seat
                </h3>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter candidate's full legal name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">Allocated Program</label>
                  <select
                    value={formData.program}
                    onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering (CSE)</option>
                    <option value="B.Tech AI & Machine Learning">B.Tech AI & Machine Learning (AIML)</option>
                    <option value="B.Tech Data Science">B.Tech Data Science (DS)</option>
                    <option value="B.Tech AI & DevOps">B.Tech AI & DevOps</option>
                    <option value="B.Tech Cyber Security">B.Tech Cyber Security</option>
                    <option value="B.Tech Aerospace Engineering">B.Tech Aerospace Engineering</option>
                    <option value="B.Tech Robotics & Automation">B.Tech Robotics & Automation</option>
                    <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                    <option value="M.Tech / Ph.D. Program">M.Tech / Ph.D. Research Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center justify-between">
                    <span>Hostel Accommodation Preference</span>
                    <span className="text-[10px] text-amber-300 font-mono">300+ Acre JAIN Global Campus</span>
                  </label>
                  <select
                    value={formData.hostelPreference}
                    onChange={(e) => setFormData({ ...formData, hostelPreference: e.target.value })}
                    className="w-full bg-zinc-900 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-white transition-colors"
                  >
                    <option value="Not Required (Day Scholar)">Not Required (Day Scholar / Local Transit)</option>
                    <option value="Boys Hostel - Double Sharing (₹2,25,000/yr)">Boys Hostel — Double Sharing with Attached Bath (₹2,25,000/yr)</option>
                    <option value="Boys Hostel - Triple Sharing (₹1,90,000/yr)">Boys Hostel — Triple Sharing with Attached Bath (₹1,90,000/yr)</option>
                    <option value="Girls Hostel - Triple Sharing (₹1,90,000/yr)">Girls Hostel — Triple Sharing with Attached Bath (₹1,90,000/yr)</option>
                    <option value="Off-Campus Boys - Double Sharing (₹1,85,000/yr)">Off-Campus Boys — Double Sharing (₹1,85,000/yr)</option>
                  </select>
                </div>

                <div className="pt-2 flex items-center justify-between gap-4">
                  <div className="text-[11px] text-gray-400">
                    Includes complimentary induction kit, orientation handbook, and campus Wi-Fi credentials.
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-black hover:bg-gray-100 font-extrabold px-6 py-2.5 rounded-full text-xs sm:text-sm transition-all shadow-lg hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 whitespace-nowrap"
                  >
                    <span>Submit & Confirm</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
                <h3 className="text-xl font-bold text-white">Orientation Seat Confirmed!</h3>
                <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto">
                  Thank you, <strong className="text-white">{formData.fullName}</strong>. Your orientation registration has been synced to the database. An official confirmation package will be sent to <strong className="text-white">{formData.email}</strong>.
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveModalTab('timeline')}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Explore Campus Events Timeline (#2026-April)
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: CAMPUS EVENTS & TIMELINE (FROM jain-fet-hub.vercel.app/timeline)  */}
        {/* ========================================================================= */}
        {activeModalTab === 'timeline' && (
          <div className="space-y-6">
            
            {/* Header info */}
            <div className="p-4.5 rounded-2xl bg-gradient-to-r from-purple-950/40 via-zinc-900 to-black border border-purple-500/30 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base sm:text-lg font-bold font-grotesk text-white">
                    JAIN FET Campus Timeline — April 2026 & Beyond
                  </h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold uppercase">
                  Flagship: Infinity 2026
                </span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed">
                Official timeline events retrieved from <strong>jain-fet-hub.vercel.app/timeline#2026-April</strong>. Explore inter-collegiate concerts, high-stakes technical hackathons, cultural fests, and freshers induction tryouts across JAIN Global Campus.
              </p>
            </div>

            {/* Filter Pills & Search */}
            <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Concert', 'Technical', 'Cultural', 'Induction'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setEventCategoryFilter(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      eventCategoryFilter === cat
                        ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                        : 'bg-white/5 text-gray-300 hover:text-white'
                    }`}
                  >
                    {cat === 'All' ? 'All Events' : cat === 'Concert' ? '🎵 Concerts' : cat === 'Technical' ? '💻 Tech & Hackathons' : cat === 'Cultural' ? '🎭 Cultural' : '🎓 Induction'}
                  </button>
                ))}
              </div>

              <div className="relative min-w-[200px]">
                <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  placeholder="Search events, clubs..."
                  className="w-full bg-black/60 border border-white/20 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Events Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`p-4.5 rounded-2xl border transition-all flex flex-col justify-between space-y-3 ${
                    event.category === 'Concert'
                      ? 'bg-gradient-to-br from-purple-950/30 via-zinc-900 to-black border-purple-500/40 shadow-xl'
                      : event.category === 'Technical'
                      ? 'bg-gradient-to-br from-blue-950/20 via-zinc-900 to-black border-blue-500/30'
                      : 'bg-zinc-900/70 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="space-y-2">
                    {/* Top Row: Date & Category Pill */}
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-mono font-bold text-amber-300 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        <span>{event.date}</span>
                      </span>

                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        event.category === 'Concert'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : event.category === 'Technical'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : event.category === 'Induction'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                      }`}>
                        {event.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold font-grotesk text-white leading-snug">
                      {event.name}
                    </h4>

                    {/* Club and Venue */}
                    <div className="text-xs text-gray-400 flex flex-col gap-0.5 font-mono">
                      <span className="text-amber-200/90">Organized by: {event.club}</span>
                      <span className="text-gray-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span>{event.venue}</span>
                      </span>
                    </div>

                    {/* Prize Badge if exists */}
                    {event.prize && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/30 text-xs font-bold text-amber-300">
                        <Trophy className="w-3.5 h-3.5 text-amber-400" />
                        <span>{event.prize}</span>
                      </div>
                    )}

                    {/* Description */}
                    <p className="text-xs text-gray-300 leading-relaxed font-light">
                      {event.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {event.tags.map((tag) => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-md bg-white/5 text-gray-400 font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions / Register links */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                    {event.videoUrl ? (
                      <a
                        href={event.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-red-400 hover:text-red-300 font-bold transition-colors"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Watch Teaser Preview</span>
                      </a>
                    ) : (
                      <span className="text-[11px] text-gray-500 font-mono">
                        JAIN Global Campus
                      </span>
                    )}

                    {event.registerLink ? (
                      <a
                        href={event.registerLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold transition-all shadow-md flex items-center gap-1 cursor-pointer"
                      >
                        <span>Register Event</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="px-3 py-1 rounded-lg bg-white/10 text-gray-300 text-[11px] font-semibold">
                        Free Entry with Student ID
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Credit Note */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Need to participate or nominate your team? Registrations are open through official Google Forms.</span>
              </div>
              <a
                href="https://jain-fet-hub.vercel.app/timeline#2026-April"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
              >
                <span>Full Timeline: jain-fet-hub.vercel.app/timeline#2026-April</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
