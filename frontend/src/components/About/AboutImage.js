'use client'
import React from 'react';
import Image from 'next/image';

export default function AboutImage() {
  return (
    <div className="d-flex justify-content-center w-100">
      <div className="luxury-border w-100" style={{ maxWidth: '480px', height: '520px', position: 'relative' }}>
        <Image
          src="/images/royal-hall-morocco.jpg" 
          alt="مميزات الفخامة المغربية"
          fill
          style={{ objectFit: 'cover', borderRadius: '10px' }}
          className="img-fluid"
          priority
        />
      </div>
    </div>
  );
}