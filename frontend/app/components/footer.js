'use client'
import React from 'react';

export default function Footer() {
  return (
    <footer dir="rtl" className="w-100 text-white pt-5 pb-4" style={{ backgroundColor: '#1e0b36', borderTop: '3px solid #d4af37' }}>
      <div className="container">
        <div className="row gy-4 justify-content-between">
          
          {/* العمود الأول: عن المنصة والشعار */}
          <div className="col-12 col-md-6 col-lg-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <img 
                src="/icons/moroccan-teapot.png" 
                alt="براد مغربي" 
                style={{ width: '45px', height: '45px', objectFit: 'contain' }} 
              />
              <span className="fs-2 fw-bold andalusian-font" style={{ color: '#d4af37' }}>
                مناسباتي
              </span>
            </div>
            <p className="andalusian-font fs-5 lh-lg" style={{ color: 'rgba(255, 255, 255, 0.7)', textAlign: 'justify' }}>
              منصتكم المغربية الرائدة والمتكاملة لتنظيم وتخليد أرقى المناسبات، الحفلات، والأعراس  الأصيلة بلمسة عصرية مبتكرة تليق بضيوفكم.
            </p>
          </div>

          {/* العمود الثاني: روابط سريعة */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <h5 className="andalusian-font fw-bold mb-4" style={{ color: '#d4af37', fontSize: '22px' }}>روابط سريعة</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {[
                { name: 'الرئيسية', link: '#home' },
                { name: 'المميزات', link: '#features' },
                { name: 'حجز موعد', link: '#booking' },
                { name: 'اتصل بنا', link: '#contact' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-decoration-none andalusian-font fs-5" 
                    style={{ color: 'rgba(255, 255, 255, 0.75)', transition: '0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#d4af37'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.75)'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الثالث: خدماتنا */}
          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <h5 className="andalusian-font fw-bold mb-4" style={{ color: '#d4af37', fontSize: '22px' }}>خدماتنا</h5>
            <ul className="list-unstyled d-flex flex-column gap-3">
              {[
                { name: 'تنظيم الأعراس', link: '#wedding' },
                { name: 'تموين الحفلات', link: '#catering' },
                { name: 'قاعات الأفراح', link: '#halls' },
                { name: 'تزيين القاعات', link: '#decor' }
              ].map((item, index) => (
                <li key={index}>
                  <a 
                    href={item.link} 
                    className="text-decoration-none andalusian-font fs-5" 
                    style={{ color: 'rgba(255, 255, 255, 0.75)', transition: '0.2s' }}
                    onMouseEnter={(e) => e.target.style.color = '#d4af37'}
                    onMouseLeave={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.75)'}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* العمود الرابع: معلومات التواصل والشبكات */}
          <div className="col-12 col-md-6 col-lg-3">
            <h5 className="andalusian-font fw-bold mb-4" style={{ color: '#d4af37', fontSize: '22px' }}>تواصل معنا</h5>
            <ul className="list-unstyled d-flex flex-column gap-3 andalusian-font fs-5 text-white-50">
              <li>
                <span style={{ color: '#d4af37' }}>📍 الموقع:</span> الدار البيضاء، المغرب
              </li>
              <li>
                <span style={{ color: '#d4af37' }}>📞 الهاتف:</span> +212 600-000000
              </li>
              <li>
                <span style={{ color: '#d4af37' }}>✉️ الإيميل:</span> support@mounasabati.ma
              </li>
            </ul>

            {/* أيقونات التواصل الاجتماعي الدائرية */}
            <div className="d-flex gap-2 mt-4">
              {[
                { name: 'facebook', path: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
                { name: 'instagram', path: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
                { name: 'tiktok', path: 'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5' },
                { name: 'whatsapp', path: 'M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z' }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={`#${social.name}`} 
                  className="d-flex align-items-center justify-content-center rounded-circle"
                  style={{ 
                    width: '38px', 
                    height: '38px', 
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    color: '#d4af37',
                    transition: '0.3s all'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4af37';
                    e.currentTarget.style.color = '#1e0b36';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#d4af37';
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {social.name === 'instagram' && <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>}
                    <path d={social.path}></path>
                  </svg>
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* خط الفصل السفلي وحقوق النشر */}
        <hr className="my-4" style={{ backgroundColor: 'rgba(212, 175, 55, 0.2)' }} />
        <div className="text-center">
          <p className="andalusian-font fs-5 mb-0" style={{ color: 'rgba(212, 175, 55, 0.6)' }}>
            &copy; {new Date().getFullYear()} <span className="fw-bold" style={{ color: '#d4af37' }}>مناسباتي</span>. جميع الحقوق محفوظة </p>
        </div>

      </div>
    </footer>
  );
}