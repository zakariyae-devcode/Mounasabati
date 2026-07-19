'use client'
import React from 'react';

export default function Header() {
  return (
    <>
      {/* استدعاء خط أميري الأندلسي العريق من Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&display=swap');
        
        .andalusian-font {
          font-family: 'Amiri', 'Andalus', serif !important;
        }
      `}</style>

      <header dir="rtl" className="w-100  border-bottom shadow-sm" style={{ backgroundColor: '#1e0b36', borderColor: 'rgba(212, 175, 55, 0.2)' }}>
        <div className="container-fluid px-5">
          <div className="d-flex align-items-center justify-content-between" style={{ height: '90px'  }}>
            
            {/* اليمين: الشعار (صورة البراد المغربي التقليدي + اسم "مناسباتي" بالخط الأندلسي) */}
            <div className="d-flex align-items-center gap-3">
              
              {/* صورة البراد المغربي التقليدي - استبدل المسار بمسار صورتك المحلية في مجلد public أو رابط خارجي */}
              <img 
                src="icons/moroccan-teapot.png" 
                alt="براد مغربي تقليدي" 
                style={{ width: '45px', height: '45px', objectFit: 'contain' }} 
                onError={(e) => {
                  // حل احتياطي في حال لم تتوفر الصورة بعد، لكي لا يظهر مربع مكسور
                  e.target.style.display = 'none';
                }}
              />
              
              {/* اسم المنصة بالخط الأندلسي ولون أزرق داكن فخم */}
              <span className="fs-1 fw-bold andalusian-font" style={{ color: '#d4af37', lineHeight: '1' }}>
                مناسباتي
              </span>
            </div>

            {/* الوسط: روابط التنقل */}
            <nav className="d-none d-md-flex align-items-center gap-4">
              <a href="/" className="text-decoration-none fw-bold px-2 andalusian-font" style={{ color: '#d4af37' }}>
                الرئيسية
              </a>
              <a href="/about" className="text-decoration-none fw-bold px-2 andalusian-font" style={{ color: '#d4af37', fontSize: '20px' }}>
                المميزات
              </a>
              <a href="/services" className="text-decoration-none fw-bold px-2 andalusian-font" style={{ color: '#d4af37', fontSize: '20px' }}>
                حجز موعد
              </a>
              <a href="#contact" className="text-decoration-none fw-bold px-2 andalusian-font" style={{ color: '#d4af37', fontSize: '20px' }}>
                اتصل بنا
              </a>
            </nav>

            {/* اليسار: أزرار التحكم وحساب المستخدم */}
            <div className="d-flex align-items-center gap-4">
              <a href="/login" className="text-decoration-none fw-bold andalusian-font" style={{ color: '#d4af37', fontSize: '20px' }}>
                تسجيل الدخول
              </a>
              <button 
                className="btn rounded-pill fw-bold text-white px-4 py-2.5 andalusian-font" 
                style={{ backgroundColor: '#f39c12', border: 'none', fontSize: '18px' }}
              >
                إنشاء حساب
              </button>
            </div>

          </div>
        </div>
      </header>
    </>
  );
}