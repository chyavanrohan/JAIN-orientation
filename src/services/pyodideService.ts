import { timetableData } from '../data/timetableService';

export type PyodideRuntimeStatus = 'idle' | 'loading' | 'ready' | 'error';

export interface PyodideExecutionResult<T = unknown> {
  ok: boolean;
  data: T | null;
  stdout: string;
  stderr: string;
  durationMs: number;
  error?: string;
}

interface PyodideInstance {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: {
    set: (key: string, value: unknown) => void;
    get: (key: string) => unknown;
  };
}

declare global {
  interface Window {
    loadPyodide?: (config?: { indexURL?: string }) => Promise<PyodideInstance>;
  }
}

const PYODIDE_CDN_BASE = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/';
const PYODIDE_SCRIPT_URL = `${PYODIDE_CDN_BASE}pyodide.js`;

let pyodideInstance: PyodideInstance | null = null;
let pyodideInitPromise: Promise<{ instance: PyodideInstance; version: string }> | null = null;
let cachedPythonVersion = '';

function injectPyodideScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Pyodide can only run in a browser environment.'));
  }

  if (window.loadPyodide) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${PYODIDE_SCRIPT_URL}"]`);
    if (existing) {
      if (window.loadPyodide) {
        resolve();
        return;
      }
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('Failed to load Pyodide WebAssembly script from CDN.')), {
        once: true,
      });
      return;
    }

    const script = document.createElement('script');
    script.src = PYODIDE_SCRIPT_URL;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Pyodide WebAssembly script from CDN. Check network connectivity.'));
    document.head.appendChild(script);
  });
}

export async function ensurePyodideReady(): Promise<{ instance: PyodideInstance; version: string }> {
  if (pyodideInstance && cachedPythonVersion) {
    return { instance: pyodideInstance, version: cachedPythonVersion };
  }

  if (pyodideInitPromise) {
    return pyodideInitPromise;
  }

  pyodideInitPromise = (async () => {
    await injectPyodideScript();
    if (!window.loadPyodide) {
      throw new Error('Pyodide global loader unavailable after script load.');
    }

    const instance = await window.loadPyodide({
      indexURL: PYODIDE_CDN_BASE,
    });

    // Marshal campus timetable events once into Python memory
    const eventsJson = JSON.stringify(timetableData.adjustments?.events || []);
    const lunchPeriodsJson = JSON.stringify(timetableData.adjustments?.lunchPeriods || [4, 5]);
    instance.globals.set('_RAW_CAMPUS_EVENTS_JSON', eventsJson);
    instance.globals.set('_RAW_LUNCH_PERIODS_JSON', lunchPeriodsJson);

    const versionRaw = await instance.runPythonAsync(`
import json, sys
CAMPUS_EVENTS = json.loads(_RAW_CAMPUS_EVENTS_JSON)
LUNCH_PERIODS = set(json.loads(_RAW_LUNCH_PERIODS_JSON))
f"{sys.version_info.major}.{sys.version_info.minor}.{sys.version_info.micro}"
`);

    cachedPythonVersion = String(versionRaw || '3.12');
    pyodideInstance = instance;
    return { instance, version: cachedPythonVersion };
  })().catch((err) => {
    pyodideInitPromise = null;
    throw err;
  });

  return pyodideInitPromise;
}

export function getCachedPythonStatus(): { ready: boolean; version: string } {
  return {
    ready: Boolean(pyodideInstance),
    version: cachedPythonVersion,
  };
}

