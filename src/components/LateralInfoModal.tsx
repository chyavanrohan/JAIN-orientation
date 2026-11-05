import React, { useState, useEffect } from 'react';
import { 
  X, 
  Zap, 
  Calendar, 
  Clock, 
  User, 
  Phone, 
  MapPin, 
  BookOpen, 
  Award, 
  FileCheck, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
  Printer
} from 'lucide-react';

interface LateralInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenRegister: () => void;
  onOpenAllTimetables?: () => void;
  initialTab?: 'timetable' | 'faculty' | 'eligibility';
}

interface CourseDetail {
  sNo: number;
  shortForm: string;
  name: string;
  ltpe: string;
  code: string;
  faculty: string;
  phone?: string;
  type: 'Theory' | 'Lab' | 'Bridge' | 'Training';
}

const COURSES: CourseDetail[] = [
  {
    sNo: 1,
    shortForm: 'DT',
    name: 'Design Thinking',
    ltpe: '0-0-4-1',
    code: '25ESHS01',
    faculty: 'Dr. Archana Sasi',
    phone: '940-028-4847',
    type: 'Theory'
  },
  {
    sNo: 2,
    shortForm: 'DMGT',
    name: 'Discrete Mathematics and Graph Theory',
    ltpe: '3-0-0-3',
    code: '25BSMA10',
    faculty: 'Prof. Harsha S. V.',
    phone: '953-857-1172',
    type: 'Theory'
  },
  {
    sNo: 3,
    shortForm: 'BE',
    name: 'Biology for Engineers',
    ltpe: '2-0-0-3',
    code: '25BSBE01',
    faculty: 'Prof. Rohini',
    phone: 'Dept Desk',
    type: 'Theory'
  },
  {
    sNo: 4,
    shortForm: 'COA',
    name: 'Computer Organization and Architecture',
    ltpe: '3-0-0-0',
    code: '25ESCS04',
    faculty: 'Dr. M. Sayeekumar',
    phone: '766-744-4084',
    type: 'Theory'
  },
  {
    sNo: 5,
    shortForm: 'OS',
    name: 'Operating Systems (Theory & Lab)',
    ltpe: '2-0-2-0',
    code: '25PCCS201',
    faculty: 'Prof. S. Srinivas Kumar',
    phone: '799-346-2416',
    type: 'Lab'
  },
  {
    sNo: 6,
    shortForm: 'PP',
    name: 'Python Programming (Theory & Lab)',
    ltpe: '2-0-2-0',
    code: '25PCCS202',
    faculty: 'Prof. Biswajit Debnath',
    phone: '700-560-5377',
    type: 'Lab'
  },
  {
    sNo: 7,
    shortForm: 'YOGA',
    name: 'Sports and Yoga',
    ltpe: '0-0-2-0',
    code: '25HSMC09',
    faculty: 'Dr. Srinivas M.',
    phone: '988-028-6653',
    type: 'Training'
  },
  {
    sNo: 8,
    shortForm: 'FoM',
    name: 'Foundation of Mathematics - I (Diploma Bridge)',
    ltpe: '2-0-0-0',
    code: '25MADIP01',
    faculty: 'Prof. Vishwanatha S.',
    phone: '990-150-1941',
    type: 'Bridge'
  },
  {
    sNo: 9,
    shortForm: 'PT',
    name: 'Placement Training',
    ltpe: 'Skill Development',
    code: 'T&P-2026',
    faculty: 'Corporate Training Division',
    phone: 'Placement Cell',
    type: 'Training'
  }
];

interface ScheduleSlot {
  time: string;
  subject: string;
  detail?: string;
  room?: string;
  isBreak?: boolean;
}

