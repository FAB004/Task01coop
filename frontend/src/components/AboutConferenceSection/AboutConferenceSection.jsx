import "./AboutConferenceSection.css";


export default function AboutConferenceSection() {
  return (
    <section className="about-section" dir="rtl">
      <div className="container">
        <header className="about-section-head">
          <h2 className="about-section-title">عن المؤتمر</h2>
          <span className="about-section-divider" aria-hidden="true" />
        </header>

        <div className="about-section-card">
          <p className="about-section-text">
            يُعد المؤتمر الإقليمي الأول للري والصرف الزراعي بالشرق الأوسط منصةً
            علميةً ومهنيةً رائدةً تجمع نخبةً من الخبراء والمختصين وصنّاع القرار من
            مختلف دول المنطقة، بهدف مناقشة التحديات المتزايدة التي تواجه قطاع
            المياه والري، واستعراض أحدث الحلول والتقنيات المستدامة في مجال
            الإدارة المتكاملة للموارد المائية. ويسعى المؤتمر إلى تعزيز التعاون
            الإقليمي وتبادل الخبرات والمعارف بما يدعم تحقيق تنميةٍ زراعيةٍ مرنةٍ
            ومستدامةٍ قادرةٍ على مواجهة آثار التغير المناخي وندرة المياه. كما
            يوفّر المؤتمر فرصةً لعرض المشروعات الناجحة والممارسات الفضلى، وبناء
            شراكاتٍ استراتيجيةٍ بين القطاعين العام والخاص، بما يسهم في رسم ملامح
            مستقبلٍ أكثر استدامةً لقطاع الري والصرف الزراعي في الشرق الأوسط.
          </p>
        </div>
      </div>
    </section>
  );
}
