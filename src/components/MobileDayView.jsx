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

          // Group lectures by weekType within this time slot so ordering
          // is correct even when some items are half-width (subgroups).
          const byWeekType = {};
          lecturesForThisTime.forEach((lecture) => {
            const key = lecture.weekType === "every" ? "every" : String(lecture.weekType);
            if (!byWeekType[key]) byWeekType[key] = [];
            byWeekType[key].push(lecture);
          });

          return (
            <div key={timeSlot.number} className="mobile-time-slot">
              <div className="mobile-time-header">
                <span>№{timeSlot.number}</span>
                <span>
                  {timeSlot.start}-{timeSlot.end}
                </span>
              </div>
              {["every", "1", "2"].flatMap((weekKey) => {
                const lecturesThisWeekType = byWeekType[weekKey] || [];
                if (lecturesThisWeekType.length === 0) return [];

                const fullWidth = sortByWeekType(
                  lecturesThisWeekType.filter((l) => !l.subgroup),
                );
                const subgroup1 = sortByWeekType(
                  lecturesThisWeekType.filter((l) => l.subgroup === 1),
                );
                const subgroup2 = sortByWeekType(
                  lecturesThisWeekType.filter((l) => l.subgroup === 2),
                );
                const hasSubgroups = subgroup1.length > 0 || subgroup2.length > 0;

                const nodes = [
                  ...fullWidth.map((lecture, idx) => (
                    <LectureCard
                      key={`full-${weekKey}-${idx}`}
                      lecture={lecture}
                      isCurrentWeek={isCurrentWeek(lecture)}
                    />
                  )),
                ];

                if (hasSubgroups) {
                  nodes.push(
                    <div className="mobile-slot-halves" key={`halves-${timeSlot.number}-${weekKey}`}>
                      <div className="mobile-slot-half mobile-slot-half--left">
                        {subgroup1.map((lecture, idx) => (
                          <LectureCard
                            key={`s1-${weekKey}-${idx}`}
                            lecture={lecture}
                            isCurrentWeek={isCurrentWeek(lecture)}
                          />
                        ))}
                      </div>
                      <div className="mobile-slot-half mobile-slot-half--right">
                        {subgroup2.map((lecture, idx) => (
                          <LectureCard
                            key={`s2-${weekKey}-${idx}`}
                            lecture={lecture}
                            isCurrentWeek={isCurrentWeek(lecture)}
                          />
                        ))}
                      </div>
                    </div>,
                  );
                }

                return nodes;
              })}
            </div>
          );
        })
      )}
    </div>
  );
}
