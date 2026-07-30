"use client";

import React from 'react';

export default function VendorServicesList({ services, onAddService }) {
  const serviceItems = services || [
    { id: 1, name: 'قاعة الاحتفالات الكبرى (تتسع لـ 400 شخص)', category: 'قاعات أفراح', price: '15,000 DH', active: true },
    { id: 2, name: 'خدمة التموين الملوكي (Catering 20 طاولة)', category: 'تموين', price: '22,000 DH', active: true },
    { id: 3, name: 'تزيين وتنسيق ورود هولندية', category: 'ديكور', price: '4,500 DH', active: false },
  ];

  return (
    <div 
      className="card border-0 p-4 shadow-sm mb-4"
      style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
      dir="rtl"
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h5 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>الخدمات والعروض</h5>
          <span className="text-muted small">إدارة الكتالوج الظاهر للزبائن</span>
        </div>
        <button 
          onClick={onAddService}
          className="btn text-white px-3 py-2 fw-bold d-flex align-items-center gap-2"
          style={{ backgroundColor: '#C9A227', borderRadius: '12px' }}
        >
          <i className="bi bi-plus-lg" />
          <span>إضافة خدمة جديدة</span>
        </button>
      </div>

      <div className="row g-3">
        {serviceItems.map((item) => (
          <div key={item.id} className="col-12">
            <div 
              className="p-3 rounded-3 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3"
              style={{ backgroundColor: '#FCFBF7', border: '1px solid rgba(94, 23, 119, 0.08)' }}
            >
              <div>
                <div className="d-flex align-items-center gap-2 mb-1">
                  <h6 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>{item.name}</h6>
                  <span className={`badge ${item.active ? 'bg-success' : 'bg-secondary'}`}>
                    {item.active ? 'نشط' : 'موقوف'}
                  </span>
                </div>
                <span className="text-muted small">{item.category}</span>
              </div>

              <div className="d-flex align-items-center gap-3 ms-md-auto">
                <span className="fw-bold fs-5" style={{ color: '#5E1777' }}>{item.price}</span>
                <button className="btn btn-sm btn-outline-secondary rounded-2">
                  <i className="bi bi-pencil" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}