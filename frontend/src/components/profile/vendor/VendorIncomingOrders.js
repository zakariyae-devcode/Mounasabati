"use client";

import React from 'react';

export default function VendorIncomingOrders({ orders }) {
  const orderList = orders || [
    { id: 101, clientName: 'محمد أمين', service: 'قاعة الاحتفالات الكبرى', date: '2026-09-02', phone: '0661223344', status: 'pending' },
    { id: 102, clientName: 'فاطمة الزهراء', service: 'خدمة التموين الملوكي', date: '2026-08-20', phone: '0655443322', status: 'accepted' },
  ];

  return (
    <div 
      className="card border-0 p-4 shadow-sm"
      style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
      dir="rtl"
    >
      <h5 className="fw-bold mb-4" style={{ color: '#3D0B4F' }}>طلبات الحجز الواردة</h5>

      <div className="table-responsive">
        <table className="table table-borderless align-middle m-0">
          <thead>
            <tr className="border-bottom text-muted small">
              <th>اسم الزبون</th>
              <th>الخدمة المطلوبة</th>
              <th>تاريخ المناسبة</th>
              <th>رقم التواصل</th>
              <th>الإجراء</th>
            </tr>
          </thead>
          <tbody>
            {orderList.map((order) => (
              <tr key={order.id} className="border-bottom">
                <td className="fw-bold" style={{ color: '#3D0B4F' }}>{order.clientName}</td>
                <td className="small">{order.service}</td>
                <td className="small text-muted">{order.date}</td>
                <td className="small fw-bold">{order.phone}</td>
                <td>
                  {order.status === 'pending' ? (
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-success px-3 rounded-2">قبول</button>
                      <button className="btn btn-sm btn-outline-danger px-2 rounded-2">رفض</button>
                    </div>
                  ) : (
                    <span className="badge bg-success px-2 py-1">مقبول</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}