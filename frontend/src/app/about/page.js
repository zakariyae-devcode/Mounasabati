'use client'
import React from 'react';

import AboutHeader from '../components/About/AboutHeader';
import FeaturesList from '../components/About/FeaturesList';
import AboutImage from '../components/About/AboutImage';


export default function page() {
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
          background-color: #1a0933 !important;
        }
        .luxury-border {
          border: 2px solid #d4af37;
          border-radius: 15px;
          padding: 10px;
          position: relative;
        }
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

      <section id="features" dir="rtl" className="bg-royal-purple py-5 position-relative overflow-hidden">
        {/* خلفية الزخرفة */}
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
            
            {/* الجانب الأيمن: النصوص والمميزات */}
            <div className="col-12 col-lg-6">
              <AboutHeader />
              <FeaturesList />
            </div>

            {/* الجانب الأيسر: الصورة الفاخرة */}
            <div className="col-12 col-lg-6">
              <AboutImage />
            </div>

          </div>
        </div>
      </section>
    </>
  );
}