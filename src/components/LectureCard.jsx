import { formatTypeLabel, getTypePillClass } from "../utils/formatUtils";

export function LectureCard({ lecture, isCurrentWeek }) {
  const weekClass = isCurrentWeek ? "current-week" : "other-week";

  return (
    <div className={`mobile-lecture ${weekClass}`}>
      <div className="mobile-lecture-title">{lecture.title}</div>
      <div className="mobile-lecture-teacher">
        {lecture.teacher}, {lecture.room}
      </div>
      <div>
        <span className={`type-pill ${getTypePillClass(lecture.type)}`}>
          {formatTypeLabel(lecture.type)}
        </span>
      </div>
    </div>
  );
}
