import { getCurrentWeek, getCurrentWeekType } from "../utils/dateUtils";
import { timetableData } from "../data/timetableData";

export function Header() {
  const currentWeek = getCurrentWeek();
  const currentWeekType = getCurrentWeekType();
  const weekTypeText = currentWeekType === 1 ? "чисельник" : "знаменник";

  return (
    <div className="header">
      <h2 className="group-name">Група: {timetableData.groupName}</h2>
      <div className="week-info">
        <div className="current-week">
          Поточний тиждень: {currentWeek} ({weekTypeText})
        </div>
      </div>
    </div>
  );
}
