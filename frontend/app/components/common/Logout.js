"use client";

import React, { useState } from 'react';

export default function LogoutButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleLogout = () => {
    // مستقبلاً: حذف الـ Token وإعادة التوجيه لصفحة تسجيل الدخول
    alert("تم تسجيل الخروج بنجاح!");
    window.location.href = "/login";
  };

  return (
    <>
      {/* زر تسجيل الخروج */}
      <button 
        onClick={() => setShowConfirm(true)}
        className="btn btn-outline-danger d-flex align-items-center gap-2 px-3 py-2 fw-bold"
        style={{ borderRadius: '12px' }}
      >
        <i className="bi bi-box-arrow-right" />
        <span>تسجيل الخروج</span>
      </button>

      {/* مودال التأكيد الشفاف */}
      {showConfirm && (
        <div 
          className="modal fade show d-block" 
          tabIndex="-1" 
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(3px)' }}
        >
          <div className="modal-dialog modal-dialog-centered" dir="rtl">
            <div className="modal-content border-0 p-3 shadow-lg" style={{ borderRadius: '20px', backgroundColor: '#FCFBF7' }}>
              <div className="modal-body text-center py-4">
                <i className="bi bi-exclamation-circle text-warning fs-1 mb-3 d-block" />
                <h5 className="fw-bold mb-2" style={{ color: '#3D0B4F' }}>تأكيد تسجيل الخروج</h5>
                <p className="text-muted small mb-4">هل أنت تأكد من أنك تريد مغادرة حسابك في منصة مناسباتي؟</p>
                <div className="d-flex justify-content-center gap-2">
                  <button onClick={handleLogout} className="btn btn-danger px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                    نعم، تسجيل الخروج
                  </button>
                  <button onClick={() => setShowConfirm(false)} className="btn btn-light border px-4 py-2 fw-bold" style={{ borderRadius: '10px' }}>
                    إلغاء
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}