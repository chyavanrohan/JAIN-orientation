import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, CheckCircle, Send, Sparkles, ShieldCheck } from 'lucide-react';
import { addStudentRegistration } from '../lib/studentStorage';

interface OrientationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmin?: () => void;
  initialCohort?: 'Freshers' | 'Lateral Entry';
}

export const OrientationModal: React.FC<OrientationModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmin,
  initialCohort = 'Freshers',
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [cohort, setCohort] = useState<'Freshers' | 'Lateral Entry'>(initialCohort);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl liquid-glass rounded-2xl p-6 md:p-8 border border-white/20 text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white border border-white/10 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
            <span>School of Engineering & Technology</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{cohort === 'Freshers' ? 'Freshers: 14 Seats Available' : 'Lateral Entry: 8 Seats Available'}</span>
          </div>
        </div>

        {/* Cohort Selector Tabs inside modal */}
        <div className="flex items-center p-1 bg-white/5 border border-white/15 rounded-xl mb-4 w-fit">
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

        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
          {cohort === 'Freshers'
            ? 'Freshers Orientation Program 2026'
            : 'Lateral Entry Induction & Bridge Program 2026'}
        </h2>
        <p className="text-gray-300 text-sm mb-6">
          {cohort === 'Freshers'
            ? 'JAIN (Deemed-to-be University) — Kanakapura Road Global Campus (4-Year B.Tech Track)'
            : 'JAIN (Deemed-to-be University) — Direct 3rd Semester Admission (Diploma & B.Sc to B.Tech)'}
        </p>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Calendar className="w-5 h-5 text-white shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Date</div>
              <div className="text-xs font-medium text-white">
                {cohort === 'Freshers' ? 'August 18 - 20, 2026' : 'August 22 - 24, 2026'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <Clock className="w-5 h-5 text-white shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Timing</div>
              <div className="text-xs font-medium text-white">
                {cohort === 'Freshers' ? '09:30 AM - 04:30 PM' : '10:00 AM - 04:00 PM'}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
            <MapPin className="w-5 h-5 text-white shrink-0" />
            <div>
              <div className="text-xs text-gray-400">Venue</div>
              <div className="text-xs font-medium text-white">
                {cohort === 'Freshers'
                  ? 'Main Auditorium, Kanakapura Campus'
                  : 'Engineering Block Sem Hall, Kanakapura Campus'}
              </div>
            </div>
          </div>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-white/10">
            <h3 className="text-base font-semibold text-white">Register / Confirm Attendance</h3>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
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
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
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
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">Intended Program</label>
              <select
                value={formData.program}
                onChange={(e) => setFormData({ ...formData, program: e.target.value })}
                className="w-full bg-black/80 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
              >
                <option value="B.Tech Computer Science & Engineering">B.Tech Computer Science & Engineering</option>
                <option value="B.Tech AI & Machine Learning">B.Tech AI & Machine Learning</option>
                <option value="B.Tech Data Science">B.Tech Data Science</option>
                <option value="B.Tech Aerospace Engineering">B.Tech Aerospace Engineering</option>
                <option value="B.Tech Robotics & Automation">B.Tech Robotics & Automation</option>
                <option value="B.Tech Electronics & Communication">B.Tech Electronics & Communication</option>
                <option value="M.Tech / Ph.D. Program">M.Tech / Ph.D. Program</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1 flex items-center justify-between">
                <span>Hostel Accommodation Preference</span>
                <span className="text-[10px] text-amber-300 font-mono">JAIN Global Campus</span>
              </label>
              <select
                value={formData.hostelPreference}
                onChange={(e) => setFormData({ ...formData, hostelPreference: e.target.value })}
                className="w-full bg-black/80 border border-white/15 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-white transition-colors"
              >
                <option value="Not Required (Day Scholar)">Not Required (Day Scholar / Local Transit)</option>
                <option value="Boys Hostel - Double Sharing (₹2,25,000/yr)">Boys Hostel — Double Sharing with Attached Bath (₹2,25,000/yr)</option>
                <option value="Boys Hostel - Triple Sharing (₹1,90,000/yr)">Boys Hostel — Triple Sharing with Attached Bath (₹1,90,000/yr)</option>
                <option value="Girls Hostel - Triple Sharing (₹1,90,000/yr)">Girls Hostel — Triple Sharing with Attached Bath (₹1,90,000/yr)</option>
                <option value="Off-Campus Boys - Double Sharing (₹1,85,000/yr)">Off-Campus Boys — Double Sharing (₹1,85,000/yr)</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-3 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2 shadow-lg"
            >
              <Send className="w-4 h-4" />
              <span>
                {cohort === 'Freshers'
                  ? 'Confirm Freshers Orientation Registration'
                  : 'Confirm Lateral Entry Induction Registration'}
              </span>
            </button>

            {onOpenAdmin && (
              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                <span>Evaluator & Staff Portal:</span>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenAdmin();
                  }}
                  className="px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 font-mono text-[11px] font-bold hover:bg-amber-400/20 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Admin Access</span>
                </button>
              </div>
            )}
          </form>
        ) : (
          <div className="text-center py-8 space-y-3 pt-2 border-t border-white/10">
            <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-xl font-semibold text-white">Registration Confirmed!</h3>
            <p className="text-sm text-gray-300 max-w-md mx-auto">
              Thank you, <span className="font-semibold text-white">{formData.fullName}</span>. Your registration has been stored in the admin database.
            </p>

            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="bg-white text-black px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Close Window
              </button>

              {onOpenAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                    onOpenAdmin();
                  }}
                  className="px-5 py-2 rounded-lg bg-amber-400 text-black text-sm font-extrabold hover:bg-amber-300 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>View Admin Backend</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
