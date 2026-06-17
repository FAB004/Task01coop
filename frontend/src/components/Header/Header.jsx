import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/Logo01.png";



function NavDropdown({ label, children }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

 
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
      {/* dropdown-menu + show: قائمة Bootstrap المنسدلة، تُظهر/تُخفى عبر حالة React */}
      <ul className={`dropdown-menu ${open ? "show" : ""}`} dir="rtl">
        {children}
      </ul>
    </li>
  );
}

export default function Header() {
  return (
    <header dir="rtl">
      
      <style>{`
        #confNavbar { background-color:#21363b; border-radius:0 0 28px 28px; padding-block:.55rem; font-family:"Cairo",system-ui,"Segoe UI",sans-serif; }
        #confNavbar .navbar-brand img { height:64px; width:auto; object-fit:contain; }
        #confNavbar .navbar-nav { gap:1.4rem; }
        #confNavbar .nav-link { color:#fff; font-weight:500; font-size:.98rem; letter-spacing:.2px; white-space:nowrap; padding:.35rem .15rem; transition:color .2s ease; }
        #confNavbar .nav-link:hover, #confNavbar .nav-link:focus { color:#7ac17d; }
        #confNavbar .nav-link.active { color:#7ac17d; font-weight:700; }
        #confNavbar .dropdown-toggle::after { margin-right:.4em; margin-left:0; vertical-align:.15em; }
        #confNavbar .dropdown-menu { background-color:#21363b; border:1px solid rgba(255,255,255,.08); border-radius:10px; text-align:right; padding:.4rem 0; box-shadow:0 10px 28px rgba(0,0,0,.35); }
        @media (min-width:992px){ #confNavbar .dropdown-menu.show { position:absolute; top:100%; right:0; left:auto; margin-top:.25rem; z-index:1031; } }
        @media (max-width:991.98px){ #confNavbar .dropdown-menu.show { position:static; margin-top:.25rem; } }
        #confNavbar .dropdown-item { color:#e6edef; font-size:.92rem; padding:.5rem 1.1rem; }
        #confNavbar .dropdown-item:hover, #confNavbar .dropdown-item:focus { background-color:#2d4750; color:#7ac17d; }
        #confNavbar .btn-en { border:1.6px solid #7ac17d; color:#7ac17d; background:transparent; border-radius:8px; padding:.5rem 1rem; font-weight:700; font-size:.95rem; line-height:1; letter-spacing:.5px; transition:all .2s ease; }
        #confNavbar .btn-en:hover, #confNavbar .btn-en:focus { background-color:#7ac17d; color:#21363b; }
        #confNavbar .navbar-toggler { border-color:rgba(255,255,255,.35); padding:.3rem .55rem; }
        #confNavbar .navbar-toggler:focus { box-shadow:none; }
        #confNavbar .navbar-toggler-icon { filter:invert(1) brightness(2); }
        @media (max-width:991.98px){
          #confNavbar { border-radius:0 0 20px 20px; }
          #confNavbar .navbar-nav { gap:.4rem; margin-top:.75rem; margin-inline:0 !important; }
          #confNavbar .lang-switch { margin-top:.75rem; justify-content:flex-start; }
          #confNavbar .navbar-brand img { height:52px; }
        }
      `}</style>

      
      <nav id="confNavbar" className="navbar navbar-expand-lg">
      
        <div className="container-fluid d-flex align-items-center gap-3 px-4 px-xl-5">
        
          <Link className="navbar-brand p-0 m-0" to="/">
            <img src={logo} alt="شعار المؤتمر" />
          </Link>

         
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

          
          <div className="collapse navbar-collapse" id="mainNav">
            {/* navbar-nav mx-auto: قائمة الروابط، mx-auto لتوسيطها أفقياً */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link active" to="/">الرئيسية</Link>
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

              <li className="nav-item"><a className="nav-link" href="#">الزيارة الميدانية</a></li>
              <li className="nav-item"><Link className="nav-link" to="/individual-register">تسجيل الأفراد</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/sponsor-register">تسجيل الرعاة</Link></li>
              <li className="nav-item"><a className="nav-link" href="#">المعرض</a></li>
              <li className="nav-item"><a className="nav-link" href="#agenda">الأجندة</a></li>
              <li className="nav-item"><a className="nav-link" href="#speakers">المتحدثون</a></li>
            </ul>

          
            <div className="lang-switch d-flex align-items-center">
              <button type="button" className="btn btn-en">EN</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
