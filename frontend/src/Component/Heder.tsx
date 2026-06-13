import logo from '../assets/Logo01.png';


export default function Heder() {
  return (
    <>
      <style>
        {`
          /* زيادة الـ padding بشكل كبير لجعله أطول ويصل للحد المطلوب */
          .curved-header {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1030;
            background-color: #1a3639 !important; /* شفافية لتوضيح المحتوى خلفه */
            backdrop-filter: blur(10px);
            border-radius: 0 0 30px 30px;
            
            /* هنا تم التعديل: مسافة أكبر بكثير من الأعلى والأسفل */
            padding-top: 35px !important; 
            padding-bottom: 35px !important;
            
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          }

          .dropdown-item:hover, .dropdown-item:focus {
            background-color: #1a3639 !important;
            color: white !important;
          }

          .nav-link {
            white-space: nowrap !important;
          }
        `}
      </style>

      <nav className="navbar navbar-expand-lg curved-header">
        <div className="container-fluid px-4 px-lg-5">
          
          {/* قسم اليمين: الشعار */}
          <a className="navbar-brand py-2 me-4" href="#"> 
            <img src={logo} alt="شعار المؤسسة العامة للري" style={{ height: '85px', objectFit: 'contain' }} />
          </a>
          
          <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          {/* قسم المنتصف: الروابط الرئيسية */}
          <div className="collapse navbar-collapse justify-content-start mt-3 mt-lg-0" id="navbarNav">
            <ul className="navbar-nav fw-medium gap-lg-2 gap-xl-4 fs-6">
              <li className="nav-item">
                <a className="nav-link fw-bold" href="#" style={{ color: 'white' }}>الرئيسية</a>
              </li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  المؤتمر
                </a>
                <ul className="dropdown-menu text-end border-0 shadow" dir="rtl" aria-labelledby="navbarDropdown" style={{ backgroundColor: 'rgba(26, 54, 57, 0.9)' }}>
                  <li><a className="dropdown-item text-white py-2" href="#">عن المؤتمر</a></li>
                  <li><a className="dropdown-item text-white py-2" href="#">أهداف المؤتمر</a></li>
                  <li><a className="dropdown-item text-white py-2" href="#">محاور المؤتمر</a></li>
                </ul>
              </li>
              
              <li className="nav-item"><a className="nav-link text-white" href="#">الزيارة الميدانية</a></li>
              
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" data-bs-toggle="dropdown">المركز الاعلامي</a>
                <ul className="dropdown-menu text-end border-0 shadow" dir="rtl" style={{ backgroundColor: 'rgba(26, 54, 57, 0.9)' }}>
                  <li><a className="dropdown-item text-white py-2" href="#">الصور</a></li>
                  <li><a className="dropdown-item text-white py-2" href="#">الفيديوهات</a></li>
                  <li><a className="dropdown-item text-white py-2" href="#">الأخبار</a></li>
                </ul>
              </li>
              
              <li className="nav-item"><a className="nav-link text-white" href="#">الرعاة</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">المعرض</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">الأجندة</a></li>
              <li className="nav-item"><a className="nav-link text-white" href="#">المتحدثون</a></li>
            </ul>
          </div>

          {/* قسم اليسار: زر تغيير اللغة */}
          <div className="d-none d-lg-flex ms-auto">
            <button className="btn btn-outline-light px-3 py-1 rounded-1 fw-bold" style={{ borderWidth: '1.5px' }}>
              EN
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}