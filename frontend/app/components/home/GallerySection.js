'use client'
import React, { useState } from 'react';
import Image from 'next/image';

export default function GallerySection() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [lightboxImage, setLightboxImage] = useState(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'halls', label: 'قاعات ملكية' },
    { id: 'catering', label: 'ضيافة وتموين' },
    { id: 'attire', label: 'نكافة وأزياء' }
  ];

  const galleryItems = [
    {
      id: 1,
      category: 'halls',
      image: '/images/4e1dbdc1562b90e614c1803f8d0bccf3.jpg',
      title: 'قاعة اللؤلؤة الأندلسية',
      description: 'تنظيم وتزيين قاعات بلمسة نقوش مغربية أصيلة.'
    },
    {
      id: 2,
      category: 'catering',
      image: '/images/moroccan-hospitality.jpg',
      title: 'طقوس الشاي المغربي الفاخر',
      description: 'تقديم الشاي المنعش والحلويات التقليدية بطريقة ملكية.'
    },
    {
      id: 3,
      category: 'attire',
      image: '/images/photo-1469371670807-013ccf25f16a.avif',
      title: 'زفة العمارية المغربية',
      description: 'مرافقة العروس بأجود أنواع التكاشط وتفاصيل الهودج الذهبي.'
    },
    {
      id: 4,
      category: 'halls',
      image: '/images/royal-hall.jpg',
      title: 'قصر المناسبات الكبرى',
      description: 'فضاء شاسع يجمع بين العمارة العريقة والتقنيات العصرية.'
    },
    {
      id: 5,
      category: 'catering',
      image: 'https://images.unsplash.com/photo-1541518763669-27fef04b14ea?q=80&w=600&auto=format&fit=crop',
      title: 'أطباق الطاجين والمشوي العريق',
      description: 'أكلات تقليدية مطهوة بعناية لتناسب أذواق ضيوفكم.'
    },
    {
      id: 6,
      category: 'attire',
      image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=600&auto=format&fit=crop',
      title: 'البرزة التقليدية الفخمة',
      description: 'جلوس العروسين في فضاء أسطوري يعكس هيبة المناسبة.'
    }
  ];

  // تصفية العناصر بناءً على الفلتر النشط
  const filteredItems = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <>
      <style>{`
        .andalusian-font {
          font-family: 'Amiri', 'Andalus', serif !important;
        }
        .text-gold {
          color: #d4af37 !important;
        }
        .bg-luxury-purple {
          background-color: #1a0933 !important;
        }
        /* كبسولات الفلترة */
        .filter-btn {
          background-color: transparent;
          color: #fff;
          border: 1px solid rgba(212, 175, 55, 0.3);
          padding: 10px 25px;
          border-radius: 30px;
          font-size: 16px;
          transition: all 0.3s ease;
        }
        .filter-btn:hover, .filter-btn.active {
          background-color: #d4af37;
          color: #1e0b36;
          border-color: #d4af37;
          box-shadow: 0 4px 15px rgba(212, 175, 55, 0.3);
          font-weight: bold;
        }
        /* كروت المعرض */
        .gallery-card {
          position: relative;
          height: 350px;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(212, 175, 55, 0.15);
        }
        .gallery-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to top, rgba(26, 9, 51, 0.95) 10%, rgba(26, 9, 51, 0.2) 100%);
          opacity: 0;
          transition: all 0.4s ease-in-out;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 25px;
          z-index: 2;
        }
        .gallery-card:hover .gallery-overlay {
          opacity: 1;
        }
        .gallery-card img {
          transition: transform 0.6s ease;
        }
        .gallery-card:hover img {
          transform: scale(1.1);
        }
        /* نافذة العرض المبسطة */
        .lightbox-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(15, 5, 30, 0.95);
          z-index: 1050;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
      `}</style>

      <section dir="rtl" className="bg-luxury-purple py-5 position-relative overflow-hidden">
        {/* تأثير خلفية فني */}
        <div 
          className="position-absolute start-0 end-0 top-0 bottom-0 opacity-25" 
          style={{
            backgroundImage: 'radial-gradient(#d4af37 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
            pointerEvents: 'none'
          }}
        />

        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          
          {/* عنوان القسم */}
          <div className="row justify-content-center text-center mb-5">
            <div className="col-12 col-md-8">
              <h5 className="text-gold andalusian-font mb-2 fs-4">ألبوم أعمالنا</h5>
              <h2 className="andalusian-font text-white fw-bold mb-3" style={{ fontSize: '2.8rem' }}>
                معرض <span className="text-gold">اللحظات الأسطورية</span>
              </h2>
              <p className="text-white-50 fs-5">
                تصفح مقتطفات من أفخم الحفلات والمناسبات الملكية التي شرفنا بتنظيمها وتنسيق أدق تفاصيلها.
              </p>
            </div>
          </div>

          {/* أزرار الفلترة التفاعلية */}
          <div className="d-flex flex-wrap justify-content-center gap-3 mb-5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`filter-btn andalusian-font ${activeFilter === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* شبكة الصور التفاعلية */}
          <div className="row g-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="col-12 col-md-6 col-lg-4">
                <div 
                  className="gallery-card"
                  onClick={() => setLightboxImage(item.image)}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  {/* الغطاء التفاعلي عند التمرير */}
                  <div className="gallery-overlay text-end">
                    <span className="text-gold andalusian-font fs-6 mb-1 d-block">
                      {categories.find(c => c.id === item.category)?.label}
                    </span>
                    <h4 className="text-white andalusian-font fw-bold fs-4 mb-2">{item.title}</h4>
                    <p className="text-white-50 fs-6 mb-0">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* كود نافذة عرض الصور المنبثقة (Lightbox) */}
        {lightboxImage && (
          <div 
            className="lightbox-backdrop"
            onClick={() => setLightboxImage(null)}
          >
            {/* زر الإغلاق */}
            <button 
              className="btn text-white position-absolute top-0 end-0 m-4 fs-2"
              style={{ border: 'none', background: 'none', zIndex: 1060 }}
              onClick={() => setLightboxImage(null)}
            >
              &times;
            </button>
            <div 
              className="position-relative" 
              style={{ width: '90%', maxWidth: '850px', height: '80vh' }}
              onClick={(e) => e.stopPropagation()} // منع إغلاق النافذة عند الضغط على الصورة نفسها
            >
              <Image
                src={lightboxImage}
                alt="معاينة الصورة بكامل دقتها"
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
}