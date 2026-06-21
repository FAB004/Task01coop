import { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import "./SpeakersSection.css";

const SPEAKERS = [
  { name: "محمد", title: "   المائية", image: "" },
  { name: "عمر", title: "استشاري تقنيات الري الحديثة", image: "" },
  { name: "د. خالد ", title: " مهندس  ", image: "" },
  { name: "", title: "مدير مشاريع  ", image: "" },
  { name: "عبدالله", title: "مهندس  ", image: "" },
  { name: "سعد", title: "مهندس   ", image: "" },
];

const getInitials = (name) =>
  (name || "").replace(/^(د\.|م\.|أ\.)\s*/, "").trim().charAt(0) || "؟";

export default function SpeakersSection({ speakers = SPEAKERS }) {
  const trackRef = useRef(null);

  const scrollByCards = (direction) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: direction * track.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section id="speakers" className="speakers-section" dir="rtl">
      <div className="container">
        <header className="speakers-head">
          <span className="speakers-accent" aria-hidden="true" />
          <h2 className="speakers-title">المتحدثون</h2>
        </header>

        <div className="speakers-track" role="list" ref={trackRef}>
          {speakers.map((speaker, index) => (
            <article className="speaker-card" role="listitem" key={index}>
              <div className="speaker-image-wrap">
                {speaker.image ? (
                  <img
                    className="speaker-image"
                    src={speaker.image}
                    alt={speaker.name}
                    loading="lazy"
                  />
                ) : (
                  <span className="speaker-image-placeholder" aria-hidden="true">
                    {getInitials(speaker.name)}
                  </span>
                )}
              </div>

              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-role">{speaker.title}</p>
              </div>
            </article>
          ))}
        </div>

  
        <div className="speakers-controls">
          <button
            type="button"
            className="speakers-nav"
            onClick={() => scrollByCards(1)}
            aria-label="السابق"
          >
            <FaChevronRight aria-hidden="true" />
          </button>
          <button
            type="button"
            className="speakers-nav"
            onClick={() => scrollByCards(-1)}
            aria-label="التالي"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
