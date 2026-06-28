import { useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { fetchSpeakers, DEFAULT_SPEAKERS, useRemoteContent } from "../../data/conferenceStore";
import "./SpeakersSection.css";

const getInitials = (name) =>
  (name || "").replace(/^(د\.|م\.|أ\.)\s*/, "").trim().charAt(0) || "؟";

// قائمة المتحدثين تُجلب من قاعدة البيانات عبر الـ API مع قيمة افتراضية احتياطية.
// (يمكن تمرير speakers صراحةً لتجاوز الجلب.)
export default function SpeakersSection({ speakers }) {
  const remote = useRemoteContent(fetchSpeakers, DEFAULT_SPEAKERS);
  const list = speakers || remote;
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
          {list.map((speaker, index) => (
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
