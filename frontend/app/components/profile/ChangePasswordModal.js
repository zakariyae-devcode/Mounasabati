"use client";

import React, { useState } from 'react';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert("كلمات المرور الجديدة غير متطابقة!");
      return;
    }
    // هنا سيتم الربط مع Django API لتحديث كلمة المرور
    alert("تم تغيير كلمة المرور بنجاح!");
    onClose();
  };

  return (
    <div 
      className="modal fade show d-block" 
      tabIndex="-1" 
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)', backdropFilter: 'blur(4px)' }}
    >
      <div className="modal-dialog modal-dialog-centered" dir="rtl">
        <div 
          className="modal-content border-0 p-3 shadow-lg" 
          style={{ borderRadius: '24px', backgroundColor: '#FCFBF7' }}
        >
          {/* رأس النافذة */}
          <div className="modal-header border-0 pb-0">
            <h5 className="modal-title fw-bold" style={{ color: '#3D0B4F' }}>
              <i className="bi bi-shield-lock me-2" style={{ color: '#C9A227' }} />
              تغيير كلمة المرور
            </h5>
            <button 
              type="button" 
              className="btn-close ms-0 me-auto" 
              onClick={onClose}
            />
          </div>

          {/* نموذج الإدخال */}
          <form onSubmit={handleSubmit} className="modal-body space-y-3 pt-4">
            
            {/* كلمة المرور الحالية */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">كلمة المرور الحالية</label>
              <input 
                type="password" 
                className="form-control py-2"
                style={{ borderRadius: '12px', borderColor: 'rgba(94, 23, 119, 0.2)' }}
                value={formData.oldPassword}
                onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                required
              />
            </div>

            {/* كلمة المرور الجديدة */}
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted">كلمة المرور الجديدة</label>
              <input 
                type="password" 
                className="form-control py-2"
                style={{ borderRadius: '12px', borderColor: 'rgba(94, 23, 119, 0.2)' }}
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                required
              />
            </div>

            {/* تأكيد كلمة المرور الجديدة */}
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted">تأكيد كلمة المرور الجديدة</label>
              <input 
                type="password" 
                className="form-control py-2"
                style={{ borderRadius: '12px', borderColor: 'rgba(94, 23, 119, 0.2)' }}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                required
              />
            </div>

            {/* أزرار التحكم */}
            <div className="d-flex gap-2">
              <button 
                type="submit" 
                className="btn text-white w-100 py-2 fw-bold"
                style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
              >
                حفظ التغييرات
              </button>
              <button 
                type="button" 
                className="btn btn-light w-100 py-2 fw-bold border"
                style={{ borderRadius: '12px' }}
                onClick={onClose}
              >
                إلغاء
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}