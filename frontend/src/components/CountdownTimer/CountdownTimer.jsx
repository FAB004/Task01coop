import { useEffect, useState } from "react";
import { fetchConferenceStartISO, DEFAULT_CONFERENCE_TIME } from "../../data/conferenceStore";
import "./CountdownTimer.css";


// قيمة احتياطية تُعرض فوراً ثم تُستبدل بتاريخ المؤتمر القادم من الـ API.
const FALLBACK_DATE = `${DEFAULT_CONFERENCE_TIME.startDate}T${DEFAULT_CONFERENCE_TIME.startTime || "00:00"}:00`;

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

export default function CountdownTimer({ targetDate }) {
  // التاريخ الفعلي: إمّا مُمرّر صراحةً، أو يُجلب من الـ API، أو القيمة الاحتياطية.
  const [resolvedDate, setResolvedDate] = useState(targetDate || FALLBACK_DATE);
  const [time, setTime] = useState(() => getRemaining(targetDate || FALLBACK_DATE));

  // اجلب تاريخ المؤتمر من قاعدة البيانات (ما لم يُمرّر targetDate صراحةً).
  useEffect(() => {
    if (targetDate) {
      setResolvedDate(targetDate);
      return;
    }
    let alive = true;
    fetchConferenceStartISO()
      .then((iso) => {
        if (alive && iso) setResolvedDate(iso);
      })
      .catch(() => {
        /* نُبقي القيمة الاحتياطية */
      });
    return () => {
      alive = false;
    };
  }, [targetDate]);

  useEffect(() => {
    setTime(getRemaining(resolvedDate));
    const id = setInterval(() => setTime(getRemaining(resolvedDate)), 1000);
    return () => clearInterval(id);
  }, [resolvedDate]);

  return (
    <section className="countdown" dir="rtl">
      <div className="container countdown-inner">
        <h2 className="countdown-title">
          {time.finished ? "انطلق المؤتمر" : "الوقت المتبقي على انطلاق المؤتمر"}
        </h2>

        <div className="countdown-grid row g-3 g-md-4 justify-content-center">
          {UNITS.map(({ key, label }) => (
            <div className="col-6 col-md-3" key={key}>
              <div className="countdown-box">
                <span className="countdown-value">
                  {String(time[key]).padStart(2, "0")}
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
