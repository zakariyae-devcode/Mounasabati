"use client";

import React, { useState } from 'react';
// استدعاء مكوّن تغيير كلمة المرور الذي أنشأناه سابقاً
import ChangePasswordModal from '../ChangePasswordModal';
export default function VendorHeroHeader({ vendorData, onEditClick }) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

  return (
    <>
      <div 
        className="card border-0 mb-4 overflow-hidden shadow-sm"
        style={{ borderRadius: '24px', backgroundColor: 'rgba(251, 248, 242, 0.96)' }}
        dir="rtl"
      >
        <div 
          style={{ 
            height: '160px', 
            background: 'linear-gradient(135deg, #3D0B4F 0%, #C9A227 100%)',
            position: 'relative'
          }}
        >
          <div className="position-absolute bottom-0 start-0 w-100 p-3 opacity-15 text-white">
            <i className="bi bi-patch-check-fill fs-1" />
          </div>
        </div>

        <div className="card-body p-4 pt-0 position-relative">
          <div className="d-flex flex-column flex-md-row align-items-center align-items-md-end gap-3" style={{ marginTop: '-60px' }}>
            
            {/* الصورة الشخصية / الشعار */}
            <div 
              className="rounded-circle border border-4 border-white shadow overflow-hidden bg-white d-flex align-items-center justify-content-center"
              style={{ width: '120px', height: '120px', minWidth: '120px' }}
            >
              {vendorData?.profile?.image ? (
                <img src={vendorData.profile.image} alt={vendorData.businessName} className="w-100 h-100 object-fit-cover" />
              ) : (
                <i className="bi bi-building fs-1" style={{ color: '#5E1777' }} />
              )}
            </div>

            {/* تفاصيل الهوية التجاري */}
            <div className="text-center text-md-start flex-grow-1">
              <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2">
                <h3 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>
                  {vendorData?.businessName || 'تموين وقاعات الملكية'}
                </h3>
                <i className="bi bi-patch-check-fill text-primary fs-5" title="حساب موثق" />
              </div>
              <p className="text-muted small mb-0">
                {vendorData?.category || 'تموين وأفراح'} • {vendorData?.profile?.city || 'Taourirt'} • CIN: {vendorData?.cin}
              </p>
            </div>

            {/* أزرار الإجراءات السريعة (تعديل + تغيير كلمة السر) */}
            <div className="d-flex gap-2 mt-3 mt-md-0">
              <button 
                onClick={onEditClick}
                className="btn text-white px-3 py-2 fw-bold d-flex align-items-center gap-2"
                style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
              >
                <i className="bi bi-gear-fill" />
                <span>إعدادات المتجر</span>
              </button>

              {/* زر تغيير كلمة السر الخاص بمزود الخدمة */}
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

      {/* مودال تغيير كلمة المرور */}
      <ChangePasswordModal 
        isOpen={isPasswordModalOpen} 
        onClose={() => setIsPasswordModalOpen(false)} 
      />
    </>
  );
}