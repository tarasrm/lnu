import { useState, useEffect, useCallback } from "react";
import { Header } from "./components/Header";
import { MobileDayNav } from "./components/MobileDayNav";
import { getCurrentDayIndex } from "./utils/dateUtils";

function useSwipe(onLeft, onRight) {
  useEffect(() => {
    let startX = 0;
    const handleStart = (e) => {
      startX = e.touches[0].clientX;
    };
    const handleEnd = (e) => {
      const endX = e.changedTouches[0].clientX;
      const deltaX = endX - startX;
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) onRight();
        else onLeft();
      }
    };
    document.body.addEventListener("touchstart", handleStart, { passive: true });
    document.body.addEventListener("touchend", handleEnd, { passive: true });
    return () => {
      document.body.removeEventListener("touchstart", handleStart);
      document.body.removeEventListener("touchend", handleEnd);
    };
  }, [onLeft, onRight]);
}

export default function App() {
  const [dayIndex, setDayIndex] = useState(0);

  useEffect(() => {
    setDayIndex(getCurrentDayIndex());
  }, []);

  const goPrev = useCallback(() => {
    setDayIndex((i) => (i - 1 + 5) % 5);
  }, []);
  const goNext = useCallback(() => {
    setDayIndex((i) => (i + 1) % 5);
  }, []);

  useSwipe(goNext, goPrev);

  // Refresh week/day at most once per hour
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 60 * 60 * 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="container">
      <Header />
      <div className="schedule">
        <MobileDayNav
          dayIndex={dayIndex}
          onPrev={goPrev}
          onNext={goNext}
        />
      </div>
    </div>
  );
}
