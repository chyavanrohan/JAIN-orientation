import timetableRaw from './allTimetables.json';

export interface TimetableCell {
  text: string;
  type: 'class' | 'lab' | 'lab-continue' | 'empty' | string;
  colspan: number;
}

export interface BatchTimetable {
  program: string;
  semester: string;
  section: string;
  title: string;
  classTeacher: string;
  days: string[];
  periods: string[];
  periodLabels: Record<string, string>;
  grid: Record<string, Record<string, TimetableCell>>;
}

export interface AdjustmentEvent {
  eventId: string;
  code: string;
  name: string;
  faculty: string;
  program: string;
  semester: string;
  section: string;
  groupId: string;
  day: string;
  period: number;
  periods: number[];
  room: string;
  isLab: boolean;
}

export interface ClassTeacherRow {
  program: string;
  semester: string;
  section: string;
  teacher: string;
  email: string;
  phone: string;
}

export interface RoomInfo {
  name: string;
  type: string;
  seating: string;
}

export interface SubjectInfo {
  key: string;
  code: string;
  codes: string[];
  abbr: string;
  name: string;
  faculty?: string;
}

export interface PeriodInfo {
  period: string;
  label: string;
  time: string;
  start: number;
  end: number;
  isLunch?: boolean;
}

export interface SwapSlot {
  program: string;
  semester: string;
  section: string;
  day: string;
  period: number;
}

export interface ConflictReport {
  type: 'section' | 'faculty' | 'room' | 'lunch';
  message: string;
  event?: AdjustmentEvent;
}

export interface SwapEvaluationResult {
  feasible: boolean;
  eventA: AdjustmentEvent | null;
  eventB: AdjustmentEvent | null;
  conflictsA: ConflictReport[];
  conflictsB: ConflictReport[];
  summary: string;
  recommendations: string[];
}

export const timetableData = timetableRaw as {
  updatedAt: string;
  source: string;
  programs: string[];
  index: Record<string, Record<string, string[]>>;
  batches: Record<string, BatchTimetable>;
  adjustments: {
    programs: string[];
    index: Record<string, Record<string, string[]>>;
    days: string[];
    periods: string[];
    periodLabels: Record<string, string>;
    lunchPeriods: number[];
    maxLunchOccupied: number;
    events: AdjustmentEvent[];
  };
  classTeachers: ClassTeacherRow[];
  rooms: RoomInfo[];
  subjects: SubjectInfo[];
  periods: PeriodInfo[];
};

export function getPrograms(): string[] {
  return timetableData.programs || [];
}

export function getSemesters(program: string): string[] {
  if (!timetableData.index || !timetableData.index[program]) return [];
  return Object.keys(timetableData.index[program]).sort((a, b) => Number(a) - Number(b));
}

export function getSections(program: string, semester: string): string[] {
  if (
    !timetableData.index ||
    !timetableData.index[program] ||
    !timetableData.index[program][semester]
  ) {
    return [];
  }
  return timetableData.index[program][semester];
}

export function getBatchKey(program: string, semester: string, section: string): string {
  return `${program}|${semester}|${section}`;
}

export function getBatchTimetable(
  program: string,
  semester: string,
  section: string
): BatchTimetable | null {
  const key = getBatchKey(program, semester, section);
  return timetableData.batches[key] || null;
}

export function getAllBatches(): BatchTimetable[] {
  return Object.values(timetableData.batches || {});
}

export function getClassTeachers(searchQuery: string = ''): ClassTeacherRow[] {
  const rows = timetableData.classTeachers || [];
  if (!searchQuery) return rows;
  const q = searchQuery.toLowerCase();
  return rows.filter(
    (r) =>
      r.program.toLowerCase().includes(q) ||
      r.teacher.toLowerCase().includes(q) ||
      r.email.toLowerCase().includes(q) ||
      r.section.toLowerCase().includes(q)
  );
}

export function getClassTeacherForBatch(
  program: string,
  semester: string,
  section: string
): ClassTeacherRow | null {
  const found = timetableData.classTeachers.find(
    (r) => r.program === program && r.semester === semester && r.section === section
  );
  return found || null;
}

export function getAdjustmentEvents(filters?: {
  program?: string;
  semester?: string;
  section?: string;
  day?: string;
  period?: number;
  search?: string;
}): AdjustmentEvent[] {
  let list = timetableData.adjustments?.events || [];
  if (!filters) return list;

  if (filters.program) {
    list = list.filter((e) => e.program === filters.program);
  }
  if (filters.semester) {
    list = list.filter((e) => e.semester === filters.semester);
  }
  if (filters.section) {
    list = list.filter((e) => e.section === filters.section);
  }
  if (filters.day) {
    list = list.filter((e) => e.day.toLowerCase() === filters.day?.toLowerCase());
  }
  if (filters.period) {
    list = list.filter((e) => e.period === filters.period);
  }
  if (filters.search) {
    const q = filters.search.toLowerCase();
    list = list.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q) ||
        e.faculty.toLowerCase().includes(q) ||
        e.room.toLowerCase().includes(q)
    );
  }
  return list;
}

