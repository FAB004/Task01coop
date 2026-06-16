import { useEffect, useState } from "react";
import "./CountdownTimer.css";


const CONFERENCE_DATE = "2026-11-04T09:00:00"; 

const UNITS = [
  { key: "days", label: "يوم" },
  { key: "hours", label: "ساعة" },
  { key: "minutes", label: "دقيقة" },
  { key: "seconds", label: "ثانية" },
];

function getRemaining(target) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    finished: diff === 0,
  };
}

export default function CountdownTimer({ targetDate = CONFERENCE_DATE }) {
  const [time, setTime] = useState(() => getRemaining(targetDate));

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(targetDate)), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return (
    <section className="countdown" dir="rtl">
      <div className="container countdown-inner">
        <h2 className="countdown-title">
          {time.finished ? "انطلق المؤتمر" : "الوقت المتبقي على انطلاق المؤتمر"}
        </h2>

        <div className="countdown-grid">
          {UNITS.map(({ key, label }) => (
            <div className="countdown-box" key={key}>
              <span className="countdown-value">
                {String(time[key]).padStart(2, "0")}
              </span>
              <span className="countdown-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
