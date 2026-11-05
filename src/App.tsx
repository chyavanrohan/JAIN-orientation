import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GraduationCap, Zap, BookOpen, ArrowRight, ChevronRight, Calendar, Clock } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { AnimatedHeading } from './components/AnimatedHeading';
import { FadeIn } from './components/FadeIn';
import { StoryView } from './components/StoryView';
import { TechOverviewView } from './components/TechOverviewView';
import { OrientationModal } from './components/OrientationModal';
import { AdminPortalModal } from './components/AdminPortalModal';
import { LateralInfoModal } from './components/LateralInfoModal';
import { HostelAccommodationModal } from './components/HostelAccommodationModal';
import { TimetablePortalModal } from './components/TimetablePortalModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'story' | 'tech'>('home');
  const [heroCohort, setHeroCohort] = useState<'freshers' | 'lateral'>('freshers');
  const [isOrientationOpen, setIsOrientationOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLateralInfoOpen, setIsLateralInfoOpen] = useState(false);
  const [lateralModalTab, setLateralModalTab] = useState<'timetable' | 'faculty' | 'eligibility'>('timetable');
  const [isHostelOpen, setIsHostelOpen] = useState(false);
  
  // All Programs & Classes Timetable Portal state (ktiwari.in/webTT/#adjustments)
  const [isTimetableOpen, setIsTimetableOpen] = useState(false);
  const [timetableProgram, setTimetableProgram] = useState('AIML');
  const [timetableSemester, setTimetableSemester] = useState('3');
  const [timetableSection, setTimetableSection] = useState('A');
  const [timetableTab, setTimetableTab] = useState<'batches' | 'adjustments' | 'teachers' | 'rooms'>('batches');

  const openTimetablePortal = (
    program: string = 'AIML',
    semester: string = '3',
    section: string = 'A',
    tab: 'batches' | 'adjustments' | 'teachers' | 'rooms' = 'batches'
  ) => {
    setTimetableProgram(program);
    setTimetableSemester(semester);
    setTimetableSection(section);
    setTimetableTab(tab);
    setIsTimetableOpen(true);
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Slow down the video loop rate for a smooth, cinematic, unhurried background experience
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.55; // 55% speed for unhurried flow
    }
  }, [activeTab]);

  return (
    <main
      className={`relative w-screen min-h-screen ${
        activeTab === 'home' ? 'h-screen overflow-hidden' : 'overflow-y-auto'
      } flex flex-col justify-between text-white bg-black select-none`}
    >
      {activeTab === 'home' ? (
        <>
          {/* Lighter, high-contrast crisp background video for clear city view visibility */}
          <video
            ref={videoRef}
            className="fixed inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-100 filter brightness-110 contrast-105"
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
          {/* Subtle gradient vignette to maintain text legibility while keeping the background clear */}
          <div className="fixed inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80 pointer-events-none z-0" />

          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onOpenOrientation={() => setIsOrientationOpen(true)}
            onOpenAdmin={() => setIsAdminOpen(true)}
            onOpenHostel={() => setIsHostelOpen(true)}
            onOpenTimetable={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
          />

          {/* Hero View (City View) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full px-6 md:px-12 lg:px-16 flex-1 flex flex-col justify-end pb-8 sm:pb-12 lg:pb-14 z-10 relative"
          >
            {/* HERO COHORT SELECTOR TABS: Freshers vs Lateral Entry */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex p-1 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl">
                <button
                  type="button"
                  onClick={() => setHeroCohort('freshers')}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    heroCohort === 'freshers'
                      ? 'text-black shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {heroCohort === 'freshers' && (
                    <motion.div
                      layoutId="heroCohortIndicator"
                      className="absolute inset-0 bg-white rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <GraduationCap className={`w-4 h-4 ${heroCohort === 'freshers' ? 'text-black' : 'text-gray-300'}`} />
                    <span>Freshers (1st Year)</span>
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setHeroCohort('lateral')}
                  className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                    heroCohort === 'lateral'
                      ? 'text-black shadow-md'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {heroCohort === 'lateral' && (
                    <motion.div
                      layoutId="heroCohortIndicator"
                      className="absolute inset-0 bg-amber-400 rounded-full z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Zap className={`w-4 h-4 ${heroCohort === 'lateral' ? 'text-black' : 'text-amber-400'}`} />
                    <span>Lateral Entry (2nd Year)</span>
                  </span>
                </button>
              </div>
            </div>

            <div className="w-full lg:grid lg:grid-cols-12 lg:items-end gap-8">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-7 flex flex-col items-start max-w-2xl">
                {/* Animated Main Heading with normal font to avoid awkward line breaks */}
                <AnimatedHeading
                  key={heroCohort}
                  text={
                    heroCohort === 'freshers'
                      ? "Shaping tomorrow\nwith vision and action."
                      : "Accelerate your degree\nwith direct entry."
                  }
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-3 text-white drop-shadow-lg leading-tight"
                />

                {/* Subheading */}
                <FadeIn delay={500} duration={700} className="w-full">
                  <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-5 max-w-xl font-normal drop-shadow-md leading-relaxed">
                    {heroCohort === 'freshers'
                      ? 'Faculty of Engineering & Technology, JAIN (Deemed-to-be University). Admissions open for 2026 undergraduate engineering programs at Kanakapura Global Campus.'
                      : 'Direct 3rd-semester admissions for Polytechnic Diploma and B.Sc graduates. Seamless credit transfer, bridge coursework, and full placement access.'}
                  </p>
                </FadeIn>

                {/* Interactive Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-1">
                  {heroCohort === 'freshers' ? (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsOrientationOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-98 flex items-center gap-2"
                      >
                        <span>Register for Orientation</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openTimetablePortal('CSE-GEN', '1', 'A', 'batches')}
                        className="px-5 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gray-200 text-xs sm:text-sm font-semibold hover:bg-white/20 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span>1st Year Timetables</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => setIsOrientationOpen(true)}
                        className="px-6 py-2.5 rounded-full bg-amber-400 text-black text-xs sm:text-sm font-bold hover:bg-amber-300 transition-all cursor-pointer shadow-lg hover:scale-[1.02] active:scale-98 flex items-center gap-2"
                      >
                        <span>Register for Lateral Induction</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
                        className="px-5 py-2.5 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/50 text-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-400/30 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        <Calendar className="w-4 h-4 text-amber-400" />
                        <span>Official Timetable (Sem 3)</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setLateralModalTab('eligibility');
                          setIsLateralInfoOpen(true);
                        }}
                        className="px-4 py-2.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-gray-200 text-xs sm:text-sm font-medium hover:bg-white/10 transition-all cursor-pointer flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-gray-300" />
                        <span>Syllabus & Eligibility</span>
                      </button>
                    </>
                  )}
                </div>

                {/* Mobile/Responsive Timetable Preview Banner for Lateral Track */}
                {heroCohort === 'lateral' && (
                  <div className="lg:hidden mt-3 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-xs text-amber-200 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                      <div>
                        <div className="font-bold text-white">Sem 3 Timetable: AIML-A</div>
                        <div className="text-[11px] text-gray-300">Mon–Sat 08:45 AM – 03:50 PM • Room 111</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 text-black text-[11px] font-bold shrink-0 hover:bg-amber-300 transition-colors cursor-pointer"
                    >
                      View Timetable
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column - Cohort Key Schedule Card (Desktop) */}
              <div className="hidden lg:flex lg:col-span-5 flex-col justify-end">
                <AnimatePresence mode="wait">
                  {heroCohort === 'freshers' ? (
                    <motion.div
                      key="freshers-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="liquid-glass rounded-2xl p-5 border border-white/20 text-white shadow-2xl space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-5 h-5 text-emerald-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-white">
                            Freshers Orientation 2026
                          </span>
                        </div>
                        <span className="text-[11px] text-gray-300">4-Year Degree</span>
                      </div>

                      <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Orientation Dates:</span>
                          <span className="font-medium text-white">August 18 – 20, 2026</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Venue:</span>
                          <span className="font-medium text-white">Global Campus Auditorium</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Reporting Time:</span>
                          <span className="font-medium text-white">09:00 AM IST</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-gray-400">Hostel Check-in:</span>
                          <span className="font-medium text-amber-300">From August 16, 2026</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-400">Kanakapura Road, Bengaluru</span>
                        <button
                          type="button"
                          onClick={() => setIsOrientationOpen(true)}
                          className="text-white hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <span>Confirm Registration</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="lateral-card"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="liquid-glass rounded-2xl p-5 border border-amber-400/30 text-white shadow-2xl space-y-3"
                    >
                      <div className="flex items-center justify-between pb-2 border-b border-white/10">
                        <div className="flex items-center gap-2">
                          <Zap className="w-5 h-5 text-amber-400" />
                          <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                            Lateral Entry Track (Sem 3)
                          </span>
                        </div>
                        <span className="text-[11px] text-amber-300 font-mono">AIML-A • Room 111</span>
                      </div>

                      <div className="space-y-2 text-xs text-gray-300">
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Induction Dates:</span>
                          <span className="font-medium text-white">August 22 – 24, 2026</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Class Timetable:</span>
                          <span className="font-medium text-amber-300">Mon–Sat (08:45 AM – 03:50 PM)</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Classroom & Lab:</span>
                          <span className="font-medium text-white">Room 111 & OS Lab (221 B)</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Effective Date:</span>
                          <span className="font-medium text-emerald-400">From Sept 03, 2026</span>
                        </div>
                        <div className="flex items-center justify-between py-1 border-b border-white/5">
                          <span className="text-gray-400">Class Teacher:</span>
                          <span className="font-medium text-white">Prof. S. Srinivas Kumar</span>
                        </div>
                        <div className="flex items-center justify-between py-1">
                          <span className="text-gray-400">Duration & Bridge:</span>
                          <span className="font-medium text-white">3 Years (Integrated Bridge Modules)</span>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-gray-400">SET Campus, Kanakapura</span>
                        <button
                          type="button"
                          onClick={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
                          className="text-amber-300 hover:text-white font-semibold flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Calendar className="w-3.5 h-3.5 text-amber-400" />
                          <span>Open Full Timetable Matrix</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      ) : activeTab === 'story' ? (
        /* Dedicated Story & Campus View Tab */
        <StoryView
          onBackToHome={() => setActiveTab('home')}
          onOpenOrientation={() => setIsOrientationOpen(true)}
          onOpenHostel={() => setIsHostelOpen(true)}
          onOpenTimetable={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
        />
      ) : (
        /* Teacher & Evaluator Presentation Brief Tab */
        <TechOverviewView
          onBackToHome={() => setActiveTab('home')}
          onOpenOrientation={() => setIsOrientationOpen(true)}
        />
      )}

      {/* Orientation Program Modal */}
      <OrientationModal
        isOpen={isOrientationOpen}
        onClose={() => setIsOrientationOpen(false)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        initialCohort={heroCohort === 'freshers' ? 'Freshers' : 'Lateral Entry'}
      />

      {/* Admin Student Registration Backend Portal Modal */}
      <AdminPortalModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />

      {/* Lateral Entry Syllabus, Timetable & Credit Exemption Modal */}
      <LateralInfoModal
        isOpen={isLateralInfoOpen}
        onClose={() => setIsLateralInfoOpen(false)}
        initialTab={lateralModalTab}
        onOpenRegister={() => {
          setIsLateralInfoOpen(false);
          setIsOrientationOpen(true);
        }}
        onOpenAllTimetables={() => openTimetablePortal('AIML', '3', 'A', 'batches')}
      />

      {/* JAIN Global Campus Hostel Accommodation Modal */}
      <HostelAccommodationModal
        isOpen={isHostelOpen}
        onClose={() => setIsHostelOpen(false)}
        onOpenOrientation={() => {
          setIsHostelOpen(false);
          setIsOrientationOpen(true);
        }}
      />

      {/* JAIN SET All Programs & Classes Timetable Portal (#adjustments) */}
      <TimetablePortalModal
        isOpen={isTimetableOpen}
        onClose={() => setIsTimetableOpen(false)}
        initialProgram={timetableProgram}
        initialSemester={timetableSemester}
        initialSection={timetableSection}
        initialTab={timetableTab}
      />
    </main>
  );
}



