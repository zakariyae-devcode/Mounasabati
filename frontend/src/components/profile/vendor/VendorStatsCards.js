"use client";

import React from 'react';

export default function VendorStatsCards({ stats }) {
  const data = stats || {
    totalRevenue: '45,000 DH',
    activeBookings: 8,
    totalServices: 4,
    rating: '4.9 ★'
  };

  return (
    <div className="row g-3 mb-4" dir="rtl">
      {/* الأرباح / المبيعات */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div 
          className="p-3 bg-white rounded-4 border-0 shadow-sm d-flex align-items-center justify-content-between"
          style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        >
          <div>
            <span className="d-block text-muted small">إجمالي المبيعات</span>
            <h4 className="fw-bold m-0 mt-1" style={{ color: '#5E1777' }}>{data.totalRevenue}</h4>
          </div>
          <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(94, 23, 119, 0.1)', color: '#5E1777' }}>
            <i className="bi bi-wallet2 fs-4" />
          </div>
        </div>
      </div>

      {/* الطلبات النشطة */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div 
          className="p-3 bg-white rounded-4 border-0 shadow-sm d-flex align-items-center justify-content-between"
          style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        >
          <div>
            <span className="d-block text-muted small">حجوزات قادمة</span>
            <h4 className="fw-bold m-0 mt-1" style={{ color: '#3D0B4F' }}>{data.activeBookings} طلبات</h4>
          </div>
          <div className="p-3 rounded-circle" style={{ backgroundColor: 'rgba(201, 162, 39, 0.15)', color: '#C9A227' }}>
            <i className="bi bi-calendar-event fs-4" />
          </div>
        </div>
      </div>

      {/* الخدمات النشطة */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div 
          className="p-3 bg-white rounded-4 border-0 shadow-sm d-flex align-items-center justify-content-between"
          style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        >
          <div>
            <span className="d-block text-muted small">الخدمات المعروضة</span>
            <h4 className="fw-bold m-0 mt-1" style={{ color: '#3D0B4F' }}>{data.totalServices} خدمات</h4>
          </div>
          <div className="p-3 rounded-circle bg-light text-secondary">
            <i className="bi bi-grid-3x3-gap fs-4" />
          </div>
        </div>
      </div>

      {/* التقييم العام */}
      <div className="col-12 col-sm-6 col-xl-3">
        <div 
          className="p-3 bg-white rounded-4 border-0 shadow-sm d-flex align-items-center justify-content-between"
          style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        >
          <div>
            <span className="d-block text-muted small">تقييم العملاء</span>
            <h4 className="fw-bold m-0 mt-1 text-success">{data.rating}</h4>
          </div>
          <div className="p-3 rounded-circle bg-success bg-opacity-10 text-success">
            <i className="bi bi-star-fill fs-4" />
          </div>
        </div>
      </div>
    </div>
  );
}