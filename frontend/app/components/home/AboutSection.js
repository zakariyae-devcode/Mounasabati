'use client'
import React from 'react';
import Image from 'next/image';

export default function AboutSection() {
  return (
    <>
      <style>{`
        .andalusian-font {
          font-family: 'Amiri', 'Andalus', serif !important;
        }
        .text-gold {
          color: #d4af37 !important;
        }
        .bg-royal-purple {
          background-color: #1a0933 !important; /* بنفسجي ملكي داكن جداً */
        }
        .luxury-border {
          border: 2px solid #d4af37;
          border-radius: 15px;
          padding: 10px;
          position: relative;
        }
        /* تأثير مميز للصورة خلف الإطار */
        .luxury-border::after {
          content: '';
          position: absolute;
          top: 15px;
          right: -15px;
          width: 100%;
          height: 100%;
          border: 2px solid rgba(212, 175, 55, 0.3);
          border-radius: 15px;
          z-index: -1;
          transition: all 0.4s ease;
        }
        .luxury-border:hover::after {
          top: 10px;
          right: -10px;
          border-color: #d4af37;
        }
      `}</style>

      <section dir="rtl" className="bg-royal-purple py-5 position-relative overflow-hidden">
        {/* زخرفة خلفية خفيفة جداً لمنح طابع أندلسي عريق */}
        <div 
          className="position-absolute top-0 start-0 w-100 h-100 opacity-25"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
            pointerEvents: 'none'
          }}
        />

        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            
            {/* 1. جانب النص والقصة (اليمين) */}
            <div className="col-12 col-lg-6 text-white text-end">
              <h5 className="text-gold andalusian-font mb-2 fs-4">من نحن</h5>
              <h2 className="andalusian-font fw-bold mb-4" style={{ fontSize: '2.8rem', lineHeight: '1.3' }}>
                قصة عشق تجمع بين <span className="text-gold">الأصالة المغربية</span> والفخامة الملكية
              </h2>
              <p className="fs-5 lh-lg mb-4 text-white-50">
                في منصة مناسباتي، لا نكتفي بتنظيم الأحداث، بل نصوغ من أحلامكم لوحات فنية حية ونخلد ليلة العمر لتصبح أسطورة تُروى. نجمع بين عراقة التقاليد المغربية الضاربة في التاريخ وأرقى أساليب الضيافة والتنظيم العصرية.
              </p>
              <p className="fs-5 lh-lg mb-5 text-white-50">
                بدءاً من الزينة الأندلسية البديعة، مروراً بالضيافة الفاخرة المجهزة بأيدي أمهر الطهاة، وصولاً إلى أدق تفاصيل الزفة والنكافة، نسهر على أدق التفاصيل لترتقي مناسبتكم لمستوى تطلعاتكم وتليق بضيوفكم المتميزين.
              </p>

              {/* نقاط القوة والأرقام السريعة */}
              <div className="row g-4 border-top border-secondary pt-4">
                <div className="col-6 col-sm-4">
                  <h3 className="text-gold andalusian-font fw-bold mb-1 fs-2">100%</h3>
                  <p className="text-white-50 mb-0">إتقان للتفاصيل</p>
                </div>
                <div className="col-6 col-sm-4">
                  <h3 className="text-gold andalusian-font fw-bold mb-1 fs-2">+10</h3>
                  <p className="text-white-50 mb-0">سنوات من الخبرة</p>
                </div>
                <div className="col-12 col-sm-4">
                  <h3 className="text-gold andalusian-font fw-bold mb-1 fs-2">أصالة</h3>
                  <p className="text-white-50 mb-0">مغربية خالصة</p>
                </div>
              </div>
            </div>

            {/* 2. جانب الصورة التوضيحية (اليسار) */}
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <div className="luxury-border w-100" style={{ maxWidth: '480px', height: '520px', position: 'relative' }}>
                <Image
                  src="/images/weddingCouple.jpg" // يمكنك استبدالها بصورة لعروس مغربية أو تفصيل ديكور
                  alt="الفخامة المغربية الأصيلة"
                  fill
                  style={{ objectFit: 'cover', borderRadius: '10px' }}
                  className="img-fluid"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}