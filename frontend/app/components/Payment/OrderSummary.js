// src/components/Payment/OrderSummary.jsx
import React from 'react';

export default function OrderSummary({ amount = 4500 }) {
  const basePrice = amount - 500; // محاكاة الحسابات

  return (
    <div className="card border-0 p-4 shadow-sm h-100" style={{ backgroundColor: '#FBF8F2', borderRadius: '16px' }}>
      <h5 className="fw-bold mb-4" style={{ color: '#3D0B4F' }}>ملخص الحجز الفاخر</h5>
      
      {/* تفاصيل الخدمة */}
      <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom border-2 border-white">
        <div className="bg-white rounded-3 p-2 border d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
          <i className="bi bi-balloon-heart-fill fs-3" style={{ color: '#C9A227' }}></i>
        </div>
        <div>
          <h6 className="m-0 fw-bold text-dark">تنظيم قاعة الأعراس الملكية</h6>
          <small className="text-muted d-block mt-1">رقم الحجز المرتبط: #BKG-2026-89A</small>
        </div>
      </div>

      {/* الحسابات المالية */}
      <div className="d-flex flex-column gap-3 mb-4 fs-6">
        <div className="d-flex justify-content-between text-secondary">
          <span>تكلفة الخدمة الأساسية:</span>
          <span>{basePrice.toFixed(2)} درهم</span>
        </div>
        <div className="d-flex justify-content-between text-secondary">
          <span>الرسوم والتنسيق الإضافي:</span>
          <span>500.00 درهم</span>
        </div>
        <hr className="my-1 border-secondary opacity-10" />
        <div className="d-flex justify-content-between align-items-center fw-bold">
          <span style={{ color: '#3D0B4F' }}>المبلغ الإجمالي المطلوب:</span>
          <span className="fs-4 text-dark">{amount.toFixed(2)} درهم</span>
        </div>
      </div>

      <div className="mt-auto p-3 bg-white bg-opacity-50 rounded-3 border border-white text-center">
        <small className="text-muted d-block" style={{ fontSize: '0.8rem' }}>
          <i className="bi bi-info-circle-fill me-1 text-primary"></i>
          بمجرد إتمام الدفع، سيتم إصدار رقم المعاملة الفريد وحفظه في حسابك.
        </small>
      </div>
    </div>
  );
}