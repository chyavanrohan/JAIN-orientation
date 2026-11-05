import React, { useState, useMemo, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  BookOpen, 
  Search, 
  Printer, 
  ExternalLink, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  SlidersHorizontal, 
  Sparkles,
  ArrowRightLeft,
  ChevronRight,
  Filter,
  Building2,
  Users,
  Layers,
  GraduationCap
} from 'lucide-react';
import { 
  timetableData, 
  getPrograms, 
  getSemesters, 
  getSections, 
  getBatchTimetable, 
  getClassTeacherForBatch, 
  getClassTeachers,
  getAdjustmentEvents,
  evaluateSlotSwap,
  findEventAtSlot,
  BatchTimetable,
  ClassTeacherRow,
  AdjustmentEvent,
  SwapSlot,
  SwapEvaluationResult
} from '../data/timetableService';

interface TimetablePortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProgram?: string;
  initialSemester?: string;
  initialSection?: string;
  initialTab?: 'batches' | 'adjustments' | 'teachers' | 'rooms';
}

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const PERIOD_HEADERS = [
  { id: '1', label: 'Period 1', time: '8:45 – 9:45' },
  { id: '2', label: 'Period 2', time: '9:45 – 10:45' },
  { id: '3', label: 'Period 3', time: '11:00 – 12:00' },
  { id: '4', label: 'Period 4', time: '12:00 – 1:00' },
  { id: '5', label: 'Period 5', time: '1:00 – 1:50' },
  { id: '6', label: 'Period 6', time: '1:50 – 2:50' },
  { id: '7', label: 'Period 7', time: '2:50 – 3:50' },
];

