'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  // الهوية اللونية المتناسقة مع الـ Navbar
  const moroccanGreen = '#064E3B'; // الأخضر الملكي العميق
  const zellijGold = '#C5A059';    // الذهبي المغربي المطفأ
  const ivoryWhite = '#FDFBF7';    // الأبيض العاجي المريح

  return (
    <footer style={{ backgroundColor: ivoryWhite, borderTop: `3px solid ${zellijGold}`, fontFamily: "'Tajawal', sans-serif", direction: 'rtl' }} className="pt-5 pb-3 mt-auto">
      <div className="container">
        <div className="row g-4 text-end">
          
          {/* القسم الأول: عن المنصة (بالخط الأندلسي الفخم) */}
          <div className="col-lg-4 col-md-6">
            <h5 style={{ fontFamily: "'Reem Kufi', 'Amiri', serif", color: moroccanGreen, fontSize: '1.8rem', fontWeight: '700' }} className="mb-3">
              مُناسَباتي
            </h5>
            <p className="text-muted lh-lg" style={{ fontSize: '0.95rem' }}>
              منصتكم الرقمية الرائدة لإدارة وحجز المواعيد والمنسابات بطابع مغربي أصيل. نجمع بين عراقة التقاليد وسهولة التكنولوجيا الحديثة لخدمتكم بامتياز.
            </p>
          </div>

          {/* القسم الثاني: روابط سريعة */}
          <div className="col-lg-2 col-md-6">
            <h6 style={{ color: moroccanGreen, fontWeight: '700' }} className="mb-3 position-relative pb-2 border-bottom border-secondary border-opacity-10">
              روابط سريعة
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link href="/" className="footer-link text-decoration-none text-muted">الرئيسية</Link>
              </li>
              <li>
                <Link href="/features" className="footer-link text-decoration-none text-muted">المميزات المغربية</Link>
              </li>
              <li>
                <Link href="/bookings" className="footer-link text-decoration-none text-muted">حجز موعد</Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link text-decoration-none text-muted">تواصل معنا</Link>
              </li>
            </ul>
          </div>

          {/* القسم الثالث: الدعم القانوني والإداري */}
          <div className="col-lg-3 col-md-6">
            <h6 style={{ color: moroccanGreen, fontWeight: '700' }} className="mb-3 position-relative pb-2 border-bottom border-secondary border-opacity-10">
              معلومات تهمك
            </h6>
            <ul className="list-unstyled d-flex flex-column gap-2">
              <li>
                <Link href="/terms" className="footer-link text-decoration-none text-muted">شروط الاستخدام</Link>
              </li>
              <li>
                <Link href="/privacy" className="footer-link text-decoration-none text-muted">سياسة الخصوصية</Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link text-decoration-none text-muted">الأسئلة الشائعة</Link>
              </li>
            </ul>
          </div>

          {/* القسم الرابع: التواصل والتفاعل */}
          <div className="col-lg-3 col-md-6">
            <h6 style={{ color: moroccanGreen, fontWeight: '700' }} className="mb-3 position-relative pb-2 border-bottom border-secondary border-opacity-10">
              تواصل معنا
            </h6>
            <p className="text-muted small mb-2">المملكة المغربية</p>
            <p className="text-muted small mb-2">البريد الإلكتروني: support@mounasabati.ma</p>
            
            {/* أيقونات التواصل الاجتماعي البسيطة */}
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="social-icon" style={{ color: moroccanGreen }}><i className="bi bi-facebook"></i></a>
              <a href="#" className="social-icon" style={{ color: moroccanGreen }}><i className="bi bi-instagram"></i></a>
              <a href="#" className="social-icon" style={{ color: moroccanGreen }}><i className="bi bi-twitter-x"></i></a>
            </div>
          </div>

        </div>

        {/* الخط السفلي وحقوق الملكية */}
        <hr className="my-4 text-secondary opacity-20" />
        
        <div className="row align-items-center">
          <div className="col-md-12 text-center">
            <p className="text-muted small mb-0" style={{ letterSpacing: '0.5px' }}>
              &copy; {new Date().getFullYear()} <span style={{ fontFamily: "'Reem Kufi', serif", color: moroccanGreen, fontWeight: '600' }}>مُناسَباتي</span>. جميع الحقوق محفوظة. صُنع بكل فخر في المغرب.
            </p>
          </div>
        </div>
      </div>

      {/* حركات الـ Hover الخاصة بالروابط */}
      <style jsx>{`
        .footer-link {
          transition: color 0.2s ease-in-out, padding-right 0.2s ease-in-out;
          font-size: 0.95rem;
        }
        .footer-link:hover {
          color: ${zellijGold} !important;
          padding-right: 5px;
        }
        .social-icon {
          transition: transform 0.2s ease;
          font-size: 1.2rem;
        }
        .social-icon:hover {
          transform: translateY(-3px);
          color: ${zellijGold} !important;
        }
      `}</style>
    </footer>
  );
}