import { useState } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./IndividualRegister.css";

const PATTERN_LINES = Array.from({ length: 36 }, (_, i) => {
  const baseX = 6 + i * 13;
  const amp = 22 + (i % 6) * 5;
  const phase = i * 0.5;
  let d = `M ${baseX} -20`;
  for (let y = 0; y <= 820; y += 22) {
    const x = baseX + Math.sin(y / 135 + phase) * amp;
    d += ` L ${x.toFixed(1)} ${y}`;
  }
  return d;
});

const INITIAL = {
  name: "",
  email: "",
  phone: "",
  nationality: "",
  organization: "",
  jobTitle: "",
  reason: "",
};

export default function IndividualRegister() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "يرجى إدخال الاسم الكامل";
    if (!form.email.trim()) {
      next.email = "يرجى إدخال البريد الإلكتروني";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      next.email = "البريد الإلكتروني غير صحيح";
    }
    if (!form.phone.trim()) {
      next.phone = "يرجى إدخال رقم الجوال";
    } else if (!/^[0-9+\s-]{8,}$/.test(form.phone)) {
      next.phone = "رقم الجوال غير صحيح";
    }
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSubmitted(true);
      setForm(INITIAL);
    }
  };

  return (
    <div className="app-page" dir="rtl">
      <Header />

      {/* ===== الهيرو ===== */}
      <section className="individual-hero" dir="rtl">
        <div className="individual-hero-pattern" aria-hidden="true">
          <svg
            viewBox="0 0 470 800"
            preserveAspectRatio="xMaxYMid slice"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" stroke="#6fb6c2" strokeWidth="1.4" strokeLinecap="round">
              {PATTERN_LINES.map((d, idx) => (
                <path key={idx} d={d} />
              ))}
            </g>
          </svg>
        </div>

        <div className="container individual-hero-inner">
          <h1 className="individual-hero-title">تسجيل الأفراد</h1>
          <p className="individual-hero-subtitle">
            سجّل حضورك في المؤتمر الإقليمي للري والصرف الزراعي، وكن جزءاً من نخبة
            المختصين وصنّاع القرار. أكمل بياناتك أدناه لحجز مقعدك في فعاليات
            المؤتمر وورش العمل.
          </p>
        </div>
      </section>

      {/* ===== نموذج التسجيل ===== */}
      <section className="individual-form-section" dir="rtl">
        <div className="container">
          <div className="individual-card">
            <h2 className="individual-card-title">نموذج تسجيل فردي</h2>
            <p className="individual-card-desc">
              يرجى تعبئة البيانات التالية لإتمام عملية التسجيل في المؤتمر.
            </p>

            {submitted && (
              <div className="individual-alert" role="status">
                تم تسجيلك بنجاح! نتطلع لرؤيتك في المؤتمر.
              </div>
            )}

            <form className="individual-form" onSubmit={handleSubmit} noValidate>
              <div className="individual-field">
                <label htmlFor="name">الاسم الكامل *</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="أدخل اسمك الكامل"
                  className={errors.name ? "is-invalid" : ""}
                />
                {errors.name && <span className="individual-error">{errors.name}</span>}
              </div>

              <div className="individual-row">
                <div className="individual-field">
                  <label htmlFor="email">البريد الإلكتروني *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    dir="ltr"
                    className={errors.email ? "is-invalid" : ""}
                  />
                  {errors.email && <span className="individual-error">{errors.email}</span>}
                </div>

                <div className="individual-field">
                  <label htmlFor="phone">رقم الجوال *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+966 5X XXX XXXX"
                    dir="ltr"
                    className={errors.phone ? "is-invalid" : ""}
                  />
                  {errors.phone && <span className="individual-error">{errors.phone}</span>}
                </div>
              </div>

              <div className="individual-field">
                <label htmlFor="nationality">الجنسية</label>
                <input
                  id="nationality"
                  name="nationality"
                  type="text"
                  value={form.nationality}
                  onChange={handleChange}
                  placeholder="أدخل الجنسية"
                />
              </div>

              <div className="individual-row">
                <div className="individual-field">
                  <label htmlFor="organization">جهة العمل (اختياري)</label>
                  <input
                    id="organization"
                    name="organization"
                    type="text"
                    value={form.organization}
                    onChange={handleChange}
                    placeholder="اسم جهة العمل"
                  />
                </div>

                <div className="individual-field">
                  <label htmlFor="jobTitle">المسمى الوظيفي (اختياري)</label>
                  <input
                    id="jobTitle"
                    name="jobTitle"
                    type="text"
                    value={form.jobTitle}
                    onChange={handleChange}
                    placeholder="المسمى الوظيفي"
                  />
                </div>
              </div>

              <div className="individual-field">
                <label htmlFor="reason">سبب الحضور</label>
                <textarea
                  id="reason"
                  name="reason"
                  rows="4"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="اذكر سبب رغبتك في حضور المؤتمر..."
                />
              </div>

              <button type="submit" className="individual-submit">
                تسجيل
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
