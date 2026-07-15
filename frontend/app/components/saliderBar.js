'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const slides = [
    {
      image: '/images/4e1dbdc1562b90e614c1803f8d0bccf3.jpg',
      title: 'أعراس أسطورية تفوق الخيال',
      description: 'ننسق لك تفاصيل ليلة العمر بأصالة مغربية عريقة وفخامة ملكية تليق بضيوفكم.',
      ctaText: 'اكتشف خدماتنا',
      link: '#services'
    },
    {
      image: '/images/moroccan-hospitality.jpg', 
      title: 'ضيافة ملكية بنكهة أصيلة',
      description: 'نأخذ ضيوفكم في رحلة تذوق ساحرة تجمع بين عراقة الطاجين المغربي وفخامة كؤوس الشاي المنعشة المجهزة بكل حب.',
      ctaText: 'اكتشف قائمة الضيافة',
      link: '#catering'
    },
    {
      image: '/images/photo-1469371670807-013ccf25f16a.avif',
      title: 'تنظيم حفلات ومناسبات فاخرة',
      description: 'من الخطوبة وحتى أرقى الأفراح والمؤتمرات، نتولى كل تفصيل باحترافية مطلقة وأسلوب عصري.',
      ctaText: 'احجز موعدك الآن',
      link: '#booking'
    },
    {
      // تم استبدال الصورة المتكررة وتحديث العنوان والوصف هنا
      image: '/images/royal-hall-morocco.jpg', 
      title: 'قاعات أسطورية بلمسات أندلسية',
      description: 'قصور وقاعات بتصاميم معمارية ساحرة ونقوش أندلسية عريقة، مجهزة بأحدث تقنيات الإضاءة والصوت لتخليد ليلتكم الفاخرة.',
      ctaText: 'عرض القاعات الفخمة',
      link: '#halls'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveIndex((activeIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex((activeIndex - 1 + slides.length) % slides.length);
  };

  return (
    <>
      <style>{`
        .andalusian-font {
          font-family: 'Amiri', 'Andalus', serif !important;
        }
        .slider-overlay {
          background: linear-gradient(to left, rgba(30, 11, 54, 0.85), rgba(30, 11, 54, 0.45));
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up-animation {
          animation: fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards;
        }
      `}</style>

      <section dir="rtl" className="position-relative w-100 overflow-hidden" style={{ height: '650px' }}>
        {/* خلفيات السلايدر المتداخلة بنعومة باستخدام مكون Image */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className="position-absolute top-0 start-0 w-100 h-100"
            style={{
              opacity: index === activeIndex ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === activeIndex ? 1 : 0
            }}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              style={{ objectFit: 'cover' }}
            />
            {/* طبقة التظليل البنفسجية الملكية */}
            <div className="position-absolute top-0 start-0 w-100 h-100 slider-overlay" style={{ zIndex: 1 }} />
          </div>
        ))}

        {/* محتوى النصوص والخطوط الأندلسية الفاخرة */}
        <div className="container h-100 position-relative d-flex align-items-center" style={{ zIndex: 2 }}>
          <div className="row w-100">
            <div className="col-12 col-md-9 col-lg-7 text-white text-end">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`${index === activeIndex ? 'd-block' : 'd-none'}`}
                >
                  <div className="fade-in-up-animation">
                    <h1 className="andalusian-font fw-bold mb-3" style={{ fontSize: '3.8rem', color: '#d4af37', textShadow: '2px 2px 5px rgba(0,0,0,0.4)', lineHeight: '1.2' }}>
                      {slide.title}
                    </h1>
                    <p className="andalusian-font fs-3 mb-4 lh-lg" style={{ color: 'rgba(255, 255, 255, 0.95)', maxWidth: '600px' }}>
                      {slide.description}
                    </p>
                    <a 
                      href={slide.link} 
                      className="btn rounded-pill fw-bold px-5 py-3 andalusian-font"
                      style={{ 
                        backgroundColor: '#d4af37', 
                        color: '#1e0b36', 
                        fontSize: '18px',
                        border: '2px solid #d4af37',
                        boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)',
                        transition: 'all 0.3s ease-in-out'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#d4af37';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = '#d4af37';
                        e.target.style.color = '#1e0b36';
                      }}
                    >
                      {slide.ctaText}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* زر التنقل الأيمن (السابق) */}
        <button 
          onClick={prevSlide}
          className="position-absolute top-50 translate-middle-y btn text-white d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 3, 
            right: '20px', 
            width: '55px', 
            height: '55px', 
            backgroundColor: 'rgba(30, 11, 54, 0.65)', 
            borderRadius: '50%', 
            border: '1px solid rgba(212, 175, 55, 0.25)',
            transition: 'all 0.2s'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#d4af37" className="bi bi-chevron-right" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>

        {/* زر التنقل الأيسر (التالي) */}
        <button 
          onClick={nextSlide}
          className="position-absolute top-50 translate-middle-y btn text-white d-flex align-items-center justify-content-center"
          style={{ 
            zIndex: 3, 
            left: '20px', 
            width: '55px', 
            height: '55px', 
            backgroundColor: 'rgba(30, 11, 54, 0.65)', 
            borderRadius: '50%', 
            border: '1px solid rgba(212, 175, 55, 0.25)',
            transition: 'all 0.2s'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#d4af37" className="bi bi-chevron-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>

        {/* المؤشرات السفلية (Dots Indicators) */}
        <div className="position-absolute bottom-0 start-50 translate-middle-x d-flex gap-2 mb-4" style={{ zIndex: 3 }}>
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className="rounded-circle"
              style={{
                width: '12px',
                height: '12px',
                border: 'none',
                backgroundColor: index === activeIndex ? '#d4af37' : 'rgba(255, 255, 255, 0.4)',
                transform: index === activeIndex ? 'scale(1.25)' : 'scale(1)',
                transition: 'all 0.3s'
              }}
            />
          ))}
        </div>
      </section>
    </>
  );
}