"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function ServiceCard({ id, title, description, image, icon }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <Link 
        href={`/services/${id || '1'}`} 
        className="text-decoration-none d-block h-100"
      >
        <div 
          className={`card h-100 border-0 position-relative overflow-hidden ${isHovered ? 'shadow-lg' : 'shadow-sm'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ 
            borderRadius: '15px', 
            cursor: 'pointer',
            transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}
        >
          
          {/* قسم الصورة */}
          <div className="position-relative overflow-hidden" style={{ height: '220px', width: '100%' }}>
            <img 
              src={image} 
              alt={title} 
              className="w-100 h-100 object-fit-cover"
              style={{
                transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                transition: 'transform 0.4s ease'
              }}
            />
            <div 
              className="position-absolute top-0 start-0 w-100 h-100" 
              style={{ 
                backgroundColor: isHovered ? 'rgba(94, 23, 119, 0.05)' : 'rgba(94, 23, 119, 0.15)',
                transition: 'background-color 0.3s ease'
              }}
            ></div>
            
            {/* أيقونة الخدمة */}
            <div 
              className="position-absolute bottom-0 start-50 translate-middle-x bg-white p-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{ 
                width: '60px', 
                height: '60px', 
                marginBottom: '-30px', 
                zIndex: '2', 
                border: isHovered ? '2px solid #5E1777' : '2px solid #D4AF37',
                boxShadow: isHovered ? '0 5px 15px rgba(94,23,119,0.2)' : '0 2px 5px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease'
              }}
            >
              <i className={`bi ${icon} fs-4`} style={{ color: '#5E1777' }}></i>
            </div>
          </div>

          {/* محتوى البطاقة */}
          <div className="card-body text-center pt-5 d-flex flex-column justify-content-between">
            <div>
              <h3 
                className="card-title h5 mb-3 fw-bold" 
                style={{ 
                  color: isHovered ? '#D4AF37' : '#5E1777',
                  transition: 'color 0.3s ease'
                }}
              >
                {title}
              </h3>
              <p className="card-text text-muted small px-2">
                {description}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}