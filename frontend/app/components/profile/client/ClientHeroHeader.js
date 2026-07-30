"use client";

import React from 'react';

export default function ClientHeroHeader({ profileData, onEditClick }) {
  return (
    <div 
      className="card border-0 mb-4 overflow-hidden shadow-sm"
      style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
    >
      {/* خلفية غلاف أندلسية */}
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

          {/* معلومات الهوية */}
          <div className="text-center text-md-start flex-grow-1">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
              <h3 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>{profileData?.username}</h3>
              <span className="badge px-3 py-1 rounded-pill" style={{ backgroundColor: 'rgba(201, 162, 39, 0.15)', color: '#C9A227', border: '1px solid #C9A227' }}>
                زبون مميز
              </span>
            </div>
            <p className="text-muted small mb-0">{profileData?.email} • {profileData?.profile?.city || 'Taourirt'}</p>
          </div>

          {/* زر تعديل الملف */}
          <button 
            onClick={onEditClick}
            className="btn text-white px-4 py-2 fw-bold d-flex align-items-center gap-2 mt-3 mt-md-0"
            style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
          >
            <i className="bi bi-pencil-square" />
            <span>تعديل بيانات الحساب</span>
          </button>

        </div>
      </div>
    </div>
  );
}