export function findEventAtSlot(slot: SwapSlot): AdjustmentEvent | null {
  const events = timetableData.adjustments?.events || [];
  return (
    events.find(
      (e) =>
        e.program === slot.program &&
        e.semester === String(slot.semester) &&
        e.section === slot.section &&
        e.day === slot.day &&
        e.period === Number(slot.period)
    ) || null
  );
}

// Conflict evaluator ported from webTT #adjustments algorithm
export function evaluateSlotSwap(slotA: SwapSlot, slotB: SwapSlot): SwapEvaluationResult {
  const eventA = findEventAtSlot(slotA);
  const eventB = findEventAtSlot(slotB);
  const allEvents = timetableData.adjustments?.events || [];

  if (!eventA && !eventB) {
    return {
      feasible: true,
      eventA: null,
      eventB: null,
      conflictsA: [],
      conflictsB: [],
      summary: 'Both slots are currently free. Moving or assigning is straightforward.',
      recommendations: ['Slots can be directly rescheduled without any friction.'],
    };
  }

  const conflictsA: ConflictReport[] = [];
  const conflictsB: ConflictReport[] = [];

  // Check moving Event A to Slot B
  if (eventA) {
    allEvents.forEach((other) => {
      // Skip the events being swapped
      if (other.eventId === eventA.eventId || (eventB && other.eventId === eventB.eventId)) {
        return;
      }
      if (other.day === slotB.day && other.period === slotB.period) {
        // Faculty clash
        if (other.faculty && other.faculty === eventA.faculty) {
          conflictsA.push({
            type: 'faculty',
            message: `Faculty clash: ${eventA.faculty} is already teaching ${other.name} (${other.program}-${other.section}) in this period`,
            event: other,
          });
        }
        // Room clash
        if (other.room && other.room === eventA.room && eventA.room !== 'Seminar-Room') {
          conflictsA.push({
            type: 'room',
            message: `Room clash: ${eventA.room} is occupied by ${other.program}-${other.section} (${other.name})`,
            event: other,
          });
        }
        // Section clash
        if (
          other.program === eventA.program &&
          other.semester === eventA.semester &&
          other.section === eventA.section
        ) {
          conflictsA.push({
            type: 'section',
            message: `Section clash: ${eventA.program} Sem ${eventA.semester} Sec ${eventA.section} already has ${other.name} in this slot`,
            event: other,
          });
        }
      }
    });
  }

  // Check moving Event B to Slot A
  if (eventB) {
    allEvents.forEach((other) => {
      if (other.eventId === eventB.eventId || (eventA && other.eventId === eventA.eventId)) {
        return;
      }
      if (other.day === slotA.day && other.period === slotA.period) {
        if (other.faculty && other.faculty === eventB.faculty) {
          conflictsB.push({
            type: 'faculty',
            message: `Faculty clash: ${eventB.faculty} is already teaching ${other.name} (${other.program}-${other.section}) in Slot A time`,
            event: other,
          });
        }
        if (other.room && other.room === eventB.room && eventB.room !== 'Seminar-Room') {
          conflictsB.push({
            type: 'room',
            message: `Room clash: ${eventB.room} is occupied by ${other.program}-${other.section} (${other.name})`,
            event: other,
          });
        }
        if (
          other.program === eventB.program &&
          other.semester === eventB.semester &&
          other.section === eventB.section
        ) {
          conflictsB.push({
            type: 'section',
            message: `Section clash: ${eventB.program} Sem ${eventB.semester} Sec ${eventB.section} already has ${other.name} scheduled`,
            event: other,
          });
        }
      }
    });
  }

  const feasible = conflictsA.length === 0 && conflictsB.length === 0;

  const recommendations: string[] = [];
  if (feasible) {
    recommendations.push('Direct swap is 100% verified with 0 faculty, room, or batch clashes.');
    recommendations.push(
      `Slot A (${slotA.day} P${slotA.period}) ⇄ Slot B (${slotB.day} P${slotB.period}) can proceed safely.`
    );
  } else {
    if (conflictsA.some((c) => c.type === 'room') || conflictsB.some((c) => c.type === 'room')) {
      recommendations.push(
        'Consider reassigning one of the classes to an alternate available classroom on the same floor.'
      );
    }
    if (conflictsA.some((c) => c.type === 'faculty') || conflictsB.some((c) => c.type === 'faculty')) {
      recommendations.push(
        'Faculty availability conflict detected. Check Faculty Schedule or choose a different mutual free period.'
      );
    }
  }

  return {
    feasible,
    eventA,
    eventB,
    conflictsA,
    conflictsB,
    summary: feasible
      ? 'Direct swap is feasible with no constraint violations.'
      : 'Direct swap is blocked due to scheduling constraints. See detected conflicts below.',
    recommendations,
  };
}
