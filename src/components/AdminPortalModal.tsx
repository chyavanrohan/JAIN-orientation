import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  Key,
  ShieldCheck,
  Search,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  UserPlus,
  RefreshCw,
  LogOut,
  Users,
  Building,
  GraduationCap,
  Sparkles,
  ChevronDown,
  Phone,
  Mail,
  AlertCircle
} from 'lucide-react';
import {
  StudentRegistration,
  getStudentRegistrations,
  addStudentRegistration,
  updateStudentStatus,
  deleteStudentRegistration,
  resetStudentRegistrations
} from '../lib/studentStorage';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProgram, setSelectedProgram] = useState<string>('ALL');
  const [selectedTrack, setSelectedTrack] = useState<string>('ALL');
  const [selectedStatus, setSelectedStatus] = useState<string>('ALL');

  // New Student Manual Add Form State
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newStudentData, setNewStudentData] = useState({
    fullName: '',
    usn: '',
    email: '',
    phone: '',
    program: 'B.Tech Computer Science & Engineering',
    admissionType: 'Freshers' as 'Freshers' | 'Lateral Entry',
  });

  useEffect(() => {
    if (isOpen) {
      setStudents(getStudentRegistrations());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === '1234') {
      setIsAuthenticated(true);
      setPasswordError(null);
      setPasswordInput('');
    } else {
      setPasswordError('Invalid Admin Password. Please try again.');
    }
  };

  const handleStatusChange = (id: string, newStatus: 'Confirmed' | 'Checked-In' | 'Pending') => {
    const updated = updateStudentStatus(id, newStatus);
    setStudents(updated);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to remove this student registration record?')) {
      const updated = deleteStudentRegistration(id);
      setStudents(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset student list to default 200+ demo orientation records?')) {
      const resetList = resetStudentRegistrations();
      setStudents(resetList);
    }
  };

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentData.fullName || !newStudentData.email) return;

    addStudentRegistration({
      fullName: newStudentData.fullName,
      usn: newStudentData.usn || undefined,
      email: newStudentData.email,
      phone: newStudentData.phone || '+91 98000 00000',
      program: newStudentData.program,
      admissionType: newStudentData.admissionType,
    });

    setStudents(getStudentRegistrations());
    setNewStudentData({
      fullName: '',
      usn: '',
      email: '',
      phone: '',
      program: 'B.Tech Computer Science & Engineering',
      admissionType: 'Freshers',
    });
    setShowAddForm(false);
  };

  const exportCSV = () => {
    const headers = ['Registration ID', 'USN', 'Cohort Track', 'Full Name', 'Email', 'Phone', 'Program', 'Hostel Preference', 'Registration Date', 'Status', 'Seat Number'];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.usn || 'PENDING'}"`,
      `"${s.admissionType || 'Freshers'}"`,
      `"${s.fullName}"`,
      s.email,
      s.phone,
      `"${s.program}"`,
      `"${s.hostelPreference || 'Day Scholar'}"`,
      `"${s.registeredAt}"`,
      s.status,
      s.seatNumber || 'N/A',
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jain_orientation_students_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filtered Students List
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.usn && s.usn.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesProgram = selectedProgram === 'ALL' || s.program === selectedProgram;
    const matchesTrack = selectedTrack === 'ALL' || (s.admissionType || 'Freshers') === selectedTrack;
    const matchesStatus = selectedStatus === 'ALL' || s.status === selectedStatus;

    return matchesSearch && matchesProgram && matchesTrack && matchesStatus;
  });

  const totalCount = students.length;
  const checkedInCount = students.filter((s) => s.status === 'Checked-In').length;
  const confirmedCount = students.filter((s) => s.status === 'Confirmed').length;
  const pendingCount = students.filter((s) => s.status === 'Pending').length;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="relative w-full max-w-6xl bg-zinc-950 border border-white/20 rounded-3xl p-5 md:p-8 text-white shadow-2xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white">
                  JAIN SET Admin Portal
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-[10px] font-mono font-bold uppercase">
                  Protected System
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-0.5">
                Freshers Orientation Registration Backend Database
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

        {/* Content Body */}
        {!isAuthenticated ? (
          /* LOGIN SCREEN */
          <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
            <div className="w-full max-w-md bg-white/5 p-8 rounded-3xl border border-white/15 shadow-2xl space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto text-amber-400">
                <Lock className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Admin Authentication Required</h3>
                <p className="text-xs text-gray-400">
                  Please enter administrator password to access student registration records.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center justify-between">
                    <span>Admin Password</span>
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 absolute left-3.5 top-3.5 text-gray-400" />
                    <input
                      type="password"
                      autoFocus
                      required
                      placeholder="Enter administrator password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        setPasswordError(null);
                      }}
                      className="w-full bg-black/80 border border-white/20 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                {passwordError && (
                  <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-amber-400 text-black font-extrabold text-sm hover:bg-amber-300 transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Unlock Admin Backend</span>
                </button>
              </form>

              <div className="pt-2 border-t border-white/10 text-[11px] text-gray-400 font-mono">
                JAIN SET Security Portal • Administrator Access
              </div>
            </div>
          </div>
        ) : (
          /* ADMIN DASHBOARD VIEW */
          <div className="flex-1 flex flex-col overflow-hidden pt-4 space-y-4">
            {/* Top Toolbar & Summary Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Total Registered</div>
                  <div className="text-xl font-bold text-white">{totalCount} Students</div>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Checked-In</div>
                  <div className="text-xl font-bold text-emerald-400">{checkedInCount}</div>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Confirmed</div>
                  <div className="text-xl font-bold text-amber-300">{confirmedCount}</div>
                </div>
              </div>

              <div className="bg-white/5 p-3.5 rounded-2xl border border-white/10 flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-400">Pending</div>
                  <div className="text-xl font-bold text-purple-300">{pendingCount}</div>
                </div>
              </div>
            </div>

            {/* Filter & Actions Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 shrink-0">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name, USN, email, phone, ID..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-black/70 border border-white/15 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-white"
                  />
                </div>

                {/* Program Dropdown */}
                <select
                  value={selectedProgram}
                  onChange={(e) => setSelectedProgram(e.target.value)}
                  className="bg-black/70 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Departments ({totalCount} Students)</option>
                  <option value="B.Tech Computer Science & Engineering">CSE (Computer Science)</option>
                  <option value="B.Tech AI & Machine Learning">AI & Machine Learning</option>
                  <option value="B.Tech Data Science">Data Science</option>
                  <option value="B.Tech Aerospace Engineering">Aerospace Engineering</option>
                  <option value="B.Tech Robotics & Automation">Robotics & Automation</option>
                  <option value="B.Tech Electronics & Communication Engineering">ECE (Electronics)</option>
                  <option value="B.Tech Information Science & Engineering">ISE (Information Science)</option>
                  <option value="B.Tech Cyber Security">Cyber Security</option>
                  <option value="B.Tech Mechanical Engineering">Mechanical Engineering</option>
                  <option value="B.Tech Civil Engineering">Civil Engineering</option>
                </select>

                {/* Cohort Track Dropdown */}
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="bg-black/70 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Cohorts (Freshers & Lateral)</option>
                  <option value="Freshers">Freshers (1st Year)</option>
                  <option value="Lateral Entry">Lateral Entry (2nd Year)</option>
                </select>

                {/* Status Dropdown */}
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-black/70 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Checked-In">Checked-In</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(!showAddForm)}
                  className="px-3.5 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-gray-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Add Student</span>
                </button>

                <button
                  type="button"
                  onClick={exportCSV}
                  className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  title="Reset Data"
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 transition-colors border border-white/10 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsAuthenticated(false)}
                  title="Lock Admin"
                  className="p-1.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 text-red-300 transition-colors border border-red-500/30 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Manual Add Student Drawer / Form */}
            {showAddForm && (
              <form onSubmit={handleAddStudent} className="p-4 bg-white/5 border border-white/15 rounded-2xl space-y-3 shrink-0 animate-fadeIn">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <UserPlus className="w-3.5 h-3.5" />
                    Manually Register Student
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowAddForm(false)}
                    className="text-xs text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-6 gap-3">
                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Student Name"
                      value={newStudentData.fullName}
                      onChange={(e) => setNewStudentData({ ...newStudentData, fullName: e.target.value })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">USN (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. 1JU26CS089"
                      value={newStudentData.usn}
                      onChange={(e) => setNewStudentData({ ...newStudentData, usn: e.target.value })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      placeholder="student@example.com"
                      value={newStudentData.email}
                      onChange={(e) => setNewStudentData({ ...newStudentData, email: e.target.value })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={newStudentData.phone}
                      onChange={(e) => setNewStudentData({ ...newStudentData, phone: e.target.value })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Cohort Track</label>
                    <select
                      value={newStudentData.admissionType}
                      onChange={(e) => setNewStudentData({ ...newStudentData, admissionType: e.target.value as any })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                    >
                      <option value="Freshers">🎓 Freshers (1st Year)</option>
                      <option value="Lateral Entry">⚡ Lateral Entry (2nd Year)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-gray-400 mb-1">Department</label>
                    <select
                      value={newStudentData.program}
                      onChange={(e) => setNewStudentData({ ...newStudentData, program: e.target.value })}
                      className="w-full bg-black/80 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white"
                    >
                      <option value="B.Tech Computer Science & Engineering">CSE</option>
                      <option value="B.Tech AI & Machine Learning">AI & ML</option>
                      <option value="B.Tech Data Science">Data Science</option>
                      <option value="B.Tech Aerospace Engineering">Aerospace</option>
                      <option value="B.Tech Robotics & Automation">Robotics</option>
                      <option value="B.Tech Electronics & Communication Engineering">ECE</option>
                      <option value="B.Tech Information Science & Engineering">ISE</option>
                      <option value="B.Tech Cyber Security">Cyber Security</option>
                      <option value="B.Tech Mechanical Engineering">Mechanical</option>
                      <option value="B.Tech Civil Engineering">Civil</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    className="px-5 py-1.5 rounded-xl bg-amber-400 text-black font-extrabold text-xs hover:bg-amber-300 transition-colors cursor-pointer"
                  >
                    Save Student Record
                  </button>
                </div>
              </form>
            )}

            {/* Registered Student Records Table */}
            <div className="flex-1 overflow-y-auto overflow-x-auto border border-white/15 rounded-2xl bg-black/60 shadow-inner">
              <div className="sm:hidden px-3 py-1.5 text-[10px] text-gray-400 font-mono bg-white/5 border-b border-white/10 flex items-center justify-between">
                <span>← Swipe table horizontally for actions →</span>
                <span className="text-amber-400 font-bold">{filteredStudents.length} Students</span>
              </div>
              <table className="w-full text-left text-xs border-collapse min-w-[780px]">
                <thead className="sticky top-0 bg-zinc-900 border-b border-white/15 text-gray-400 uppercase text-[10px] font-mono tracking-wider z-10">
                  <tr>
                    <th className="py-3 px-4">Reg ID</th>
                    <th className="py-3 px-4">USN</th>
                    <th className="py-3 px-4">Student Name</th>
                    <th className="py-3 px-4">Track</th>
                    <th className="py-3 px-4">Contact Info</th>
                    <th className="py-3 px-4">Department / Program</th>
                    <th className="py-3 px-4">Date Registered</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-white/10 text-gray-200">
                  {filteredStudents.length > 0 ? (
                    filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-white/5 transition-colors">
                        <td className="py-3 px-4 font-mono text-amber-300 font-bold whitespace-nowrap">
                          {s.id}
                        </td>
                        <td className="py-3 px-4 font-mono whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                            {s.usn || 'PENDING'}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-semibold text-white">
                          <div className="font-medium text-white">{s.fullName}</div>
                          <div className="text-[10px] text-gray-400 font-mono">Seat: {s.seatNumber || 'Unassigned'}</div>
                        </td>
                        <td className="py-3 px-4">
                          {s.admissionType === 'Lateral Entry' ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/40 text-amber-300 font-semibold text-[10px]">
                              <span>⚡ Lateral Entry</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 font-semibold text-[10px]">
                              <span>🎓 Freshers</span>
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 space-y-0.5">
                          <div className="flex items-center gap-1 text-gray-300">
                            <Mail className="w-3 h-3 text-gray-400" />
                            <span>{s.email}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-400 text-[11px]">
                            <Phone className="w-3 h-3 text-gray-400" />
                            <span>{s.phone}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-medium text-[11px] block">
                            {s.program}
                          </span>
                          {s.hostelPreference && s.hostelPreference !== 'Not Required (Day Scholar)' ? (
                            <span className="text-[10px] text-amber-300 font-mono mt-1 block">
                              🏠 {s.hostelPreference}
                            </span>
                          ) : (
                            <span className="text-[10px] text-gray-500 font-mono mt-1 block">
                              🚶 Day Scholar
                            </span>
                          )}
                        </td>
                        <td className="py-3 px-4 font-mono text-gray-400 text-[11px]">
                          {s.registeredAt}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={s.status}
                            onChange={(e) => handleStatusChange(s.id, e.target.value as any)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border cursor-pointer focus:outline-none ${
                              s.status === 'Checked-In'
                                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                                : s.status === 'Confirmed'
                                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40'
                                : 'bg-purple-500/20 text-purple-300 border-purple-500/40'
                            }`}
                          >
                            <option value="Confirmed" className="bg-zinc-900 text-amber-300">Confirmed</option>
                            <option value="Checked-In" className="bg-zinc-900 text-emerald-300">Checked-In</option>
                            <option value="Pending" className="bg-zinc-900 text-purple-300">Pending</option>
                          </select>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            type="button"
                            onClick={() => handleDelete(s.id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition-colors border border-red-500/20 cursor-pointer"
                            title="Delete Student Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-gray-400">
                        No student registrations match your current query or filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
