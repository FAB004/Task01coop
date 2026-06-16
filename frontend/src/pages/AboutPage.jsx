import Header from "../components/Header/Header";
import AboutConferenceHero from "../components/AboutConference/AboutConferenceHero";
import AboutConferenceContent from "../components/AboutConference/AboutConferenceContent";
import Footer from "../components/Footer/Footer";
export default function AboutPage() {
  return (
    <div className="app-page" dir="rtl">
      <Header />
      <AboutConferenceHero />
      <AboutConferenceContent />
      <Footer/>
    </div>
  );
}
