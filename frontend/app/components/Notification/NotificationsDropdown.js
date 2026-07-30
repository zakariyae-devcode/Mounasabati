"use client";

import React, { useState } from 'react';

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'تأكيد حجز', message: 'تم تأكيد حجز قاعة الأفراح الملكية', time: 'منذ 10 دقائق', unread: true },
    { id: 2, title: 'رسالة جديدة', message: 'أرسل لك المزود تفاصيل قائمة الطعام', time: 'منذ ساعتين', unread: true },
    { id: 3, title: 'تذكير بالمناسبة', message: 'متبقي 16 يوماً على موعد الحفل', time: 'منذ يوم', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  return (
    <div className="dropdown position-relative" dir="rtl">
      {/* زر الأيقونة مع ضبط التموضع بدقة فوق الجرس */}
      <button 
        className="btn border-0 p-2 d-inline-flex align-items-center justify-content-center shadow-none" 
        type="button" 
        data-bs-toggle="dropdown" 
        aria-expanded="false"
        style={{ color: '#3D0B4F' }}
      >
        <div className="position-relative d-inline-block">
          <i className="bi bi-bell-fill fs-5 d-block" />
          
          {unreadCount > 0 && (
            <span 
              className="position-absolute badge rounded-circle bg-danger border border-2 border-white d-flex align-items-center justify-content-center"
              style={{ 
                top: '-5px', 
                right: '-8px', 
                width: '18px', 
                height: '18px', 
                fontSize: '0.65rem',
                padding: 0
              }}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </button>

      {/* قائمة الإشعارات المنزلقة */}
      <div 
        className="dropdown-menu dropdown-menu-end p-0 shadow-lg border-0 mt-2" 
        style={{ width: '320px', borderRadius: '16px', backgroundColor: '#FCFBF7', overflow: 'hidden' }}
      >
        <div className="p-3 border-bottom d-flex justify-content-between align-items-center" style={{ backgroundColor: 'rgba(94, 23, 119, 0.05)' }}>
          <h6 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>الإشعارات</h6>
          {unreadCount > 0 && (
            <button onClick={markAllAsRead} className="btn p-0 border-0 text-decoration-none small fw-bold" style={{ color: '#C9A227', fontSize: '0.75rem' }}>
              تحديد الكل كمقروء
            </button>
          )}
        </div>

        <div className="custom-scroll" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {notifications.length > 0 ? (
            notifications.map((item) => (
              <div 
                key={item.id} 
                className={`p-3 border-bottom d-flex align-items-start gap-2 ${item.unread ? 'bg-white' : 'opacity-75'}`}
              >
                <div className={`mt-1 rounded-circle p-1 ${item.unread ? 'bg-warning text-dark' : 'bg-light text-muted'}`} style={{ width: '8px', height: '8px' }} />
                <div className="flex-grow-1">
                  <h6 className="fw-bold mb-1 small" style={{ color: '#3D0B4F' }}>{item.title}</h6>
                  <p className="text-muted mb-1" style={{ fontSize: '0.8rem', lineHeight: '1.2' }}>{item.message}</p>
                  <span className="text-muted d-block" style={{ fontSize: '0.7rem' }}>{item.time}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-muted small">لا توجد إشعارات حالياً</div>
          )}
        </div>
      </div>
    </div>
  );
}