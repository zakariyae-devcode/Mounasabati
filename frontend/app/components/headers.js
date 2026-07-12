'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  const isActive = (path) => pathname === path;

  // الألوان البسيطة المتناسقة مع الطابع الأصيل
  const moroccanGreen = '#064E3B'; 
  const zellijGold = '#C5A059';    
  const ivoryWhite = '#FDFBF7';    

  return (
    <>
      {/* استدعاء الخطوط من جوجل لضمان عمل الخط الأندلسي/الكوفي والكلاسيكي */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Reem+Kufi:wght@400..700&family=Tajawal:wght@400;500;700&display=swap" rel="stylesheet" />

      <header style={{ backgroundColor: ivoryWhite, borderBottom: `2px solid ${zellijGold}` }}>
        <nav className="navbar navbar-expand-lg navbar-light py-3" style={{ direction: 'rtl' }}>
          <div className="container">
            
            {/* اسم الموقع بالخط الأندلسي / الكوفي الفخم (Reem Kufi أو Amiri) */}
            <Link href="/" className="navbar-brand d-flex align-items-center m-0" style={{ textDecoration: 'none' }}>
              <span style={{ 
                fontFamily: "'Reem Kufi', 'Amiri', serif", 
                color: moroccanGreen, 
                fontSize: '2.4rem', 
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}>
                مُناسَباتي
              </span>
            </Link>

            {/* زر القائمة للهواتف */}
            <button 
              className="navbar-toggler border-0 shadow-none" 
              type="button" 
              data-bs-toggle="collapse" 
              data-bs-target="#navbarNav"
              aria-controls="navbarNav" 
              aria-expanded="false" 
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* روابط التصفح بقية العناصر بخط أندلسي ناعم ومتناسق */}
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-4" style={{ fontFamily: "'Reem Kufi', 'Tajawal', sans-serif" }}>
                
                {/* عنصر القائمة الرئيسية مع صورة البراد */}
                <li className="nav-item">
                  <Link href="/" className="nav-link px-2 d-flex align-items-center gap-2" style={{ 
                    color: moroccanGreen, 
                    fontSize: '1.2rem', 
                    fontWeight: isActive('/') ? '700' : '500',
                    borderBottom: isActive('/') ? `2px solid ${moroccanGreen}` : 'none',
                    textDecoration: 'none'
                  }}>
                    {/* الصورة في مجلد public/icons/tea-pot.png */}
                    <Image 
                      src="/icons/tea-pot.png" 
                      alt="شعار البراد" 
                      width={26} 
                      height={26}
                      style={{ objectFit: 'contain' }}
                    />
                    <span>الرئيسية</span>
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/features" className="nav-link px-2" style={{ 
                    color: moroccanGreen, 
                    fontSize: '1.2rem', 
                    fontWeight: isActive('/features') ? '700' : '500',
                    borderBottom: isActive('/features') ? `2px solid ${moroccanGreen}` : 'none'
                  }}>
                    المميزات
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/bookings" className="nav-link px-2" style={{ 
                    color: moroccanGreen, 
                    fontSize: '1.2rem', 
                    fontWeight: isActive('/bookings') ? '700' : '500',
                    borderBottom: isActive('/bookings') ? `2px solid ${moroccanGreen}` : 'none'
                  }}>
                    حجز موعد
                  </Link>
                </li>

                <li className="nav-item">
                  <Link href="/contact" className="nav-link px-2" style={{ 
                    color: moroccanGreen, 
                    fontSize: '1.2rem', 
                    fontWeight: isActive('/contact') ? '700' : '500',
                    borderBottom: isActive('/contact') ? `2px solid ${moroccanGreen}` : 'none'
                  }}>
                    تواصل معنا
                  </Link>
                </li>
              </ul>

              {/* أزرار الحساب والدخول */}
              <div className="d-flex align-items-center gap-3" style={{ fontFamily: "'Tajawal', sans-serif" }}>
                <Link href="/login" className="btn btn-link text-decoration-none px-3 fw-bold" style={{ color: moroccanGreen }}>
                  تسجيل الدخول
                </Link>
                <Link href="/register" className="btn text-white px-4 py-2 rounded-3 shadow-sm custom-btn" style={{ 
                  backgroundColor: moroccanGreen, 
                  fontWeight: '600', 
                  border: `1px solid ${moroccanGreen}`,
                  transition: 'all 0.3s ease'
                }}>
                  أنشئ حسابك
                </Link>
              </div>

            </div>
          </div>
        </nav>

        {/* تأثيرات التمرير الجمالية */}
        <style jsx>{`
          .nav-link {
            transition: all 0.2s ease-in-out;
          }
          .nav-link:hover {
            color: ${zellijGold} !important;
          }
          .custom-btn:hover {
            background-color: transparent !important;
            color: ${moroccanGreen} !important;
            box-shadow: 0 4px 10px rgba(6, 78, 59, 0.15) !important;
          }
        `}</style>
      </header>
    </>
  );
}