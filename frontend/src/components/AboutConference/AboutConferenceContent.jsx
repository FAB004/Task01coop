import { fetchAbout, DEFAULT_ABOUT, useRemoteContent } from "../../data/conferenceStore";
import "./AboutConference.css";

export default function AboutConferenceContent() {
  // النص يُجلب من قاعدة البيانات عبر الـ API مع قيمة افتراضية احتياطية.
  const aboutText = useRemoteContent(fetchAbout, DEFAULT_ABOUT);
  return (
    <section className="about-content" dir="rtl">
      <div className="container about-content-inner">
        <p className="about-paragraph">{aboutText}</p>
      </div>
    </section>
  );
}
