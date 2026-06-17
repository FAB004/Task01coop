import "./SpeakersCarousel.css";

// عدد المتحدثين ثابت ويُمرّر عبر مصفوفة — اترك "image" فارغاً الآن؛ تُضاف الصور لاحقاً.
const SPEAKERS = [
  { name: "د. أحمد العتيبي", title: "خبير إدارة الموارد المائية", image: "" },
  { name: "م. سارة الدوسري", title: "استشارية تقنيات الري الحديثة", image: "" },
  { name: "د. خالد المطيري", title: "أستاذ هندسة الري والصرف", image: "" },
  { name: "م. نورة القحطاني", title: "مديرة مشاريع الاستدامة البيئية", image: "" },
  { name: "د. فهد الشهري", title: "باحث في كفاءة استهلاك المياه", image: "" },
  { name: "م. ريم الغامدي", title: "مهندسة نظم الصرف الزراعي", image: "" },
];

// أول حرف من الاسم يظهر داخل الصورة الدائرية البديلة (أو "؟" عند غياب الاسم)
const getInitial = (name) =>
  (name || "").replace(/^(د\.|م\.|أ\.)\s*/, "").trim().charAt(0) || "؟";

export default function SpeakersCarousel({ speakers = SPEAKERS }) {
  return (
    <section className="carousel-section" dir="rtl">
      <div className="carousel-container">
        <div className="carousel-track" role="list">
          {speakers.map((speaker, index) => (
            <article className="carousel-card" role="listitem" key={index}>
              <div className="carousel-avatar">
                {speaker.image ? (
                  <img src={speaker.image} alt={speaker.name} loading="lazy" />
                ) : (
                  <span className="carousel-avatar-placeholder" aria-hidden="true">
                    {getInitial(speaker.name)}
                  </span>
                )}
              </div>
              <h3 className="carousel-name">{speaker.name}</h3>
              <p className="carousel-title">{speaker.title}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
