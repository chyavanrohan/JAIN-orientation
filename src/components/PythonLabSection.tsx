import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Play,
  AlertTriangle,
  CheckCircle2,
  Plus,
  Trash2,
  BookOpen,
  Calculator,
  ChevronDown,
  ChevronUp,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import {
  getPrograms,
  getSemesters,
  getSections,
  getBatchTimetable,
} from '../data/timetableService';
import {
  ensurePyodideReady,
  getCachedPythonStatus,
  runPythonModule,
  DEFAULT_SGPA_SOLVER_PYTHON,
  type PyodideRuntimeStatus,
} from '../services/pyodideService';

interface SgpaCourseRow {
  id: string;
  code: string;
  name: string;
  credits: number;
  inputMode: 'grade' | 'marks';
  letterGrade: string;
  marks: number;
}

interface SgpaResultData {
  sgpa: number;
  updatedCgpa: number;
  equivalentPercentage: number;
  totalCredits: number;
  passedCredits: number;
  totalGradePoints: number;
  cumulativeCredits: number;
  failedCount: number;
  neededNextSgpa: number;
  targetAchievable: boolean;
  evaluatedCourses: {
    code: string;
    name: string;
    credits: number;
    letterGrade: string;
    gradePoint: number;
    weightedPoints: number;
  }[];
  gradeDistribution: { grade: string; credits: number }[];
}

const GRADE_OPTIONS = ['O', 'A+', 'A', 'B+', 'B', 'C', 'P', 'F'];

function parseLtpeCredits(ltpe?: string): number {
  if (!ltpe) return 3;
  const parts = ltpe.split('-').map((n) => parseInt(n, 10));
  if (parts.length < 3 || parts.some((n) => Number.isNaN(n))) return 3;
  const [l, t, p] = parts;
  const computed = l + t + Math.floor(p / 2);
  return Math.max(1, Math.min(5, computed));
}

function loadCoursesForBatch(program: string, semester: string): SgpaCourseRow[] {
  const sections = getSections(program, semester);
  const firstSec = sections[0] || 'A';
  const batch = getBatchTimetable(program, semester, firstSec) as
    | (ReturnType<typeof getBatchTimetable> & {
        subjects?: { code: string; abbr?: string; name: string; ltpe?: string }[];
      })
    | null;

  const rawSubjects = batch?.subjects || [];
  const filtered = rawSubjects.filter(
    (s) =>
      s.abbr !== 'PT' &&
      !/placement training/i.test(s.name) &&
      !/foundation of mathematics/i.test(s.name)
  );

  if (filtered.length === 0) {
    return [
      { id: 'c1', code: 'C4', name: 'Python Programming', credits: 3, inputMode: 'grade', letterGrade: 'O', marks: 92 },
      { id: 'c2', code: 'C3', name: 'Operating Systems', credits: 3, inputMode: 'grade', letterGrade: 'A+', marks: 85 },
      { id: 'c3', code: 'C24', name: 'Discrete Mathematics & Graph Theory', credits: 3, inputMode: 'grade', letterGrade: 'A', marks: 76 },
      { id: 'c4', code: 'C2', name: 'Computer Organization & Architecture', credits: 3, inputMode: 'grade', letterGrade: 'A+', marks: 83 },
      { id: 'c5', code: 'C5', name: 'Design Thinking', credits: 2, inputMode: 'grade', letterGrade: 'O', marks: 91 },
    ];
  }

  return filtered.slice(0, 8).map((sub, i) => ({
    id: `${sub.code}-${i}`,
    code: sub.code,
    name: sub.name.replace(/\s*\d-\d-\d-\d\s*$/, '').trim(),
    credits: parseLtpeCredits(sub.ltpe),
    inputMode: 'grade',
    letterGrade: i % 3 === 0 ? 'O' : i % 2 === 0 ? 'A+' : 'A',
    marks: i % 3 === 0 ? 92 : i % 2 === 0 ? 84 : 76,
  }));
}

