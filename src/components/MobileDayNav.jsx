import { dayNames } from "../data/timetableData";
import { getCurrentWeekDates, formatDate } from "../utils/dateUtils";
import { MobileDayView } from "./MobileDayView";

export function MobileDayNav({ dayIndex, onPrev, onNext }) {
  const weekDates = getCurrentWeekDates();

  return (
    <>
      <div className="mobile-day-nav">
        <button type="button" className="nav-btn" onClick={onPrev} aria-label="Попередній день">
          ‹
        </button>
        <div className="current-day">
          <div>{dayNames[dayIndex]}</div>
          <div style={{ fontSize: "0.8em", opacity: 0.8, marginTop: "1px" }}>
            {formatDate(weekDates[dayIndex])}
          </div>
        </div>
        <button type="button" className="nav-btn" onClick={onNext} aria-label="Наступний день">
          ›
        </button>
      </div>
      <MobileDayView dayIndex={dayIndex} />
    </>
  );
}
