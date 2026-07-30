"use client";

import React from 'react';

export default function ClientCountdownCard({ eventDetails }) {
  const event = eventDetails || {
    title: 'حفل زفاف ملوكي',
    location: 'قاعة الأفراح الملكية - تاوريرت',
    date: '15 أغسطس 2026',
    days: 16,
    hours: 8,
    minutes: 45,
    seconds: 12
  };

  return (
    <div 
      className="card border-0 p-4 shadow-sm mb-4 text-white position-relative overflow-hidden"
      style={{ 
        borderRadius: '24px', 
        background: 'linear-gradient(135deg, #3D0B4F 0%, #5E1777 100%)' 
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-3">
        <span className="badge px-3 py-2" style={{ backgroundColor: '#C9A227', color: '#3D0B4F', fontWeight: 'bold' }}>
          المناسبة القادمة
        </span>
        <span className="small text-white-50">تاريخ الحفل: {event.date}</span>
      </div>

      <h4 className="fw-bold mb-1" style={{ color: '#C9A227' }}>{event.title}</h4>
      <p className="small text-white-50 mb-4">{event.location}</p>

      {/* العداد التنازلي */}
      <div className="row g-2 text-center">
        <div className="col-3">
          <div className="p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <span className="d-block fs-4 fw-bold text-white">{event.days}</span>
            <span className="small text-white-50" style={{ fontSize: '0.7rem' }}>يوم</span>
          </div>
        </div>
        <div className="col-3">
          <div className="p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <span className="d-block fs-4 fw-bold text-white">{event.hours}</span>
            <span className="small text-white-50" style={{ fontSize: '0.7rem' }}>ساعة</span>
          </div>
        </div>
        <div className="col-3">
          <div className="p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <span className="d-block fs-4 fw-bold text-white">{event.minutes}</span>
            <span className="small text-white-50" style={{ fontSize: '0.7rem' }}>دقيقة</span>
          </div>
        </div>
        <div className="col-3">
          <div className="p-2 rounded-3" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
            <span className="d-block fs-4 fw-bold text-white">{event.seconds}</span>
            <span className="small text-white-50" style={{ fontSize: '0.7rem' }}>ثانية</span>
          </div>
        </div>
      </div>
    </div>
  );
}