export const PythonLabSection: React.FC = () => {
  const programs = useMemo(() => getPrograms(), []);
  const initialCache = getCachedPythonStatus();

  const [runtimeStatus, setRuntimeStatus] = useState<PyodideRuntimeStatus>(
    initialCache.ready ? 'ready' : 'idle'
  );
  const [pythonVersion, setPythonVersion] = useState<string>(initialCache.version);
  const [runtimeError, setRuntimeError] = useState<string>('');
  const [showReportGuide, setShowReportGuide] = useState<boolean>(false);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);

  // SGPA & CGPA Solver State
  const [sgpaProgram, setSgpaProgram] = useState<string>('AIML');
  const [sgpaSemester, setSgpaSemester] = useState<string>('3');
  const [courses, setCourses] = useState<SgpaCourseRow[]>(() => loadCoursesForBatch('AIML', '3'));
  const [priorCredits, setPriorCredits] = useState<number>(42);
  const [priorCgpa, setPriorCgpa] = useState<number>(8.45);
  const [targetCgpa, setTargetCgpa] = useState<number>(8.75);
  const [nextSemCredits, setNextSemCredits] = useState<number>(22);
  const [sgpaResult, setSgpaResult] = useState<SgpaResultData | null>(null);

  const sgpaSemesters = useMemo(() => getSemesters(sgpaProgram), [sgpaProgram]);

  const initRuntime = useCallback(async () => {
    setRuntimeStatus('loading');
    setRuntimeError('');
    try {
      const { version } = await ensurePyodideReady();
      setPythonVersion(version);
      setRuntimeStatus('ready');
      return true;
    } catch (err) {
      setRuntimeStatus('error');
      setRuntimeError(err instanceof Error ? err.message : 'Unable to initialize Pyodide.');
      return false;
    }
  }, []);

  const executeSgpaSolver = useCallback(async () => {
    setIsExecuting(true);
    setRuntimeError('');

    const payload = {
      priorCredits,
      priorCgpa,
      targetCgpa,
      nextSemCredits,
      courses: courses.map((c) => ({
        code: c.code,
        name: c.name,
        credits: c.credits,
        inputMode: c.inputMode,
        letterGrade: c.letterGrade,
        marks: c.marks,
      })),
    };

    const res = await runPythonModule<SgpaResultData>(
      DEFAULT_SGPA_SOLVER_PYTHON,
      'solve_sgpa_and_cgpa(LAB_INPUT)',
      payload
    );

    if (res.ok && res.data) {
      setSgpaResult(res.data);
      setRuntimeStatus('ready');
    } else if (res.error) {
      setRuntimeError(res.error);
    }
    setIsExecuting(false);
  }, [priorCredits, priorCgpa, targetCgpa, nextSemCredits, courses]);

  // Auto-bootstrap Pyodide and run initial SGPA/CGPA solve once mounted
  useEffect(() => {
    let active = true;
    (async () => {
      const ok = await initRuntime();
      if (ok && active && !sgpaResult) {
        await executeSgpaSolver();
      }
    })();
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLoadCurriculum = () => {
    const loaded = loadCoursesForBatch(sgpaProgram, sgpaSemester);
    setCourses(loaded);
  };

  const handleAddCourse = () => {
    setCourses((prev) => [
      ...prev,
      {
        id: `custom-${Date.now()}`,
        code: `CS${100 + prev.length + 1}`,
        name: 'Elective Course',
        credits: 3,
        inputMode: 'grade',
        letterGrade: 'A+',
        marks: 85,
      },
    ]);
  };

  const handleUpdateCourse = (id: string, patch: Partial<SgpaCourseRow>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  };

  const handleRemoveCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-fadeIn">
      {/* Top Calculator Header & Runtime Status */}
      <div className="rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/15 bg-zinc-950/90 space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 font-grotesk">
              <span>JAIN SET Academic Calculator</span>
              <span aria-hidden="true">·</span>
              <span>In-Browser Python via Pyodide WebAssembly</span>
              <span aria-hidden="true">·</span>
              <span>UGC 10-Point Scale</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-playfair italic font-bold text-white tracking-tight flex items-center gap-2.5">
              <Calculator className="w-6 h-6 text-amber-400 shrink-0" />
              <span>SGPA &amp; CGPA Solver</span>
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-black border border-white/15 text-xs font-mono tabular-nums">
              {runtimeStatus === 'loading' && (
                <>
                  <Loader2 className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300">Loading Python Runtime...</span>
                </>
              )}
              {runtimeStatus === 'ready' && (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Python {pythonVersion} Ready</span>
                </>
              )}
              {runtimeStatus === 'error' && (
                <>
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <button
                    type="button"
                    onClick={initRuntime}
                    className="text-red-300 hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <span>Retry Runtime</span>
                    <RefreshCw className="w-3 h-3" />
                  </button>
                </>
              )}
              {runtimeStatus === 'idle' && (
                <button
                  type="button"
                  onClick={initRuntime}
                  className="text-amber-300 hover:underline cursor-pointer"
                >
                  Initialize Calculator
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowReportGuide((v) => !v)}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-xs font-bold text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Formula &amp; Grading Scale</span>
              {showReportGuide ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {runtimeError && (
          <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/40 text-xs text-red-200 flex items-center justify-between gap-3">
            <span>{runtimeError}</span>
            <button
              type="button"
              onClick={initRuntime}
              className="px-3 py-1 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-white font-semibold shrink-0 cursor-pointer"
            >
              Reload Runtime
            </button>
          </div>
        )}

        {showReportGuide && (
          <div className="pt-4 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-gray-300 leading-relaxed">
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">01. JAIN 10-Point Grade Points</h3>
              <p>
                Maps grades and marks to UGC grade points: <span className="font-mono text-white">O=10 (&ge;90), A+=9 (80–89), A=8 (70–79), B+=7 (60–69), B=6 (55–59), C=5 (50–54), P=4 (40–49), F=0</span>.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">02. LTPE Credit Extraction</h3>
              <p>
                Automatically extracts subjects from any JAIN SET program and derives credits from <span className="font-mono text-amber-300">L-T-P-E</span> notation via <span className="font-mono text-white">L + T + floor(P / 2)</span>.
              </p>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-sm font-bold text-white">03. CGPA &amp; Target Projection</h3>
              <p>
                Computes <span className="font-mono text-white">SGPA = &Sigma;(C&sub;i &times; G&sub;i) / &Sigma;C&sub;i</span>, updates cumulative CGPA, converts via <span className="font-mono text-white">(CGPA - 0.75) &times; 10</span>, and solves required next-semester SGPA.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Full-Width SGPA & CGPA Solver Workspace */}
      <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 border border-white/15 bg-zinc-950/85 space-y-5">
        {/* Header + Real Curriculum Loader */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-white/10">
          <div>
            <h3 className="text-lg font-bold text-white">JAIN 10-Point SGPA &amp; CGPA Calculator</h3>
            <p className="text-xs text-gray-400">
              Load live semester courses from any JAIN SET program or add custom electives
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={sgpaProgram}
              onChange={(e) => {
                const p = e.target.value;
                setSgpaProgram(p);
                const sems = getSemesters(p);
                setSgpaSemester(sems[0] || '1');
              }}
              className="bg-black border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              {programs.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>

            <select
              value={sgpaSemester}
              onChange={(e) => setSgpaSemester(e.target.value)}
              className="bg-black border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white"
            >
              {sgpaSemesters.map((s) => (
                <option key={s} value={s}>
                  Sem {s}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleLoadCurriculum}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold border border-white/15 cursor-pointer whitespace-nowrap"
            >
              Load Subjects
            </button>
          </div>
        </div>

        {/* Course Table */}
        <div className="overflow-x-auto border border-white/10 rounded-xl">
          <table className="w-full text-left text-xs border-collapse min-w-[540px]">
            <thead>
              <tr className="bg-black text-gray-400 border-b border-white/10">
                <th className="py-2.5 px-3 font-semibold">Code &amp; Course</th>
                <th className="py-2.5 px-2 font-semibold w-20">Credits</th>
                <th className="py-2.5 px-2 font-semibold w-24">Input</th>
                <th className="py-2.5 px-2 font-semibold w-28">Grade / Marks</th>
                <th className="py-2.5 px-2 font-semibold w-10 text-right">Del</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {courses.map((row) => (
                <tr key={row.id} className="hover:bg-white/5">
                  <td className="py-2 px-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={row.code}
                        onChange={(e) => handleUpdateCourse(row.id, { code: e.target.value })}
                        className="w-14 bg-black border border-white/15 rounded-lg px-2 py-1 text-[11px] font-mono text-amber-300"
                      />
                      <input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleUpdateCourse(row.id, { name: e.target.value })}
                        className="flex-1 bg-black border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-2">
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.5}
                      value={row.credits}
                      onChange={(e) => handleUpdateCourse(row.id, { credits: Number(e.target.value) })}
                      className="w-full bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono tabular-nums text-white"
                    />
                  </td>
                  <td className="py-2 px-2">
                    <select
                      value={row.inputMode}
                      onChange={(e) =>
                        handleUpdateCourse(row.id, {
                          inputMode: e.target.value as 'grade' | 'marks',
                        })
                      }
                      className="w-full bg-black border border-white/15 rounded-lg px-2 py-1 text-xs text-gray-200"
                    >
                      <option value="grade">Grade</option>
                      <option value="marks">Marks</option>
                    </select>
                  </td>
                  <td className="py-2 px-2">
                    {row.inputMode === 'grade' ? (
                      <select
                        value={row.letterGrade}
                        onChange={(e) => handleUpdateCourse(row.id, { letterGrade: e.target.value })}
                        className="w-full bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono text-white"
                      >
                        {GRADE_OPTIONS.map((g) => (
                          <option key={g} value={g}>
                            {g}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={row.marks}
                        onChange={(e) => handleUpdateCourse(row.id, { marks: Number(e.target.value) })}
                        className="w-full bg-black border border-white/15 rounded-lg px-2 py-1 text-xs font-mono tabular-nums text-white"
                      />
                    )}
                  </td>
                  <td className="py-2 px-2 text-right">
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(row.id)}
                      className="p-1.5 text-gray-400 hover:text-red-400 cursor-pointer"
                      aria-label="Remove course"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={handleAddCourse}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-xs font-semibold text-white cursor-pointer whitespace-nowrap"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Course</span>
          </button>

          <span className="text-xs text-gray-400 font-mono tabular-nums">
            Current Semester Credits: {courses.reduce((s, c) => s + (Number(c.credits) || 0), 0)}
          </span>
        </div>

        {/* Cumulative & Target CGPA Parameters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">Prior Credits</label>
            <input
              type="number"
              min={0}
              max={250}
              value={priorCredits}
              onChange={(e) => setPriorCredits(Number(e.target.value))}
              className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">Prior CGPA</label>
            <input
              type="number"
              min={0}
              max={10}
              step={0.01}
              value={priorCgpa}
              onChange={(e) => setPriorCgpa(Number(e.target.value))}
              className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">Target CGPA</label>
            <input
              type="number"
              min={0}
              max={10}
              step={0.01}
              value={targetCgpa}
              onChange={(e) => setTargetCgpa(Number(e.target.value))}
              className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white"
            />
          </div>
          <div>
            <label className="block text-[11px] text-gray-400 mb-1">Next Sem Credits</label>
            <input
              type="number"
              min={1}
              max={40}
              value={nextSemCredits}
              onChange={(e) => setNextSemCredits(Number(e.target.value))}
              className="w-full bg-black border border-white/20 rounded-xl px-3 py-2 text-xs font-mono tabular-nums text-white"
            />
          </div>
        </div>

        <button
          type="button"
          disabled={isExecuting}
          onClick={executeSgpaSolver}
          className="w-full py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 disabled:opacity-50 text-black font-bold text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer whitespace-nowrap"
        >
          {isExecuting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-black" />}
          <span>Solve SGPA &amp; CGPA in Python</span>
        </button>

        {/* SGPA Computed Output Strip */}
        {sgpaResult && (
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[11px] text-gray-400 block">Semester SGPA</span>
                <span className="text-2xl font-bold text-amber-300 font-mono tabular-nums">
                  {sgpaResult.sgpa.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">Updated CGPA</span>
                <span className="text-2xl font-bold text-white font-mono tabular-nums">
                  {sgpaResult.updatedCgpa.toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">Equivalent %</span>
                <span className="text-2xl font-bold text-emerald-300 font-mono tabular-nums">
                  {sgpaResult.equivalentPercentage.toFixed(1)}%
                </span>
              </div>
              <div>
                <span className="text-[11px] text-gray-400 block">Next-Sem Needed</span>
                <span
                  className={`text-2xl font-bold font-mono tabular-nums ${
                    sgpaResult.targetAchievable ? 'text-sky-300' : 'text-red-400'
                  }`}
                >
                  {sgpaResult.neededNextSgpa.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-400 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>Earned Points: <strong className="text-white font-mono tabular-nums">{sgpaResult.totalGradePoints}</strong></span>
              <span aria-hidden="true">·</span>
              <span>Cumulative Credits: <strong className="text-white font-mono tabular-nums">{sgpaResult.cumulativeCredits}</strong></span>
              <span aria-hidden="true">·</span>
              <span>
                Target Status:{' '}
                <strong className={sgpaResult.targetAchievable ? 'text-emerald-300' : 'text-red-300'}>
                  {sgpaResult.targetAchievable ? 'Achievable within 10.0 scale' : 'Exceeds 10.0 ceiling'}
                </strong>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
