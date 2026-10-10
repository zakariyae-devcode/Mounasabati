import React from 'react';

export default function ServicesHero() {
  return (
    <section 
      className="position-relative py-5 text-center d-flex align-items-center justify-content-center"
      style={{ 
        height: '400px', 
        backgroundColor: '#5E1777', // اللون البنفسجي
        backgroundImage: 'linear-gradient(rgba(94, 23, 119, 0.8), rgba(94, 23, 119, 0.8)), url(/images/hero-bg.jpg)', // تأكد من وجود صورة خلفية
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container text-white">
        <h1 
          className="display-3 mb-4" 
          style={{ 
            fontFamily: 'var(--andalusian-font, serif)', // استخدم خط أندلسي هنا
            color: '#D4AF37', // اللون الذهبي
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
          }}
        >
          خدماتنا الملوكية
        </h1>
        <p className="lead px-md-5" style={{ fontSize: '1.2rem', opacity: '0.9' }}>
          نحن نصمم لحظاتكم لتكون أساطير خالدة، بكل تفاصيل الأصالة المغربية واللمسة العصرية الفاخرة.
        </p>
        
        {/* خط زخرفي تحت النص */}
        <div 
          className="mx-auto mt-4" 
          style={{ width: '100px', height: '3px', backgroundColor: '#D4AF37' }}
        ></div>
      </div>
    </section>
  );
}