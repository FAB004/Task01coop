import "./SpeakersSection.css";

const SPEAKERS = [
  { name: ".  ", title: "خبير إدارة الموارد المائية" },
  { name: "م", title: "استشارية تقنيات الري الحديثة" },
  { name: "د.  ", title: "أستاذ هندسة الري والصرف" },
  { name: "م.  ", title: "مديرة مشاريع الاستدامة البيئية" },
];

// صورة بديلة لكل متحدث بناءً على الترتيب
const getSpeakerImage = (index) => `https://i.pravatar.cc/300?img=${index + 1}`;

export default function SpeakersSection() {
  return (
    <section id="speakers" className="speakers-section" dir="rtl">
      <div className="container">
        <header className="speakers-head">
          <span className="speakers-accent" aria-hidden="true" />
          <h2 className="speakers-title">المتحدثون</h2>
        </header>

        <div className="speakers-track">
          {SPEAKERS.map((speaker, index) => (
            <article className="speaker-card" key={speaker.name}>
              <div className="speaker-image-wrap">
                <img
                  className="speaker-image"
                  src={getSpeakerImage(index)}
                  alt={speaker.name}
                  loading="lazy"
                />
              </div>
              <div className="speaker-info">
                <h3 className="speaker-name">{speaker.name}</h3>
                <p className="speaker-role">{speaker.title}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
