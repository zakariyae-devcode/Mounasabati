"use client";

import React from 'react';
import Link from 'next/link';

export default function ClientBookingsTable({ bookings }) {
  // بيانات افتراضية إذا لم يتم تمريرها
  const bookingsList = bookings || [
    { id: 1, service: 'تنسيق زفاف كامل', vendor: 'تموين الأفراح المغربية', date: '2026-08-15', status: 'pending', statusText: 'قيد التأكيد', price: '18,000 DH' },
    { id: 2, service: 'حجز قاعة الاحتفالات', vendor: 'قاعة القصر الذهبي', date: '2026-05-10', status: 'completed', statusText: 'مكتمل', price: '12,000 DH' },
  ];

  return (
    <div 
      className="card border-0 p-4 shadow-sm"
      style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>سجل الحجوزات والخدمات</h5>
        <Link href="/booking" className="small text-decoration-none fw-bold" style={{ color: '#C9A227' }}>
          + حجز مناسبة جديدة
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-borderless align-middle m-0">
          <thead>
            <tr className="border-bottom text-muted small">
              <th>نوع الخدمة</th>
              <th>المزود</th>
              <th>التاريخ</th>
              <th>الحالة</th>
              <th className="text-end">التكلفة</th>
            </tr>
          </thead>
          <tbody>
            {bookingsList.map((item) => (
              <tr key={item.id} className="border-bottom">
                <td className="fw-bold" style={{ color: '#3D0B4F' }}>{item.service}</td>
                <td className="small">{item.vendor}</td>
                <td className="small text-muted">{item.date}</td>
                <td>
                  <span className={`badge px-2 py-1 ${item.status === 'completed' ? 'bg-success' : 'bg-warning text-dark'}`}>
                    {item.statusText}
                  </span>
                </td>
                <td className="fw-bold text-end" style={{ color: '#5E1777' }}>{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}