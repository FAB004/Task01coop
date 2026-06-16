import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import "./ConferenceInfoCards.css";

const CARDS = [
  {
    icon: FaCalendarAlt,
    title: "التاريخ",
    text: "04 فبراير 2024 - 05 فبراير 2024",
  },
  {
    icon: FaClock,
    title: "الوقت",
    text: "7:56 ص - 7:56 م",
  },
  {
    icon: FaMapMarkerAlt,
    title: "الموقع",
    text: "فندق هيلتون غرناطة - مدينة الرياض - المملكة العربية السعودية",
  },
];

export default function ConferenceInfoCards() {
  return (
    <section className="info-cards" dir="rtl">
      <div className="container">
        <div className="row g-4 justify-content-center">
          {CARDS.map(({ icon: Icon, title, text }) => (
            <div className="col-12 col-md-6 col-lg-4" key={title}>
              <div className="info-card h-100">
                <span className="info-card-shape info-card-shape-a" aria-hidden="true" />
                <span className="info-card-shape info-card-shape-b" aria-hidden="true" />

                <div className="info-card-body">
                  <div className="info-card-icon">
                    <Icon aria-hidden="true" />
                  </div>
                  <h3 className="info-card-title">{title}</h3>
                  <p className="info-card-text">{text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