export async function runPythonModule<T>(
  pythonSource: string,
  entryCallPython: string,
  payload: unknown
): Promise<PyodideExecutionResult<T>> {
  const startedAt = performance.now();

  try {
    const { instance } = await ensurePyodideReady();
    instance.globals.set('_LAB_INPUT_JSON', JSON.stringify(payload));
    instance.globals.set('_USER_MODULE_CODE', pythonSource);

    const runnerWrapper = `
import io, json, sys, traceback

_stdout_buf = io.StringIO()
_stderr_buf = io.StringIO()
_old_stdout, _old_stderr = sys.stdout, sys.stderr
sys.stdout, sys.stderr = _stdout_buf, _stderr_buf

_response = {"ok": False, "data": None, "error": None}
try:
    _ns = {
        "CAMPUS_EVENTS": globals().get("CAMPUS_EVENTS", []),
        "LUNCH_PERIODS": globals().get("LUNCH_PERIODS", {4, 5}),
        "LAB_INPUT": json.loads(_LAB_INPUT_JSON),
    }
    exec(_USER_MODULE_CODE, _ns)
    _result = eval(${JSON.stringify(entryCallPython)}, _ns)
    _response["ok"] = True
    _response["data"] = _result
except Exception:
    _response["error"] = traceback.format_exc()
finally:
    sys.stdout, sys.stderr = _old_stdout, _old_stderr

json.dumps({
    "ok": _response["ok"],
    "data": _response["data"],
    "error": _response["error"],
    "stdout": _stdout_buf.getvalue(),
    "stderr": _stderr_buf.getvalue(),
})
`;

    const rawOutput = String(await instance.runPythonAsync(runnerWrapper));
    const parsed = JSON.parse(rawOutput) as {
      ok: boolean;
      data: T | null;
      error: string | null;
      stdout: string;
      stderr: string;
    };

    const durationMs = Math.round((performance.now() - startedAt) * 10) / 10;

    return {
      ok: parsed.ok,
      data: parsed.data,
      stdout: parsed.stdout,
      stderr: parsed.stderr || (parsed.error ?? ''),
      error: parsed.error ?? undefined,
      durationMs,
    };
  } catch (err) {
    const durationMs = Math.round((performance.now() - startedAt) * 10) / 10;
    const message = err instanceof Error ? err.message : String(err);
    return {
      ok: false,
      data: null,
      stdout: '',
      stderr: message,
      error: message,
      durationMs,
    };
  }
}

