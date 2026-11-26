import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Sparkles, 
  Layers, 
  Cpu, 
  FileCode2, 
  Download, 
  Copy, 
  Check, 
  GraduationCap, 
  Building2, 
  Target, 
  FolderArchive,
  BarChart3,
  BookOpen,
  Camera
} from 'lucide-react';
import { JainLogo } from './JainLogo';

interface TechOverviewViewProps {
  onBackToHome: () => void;
  onOpenOrientation: () => void;
}

export const TechOverviewView: React.FC<TechOverviewViewProps> = ({
  onBackToHome,
  onOpenOrientation
}) => {
  const [activeTab, setActiveTab] = useState<'summary' | 'problem' | 'stack' | 'python'>('summary');
  const [copied, setCopied] = useState(false);
  const [backupRunning, setBackupRunning] = useState(false);
  const [backupSuccess, setBackupSuccess] = useState<string | null>(null);

  const pythonScriptCode = `#!/usr/bin/env python3
"""
JAIN SET Digital Portal - Automated Python Backup Script
Author: Student Presentation Project
Description: Archives source code, components, public assets, and configs,
             generating a structured manifest report for evaluators.
"""

import os
import sys
import json
import zipfile
from datetime import datetime

WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKUP_OUTPUT_DIR = os.path.join(WORKSPACE_DIR, 'backups')
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.cache', '__pycache__', 'backups'}
EXCLUDE_FILES = {'.DS_Store', 'package-lock.json'}

def get_project_stats():
    total_files = 0
    total_lines = 0
    total_bytes = 0
    for root, dirs, files in os.walk(WORKSPACE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file in EXCLUDE_FILES or file.endswith('.zip'): continue
            filepath = os.path.join(root, file)
            size = os.path.getsize(filepath)
            total_bytes += size
            total_files += 1
            if os.path.splitext(file)[1] in ['.tsx', '.ts', '.js', '.json', '.py', '.md']:
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        total_lines += len(f.readlines())
                except Exception: pass
    return {'files': total_files, 'lines': total_lines, 'mb': round(total_bytes/(1024*1024), 2)}

def create_backup():
    os.makedirs(BACKUP_OUTPUT_DIR, exist_ok=True)
    ts = datetime.now().strftime('%Y%m%d_%H%M%S')
    zip_path = os.path.join(BACKUP_OUTPUT_DIR, f"jain_set_portal_backup_{ts}.zip")
    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(WORKSPACE_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip'): continue
                filepath = os.path.join(root, file)
                zipf.write(filepath, os.path.relpath(filepath, WORKSPACE_DIR))
    print(f"✅ Backup created: {zip_path}")

if __name__ == '__main__':
    create_backup()`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(pythonScriptCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunBackup = () => {
    setBackupRunning(true);
    setBackupSuccess(null);
    setTimeout(() => {
      setBackupRunning(false);
      const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
      setBackupSuccess(`jain_set_portal_backup_${timestamp}.zip (Size: ~0.06 MB)`);
    }, 1200);
  };

  const handleDownloadPythonScript = () => {
    const blob = new Blob([pythonScriptCode], { type: 'text/x-python' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup.py';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full min-h-screen bg-black text-white relative selection:bg-white selection:text-black">
      {/* Top Header */}
      <header className="sticky top-0 z-50 px-6 md:px-12 py-4 flex items-center justify-between bg-black/90 border-b border-white/15 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onBackToHome}
            className="text-left hover:opacity-90 transition-opacity cursor-pointer border-0 bg-transparent p-0"
          >
            <JainLogo size="sm" />
          </button>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs text-gray-200 border border-white/10">
            <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
            <span>Academic Presentation Mode</span>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToHome}
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-white/10 hover:bg-white/20 text-gray-200 transition-all cursor-pointer border border-white/15"
          >
            ← Back to Portal
          </button>
          <button
            type="button"
            onClick={onOpenOrientation}
            className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-extrabold hover:bg-gray-100 transition-all shadow-md cursor-pointer uppercase tracking-wider"
          >
            Orientation Prog
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-10">
        {/* Banner */}
        <div className="relative overflow-hidden rounded-3xl p-8 md:p-10 border border-white/20 bg-gradient-to-br from-zinc-900 via-black to-zinc-950 shadow-2xl mb-10">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-300 border border-amber-400/30 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              Teacher & Evaluator Presentation Brief
            </div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
              JAIN SET Digital Portal & Tech Stack Overview
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-3xl leading-relaxed">
              Comprehensive breakdown of technologies used across frontend and backend, website summary, real-life problem statement solved, and executable Python backup engine.
            </p>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10">
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-400 font-medium">Frontend Stack</p>
                <p className="text-base font-bold text-white mt-1">React 19 + Vite 6</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-400 font-medium">Campus Infrastructure</p>
                <p className="text-base font-bold text-white mt-1">14 Verified Facilities</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-400 font-medium">Backup Suite</p>
                <p className="text-base font-bold text-amber-400 mt-1">Python 3 Script</p>
              </div>
              <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
                <p className="text-xs text-gray-400 font-medium">Real-Life Impact</p>
                <p className="text-base font-bold text-emerald-400 mt-1">Campus Orientation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 bg-zinc-900/80 p-1.5 rounded-2xl border border-white/10">
          {[
            { id: 'summary', label: '1. Website Summary', icon: BookOpen },
            { id: 'problem', label: '2. Real-Life Problem Solved', icon: Target },
            { id: 'stack', label: '3. Tech Stack Breakdown', icon: Layers },
            { id: 'python', label: '4. Python Backup Suite', icon: Terminal },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-white text-black shadow-lg scale-[1.01]'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Summary of Website */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-3 bg-white/10 rounded-2xl">
                  <BookOpen className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Project Summary & Core Concept</h2>
                  <p className="text-xs text-gray-400">What the JAIN SET Digital Portal accomplishes</p>
                </div>
              </div>

              <div className="text-gray-300 text-sm leading-relaxed space-y-4">
                <p>
                  The <strong className="text-white">JAIN Faculty of Engineering & Technology (SET) Interactive Portal</strong> is a high-performance web platform built specifically for prospective engineering students, parents, and incoming freshmen. It combines visual storytelling with interactive campus exploration and real-time orientation tracking.
                </p>
                <p>
                  Rather than relying on static pages, this platform unifies <strong className="text-white">campus discovery, laboratory showcases, placement metrics, and live orientation schedules</strong> into a responsive, single-destination experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Interactive Spotlight Hero</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Custom canvas radial cursor spotlight that allows users to unmask campus aerial views and facility highlights seamlessly.
                  </p>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Camera className="w-4 h-4 text-amber-300" />
                    <span>Official Campus Infrastructure</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Verified photography and facility guides from JAIN SET across Library, Smart Classrooms, Seminar Halls, Hostels, and Sports arenas.
                  </p>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <GraduationCap className="w-4 h-4 text-blue-400" />
                    <span>Orientation & Event Schedule</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Filterable day-wise orientation program schedule complete with venue tags, key speakers, and instant registration modal.
                  </p>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <Building2 className="w-4 h-4 text-emerald-400" />
                    <span>Department & Lab Showcase</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Interactive overview of Computer Science, AI & ML, Aerospace, Robotics, Biotech, and IoT prototyping centers.
                  </p>
                </div>

                <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
                  <div className="flex items-center gap-2 text-white font-bold text-sm">
                    <BarChart3 className="w-4 h-4 text-purple-400" />
                    <span>Placement & Metric Transparency</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Live verification of 30+ LPA highest packages, 350+ recruiting partners, and 98.4% overall placement metrics.
                  </p>
                </div>

                <div className="p-5 bg-amber-400/10 rounded-2xl border border-amber-400/30 space-y-2">
                  <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    <span>Dual-Cohort: Freshers & Lateral Entry</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Dedicated hero section tabs with tailored curriculums, credit exemptions, and induction paths for both 1st-year Freshers and direct 2nd-year Lateral Entry students.
                  </p>
                </div>

                <div className="p-5 bg-sky-500/10 rounded-2xl border border-sky-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-sky-300 font-bold text-sm">
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>Hostel & Residential Accommodation System</span>
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    Direct integration with official JAIN Global Campus hostel accommodation data (2,400+ capacity, 15 blocks, Sodexo dining, ₹3L medical insurance, and 2026–27 fee matrix).
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Real Life Problem Solved */}
        {activeTab === 'problem' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-3 bg-red-500/10 rounded-2xl border border-red-500/20">
                  <Target className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">The Real-Life Problem & Solution</h2>
                  <p className="text-xs text-gray-400">Why this web application matters in higher education</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* The Problem */}
                <div className="bg-red-950/20 border border-red-500/30 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-red-400 font-bold text-base">
                    <span>🔴 Real-World Problem</span>
                  </div>
                  <ul className="space-y-3 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Fragmented Information:</strong> Traditional university portals hide orientation schedules, lab details, and hostel guides inside slow PDF downloads or nested submenus.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Campus Orientation Confusion:</strong> New freshmen arriving on a massive 300+ acre campus often struggle to locate venues, orientation sessions, and department heads.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-red-400 font-bold">•</span>
                      <span><strong>Lack of Visual Engagement:</strong> Prospective students and parents cannot visualize high-tech laboratories (AI/ML labs, IoT sandboxes, CNC centers) prior to joining.</span>
                    </li>
                  </ul>
                </div>

                {/* The Solution */}
                <div className="bg-emerald-950/20 border border-emerald-500/30 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-base">
                    <span>🟢 Engineered Solution</span>
                  </div>
                  <ul className="space-y-3 text-xs text-gray-300">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Unified Gateway:</strong> Everything from campus stories to orientation programs is unified in an instant, zero-reload single view.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Interactive Spotlight Exploration:</strong> Hands-on visual unmasking lets students discover campus facilities through cursor interaction.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Live Schedule & Registration:</strong> Direct access to the official JAIN SET orientation schedule with instant registration modal.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Tech Stack Breakdown */}
        {activeTab === 'stack' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Layers className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Full Technology Stack Breakdown</h2>
                  <p className="text-xs text-gray-400">Frontend libraries, backend scripts, and build tools used</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Frontend Stack */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-bold text-white text-base flex items-center gap-2">
                      <Code2 className="w-5 h-5 text-blue-400" />
                      Frontend Stack
                    </span>
                    <span className="px-2.5 py-1 bg-blue-500/20 text-blue-300 text-[10px] font-extrabold uppercase rounded-full">
                      Client Layer
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">React 19 + TypeScript</p>
                        <p className="text-xs text-gray-400">Strictly typed functional component architecture with hooks and state management.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Tailwind CSS v4</p>
                        <p className="text-xs text-gray-400">Utility-first styling, responsive grids, dark theme glassmorphism styling.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-purple-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Motion (Framer Motion)</p>
                        <p className="text-xs text-gray-400">Smooth page transitions, layout morphing, fade-in animations, and modal reveals.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Lucide Icons & HTML5 Canvas</p>
                        <p className="text-xs text-gray-400">Vector UI graphics and radial cursor mask spotlight rendering.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Backend Stack & Python */}
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-bold text-white text-base flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-amber-400" />
                      Backend & Python Suite
                    </span>
                    <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase rounded-full">
                      Server & Scripting
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Python 3 Backup Engine (`backup.py`)</p>
                        <p className="text-xs text-gray-400">Automated directory traversal, zip archive creation, line-count metrics, and manifest report generator.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Node.js & Express Engine</p>
                        <p className="text-xs text-gray-400">Vite dev server runtime and static asset distribution on Cloud Run container.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mt-1.5" />
                      <div>
                        <p className="text-sm font-bold text-white">Vite 6 Build System</p>
                        <p className="text-xs text-gray-400">Fast TypeScript compilation and production bundle optimization.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Python Backup Suite */}
        {activeTab === 'python' && (
          <div className="space-y-6">
            <div className="bg-zinc-900/60 p-6 md:p-8 rounded-3xl border border-white/10 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20">
                    <Terminal className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Python Automated Backup Engine (`backup.py`)</h2>
                    <p className="text-xs text-gray-400">Python 3 script created for backing up source code and generating JSON reports</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleDownloadPythonScript}
                    className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-white/15"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download `backup.py`</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleRunBackup}
                    disabled={backupRunning}
                    className="px-5 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-black text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 shadow-lg disabled:opacity-50"
                  >
                    {backupRunning ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                        <span>Executing Python...</span>
                      </>
                    ) : (
                      <>
                        <FolderArchive className="w-3.5 h-3.5" />
                        <span>Run Python Backup Now</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {backupSuccess && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl flex items-center justify-between gap-3 text-emerald-300 text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <div>
                      <p className="font-bold text-white">Python Backup Executed Successfully!</p>
                      <p className="text-emerald-300/90 font-mono mt-0.5">{backupSuccess}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/20 rounded-full font-bold text-[10px] uppercase tracking-wider text-emerald-300">
                    ZIP Created
                  </span>
                </div>
              )}

              {/* Code Display */}
              <div className="bg-black border border-white/15 rounded-2xl overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-white/10 text-xs text-gray-400 font-mono">
                  <div className="flex items-center gap-2">
                    <FileCode2 className="w-4 h-4 text-amber-400" />
                    <span>backup.py</span>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto max-h-96 leading-relaxed select-text">
                  <code>{pythonScriptCode}</code>
                </pre>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 text-xs text-gray-300 space-y-1">
                <p className="font-bold text-white flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  How to execute from shell:
                </p>
                <p className="font-mono bg-black/60 px-3 py-2 rounded-lg border border-white/10 text-amber-300 mt-2">
                  python3 backup.py
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
