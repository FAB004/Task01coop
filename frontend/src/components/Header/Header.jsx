import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo01.png";
import "./Header.css";

function NavDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // close when clicking outside this dropdown
  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <li className="nav-item dropdown" ref={ref}>
      <a
        className="nav-link dropdown-toggle"
        href="#"
        role="button"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          setOpen((o) => !o);
        }}
      >
        {label}
      </a>
      <ul className={`dropdown-menu site-dropdown ${open ? "show" : ""}`} dir="rtl">
        {children}
      </ul>
    </li>
  );
}

export default function Header() {
  return (
    <header className="site-header" dir="rtl">
      <nav className="navbar navbar-expand-lg site-navbar">
        <div className="container-fluid header-inner">
          {/* ===== الشعار (يمين) ===== */}
          <Link className="navbar-brand brand" to="/">
            <img src={logo} className="brand-icon" alt="شعار المؤتمر" />
          </Link>

          {/* زر القائمة للجوال */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          {/* ===== الروابط (وسط) + زر اللغة (يسار) ===== */}
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav nav-list mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  الرئيسية
                </Link>
              </li>

              <NavDropdown label="المؤتمر">
                <li><Link className="dropdown-item" to="/about">عن المؤتمر</Link></li>
                <li><a className="dropdown-item" href="#">أهداف المؤتمر</a></li>
                <li><a className="dropdown-item" href="#">محاور المؤتمر</a></li>
              </NavDropdown>

              <NavDropdown label="المركز الاعلامي">
                <li><a className="dropdown-item" href="#">الصور</a></li>
                <li><a className="dropdown-item" href="#">الفيديوهات</a></li>
                <li><a className="dropdown-item" href="#">الأخبار</a></li>
              </NavDropdown>

              <li className="nav-item">
                <a className="nav-link" href="#">الزيارة الميدانية</a>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/individual-register">تسجيل الأفراد</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/sponsor-register">تسجيل الرعاة</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">المعرض</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#agenda">الأجندة</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#speakers">المتحدثون</a>
              </li>
            </ul>

            <div className="lang-switch">
              <button type="button" className="btn-en">
                EN
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