export const DEFAULT_CLASH_CHECKER_PYTHON = `"""
JAIN SET Timetable Clash Checker Engine (Python 3)
Algorithm: O(N) Hash-Map Indexing via collections.defaultdict
Detects faculty double-bookings, room collisions, and batch overlaps.
"""
from collections import defaultdict


def normalize_token(value: str) -> str:
    return " ".join((value or "").strip().lower().split())


def build_conflict_indices(events):
    """Build O(1) lookup hash tables keyed by (day, period, resource)."""
    faculty_idx = defaultdict(list)
    room_idx = defaultdict(list)
    section_idx = defaultdict(list)

    for ev in events:
        day = ev.get("day", "")
        period = int(ev.get("period", 0))
        faculty = normalize_token(ev.get("faculty", ""))
        room = normalize_token(ev.get("room", ""))
        section_key = (ev.get("program", ""), str(ev.get("semester", "")), ev.get("section", ""))

        if faculty and "trainer" not in faculty:
            faculty_idx[(day, period, faculty)].append(ev)
        if room and "seminar" not in room and "online" not in room:
            room_idx[(day, period, room)].append(ev)
        section_idx[(day, period, section_key)].append(ev)

    return faculty_idx, room_idx, section_idx


def audit_campus_timetables(events, filters):
    """Scan scheduled events to locate all genuine resource collisions."""
    prog_filter = (filters.get("program") or "").strip()
    day_filter = (filters.get("day") or "").strip()

    faculty_idx, room_idx, section_idx = build_conflict_indices(events)
    conflicts = []

    def matches_scope(group):
        if prog_filter and not any(e.get("program") == prog_filter for e in group):
            return False
        if day_filter and not any(e.get("day") == day_filter for e in group):
            return False
        return True

    for (day, period, _), group in faculty_idx.items():
        distinct_programs = {(e["program"], e["semester"], e["section"], e["code"]) for e in group}
        if len(group) > 1 and len(distinct_programs) > 1 and matches_scope(group):
            conflicts.append({
                "kind": "Faculty Clash",
                "day": day,
                "period": period,
                "resource": group[0]["faculty"],
                "batches": [f"{e['program']} S{e['semester']}-{e['section']} ({e['code']} in {e['room']})" for e in group],
            })

    for (day, period, _), group in room_idx.items():
        distinct_batches = {(e["program"], e["semester"], e["section"]) for e in group}
        if len(group) > 1 and len(distinct_batches) > 1 and matches_scope(group):
            conflicts.append({
                "kind": "Room Collision",
                "day": day,
                "period": period,
                "resource": group[0]["room"],
                "batches": [f"{e['program']} S{e['semester']}-{e['section']} ({e['name']})" for e in group],
            })

    for (day, period, sec), group in section_idx.items():
        if len(group) > 1 and matches_scope(group):
            conflicts.append({
                "kind": "Section Overlap",
                "day": day,
                "period": period,
                "resource": f"{sec[0]} Sem {sec[1]} Sec {sec[2]}",
                "batches": [f"{e['code']} - {e['name']} ({e['faculty']})" for e in group],
            })

    faculty_count = sum(1 for c in conflicts if c["kind"] == "Faculty Clash")
    room_count = sum(1 for c in conflicts if c["kind"] == "Room Collision")
    section_count = sum(1 for c in conflicts if c["kind"] == "Section Overlap")

    print(f"[Audit] Indexed {len(events)} campus slot events via O(N) hash tables.")
    print(f"[Audit] Found {len(conflicts)} conflicts -> Faculty: {faculty_count}, Room: {room_count}, Section: {section_count}")

    return {
        "mode": "audit",
        "totalEvents": len(events),
        "totalConflicts": len(conflicts),
        "facultyClashes": faculty_count,
        "roomCollisions": room_count,
        "sectionOverlaps": section_count,
        "conflicts": conflicts[:80],
    }


def find_event(events, slot):
    for ev in events:
        if (
            ev.get("program") == slot["program"]
            and str(ev.get("semester")) == str(slot["semester"])
            and ev.get("section") == slot["section"]
            and ev.get("day") == slot["day"]
            and int(ev.get("period", 0)) == int(slot["period"])
        ):
            return ev
    return None


def evaluate_slot_swap(events, slot_a, slot_b):
    """Simulate swapping Slot A and Slot B with zero-cost hash lookups."""
    ev_a = find_event(events, slot_a)
    ev_b = find_event(events, slot_b)
    issues = []

    if not ev_a and not ev_b:
        print("[Simulate] Both selected slots are currently free.")
        return {
            "mode": "simulate",
            "feasible": True,
            "eventA": None,
            "eventB": None,
            "issues": [],
            "freeAlternatives": [],
            "summary": "Both selected slots are empty and conflict-free.",
        }

    skip_ids = {e["eventId"] for e in (ev_a, ev_b) if e}

    def check_move(moving_ev, target_slot, label):
        if not moving_ev:
            return
        t_day = target_slot["day"]
        t_period = int(target_slot["period"])
        m_fac = normalize_token(moving_ev.get("faculty", ""))
        m_room = normalize_token(moving_ev.get("room", ""))

        for other in events:
            if other["eventId"] in skip_ids:
                continue
            if other.get("day") != t_day or int(other.get("period", 0)) != t_period:
                continue

            if m_fac and m_fac == normalize_token(other.get("faculty", "")):
                issues.append({
                    "kind": "Faculty Clash",
                    "direction": label,
                    "message": f"{moving_ev['faculty']} is already teaching {other['name']} ({other['program']} S{other['semester']}-{other['section']}) at {t_day} P{t_period}.",
                })
            if m_room and "seminar" not in m_room and m_room == normalize_token(other.get("room", "")):
                issues.append({
                    "kind": "Room Collision",
                    "direction": label,
                    "message": f"Room {moving_ev['room']} is occupied by {other['program']} S{other['semester']}-{other['section']} at {t_day} P{t_period}.",
                })
            if (
                other.get("program") == moving_ev.get("program")
                and str(other.get("semester")) == str(moving_ev.get("semester"))
                and other.get("section") == moving_ev.get("section")
            ):
                issues.append({
                    "kind": "Section Overlap",
                    "direction": label,
                    "message": f"{moving_ev['program']} S{moving_ev['semester']}-{moving_ev['section']} already has {other['name']} scheduled.",
                })

    check_move(ev_a, slot_b, f"Moving Slot A -> {slot_b['day']} P{slot_b['period']}")
    check_move(ev_b, slot_a, f"Moving Slot B -> {slot_a['day']} P{slot_a['period']}")

    # Compute conflict-free alternative periods for Slot A's course
    free_alternatives = []
    if ev_a:
        all_days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        for d in all_days:
            for p in [1, 2, 3, 6, 7]:
                if d == slot_a["day"] and p == int(slot_a["period"]):
                    continue
                busy = any(
                    o["day"] == d and int(o["period"]) == p and (
                        normalize_token(o.get("faculty", "")) == normalize_token(ev_a.get("faculty", ""))
                        or (
                            o["program"] == ev_a["program"]
                            and str(o["semester"]) == str(ev_a["semester"])
                            and o["section"] == ev_a["section"]
                        )
                    )
                    for o in events
                )
                if not busy:
                    free_alternatives.append(f"{d} P{p}")
                if len(free_alternatives) >= 6:
                    break
            if len(free_alternatives) >= 6:
                break

    feasible = len(issues) == 0
    print(f"[Simulate] Swap feasibility: {'FEASIBLE' if feasible else 'BLOCKED'} ({len(issues)} conflicts detected)")
    if free_alternatives:
        print(f"[Simulate] Safe candidate slots for {ev_a['code']}: {', '.join(free_alternatives)}")

    return {
        "mode": "simulate",
        "feasible": feasible,
        "eventA": ev_a,
        "eventB": ev_b,
        "issues": issues,
        "freeAlternatives": free_alternatives,
        "summary": "Direct swap verified with zero faculty, room, or section conflicts." if feasible else f"Swap blocked by {len(issues)} scheduling conflict(s).",
    }


def run_clash_lab(events, lab_input):
    mode = lab_input.get("mode", "audit")
    if mode == "simulate":
        return evaluate_slot_swap(events, lab_input["slotA"], lab_input["slotB"])
    return audit_campus_timetables(events, lab_input.get("filters", {}))


if __name__ == "__main__":
    sample = [
        {"eventId": "1", "code": "CS301", "name": "Operating Systems", "faculty": "Dr. Rao", "program": "AIML", "semester": "3", "section": "A", "day": "Mon", "period": 1, "room": "204"},
        {"eventId": "2", "code": "CS302", "name": "Python Lab", "faculty": "Dr. Rao", "program": "CSE-GEN", "semester": "3", "section": "B", "day": "Mon", "period": 1, "room": "205"},
    ]
    print(run_clash_lab(sample, {"mode": "audit", "filters": {}}))
`;