const DAILY_SCHEDULE: Record<string, ScheduleSlot[]> = {
  Monday: [
    { time: '08:45 AM – 10:45 AM', subject: 'OS LAB', detail: 'Operating Systems Lab', room: 'Room 221 B' },
    { time: '10:45 AM – 11:00 AM', subject: 'SHORT BREAK', isBreak: true },
    { time: '11:00 AM – 12:00 PM', subject: 'DMGT', detail: 'Discrete Math & Graph Theory', room: 'Room 111' },
    { time: '12:00 PM – 01:00 PM', subject: 'COA', detail: 'Comp Organization & Arch', room: 'Room 111' },
    { time: '01:00 PM – 01:50 PM', subject: 'LUNCH BREAK', isBreak: true },
    { time: '01:50 PM – 03:50 PM', subject: 'PT', detail: 'Placement Training (2 hrs)', room: 'Room 111' }
  ],
  Tuesday: [
    { time: '08:45 AM – 09:45 AM', subject: 'DMGT', detail: 'Discrete Math & Graph Theory', room: 'Room 111' },
    { time: '09:45 AM – 10:45 AM', subject: 'PP', detail: 'Python Programming', room: 'Room 111' },
    { time: '10:45 AM – 11:00 AM', subject: 'SHORT BREAK', isBreak: true },
    { time: '11:00 AM – 01:00 PM', subject: 'DT', detail: 'Design Thinking Workshop (2 hrs)', room: 'Studio 111' },
    { time: '01:00 PM – 01:50 PM', subject: 'LUNCH BREAK', isBreak: true },
    { time: '01:50 PM – 02:50 PM', subject: 'COA', detail: 'Comp Organization & Arch', room: 'Room 111' },
    { time: '02:50 PM – 03:50 PM', subject: 'BE', detail: 'Biology for Engineers', room: 'Room 111' }
  ],
  Wednesday: [
    { time: '08:45 AM – 09:45 AM', subject: 'COA', detail: 'Comp Organization & Arch', room: 'Room 111' },
    { time: '09:45 AM – 10:45 AM', subject: 'OS', detail: 'Operating Systems Theory', room: 'Room 111' },
    { time: '10:45 AM – 11:00 AM', subject: 'SHORT BREAK', isBreak: true },
    { time: '11:00 AM – 12:00 PM', subject: 'LIBRARY', detail: 'Central Library Reference', room: 'Knowledge Hub' },
    { time: '12:00 PM – 01:00 PM', subject: 'BE', detail: 'Biology for Engineers', room: 'Room 111' },
    { time: '01:00 PM – 01:50 PM', subject: 'LUNCH BREAK', isBreak: true },
    { time: '01:50 PM – 03:50 PM', subject: 'PP LAB', detail: 'Python Programming Lab', room: 'Room 125 A' }
  ],
  Thursday: [
    { time: '08:45 AM – 09:45 AM', subject: 'OS', detail: 'Operating Systems Theory', room: 'Room 111' },
    { time: '09:45 AM – 10:45 AM', subject: 'DMGT', detail: 'Discrete Math & Graph Theory', room: 'Room 111' },
    { time: '10:45 AM – 11:00 AM', subject: 'SHORT BREAK', isBreak: true },
    { time: '11:00 AM – 01:00 PM', subject: 'PT', detail: 'Placement Training (2 hrs)', room: 'Room 111' },
    { time: '01:00 PM – 01:50 PM', subject: 'LUNCH BREAK', isBreak: true },
    { time: '01:50 PM – 03:50 PM', subject: 'DT', detail: 'Design Thinking Studio', room: 'Studio 111' }
  ],
  Friday: [
    { time: '08:45 AM – 10:45 AM', subject: 'PT', detail: 'Placement Training (2 hrs)', room: 'Room 111' },
    { time: '10:45 AM – 11:00 AM', subject: 'SHORT BREAK', isBreak: true },
    { time: '11:00 AM – 12:00 PM', subject: 'LIBRARY', detail: 'Digital Research & Reading', room: 'Knowledge Hub' },
    { time: '12:00 PM – 01:00 PM', subject: 'PP', detail: 'Python Programming', room: 'Room 111' },
    { time: '01:00 PM – 01:50 PM', subject: 'LUNCH BREAK', isBreak: true },
    { time: '01:50 PM – 03:50 PM', subject: 'YOGA', detail: 'Sports and Yoga Activities', room: 'Campus Arena' }
  ],
  Saturday: [
    { time: '09:00 AM – 03:30 PM', subject: 'CLUB ACTIVITIES', detail: 'Technical & Cultural Student Clubs, Hackathons & Maker Faires', room: 'Campus Hub' }
  ]
};

