"use client";

import React, { useState } from 'react';
import NotificationsDropdown from '../../Notification/NotificationsDropdown';
import LogoutButton from '../../Logout/LogoutButton';
import ChangePasswordModal from '../ChangePasswordModal';

export default function ClientHeroHeader({ profileData, onEditClick }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      {/* 1. شريط الأدوات العلوي: الإشعارات وتسجيل الخروج */}
      <div className="d-flex align-items-center justify-content-between mb-3 px-2" dir="rtl">
        <h4 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>لوحة التحكم</h4>
        
        <div className="d-flex align-items-center gap-3">
          <NotificationsDropdown />
          <LogoutButton />
        </div>
      </div>

      {/* 2. بطاقة الهيدر الرئيسية */}
      <div 
        className="card border-0 mb-4 overflow-hidden shadow-sm"
        style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        dir="rtl"
      >
        <div 
          style={{ 
            height: '160px', 
            background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)',
            position: 'relative'
          }}
        >
          <div className="position-absolute bottom-0 start-0 w-100 p-3 opacity-10 text-white text-start">
            <i className="bi bi-stars fs-1" />
          </div>
        </div>

        <div className="card-body p-4 pt-0 position-relative">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3" style={{ marginTop: '-60px' }}>
            
            {/* الصورة الشخصية */}
            <div 
              className="rounded-circle border border-4 border-white shadow overflow-hidden bg-white d-flex align-items-center justify-content-center"
              style={{ width: '120px', height: '120px', minWidth: '120px' }}
            >
              {profileData?.profile?.image ? (
                <img src={profileData.profile.image} alt={profileData.username} className="w-100 h-100 object-fit-cover" />
              ) : (
                <i className="bi bi-person-fill fs-1" style={{ color: '#5E1777' }} />
              )}
            </div>

            {/* الاسم والبيانات */}
            <div className="text-center text-md-start flex-grow-1">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <h3 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>{profileData?.username}</h3>
                <span className="badge px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(201, 162, 39, 0.15)', color: '#C9A227', border: '1px solid #C9A227' }}>
                  زبون مميز
                </span>
              </div>
              <p className="text-muted small mb-0">{profileData?.email} • {profileData?.profile?.city || 'Taourirt'}</p>
            </div>

            {/* أزرار الإجراءات السريعة */}
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <button 
                onClick={onEditClick}
                className="btn text-white px-3 py-2 fw-bold d-flex align-items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
              >
                <i className="bi bi-pencil-square" />
                <span>تعديل الحساب</span>
              </button>

              <button 
                onClick={() => setIsPasswordModalOpen(true)}
                className="btn btn-outline-secondary px-3 py-2 fw-bold d-flex align-items-center gap-2"
                style={{ borderRadius: '12px', borderColor: 'rgba(94, 23, 119, 0.2)', color: '#3D0B4F' }}
              >
                <i className="bi bi-key-fill text-warning" />
                <span>كلمة السر</span>
              </button>
            </div>

          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </>
  );
}