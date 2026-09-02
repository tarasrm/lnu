// 01.09.2026 (Tuesday). That calendar week is week 1 and type 1.
const SEMESTER_START = new Date(2026, 8, 1);
SEMESTER_START.setHours(0, 0, 0, 0);

// Returns the reference date: weekdays = today, weekends = next Monday
export function getReferenceDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 6) {
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 2);
    return nextMonday;
  }
  if (dayOfWeek === 0) {
    const nextMonday = new Date(today);
    nextMonday.setDate(today.getDate() + 1);
    return nextMonday;
  }
  return today;
}

// Monday of the week containing date (getDay: 0=Sun, 1=Mon, ..., 6=Sat)
function getMondayOfWeek(date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  return d;
}

// Calendar days between two dates (date-only, no time/DST issues)
function calendarDaysBetween(a, b) {
  const toNoon = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((toNoon(b).getTime() - toNoon(a).getTime()) / msPerDay);
}

export function getCurrentWeek() {
  const ref = getReferenceDate();
  const monday = getMondayOfWeek(ref);
  const semesterMonday = getMondayOfWeek(SEMESTER_START);
  const days = calendarDaysBetween(semesterMonday, monday);
  if (days < 0) return 1;
  return Math.floor(days / 7) + 1;
}

export function getCurrentWeekType() {
  return getCurrentWeek() % 2 === 1 ? 1 : 2;
}

export function getCurrentWeekDates() {
  const ref = getReferenceDate();
  const monday = getMondayOfWeek(ref);
  const weekDates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    weekDates.push(date);
  }
  return weekDates;
}

export function formatDate(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}.${month}`;
}

export function formatDateFull(date) {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  return `${day}.${month}.${date.getFullYear()}`;
}

// 0 = Monday, 1 = Tuesday, ...; weekend => 0 (Monday of next week)
export function getCurrentDayIndex() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) return 0;
  return dayOfWeek - 1;
}
