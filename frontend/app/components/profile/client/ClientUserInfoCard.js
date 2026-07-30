"use client";

import React, { useState } from 'react';
import ChangePasswordModal from '../ChangePasswordModal';

export default function ClientUserInfoCard({ profileData, totalBookings = 2 }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div 
        className="card border-0 p-4 shadow-sm h-100"
        style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
      >
        <h5 className="fw-bold mb-4" style={{ color: '#3D0B4F' }}>بيانات العضوية</h5>

        <div className="d-flex flex-column gap-3">
          <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: '#FCFBF7', border: '1px solid rgba(94, 23, 119, 0.08)' }}>
            <span className="small text-muted"><i className="bi bi-card-text me-2" />رقم CIN:</span>
            <span className="fw-bold" style={{ color: '#5E1777' }}>{profileData?.cin}</span>
          </div>

          <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: '#FCFBF7', border: '1px solid rgba(94, 23, 119, 0.08)' }}>
            <span className="small text-muted"><i className="bi bi-telephone me-2" />رقم الهاتف:</span>
            <span className="fw-bold" style={{ color: '#3D0B4F' }}>{profileData?.profile?.phone || 'غير مدخل'}</span>
          </div>

          <div className="d-flex align-items-center justify-content-between p-3 rounded-3" style={{ backgroundColor: '#FCFBF7', border: '1px solid rgba(94, 23, 119, 0.08)' }}>
            <span className="small text-muted"><i className="bi bi-geo-alt me-2" />العنوان الكامل:</span>
            <span className="small fw-bold text-end" style={{ color: '#3D0B4F' }}>
              {profileData?.profile?.address}، {profileData?.profile?.city}
            </span>
          </div>
        </div>

        {/* زر تغيير كلمة المرور الأمني */}
        <button 
          onClick={() => setIsPasswordModalOpen(true)}
          className="btn btn-outline-secondary w-100 mt-3 py-2 fw-bold d-flex align-items-center justify-content-center gap-2"
          style={{ borderRadius: '12px', borderColor: 'rgba(94, 23, 119, 0.2)', color: '#3D0B4F' }}
        >
          <i className="bi bi-key-fill text-warning" />
          <span>تغيير كلمة المرور</span>
        </button>

        {/* بطاقة إجمالي الحجوزات */}
        <div className="mt-4 p-3 rounded-3 text-white" style={{ background: 'linear-gradient(135deg, #C9A227 0%, #A6821E 100%)' }}>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="d-block small text-white-50">إجمالي الحجوزات النشطة</span>
              <h4 className="fw-bold m-0 text-white">{totalBookings} مناسبات</h4>
            </div>
            <i className="bi bi-calendar-check fs-1 text-white-50" />
          </div>
        </div>
      </div>

      {/* المودال الشفاف الخاص بتغيير كلمة المرور */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </>
  );
}