export const DEFAULT_SGPA_SOLVER_PYTHON = `"""
JAIN SET SGPA & Cumulative CGPA Solver (Python 3)
Uses JAIN / UGC 10-Point Relative & Absolute Grading Scale:
O=10, A+=9, A=8, B+=7, B=6, C=5, P=4, F=0
"""

GRADE_POINTS = {
    "O": 10,
    "A+": 9,
    "A": 8,
    "B+": 7,
    "B": 6,
    "C": 5,
    "P": 4,
    "F": 0,
}


def marks_to_letter_and_point(marks: float):
    """Map percentage marks (0-100) to JAIN 10-point letter grade."""
    m = max(0.0, min(100.0, float(marks)))
    if m >= 90:
        return "O", 10
    if m >= 80:
        return "A+", 9
    if m >= 70:
        return "A", 8
    if m >= 60:
        return "B+", 7
    if m >= 55:
        return "B", 6
    if m >= 50:
        return "C", 5
    if m >= 40:
        return "P", 4
    return "F", 0


def solve_sgpa_and_cgpa(payload):
    courses = payload.get("courses", [])
    prior_credits = max(0.0, float(payload.get("priorCredits", 0) or 0))
    prior_cgpa = max(0.0, min(10.0, float(payload.get("priorCgpa", 0) or 0)))
    target_cgpa = max(0.0, min(10.0, float(payload.get("targetCgpa", 8.5) or 8.5)))
    next_sem_credits = max(1.0, float(payload.get("nextSemCredits", 22) or 22))

    total_credits = 0.0
    total_grade_points = 0.0
    passed_credits = 0.0
    failed_count = 0
    evaluated = []
    grade_histogram = {}

    for c in courses:
        credits = max(0.0, float(c.get("credits", 0) or 0))
        mode = c.get("inputMode", "grade")
        if mode == "marks":
            letter, gp = marks_to_letter_and_point(c.get("marks", 0))
        else:
            letter = str(c.get("letterGrade", "A")).upper()
            gp = GRADE_POINTS.get(letter, 0)

        weighted = credits * gp
        total_credits += credits
        total_grade_points += weighted

        if gp > 0:
            passed_credits += credits
        elif credits > 0:
            failed_count += 1

        grade_histogram[letter] = round(grade_histogram.get(letter, 0.0) + credits, 2)
        evaluated.append({
            "code": c.get("code", ""),
            "name": c.get("name", ""),
            "credits": credits,
            "letterGrade": letter,
            "gradePoint": gp,
            "weightedPoints": round(weighted, 2),
        })

    sgpa = round(total_grade_points / total_credits, 2) if total_credits > 0 else 0.0

    cum_credits = prior_credits + total_credits
    cum_points = (prior_credits * prior_cgpa) + total_grade_points
    updated_cgpa = round(cum_points / cum_credits, 2) if cum_credits > 0 else 0.0

    # UGC standard percentage equivalence formula: (CGPA - 0.75) * 10 (capped at 0-100)
    equivalent_pct = round(max(0.0, min(100.0, (updated_cgpa - 0.75) * 10.0)), 2) if updated_cgpa > 0 else 0.0

    # Target projection: solve for required SGPA in upcoming semester
    total_future_credits = cum_credits + next_sem_credits
    required_future_points = (target_cgpa * total_future_credits) - cum_points
    needed_next_sgpa = round(required_future_points / next_sem_credits, 2)
    target_achievable = 0.0 <= needed_next_sgpa <= 10.0

    print(f"[SGPA Solver] Evaluated {len(evaluated)} courses | Total Credits: {total_credits:g}")
    print(f"[SGPA Solver] Current SGPA = {sgpa:.2f} | Cumulative CGPA = {updated_cgpa:.2f} (~{equivalent_pct:.1f}%)")
    print(f"[Projection] To reach {target_cgpa:.2f} CGPA over next {next_sem_credits:g} credits -> Need SGPA = {needed_next_sgpa:.2f} ({'Achievable' if target_achievable else 'Out of 0-10 Range'})")

    return {
        "sgpa": sgpa,
        "updatedCgpa": updated_cgpa,
        "equivalentPercentage": equivalent_pct,
        "totalCredits": round(total_credits, 2),
        "passedCredits": round(passed_credits, 2),
        "totalGradePoints": round(total_grade_points, 2),
        "cumulativeCredits": round(cum_credits, 2),
        "failedCount": failed_count,
        "neededNextSgpa": needed_next_sgpa,
        "targetAchievable": target_achievable,
        "evaluatedCourses": evaluated,
        "gradeDistribution": [{"grade": k, "credits": v} for k, v in grade_histogram.items()],
    }


if __name__ == "__main__":
    sample_payload = {
        "priorCredits": 44,
        "priorCgpa": 8.40,
        "targetCgpa": 8.75,
        "nextSemCredits": 22,
        "courses": [
            {"code": "C4", "name": "Python Programming", "credits": 3, "inputMode": "grade", "letterGrade": "O"},
            {"code": "C3", "name": "Operating Systems", "credits": 3, "inputMode": "grade", "letterGrade": "A+"},
            {"code": "C24", "name": "Discrete Mathematics", "credits": 3, "inputMode": "marks", "marks": 82},
        ],
    }
    print(solve_sgpa_and_cgpa(sample_payload))
`;