export const TimetablePortalModal: React.FC<TimetablePortalModalProps> = ({
  isOpen,
  onClose,
  initialProgram = 'AIML',
  initialSemester = '3',
  initialSection = 'A',
  initialTab = 'batches',
}) => {
  const [activeTab, setActiveTab] = useState<'batches' | 'adjustments' | 'teachers' | 'rooms'>(initialTab);

  // Batch selector state
  const [selectedProgram, setSelectedProgram] = useState<string>(initialProgram);
  const [selectedSemester, setSelectedSemester] = useState<string>(initialSemester);
  const [selectedSection, setSelectedSection] = useState<string>(initialSection);
  const [selectedDay, setSelectedDay] = useState<string>('All');
  const [classSearch, setClassSearch] = useState<string>('');

  // Class Teacher directory search
  const [teacherSearch, setTeacherSearch] = useState<string>('');
  const [teacherProgramFilter, setTeacherProgramFilter] = useState<string>('All');

  // Rooms Directory filter
  const [roomFilter, setRoomFilter] = useState<string>('All');
  const [roomSearch, setRoomSearch] = useState<string>('');

  // Adjustments & Slot Swapper state
  const [slotA, setSlotA] = useState<SwapSlot>({
    program: 'AIML',
    semester: '3',
    section: 'A',
    day: 'Mon',
    period: 3,
  });

  const [slotB, setSlotB] = useState<SwapSlot>({
    program: 'AIML',
    semester: '3',
    section: 'A',
    day: 'Tue',
    period: 4,
  });

  const [swapResult, setSwapResult] = useState<SwapEvaluationResult | null>(null);

  // Sync state when initial props change
  useEffect(() => {
    if (initialProgram) setSelectedProgram(initialProgram);
    if (initialSemester) setSelectedSemester(initialSemester);
    if (initialSection) setSelectedSection(initialSection);
    if (initialTab) setActiveTab(initialTab);
  }, [initialProgram, initialSemester, initialSection, initialTab, isOpen]);

  // Derived lists
  const programs = useMemo(() => getPrograms(), []);
  
  const semesters = useMemo(() => {
    return getSemesters(selectedProgram);
  }, [selectedProgram]);

  useEffect(() => {
    if (semesters.length > 0 && !semesters.includes(selectedSemester)) {
      setSelectedSemester(semesters[0]);
    }
  }, [semesters, selectedSemester]);

  const sections = useMemo(() => {
    return getSections(selectedProgram, selectedSemester);
  }, [selectedProgram, selectedSemester]);

  useEffect(() => {
    if (sections.length > 0 && !sections.includes(selectedSection)) {
      setSelectedSection(sections[0]);
    }
  }, [sections, selectedSection]);

  // Selected batch data
  const currentBatch: BatchTimetable | null = useMemo(() => {
    return getBatchTimetable(selectedProgram, selectedSemester, selectedSection);
  }, [selectedProgram, selectedSemester, selectedSection]);

  const classTeacher: ClassTeacherRow | null = useMemo(() => {
    return getClassTeacherForBatch(selectedProgram, selectedSemester, selectedSection);
  }, [selectedProgram, selectedSemester, selectedSection]);

  // Filtered Class Teachers
  const filteredTeachers = useMemo(() => {
    let list = getClassTeachers(teacherSearch);
    if (teacherProgramFilter !== 'All') {
      list = list.filter((t) => t.program === teacherProgramFilter);
    }
    return list;
  }, [teacherSearch, teacherProgramFilter]);

  // Filtered Rooms
  const filteredRooms = useMemo(() => {
    let list = timetableData.rooms || [];
    if (roomFilter !== 'All') {
      list = list.filter((r) => r.type.toLowerCase() === roomFilter.toLowerCase());
    }
    if (roomSearch) {
      const q = roomSearch.toLowerCase();
      list = list.filter((r) => r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));
    }
    return list;
  }, [roomFilter, roomSearch]);

  // Handle Swap Evaluation
  const handleEvaluateSwap = () => {
    const result = evaluateSlotSwap(slotA, slotB);
    setSwapResult(result);
  };

  // Pre-load evaluation on tab switch or slot change
  useEffect(() => {
    if (activeTab === 'adjustments') {
      const result = evaluateSlotSwap(slotA, slotB);
      setSwapResult(result);
    }
  }, [activeTab, slotA, slotB]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-6xl max-h-[92vh] flex flex-col bg-zinc-950 border border-white/20 rounded-3xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4.5 border-b border-white/10 bg-gradient-to-r from-zinc-900 via-black to-zinc-900 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 shadow-md">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg md:text-xl font-bold font-grotesk tracking-wide text-white">
                  JAIN SET Official Timetable System
                </h2>
                <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-bold text-emerald-300 uppercase tracking-wider">
                  Live 2026 Pipeline
                </span>
              </div>
              <p className="text-xs text-gray-400">
                CSE & Technology Faculty • 15 Programs • 94 Class Batches • Official Timetable Allocation Pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="http://ktiwari.in/webTT/#adjustments"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-gray-300 hover:text-white transition-colors"
              title="Open raw webTT portal"
            >
              <span>ktiwari.in/webTT</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <button
              type="button"
              onClick={() => window.print()}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white transition-colors cursor-pointer border border-white/10"
              title="Print Current Timetable View"
            >
              <Printer className="w-4 h-4 text-amber-400" />
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Close Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="px-6 py-2.5 bg-black/60 border-b border-white/10 flex items-center gap-2 overflow-x-auto no-scrollbar shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('batches')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'batches'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Batch Timetables (94 Classes)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('adjustments')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'adjustments'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <ArrowRightLeft className="w-3.5 h-3.5 text-amber-400" />
            <span>Adjustments & Swap Evaluator (#adjustments)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('teachers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'teachers'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Class Teachers Directory ({timetableData.classTeachers.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rooms')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'rooms'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Campus Rooms & Labs ({timetableData.rooms.length})</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* ========================================================================= */}
          {/* TAB 1: BATCH TIMETABLE (EXPLORE ANY OF THE 94 CLASSES ACROSS 15 PROGRAMS) */}
          {/* ========================================================================= */}
          {activeTab === 'batches' && (
            <div className="space-y-6">
              
              {/* Selector Controls Bar */}
              <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 shadow-lg space-y-4">
                
                {/* Step 1: Program Selector */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-xs font-bold font-grotesk tracking-wider uppercase text-amber-300 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>1. Select Academic Program (15 Specializations)</span>
                    </label>
                    <span className="text-[11px] text-gray-400 font-mono">
                      Active: {selectedProgram}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {programs.map((prog) => {
                      const isSelected = selectedProgram === prog;
                      return (
                        <button
                          key={prog}
                          type="button"
                          onClick={() => setSelectedProgram(prog)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-amber-400 text-black shadow-md scale-[1.02]'
                              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {prog}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2 & 3: Semester and Section Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                  {/* Semester */}
                  <div>
                    <label className="block text-xs font-bold font-grotesk tracking-wider uppercase text-gray-300 mb-2">
                      2. Select Semester
                    </label>
                    <div className="flex items-center gap-2">
                      {semesters.map((sem) => (
                        <button
                          key={sem}
                          type="button"
                          onClick={() => setSelectedSemester(sem)}
                          className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            selectedSemester === sem
                              ? 'bg-white text-black font-extrabold shadow-md'
                              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          Semester {sem}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Section */}
                  <div>
                    <label className="block text-xs font-bold font-grotesk tracking-wider uppercase text-gray-300 mb-2">
                      3. Select Section
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {sections.map((sec) => (
                        <button
                          key={sec}
                          type="button"
                          onClick={() => setSelectedSection(sec)}
                          className={`w-9 h-8 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center justify-center ${
                            selectedSection === sec
                              ? 'bg-amber-400 text-black shadow-md'
                              : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                          }`}
                        >
                          {sec}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Batch Meta Summary Card */}
              {currentBatch ? (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-white/15 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-black font-mono">
                          {selectedProgram} • Sem {selectedSemester} • Sec {selectedSection}
                        </span>
                        <h3 className="text-lg font-bold text-white font-grotesk">
                          {currentBatch.title}
                        </h3>
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Academic Term 2026 • Timetable Allocation Pipeline • JAIN Global Campus
                      </p>
                    </div>

                    {/* Quick Day Filter */}
                    <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                      <span className="text-[11px] text-gray-400 font-mono mr-1">Day:</span>
                      {['All', ...DAYS].map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => setSelectedDay(day)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            selectedDay === day
                              ? 'bg-white text-black font-extrabold shadow-sm'
                              : 'bg-white/5 text-gray-300 hover:text-white'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Class Teacher & Room Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">Class Teacher</div>
                      <div className="font-bold text-white text-sm">
                        {currentBatch.classTeacher || 'Assigned by Department'}
                      </div>
                      {classTeacher?.email && (
                        <a 
                          href={`mailto:${classTeacher.email}`}
                          className="text-[11px] text-amber-400 hover:underline flex items-center gap-1 mt-1 font-mono"
                        >
                          <Mail className="w-3 h-3" />
                          <span>{classTeacher.email}</span>
                        </a>
                      )}
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                      <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">Contact & Cabin</div>
                      <div className="font-bold text-white text-sm flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-amber-400" />
                        <span>{classTeacher?.phone || 'Desk Desk / Intercom'}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 mt-1">
                        FET Kanakapura Block
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                      <div className="text-[10px] text-gray-400 uppercase font-mono mb-1">Quick Action</div>
                      <button
                        type="button"
                        onClick={() => {
                          setSlotA({
                            program: selectedProgram,
                            semester: selectedSemester,
                            section: selectedSection,
                            day: 'Mon',
                            period: 1,
                          });
                          setActiveTab('adjustments');
                        }}
                        className="px-3 py-1.5 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 text-xs font-bold border border-amber-400/40 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                        <span>Inspect in Adjustments Tool</span>
                      </button>
                    </div>
                  </div>

                  {/* Weekly Interactive Timetable Grid */}
                  <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/60 shadow-inner">
                    <div className="sm:hidden px-3 py-1.5 text-[10px] text-gray-400 font-mono bg-white/5 border-b border-white/10 flex items-center justify-between">
                      <span>← Swipe horizontally for Periods 1–7 →</span>
                      <span className="text-amber-400 font-bold">Sem {currentBatch.semester}-{currentBatch.section}</span>
                    </div>
                    <table className="w-full text-left border-collapse text-xs min-w-[760px]">
                      <thead>
                        <tr className="bg-white/10 border-b border-white/15 text-gray-300 font-mono text-[11px]">
                          <th className="p-3 font-bold text-white w-20 text-center uppercase tracking-wider border-r border-white/10">
                            Day
                          </th>
                          {PERIOD_HEADERS.map((p) => (
                            <th key={p.id} className="p-2.5 font-bold text-center border-r border-white/10 last:border-r-0">
                              <div className="text-white font-extrabold">{p.label}</div>
                              <div className="text-[10px] text-amber-300/80 font-normal">{p.time}</div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/10 font-mono">
                        {DAYS.filter((d) => selectedDay === 'All' || selectedDay === d).map((day) => {
                          const dayGrid = currentBatch.grid?.[day] || {};
                          return (
                            <tr key={day} className="hover:bg-white/[0.03] transition-colors">
                              {/* Day Name Column */}
                              <td className="p-3 font-bold text-amber-300 text-center bg-white/[0.04] border-r border-white/10">
                                {day}
                              </td>

                              {/* Periods 1 to 7 */}
                              {['1', '2', '3', '4', '5', '6', '7'].map((pKey) => {
                                const cell = dayGrid[pKey];
                                
                                // Skip rendered cell if it is a continuation of previous colspan
                                if (cell && cell.type === 'lab-continue') {
                                  return null;
                                }

                                const colspan = cell?.colspan || 1;
                                const text = cell?.text || '—';
                                const isLab = cell?.type === 'lab' || text.toLowerCase().includes('(l)') || text.toLowerCase().includes('lab');
                                const isEmpty = !text || text === '—';

                                return (
                                  <td
                                    key={pKey}
                                    colSpan={colspan}
                                    className={`p-2.5 text-center border-r border-white/10 last:border-r-0 transition-all ${
                                      isEmpty
                                        ? 'text-gray-500 bg-white/[0.01]'
                                        : isLab
                                        ? 'bg-amber-400/15 border-amber-400/40 text-amber-200 font-bold'
                                        : 'bg-white/[0.05] text-gray-200 hover:bg-white/10'
                                    }`}
                                  >
                                    <div className="flex flex-col items-center justify-center gap-1">
                                      <span className="leading-snug text-xs">
                                        {text}
                                      </span>
                                      {isLab && (
                                        <span className="inline-block px-1.5 py-0.5 rounded bg-amber-400/30 text-amber-300 text-[9px] uppercase tracking-wider font-extrabold">
                                          Lab Session ({colspan > 1 ? `${colspan} Periods` : 'Practical'})
                                        </span>
                                      )}
                                    </div>
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Timetable Legend & Timing Notes */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-[11px] text-gray-400 border-t border-white/10">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-amber-400/20 border border-amber-400/50" />
                        <span>Laboratory / Practical Session (2 Periods)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-white/10 border border-white/20" />
                        <span>Theory / Lecture Class</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-white/[0.02] border border-white/5" />
                        <span>Free / Break / Mentoring Period</span>
                      </div>
                    </div>

                    <div className="text-gray-400 font-mono">
                      <span>Lunch Break: 1:00 PM – 1:50 PM (Between Period 4 & 5)</span>
                    </div>
                  </div>

                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10">
                  <p className="text-gray-400 text-sm">
                    No schedule found for {selectedProgram} Semester {selectedSemester} Section {selectedSection}.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: ADJUSTMENTS & SLOT SWAPPER (PORTED DIRECTLY FROM #adjustments)      */}
          {/* ========================================================================= */}
          {activeTab === 'adjustments' && (
            <div className="space-y-6">
              {/* Informational Banner */}
              <div className="p-4.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-start gap-3.5">
                <ArrowRightLeft className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <h3 className="font-bold text-amber-300 font-grotesk text-sm">
                    Timetable Adjustment & Conflict Verification Engine (#adjustments)
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Test or plan timetable adjustments between two class slots. The engine evaluates faculty clashes, section availability, and room overlaps across all 1,967 scheduled period events in the CSE pipeline.
                  </p>
                </div>
              </div>

              {/* Slot Selection Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                
                {/* SLOT A */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-300 font-bold font-mono text-xs">
                      SLOT A
                    </span>
                    <span className="text-[11px] text-gray-400">Current Assigned Period</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Program</label>
                      <select
                        value={slotA.program}
                        onChange={(e) => setSlotA({ ...slotA, program: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {programs.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Semester</label>
                      <select
                        value={slotA.semester}
                        onChange={(e) => setSlotA({ ...slotA, semester: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {getSemesters(slotA.program).map((s) => (
                          <option key={s} value={s}>Semester {s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Section</label>
                      <select
                        value={slotA.section}
                        onChange={(e) => setSlotA({ ...slotA, section: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {getSections(slotA.program, slotA.semester).map((sec) => (
                          <option key={sec} value={sec}>Section {sec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Day</label>
                      <select
                        value={slotA.day}
                        onChange={(e) => setSlotA({ ...slotA, day: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {DAYS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Period</label>
                      <select
                        value={slotA.period}
                        onChange={(e) => setSlotA({ ...slotA, period: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {PERIOD_HEADERS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label} ({p.time})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slot A Event Preview */}
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">Assigned Event at Slot A</div>
                    {findEventAtSlot(slotA) ? (
                      <div>
                        <div className="font-bold text-amber-300">
                          {findEventAtSlot(slotA)?.code} — {findEventAtSlot(slotA)?.name}
                        </div>
                        <div className="text-gray-300 text-[11px]">
                          Faculty: {findEventAtSlot(slotA)?.faculty}
                        </div>
                        <div className="text-gray-400 text-[11px]">
                          Room: {findEventAtSlot(slotA)?.room} {findEventAtSlot(slotA)?.isLab ? '(Lab)' : ''}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No class scheduled in this slot (Free Period)</div>
                    )}
                  </div>
                </div>

                {/* SLOT B */}
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold font-mono text-xs">
                      SLOT B
                    </span>
                    <span className="text-[11px] text-gray-400">Target Adjustment Period</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Program</label>
                      <select
                        value={slotB.program}
                        onChange={(e) => setSlotB({ ...slotB, program: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {programs.map((p) => (
                          <option key={p} value={p}>{p}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Semester</label>
                      <select
                        value={slotB.semester}
                        onChange={(e) => setSlotB({ ...slotB, semester: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {getSemesters(slotB.program).map((s) => (
                          <option key={s} value={s}>Semester {s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Section</label>
                      <select
                        value={slotB.section}
                        onChange={(e) => setSlotB({ ...slotB, section: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {getSections(slotB.program, slotB.semester).map((sec) => (
                          <option key={sec} value={sec}>Section {sec}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Day</label>
                      <select
                        value={slotB.day}
                        onChange={(e) => setSlotB({ ...slotB, day: e.target.value })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {DAYS.map((d) => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-2">
                      <label className="text-[10px] text-gray-400 uppercase font-mono block mb-1">Period</label>
                      <select
                        value={slotB.period}
                        onChange={(e) => setSlotB({ ...slotB, period: Number(e.target.value) })}
                        className="w-full bg-zinc-900 border border-white/20 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        {PERIOD_HEADERS.map((p) => (
                          <option key={p.id} value={p.id}>{p.label} ({p.time})</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Slot B Event Preview */}
                  <div className="p-3 rounded-xl bg-black/60 border border-white/10 text-xs space-y-1">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">Assigned Event at Slot B</div>
                    {findEventAtSlot(slotB) ? (
                      <div>
                        <div className="font-bold text-amber-300">
                          {findEventAtSlot(slotB)?.code} — {findEventAtSlot(slotB)?.name}
                        </div>
                        <div className="text-gray-300 text-[11px]">
                          Faculty: {findEventAtSlot(slotB)?.faculty}
                        </div>
                        <div className="text-gray-400 text-[11px]">
                          Room: {findEventAtSlot(slotB)?.room} {findEventAtSlot(slotB)?.isLab ? '(Lab)' : ''}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500 italic">No class scheduled in this slot (Free Period)</div>
                    )}
                  </div>
                </div>

              </div>

              {/* Evaluate Button */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleEvaluateSwap}
                  className="px-8 py-3 rounded-2xl bg-amber-400 text-black font-extrabold text-sm uppercase tracking-wider font-grotesk hover:bg-amber-300 transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Evaluate Adjustment / Direct Swap Feasibility</span>
                </button>
              </div>

              {/* Evaluation Results Banner */}
              {swapResult && (
                <div className={`p-6 rounded-2xl border transition-all ${
                  swapResult.feasible 
                    ? 'bg-emerald-950/30 border-emerald-500/40' 
                    : 'bg-red-950/30 border-red-500/40'
                }`}>
                  <div className="flex items-center gap-3 mb-3">
                    {swapResult.feasible ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-400" />
                    )}
                    <div>
                      <h4 className="text-base font-bold font-grotesk text-white">
                        {swapResult.feasible ? 'Direct Swap is Feasible' : 'Constraint Conflicts Detected'}
                      </h4>
                      <p className="text-xs text-gray-300">
                        {swapResult.summary}
                      </p>
                    </div>
                  </div>

                  {/* Conflicting Constraints Details */}
                  {(!swapResult.feasible && (swapResult.conflictsA.length > 0 || swapResult.conflictsB.length > 0)) && (
                    <div className="space-y-3 mt-4 pt-4 border-t border-white/10">
                      <div className="text-xs font-bold text-red-300 uppercase tracking-wider font-mono">
                        Blocked Constraints:
                      </div>
                      <div className="space-y-2">
                        {swapResult.conflictsA.map((c, i) => (
                          <div key={`a-${i}`} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200">
                            <strong>Slot A → Slot B:</strong> {c.message}
                          </div>
                        ))}
                        {swapResult.conflictsB.map((c, i) => (
                          <div key={`b-${i}`} className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-200">
                            <strong>Slot B → Slot A:</strong> {c.message}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Recommendations */}
                  <div className="mt-4 pt-3 border-t border-white/10 text-xs text-gray-300">
                    <span className="font-bold text-white block mb-1">Recommended Adjustments:</span>
                    <ul className="list-disc list-inside space-y-1 text-gray-300">
                      {swapResult.recommendations.map((rec, i) => (
                        <li key={i}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: CLASS TEACHERS DIRECTORY (88 CLASS TEACHERS)                       */}
          {/* ========================================================================= */}
          {activeTab === 'teachers' && (
            <div className="space-y-4">
              
              {/* Teacher Search & Filter Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={teacherSearch}
                    onChange={(e) => setTeacherSearch(e.target.value)}
                    placeholder="Search by teacher name, email, or section..."
                    className="w-full bg-black/60 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">Program:</span>
                  <select
                    value={teacherProgramFilter}
                    onChange={(e) => setTeacherProgramFilter(e.target.value)}
                    className="bg-black/60 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="All">All Programs ({programs.length})</option>
                    {programs.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Teachers Table */}
              <div className="overflow-x-auto rounded-2xl border border-white/15 bg-black/60 shadow-inner">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-white/10 border-b border-white/15 text-gray-300 font-mono text-[11px]">
                      <th className="p-3 font-bold text-white">Program</th>
                      <th className="p-3 font-bold text-white text-center">Semester</th>
                      <th className="p-3 font-bold text-white text-center">Section</th>
                      <th className="p-3 font-bold text-white">Class Teacher</th>
                      <th className="p-3 font-bold text-white">Email Contact</th>
                      <th className="p-3 font-bold text-white">Direct Phone</th>
                      <th className="p-3 font-bold text-white text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 font-mono">
                    {filteredTeachers.map((t, idx) => (
                      <tr key={idx} className="hover:bg-white/[0.04] transition-colors">
                        <td className="p-3 font-bold text-amber-300">{t.program}</td>
                        <td className="p-3 text-center text-gray-300">Sem {t.semester}</td>
                        <td className="p-3 text-center">
                          <span className="inline-block px-2 py-0.5 rounded bg-white/10 font-extrabold text-white text-[11px]">
                            {t.section}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-white">{t.teacher}</td>
                        <td className="p-3 text-gray-300">
                          {t.email ? (
                            <a href={`mailto:${t.email}`} className="text-gray-300 hover:text-amber-300 flex items-center gap-1.5 transition-colors">
                              <Mail className="w-3.5 h-3.5 text-amber-400" />
                              <span>{t.email}</span>
                            </a>
                          ) : '—'}
                        </td>
                        <td className="p-3 text-gray-300">
                          {t.phone ? (
                            <a href={`tel:${t.phone}`} className="text-gray-300 hover:text-white flex items-center gap-1.5 transition-colors">
                              <Phone className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{t.phone}</span>
                            </a>
                          ) : 'Dept Desk'}
                        </td>
                        <td className="p-3 text-center">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedProgram(t.program);
                              setSelectedSemester(t.semester);
                              setSelectedSection(t.section);
                              setActiveTab('batches');
                            }}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-[10px] font-bold transition-colors cursor-pointer"
                          >
                            View Batch
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CAMPUS ROOMS & LABS DIRECTORY (98 ROOMS)                           */}
          {/* ========================================================================= */}
          {activeTab === 'rooms' && (
            <div className="space-y-4">
              
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={roomSearch}
                    onChange={(e) => setRoomSearch(e.target.value)}
                    placeholder="Search by room name or lab..."
                    className="w-full bg-black/60 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">Type:</span>
                  {['All', 'Class', 'Lab'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setRoomFilter(type)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        roomFilter === type
                          ? 'bg-amber-400 text-black font-extrabold shadow-sm'
                          : 'bg-white/5 text-gray-300 hover:text-white'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {filteredRooms.map((room, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-gray-300">
                        {room.type}
                      </span>
                      <span className="text-[10px] text-gray-400 font-mono">
                        {room.seating ? `${room.seating} Seats` : 'Full Lab'}
                      </span>
                    </div>
                    <div className="font-bold text-white text-xs truncate" title={room.name}>
                      {room.name}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 border-t border-white/10 bg-black/80 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-400 shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Synced with Faculty Timetable Pipeline • Updated 2026-09-14 21:28</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="http://ktiwari.in/webTT/#adjustments"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <span>Source: ktiwari.in/webTT/#adjustments</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-white text-black font-extrabold text-xs hover:bg-gray-200 transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
