import { timetableData, dayKeys } from "../data/timetableData";
import { getCurrentWeekType } from "../utils/dateUtils";
import { LectureCard } from "./LectureCard";

export function MobileDayView({ dayIndex }) {
  const currentWeekType = getCurrentWeekType();
  const dayKey = dayKeys[dayIndex];

  const dayLectures = timetableData.schedule[dayKey] || [];

  const lecturesByTime = {};
  dayLectures.forEach((lecture) => {
    if (!lecturesByTime[lecture.lectureNumber]) {
      lecturesByTime[lecture.lectureNumber] = [];
    }
    lecturesByTime[lecture.lectureNumber].push(lecture);
  });

  function isCurrentWeek(lecture) {
    if (lecture.weekType === "every") return true;
    return lecture.weekType === currentWeekType;
  }

  return (
    <div className="mobile-day-view">
      {dayLectures.length === 0 ? (
        <div className="mobile-no-lectures">Нема занять</div>
      ) : (
        timetableData.timeSlots.map((timeSlot) => {
          const lecturesForThisTime = lecturesByTime[timeSlot.number] || [];
          if (lecturesForThisTime.length === 0) return null;
          return (
            <div key={timeSlot.number} className="mobile-time-slot">
              <div className="mobile-time-header">
                <span>№{timeSlot.number}</span>
                <span>
                  {timeSlot.start}-{timeSlot.end}
                </span>
              </div>
              {lecturesForThisTime.map((lecture, idx) => (
                <LectureCard
                  key={idx}
                  lecture={lecture}
                  isCurrentWeek={isCurrentWeek(lecture)}
                />
              ))}
            </div>
          );
        })
      )}
    </div>
  );
}
