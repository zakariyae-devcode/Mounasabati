// 1. أضف هذا السطر في أول ليدل على أنه Client Component
"use client"; 

import React from 'react';
import Link from 'next/link';

export default function ServiceCard({ title, description, image, icon }) {
  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm border-0 position-relative overflow-hidden" style={{ borderRadius: '15px' }}>
        {/* الصورة الخلفية للخدمة */}
        <div className="position-relative" style={{ height: '220px', width: '100%' }}>
          <img 
            src={image} 
            alt={title} 
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{ backgroundColor: 'rgba(94, 23, 119, 0.2)' }}></div>
          
          {/* أيقونة الخدمة */}
          <div 
            className="position-absolute bottom-0 start-50 translate-middle-x bg-white p-3 rounded-circle shadow-sm d-flex align-items-center justify-content-center"
            style={{ width: '60px', height: '60px', marginBottom: '-30px', zIndex: '2', border: '2px solid #D4AF37' }}
          >
            <i className={`bi ${icon} fs-4`} style={{ color: '#5E1777' }}></i>
          </div>
        </div>

        {/* محتوى البطاقة */}
        <div className="card-body text-center pt-5 d-flex flex-column justify-content-between">
          <div>
            <h3 className="card-title h5 mb-3" style={{ color: '#5E1777', fontWeight: 'bold' }}>
              {title}
            </h3>
            <p className="card-text text-muted small px-2">
              {description}
            </p>
          </div>
          
          {/* زر طلب حجز الموعد */}
          <div className="mt-4">
            <Link 
              href="/booking" 
              className="btn w-100 py-2 text-white"
              style={{ 
                backgroundColor: '#5E1777', 
                border: '1px solid #D4AF37',
                borderRadius: '8px',
                transition: '0.3s'
              }}
              onMouseEnter={(e) => { e.target.style.backgroundColor = '#D4AF37'; e.target.style.color = '#5E1777'; }}
              onMouseLeave={(e) => { e.target.style.backgroundColor = '#5E1777'; e.target.style.color = 'white'; }}
            >
              طلب حجز موعد
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}