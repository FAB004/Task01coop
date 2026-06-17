import {
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../../assets/footerLogo.png";
import "./Footer.css";
import "../../assets/Logo01.png";
const NAV_LINKS = [
  { label: "الرئيسية", href: "#home" },
  { label: "عن المؤتمر", href: "#about" },
  { label: "الأجندة", href: "#agenda" },
  { label: "المتحدثون", href: "#speakers" },
];

const CONTACTS = [
  { icon: FaEnvelope, text: "FAB@irrigation.com" },
  { icon: FaMapMarkerAlt, text: "فندق الانتركونتينتال - الاحساء - السعودية" },
  { icon: FaPhone, text: "+966" },
];

const SOCIALS = [
  { icon: FaLinkedin, href: "#", label: "LinkedIn" },
  { icon: FaXTwitter, href: "#", label: "X" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="site-footer" dir="rtl">
      <div className="container">
        <div className="row g-4 pb-4">
          {/* العمود: الشعار والوصف */}
          <div className="footer-col footer-brand col-12 col-lg-5">
            <img src={logo} className="Logo01.png" alt="شعار المؤتمر" /> 
            <h3 className="footer-brand-title">
           المؤتمر الإقليمي الأول للري والصرف   
            </h3 >
            <h3 className="footer-brand-title"> الزراعي بالشرق الاوسط</h3>
            <p className="footer-brand-desc">
              منصة علمية ومهنية رائدة تجمع الخبراء وصنّاع القرار لمناقشة مستقبل
              الإدارة المتكاملة للموارد المائية وتحقيق تنمية زراعية مستدامة.
            </p>
          </div>

          {/* العمود: روابط التنقل */}
          <nav className="footer-col footer-nav col-12 col-sm-6 col-lg-3" aria-label="روابط الموقع">
            <h4 className="footer-heading">روابط سريعة</h4>
            <ul className="footer-links">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a className="footer-link" href={link.href}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer-col footer-contact col-12 col-sm-6 col-lg-4">
            <h4 className="footer-heading">تواصل معنا</h4>
            <ul className="footer-contact-list">
              {CONTACTS.map(({ icon: Icon, text }) => (
                <li className="footer-contact-item" key={text}>
                  <span className="footer-contact-icon">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="footer-contact-text">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} المؤتمر الإقليمي للري والصرف الزراعي. جميع
            الحقوق محفوظة.
          </p>
          <ul className="footer-socials">
            {SOCIALS.map(({ icon: Icon, href, label }) => (
              <li key={label}>
                <a
                  className="footer-social"
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
