import { useState } from "react";
import "./AgendaSection.css";

const DAYS = [
  {
    id: "day1",
    label: "اليوم الأول",
    date: "04 فبراير 2024",
    items: [
      "التسجيل",
      "الافتتاح",
      "مواجهة مخاطر المناخ وتخفيف آثارها على موارد المياه",
      "استراتيجيات فعالة لإعادة استخدام المياه المعالجة وحوكمتها",
      "ابتكارات رائدة في تقنيات الري نحو استدامة الموارد المائية",
      "استراتيجيات الحوكمة الفعالة لتمويل قطاع الري رؤى للمستقبل",
    ],
  },
  {
    id: "day2",
    label: "اليوم الثاني",
    date: "05 فبراير 2024",
    items: [
      "التسجيل",
      "الجلسة الأولى",
      "الجلسة الثانية",
      "جلسة نقاش",
      "التوصيات الختامية",
    ],
  },
];

export default function AgendaSection() {
  const [openDay, setOpenDay] = useState("day1");

  const toggle = (id) => setOpenDay((cur) => (cur === id ? null : id));

  return (
    <section id="agenda" className="agenda-section" dir="rtl">
      <div className="container">
        <header className="agenda-head">
          <span className="agenda-accent" aria-hidden="true" />
          <h2 className="agenda-title">الأجندة</h2>
        </header>

        <div className="agenda-accordion">
          {DAYS.map((day) => {
            const isOpen = openDay === day.id;
            return (
              <div className={`agenda-panel ${isOpen ? "open" : ""}`} key={day.id}>
                <button
                  type="button"
                  className="agenda-panel-header"
                  aria-expanded={isOpen}
                  aria-controls={`${day.id}-body`}
                  onClick={() => toggle(day.id)}
                >
                  <span className="agenda-panel-titles">
                    <span className="agenda-panel-label">{day.label}</span>
                    <span className="agenda-panel-date">{day.date}</span>
                  </span>
                  <span className="agenda-panel-chevron" aria-hidden="true" />
                </button>

                <div
                  id={`${day.id}-body`}
                  className="agenda-panel-body"
                  role="region"
                  hidden={!isOpen}
                >
                  <ul className="agenda-list">
                    {day.items.map((item, idx) => (
                      <li className="agenda-item" key={idx}>
                        <span className="agenda-item-dot" aria-hidden="true" />
                        <span className="agenda-item-text">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
