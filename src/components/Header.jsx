import { scheduleData } from "../data/scheduleData";

export function Header() {
  return (
    <div className="header">
      <h2 className="group-name">Група: {scheduleData.groupName}</h2>
    </div>
  );
}
