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

export function getCurrentWeek() {
  const september1 = new Date(new Date().getFullYear(), 8, 1);
  const referenceDate = getReferenceDate();
  if (referenceDate < september1) {
    september1.setFullYear(september1.getFullYear() - 1);
  }
  const timeDiff = referenceDate.getTime() - september1.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  return Math.floor(daysDiff / 7) + 1;
}

export function getCurrentWeekType() {
  return getCurrentWeek() % 2 === 1 ? 1 : 2;
}

export function getCurrentWeekDates() {
  const referenceDate = getReferenceDate();
  const september1 = new Date(new Date().getFullYear(), 8, 1);
  if (referenceDate < september1) {
    september1.setFullYear(september1.getFullYear() - 1);
  }
  const timeDiff = referenceDate.getTime() - september1.getTime();
  const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
  const weeksPassed = Math.floor(daysDiff / 7);
  const mondayOfWeek = new Date(september1);
  mondayOfWeek.setDate(september1.getDate() + weeksPassed * 7);
  const dayOfWeek = mondayOfWeek.getDay();
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  mondayOfWeek.setDate(mondayOfWeek.getDate() + daysToMonday);
  const todayDayOfWeek = referenceDate.getDay();
  if (todayDayOfWeek === 0 || todayDayOfWeek === 6) {
    mondayOfWeek.setDate(mondayOfWeek.getDate() + 7);
  }
  const weekDates = [];
  for (let i = 0; i < 5; i++) {
    const date = new Date(mondayOfWeek);
    date.setDate(mondayOfWeek.getDate() + i);
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
