'use client'
import React from 'react';

export default function AboutHeader() {
  return (
    <div className="text-white text-end mb-4">
      <h5 className="text-gold andalusian-font mb-2 fs-4">مميزات منصتنا</h5>
      <h2 className="andalusian-font fw-bold mb-4" style={{ fontSize: '2.8rem', lineHeight: '1.3' }}>
        ما الذي يجعل مناستك معنا <span className="text-gold">تاريخية ولا تُنسى؟</span>
      </h2>
      <p className="fs-5 lh-lg text-white-50">
        نجمع بين عراقة التقاليد المغربية الضاربة في التاريخ وأرقى أساليب التنظيم العصرية لنوفر لك تجربة ملوكية متكاملة.
      </p>
    </div>
  );
}