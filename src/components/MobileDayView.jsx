import { scheduleData, dayKeys } from "../data/scheduleData";
import { getCurrentWeekType } from "../utils/dateUtils";
import { LectureCard } from "./LectureCard";

export function MobileDayView({ dayIndex }) {
  const currentWeekType = getCurrentWeekType();
  const dayKey = dayKeys[dayIndex];

  const dayLectures = scheduleData.schedule[dayKey] || [];

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

  // weekType 1 above weekType 2 in the same cell; "every" first
  function weekTypeOrder(l) {
    if (l.weekType === "every") return 0;
    if (l.weekType === 1) return 1;
    return 2;
  }
  function sortByWeekType(list) {
    return [...list].sort((a, b) => weekTypeOrder(a) - weekTypeOrder(b));
  }

  return (
    <div className="mobile-day-view">
      {dayLectures.length === 0 ? (
        <div className="mobile-no-lectures">Нема пар</div>
      ) : (
        scheduleData.timeSlots.map((timeSlot) => {
          const lecturesForThisTime = lecturesByTime[timeSlot.number] || [];
          if (lecturesForThisTime.length === 0) return null;

          const fullWidth = sortByWeekType(lecturesForThisTime.filter((l) => !l.subgroup));
          const subgroup1 = sortByWeekType(lecturesForThisTime.filter((l) => l.subgroup === 1));
          const subgroup2 = sortByWeekType(lecturesForThisTime.filter((l) => l.subgroup === 2));
          const hasSubgroups = subgroup1.length > 0 || subgroup2.length > 0;

          return (
            <div key={timeSlot.number} className="mobile-time-slot">
              <div className="mobile-time-header">
                <span>№{timeSlot.number}</span>
                <span>
                  {timeSlot.start}-{timeSlot.end}
                </span>
              </div>
              {fullWidth.map((lecture, idx) => (
                <LectureCard
                  key={`full-${idx}`}
                  lecture={lecture}
                  isCurrentWeek={isCurrentWeek(lecture)}
                />
              ))}
              {hasSubgroups && (
                <div className="mobile-slot-halves">
                  <div className="mobile-slot-half mobile-slot-half--left">
                    {subgroup1.map((lecture, idx) => (
                      <LectureCard
                        key={`s1-${idx}`}
                        lecture={lecture}
                        isCurrentWeek={isCurrentWeek(lecture)}
                      />
                    ))}
                  </div>
                  <div className="mobile-slot-half mobile-slot-half--right">
                    {subgroup2.map((lecture, idx) => (
                      <LectureCard
                        key={`s2-${idx}`}
                        lecture={lecture}
                        isCurrentWeek={isCurrentWeek(lecture)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