export const LateralInfoModal: React.FC<LateralInfoModalProps> = ({
  isOpen,
  onClose,
  onOpenRegister,
  onOpenAllTimetables,
  initialTab = 'timetable'
}) => {
  const [activeTab, setActiveTab] = useState<'timetable' | 'faculty' | 'eligibility'>(initialTab);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  useEffect(() => {
    if (isOpen && initialTab) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[140] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-5xl bg-zinc-950 border border-white/20 rounded-3xl p-5 md:p-8 text-white shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/15 border border-amber-400/30 text-amber-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  Lateral Entry Track (Semester 3)
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase">
                  Direct 2nd Year
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Faculty of Engineering & Technology — Academic Year 2026–27
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white transition-colors cursor-pointer border border-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 py-3 overflow-x-auto border-b border-white/10 shrink-0 no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('timetable')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'timetable'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Official Timetable (AIML-A)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('faculty')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'faculty'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Course Directory & Faculty</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('eligibility')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'eligibility'
                ? 'bg-amber-400 text-black shadow-md font-extrabold'
                : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Eligibility & Bridge Courses</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
          
          {/* TAB 1: OFFICIAL TIMETABLE */}
          {activeTab === 'timetable' && (
            <div className="space-y-5">
              
              {/* Quick switch to full 94-class portal */}
              {onOpenAllTimetables && (
                <div className="p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span className="text-xs text-amber-200">
                      Need timetable for other engineering branches or semesters? Access all 15 programs & 94 classes.
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenAllTimetables();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-black font-extrabold text-xs transition-all shadow-md cursor-pointer whitespace-nowrap flex items-center gap-1.5"
                  >
                    <span>Open All Classes Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Timetable Header Meta Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border border-white/15 shadow-lg space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                      Faculty of Engineering & Technology
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-white/10 text-gray-300 text-[10px] font-mono">
                      Third Semester • July 2026 – December 2026
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono font-semibold text-emerald-400">
                      Effective From: 03/09/2026
                    </span>
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 hover:text-white text-[11px] font-semibold flex items-center gap-1 transition-colors cursor-pointer border border-white/10"
                      title="Print or Save Timetable as PDF"
                    >
                      <Printer className="w-3 h-3 text-amber-400" />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">Section</div>
                    <div className="text-sm font-bold text-amber-300 mt-0.5">AIML-A</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">Class Room</div>
                    <div className="text-sm font-bold text-white mt-0.5">Room 111</div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 sm:col-span-2">
                    <div className="text-[10px] text-gray-400 uppercase font-mono">Class Teacher</div>
                    <div className="text-sm font-bold text-white mt-0.5 flex items-center justify-between">
                      <span>Prof. S. Srinivas Kumar</span>
                      <a href="tel:7993462416" className="text-amber-400 hover:text-amber-300 font-mono text-xs flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        <span>799-346-2416</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Day Selector Buttons for Quick Browsing */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                      selectedDay === day
                        ? 'bg-white text-black shadow-md'
                        : 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>

              {/* Selected Day View */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2.5">
                <div className="flex items-center justify-between text-xs text-gray-400 border-b border-white/10 pb-2">
                  <span className="font-bold text-white text-sm">{selectedDay} Schedule</span>
                  <span className="font-mono text-[11px]">Daily Timings: 08:45 AM – 03:50 PM</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 pt-1">
                  {DAILY_SCHEDULE[selectedDay]?.map((slot, sIdx) => (
                    <div
                      key={sIdx}
                      className={`p-3 rounded-xl border transition-all ${
                        slot.isBreak
                          ? 'bg-zinc-900/60 border-dashed border-white/15 text-gray-400'
                          : slot.subject.includes('LAB')
                          ? 'bg-sky-500/10 border-sky-500/30 text-white'
                          : slot.subject === 'PT'
                          ? 'bg-amber-400/10 border-amber-400/30 text-white'
                          : slot.subject === 'YOGA' || slot.subject === 'CLUB ACTIVITIES'
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                          : 'bg-white/5 border-white/10 text-white'
                      }`}
                    >
                      <div className="text-[10px] font-mono text-gray-400 flex items-center justify-between">
                        <span>{slot.time}</span>
                        {slot.room && <span className="text-amber-300 font-bold">{slot.room}</span>}
                      </div>
                      <div className="text-sm font-bold mt-1 text-white flex items-center gap-2">
                        <span>{slot.subject}</span>
                      </div>
                      {slot.detail && (
                        <div className="text-[11px] text-gray-300 mt-0.5 line-clamp-1">{slot.detail}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Master Full-Week Matrix Table (Exact Mirror of University Notice) */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-amber-400" />
                    <span>Complete Weekly Timetable Matrix</span>
                  </h4>
                  <span className="text-[10px] text-gray-400 font-mono">Scroll horizontally if on mobile</span>
                </div>

                <div className="overflow-x-auto border border-white/15 rounded-2xl bg-black/70 shadow-2xl">
                  <table className="w-full text-center text-xs border-collapse min-w-[760px]">
                    <thead className="bg-zinc-900 border-b border-white/20 text-gray-300 text-[10px] font-mono uppercase">
                      <tr>
                        <th className="py-2.5 px-3 border-r border-white/15 bg-zinc-950 text-left font-bold w-20">DAY</th>
                        <th className="py-2.5 px-2 border-r border-white/10">08:45 AM –<br />09:45 AM</th>
                        <th className="py-2.5 px-2 border-r border-white/10">09:45 AM –<br />10:45 AM</th>
                        <th className="py-2.5 px-2 border-r border-white/15 bg-zinc-950/80 text-amber-300 font-bold w-16">10:45 –<br />11:00</th>
                        <th className="py-2.5 px-2 border-r border-white/10">11:00 AM –<br />12:00 PM</th>
                        <th className="py-2.5 px-2 border-r border-white/15">12:00 PM –<br />01:00 PM</th>
                        <th className="py-2.5 px-2 border-r border-white/15 bg-zinc-950/80 text-amber-300 font-bold w-16">01:00 –<br />01:50</th>
                        <th className="py-2.5 px-2 border-r border-white/10">01:50 PM –<br />02:50 PM</th>
                        <th className="py-2.5 px-2">02:50 PM –<br />03:50 PM</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-white/10 font-mono text-xs">
                      {/* Monday */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Monday</td>
                        <td colSpan={2} className="py-3 px-2 border-r border-white/10 bg-sky-500/10 text-sky-200 font-bold">
                          OS LAB (221 B)
                        </td>
                        <td rowSpan={5} className="py-3 px-1 border-r border-white/15 bg-zinc-950 text-gray-400 font-bold text-[10px] tracking-widest writing-mode-vertical">
                          SHORT BREAK
                        </td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-white">DMGT</td>
                        <td className="py-3 px-2 border-r border-white/15 font-bold text-white">COA</td>
                        <td rowSpan={5} className="py-3 px-1 border-r border-white/15 bg-zinc-950 text-gray-400 font-bold text-[10px] tracking-widest writing-mode-vertical">
                          LUNCH
                        </td>
                        <td colSpan={2} className="py-3 px-2 bg-amber-400/10 text-amber-300 font-bold">
                          PT (Placement Training)
                        </td>
                      </tr>

                      {/* Tuesday */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Tuesday</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-white">DMGT</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-emerald-300">PP</td>
                        <td colSpan={2} className="py-3 px-2 border-r border-white/15 bg-amber-500/10 text-amber-200 font-bold">
                          DT (Design Thinking)
                        </td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-white">COA</td>
                        <td className="py-3 px-2 font-bold text-rose-300">BE</td>
                      </tr>

                      {/* Wednesday */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Wednesday</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-white">COA</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-sky-300">OS</td>
                        <td className="py-3 px-2 border-r border-white/10 text-gray-300">LIBRARY</td>
                        <td className="py-3 px-2 border-r border-white/15 font-bold text-rose-300">BE</td>
                        <td colSpan={2} className="py-3 px-2 bg-emerald-500/10 text-emerald-200 font-bold">
                          PP LAB (125 A)
                        </td>
                      </tr>

                      {/* Thursday */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Thursday</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-sky-300">OS</td>
                        <td className="py-3 px-2 border-r border-white/10 font-bold text-white">DMGT</td>
                        <td colSpan={2} className="py-3 px-2 border-r border-white/15 bg-amber-400/10 text-amber-300 font-bold">
                          PT (Placement Training)
                        </td>
                        <td colSpan={2} className="py-3 px-2 bg-amber-500/10 text-amber-200 font-bold">
                          DT (Design Thinking)
                        </td>
                      </tr>

                      {/* Friday */}
                      <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Friday</td>
                        <td colSpan={2} className="py-3 px-2 border-r border-white/10 bg-amber-400/10 text-amber-300 font-bold">
                          PT (Placement Training)
                        </td>
                        <td className="py-3 px-2 border-r border-white/10 text-gray-300">LIBRARY</td>
                        <td className="py-3 px-2 border-r border-white/15 font-bold text-emerald-300">PP</td>
                        <td colSpan={2} className="py-3 px-2 bg-teal-500/10 text-teal-200 font-bold">
                          YOGA (Sports & Yoga)
                        </td>
                      </tr>

                      {/* Saturday */}
                      <tr className="bg-white/5 hover:bg-white/10 transition-colors">
                        <td className="py-3 px-3 font-bold text-left border-r border-white/15 bg-zinc-950 text-white">Saturday</td>
                        <td colSpan={8} className="py-3 px-2 font-bold text-amber-300 tracking-wider">
                          CLUB ACTIVITIES (Technical Hackathons, Maker Faires & Student Societies)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="p-3 rounded-xl bg-black/60 border border-white/15 text-center text-xs text-amber-300 font-mono">
                  THIS TIMETABLE VERSION WILL COME INTO EFFECT FROM 03/09/2026.
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: COURSE DIRECTORY & FACULTY DETAILS */}
          {activeTab === 'faculty' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white">Semester 3 Course Directory & Faculty Roster</h3>
                  <p className="text-xs text-gray-400">Direct contact numbers for subject professors and module mentors</p>
                </div>
                <span className="text-xs font-mono text-amber-300">9 Core Courses</span>
              </div>

              <div className="overflow-x-auto border border-white/15 rounded-2xl bg-black/70 shadow-lg">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-zinc-900 border-b border-white/15 text-gray-400 text-[10px] font-mono uppercase">
                    <tr>
                      <th className="py-3 px-3 w-12 text-center">S.No</th>
                      <th className="py-3 px-3 font-bold text-amber-300">Code</th>
                      <th className="py-3 px-4">Course Name</th>
                      <th className="py-3 px-3">L-T-P-E</th>
                      <th className="py-3 px-4">Faculty In-Charge</th>
                      <th className="py-3 px-4 text-right">Contact No.</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10 text-gray-200 font-mono">
                    {COURSES.map((course) => (
                      <tr key={course.sNo} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-3 text-center text-gray-400">{course.sNo}</td>
                        <td className="py-3 px-3 font-bold text-amber-300 whitespace-nowrap">
                          {course.shortForm}
                          <span className="block text-[10px] text-gray-400 font-normal">{course.code}</span>
                        </td>
                        <td className="py-3 px-4 font-sans font-medium text-white">
                          <div>{course.name}</div>
                          {course.type === 'Bridge' && (
                            <span className="inline-block mt-0.5 px-2 py-0.2 rounded bg-amber-400/20 text-amber-300 text-[10px] font-mono">
                              ★ Diploma Exemption Bridge Subject
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-3 text-gray-300">{course.ltpe}</td>
                        <td className="py-3 px-4 font-sans font-semibold text-white whitespace-nowrap">
                          {course.faculty}
                        </td>
                        <td className="py-3 px-4 text-right text-gray-300 whitespace-nowrap">
                          {course.phone && course.phone !== 'Dept Desk' && course.phone !== 'Placement Cell' ? (
                            <a
                              href={`tel:${course.phone.replace(/[^0-9]/g, '')}`}
                              className="text-amber-400 hover:text-white font-bold flex items-center justify-end gap-1"
                            >
                              <Phone className="w-3 h-3" />
                              <span>{course.phone}</span>
                            </a>
                          ) : (
                            <span className="text-gray-400">{course.phone || '—'}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY & BRIDGE CURRICULUM */}
          {activeTab === 'eligibility' && (
            <div className="space-y-5">
              {/* 3 Pillars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <Clock className="w-5 h-5 text-amber-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Saves 1 Full Year</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Direct entry into Semester 3. Complete your engineering degree in 3 years (6 semesters).
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <FileCheck className="w-5 h-5 text-emerald-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Full Credit Exemption</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Complete waiver for 1st-year foundational credits. Seamless transition to core engineering modules.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                  <Award className="w-5 h-5 text-sky-400 mb-2" />
                  <h4 className="text-sm font-semibold text-white">Top Tier Placements</h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Equal recruitment eligibility from Semester 6 with premier tech firms and packages up to ₹85.08 LPA.
                  </p>
                </div>
              </div>

              {/* Eligibility & Bridge Curriculum Details */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <h4 className="text-sm font-semibold text-amber-300 mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400" />
                    AICTE Lateral Eligibility Criteria
                  </h4>
                  <ul className="text-xs text-gray-300 space-y-1.5 list-disc list-inside">
                    <li>Passed 3-year Polytechnic Diploma in Engineering/Technology from a recognized State Board (minimum 45% aggregate; 40% for reserved categories).</li>
                    <li>Passed B.Sc Degree from a recognized university with Mathematics at 10+2 level (minimum 45% aggregate).</li>
                    <li>Valid entrance or institutional lateral merit counselling rank.</li>
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/10">
                  <h4 className="text-sm font-semibold text-emerald-300 mb-2 flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    Integrated Bridge Courses (Included in Schedule)
                  </h4>
                  <p className="text-xs text-gray-300 mb-2">
                    To ensure smooth synchronization with 4-year students, JAIN SET includes complimentary bridge modules directly in the timetable:
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="font-semibold text-white font-mono">25MADIP01: Foundation of Mathematics - I (FoM)</span>
                      <p className="text-[11px] text-gray-400 mt-0.5">Vector calculus, differential equations, and linear systems under Prof. Vishwanatha S.</p>
                    </div>
                    <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                      <span className="font-semibold text-white font-mono">25PCCS202: Python Programming & DSA Lab (PP LAB)</span>
                      <p className="text-[11px] text-gray-400 mt-0.5">Hands-on algorithms, object-oriented paradigms, and system architecture in Lab 125 A.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-gray-400">
            Lateral Induction Date: <span className="font-semibold text-white">August 22–24, 2026</span> • Classes start: <span className="font-semibold text-amber-300">03/09/2026</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer border border-white/10"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="px-5 py-2 rounded-xl bg-amber-400 text-black text-xs font-extrabold hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <span>Register for Lateral Induction</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
