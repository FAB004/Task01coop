import { Link } from "react-router-dom";
import { fetchAbout, DEFAULT_ABOUT, useRemoteContent } from "../../data/conferenceStore";
import aboutImg from "../../assets/irrr.jpg";
import "./AboutConferenceSection.css";

export default function AboutConferenceSection() {
  // النص يُجلب من قاعدة البيانات عبر الـ API مع قيمة افتراضية احتياطية.
  const aboutText = useRemoteContent(fetchAbout, DEFAULT_ABOUT);
  return (
    <section className="about-section" dir="rtl">
      <div className="container">
        <div className="row align-items-center g-5">

          {/* عمود الصورة — يظهر أولاً على الجوّال (أعلى) وعلى اليسار في الشاشات الكبيرة */}
          <div className="col-12 col-lg-6 order-1 order-lg-2">
            <div className="about-img-wrap">
              <img src={aboutImg} alt="صورة تعبيرية عن مجال الري والصرف الزراعي" />
            </div>
          </div>

          {/* عمود النص — يظهر ثانياً على الجوّال (أسفل) وعلى اليمين في الشاشات الكبيرة */}
          <div className="col-12 col-lg-6 order-2 order-lg-1">
            <div className="about-text-wrap">
              <h2 className="about-section-title">عن المؤتمر</h2>
              <span className="about-section-divider" aria-hidden="true" />
              <p className="about-section-text">{aboutText}</p>
              <Link to="/about" className="dga-btn dga-btn-outline">
                اقرأ المزيد
              </Link>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
