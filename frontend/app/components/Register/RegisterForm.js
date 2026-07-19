"use client";

import React, { useState, useRef } from 'react';
import Link from 'next/link';

export default function RegisterForm() {
  const fileInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    cin: '',
    role: 'client', // القيمة الافتراضية بناءً على الـ Model
    phone: '',
    city: 'Taourirt', // القيمة الافتراضية في الـ Model
    image: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    // 1. التحقق من اسم المستخدم
    if (!formData.username.trim()) validationErrors.username = 'يرجى إدخال اسم المستخدم.';
    
    // 2. التحقق من البريد الإلكتروني
    if (!formData.email.trim()) {
      validationErrors.email = 'يرجى إدخال البريد الإلكتروني.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'البريد الإلكتروني غير صالح.';
    }

    // 3. التحقق من كلمة المرور
    if (!formData.password) validationErrors.password = 'يرجى كتابة كلمة مرور قوية.';

    // 4. التحقق من الـ CIN بناءً على الـ Django Regex (مثال: BK123456 أو OD123456)
    const cinRegex = /^[A-Z]{1,2}[0-9]{6,7}$/;
    if (!formData.cin.trim()) {
      validationErrors.cin = 'يرجى إدخال رقم بطاقة التعريف الوطنية (CIN).';
    } else if (!cinRegex.test(formData.cin.trim())) {
      validationErrors.cin = 'صيغة الـ CIN غير صحيحة (مثال: AB123456).';
    }

    // 5. التحقق من الهاتف
    if (!formData.phone.trim()) validationErrors.phone = 'يرجى إدخال رقم الهاتف للتواصل.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // محاكاة الإرسال (هنا ستستخدم لاحقاً FormData لإرسال النص والصورة إلى دجانغو عبر الـ API)
    setTimeout(() => {
      setLoading(false);
      alert('تم تقديم طلب الانضمام بنجاح! مرحباً بك في عالم الفخامة.');
    }, 1500);
  };

  return (
    <div 
      className="card border-0 p-4 p-sm-5 text-start w-100 shadow-lg" 
      style={{ 
        maxWidth: '680px', 
        backgroundColor: 'rgba(251, 248, 242, 0.96)', 
        borderRadius: '24px',
        boxShadow: '0 40px 90px -30px rgba(61, 11, 79, 0.25)'
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        
        {/* الهيدر الرئيسي للبطاقة */}
        <div className="text-center mb-4">
          <span className="d-block text-uppercase fw-bold mb-1" style={{ color: '#C9A227', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            REGISTRATION PORTAL
          </span>
          <h2 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>طلب انضمام للمنصة الملوكية</h2>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <span className="p-1 rounded-circle" style={{ background: '#C9A227', boxShadow: '0 0 8px 1px #C9A227' }} />
          </div>
        </div>

        {/* قسم رفع الصورة الشخصية للـ Profile */}
        <div className="text-center mb-4">
          <div 
            className="position-relative d-inline-block rounded-circle border"
            style={{ 
              width: '100px', 
              height: '100px', 
              backgroundColor: '#fff', 
              cursor: 'pointer',
              overflow: 'hidden',
              borderColor: 'rgba(94, 23, 119, 0.15)'
            }}
            onClick={() => fileInputRef.current.click()}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="w-100 h-100 object-fit-cover" />
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted">
                <i className="bi bi-camera fs-3 style={{ color: '#8A7F91' }}" />
                <span style={{ fontSize: '0.65rem' }}>صورة الملف</span>
              </div>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="d-none" 
            accept="image/*" 
            onChange={handleImageChange} 
          />
        </div>

        <div className="row g-3">
          
          {/* اسم المستخدم */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>اسم المستخدم (Username)</label>
            <div className="input-group" style={errors.username ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-person" /></span>
              <input type="text" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="username" value={formData.username} onChange={handleChange} placeholder="Ziko_dev" />
            </div>
            {errors.username && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.username}</div>}
          </div>

          {/* البريد الإلكتروني */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>البريد الإلكتروني</label>
            <div className="input-group" style={errors.email ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-envelope" /></span>
              <input type="email" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-start" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="email" value={formData.email} onChange={handleChange} placeholder="example@domain.com" />
            </div>
            {errors.email && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.email}</div>}
          </div>

          {/* رقم بطاقة التعريف الوطنية المغربية CIN */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>رقم بطاقة التعريف الوطنية (CIN)</label>
            <div className="input-group" style={errors.cin ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-card-text" /></span>
              <input type="text" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-uppercase" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="cin" value={formData.cin} onChange={handleChange} placeholder="F123456" />
            </div>
            {errors.cin && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.cin}</div>}
          </div>

          {/* رقم الهاتف */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>رقم الهاتف للاتصال</label>
            <div className="input-group" style={errors.phone ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-telephone" /></span>
              <input type="tel" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-start" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="phone" value={formData.phone} onChange={handleChange} placeholder="06XXXXXXXX" />
            </div>
            {errors.phone && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.phone}</div>}
          </div>

          {/* كلمة المرور */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>كلمة المرور</label>
            <div className="input-group" style={errors.password ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-lock" /></span>
              <input type="password" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-start" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
            </div>
            {errors.password && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.password}</div>}
          </div>

          {/* اختيار المدينة الافتراضية وإمكانية تغييرها */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>المدينة</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-geo-alt" /></span>
              <input type="text" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="city" value={formData.city} onChange={handleChange} placeholder="Taourirt" />
            </div>
          </div>

          {/* نوع الحساب (Role Choice بناءً على TextChoices الخاصة بالـ Django model) */}
          <div className="col-12">
            <label className="form-label small fw-bold d-block mb-2" style={{ color: '#5E1777' }}>نوع الحساب (صفتكم الموقرة)</label>
            <div className="d-flex gap-3">
              <div 
                className="p-3 border rounded-3 flex-fill text-center user-select-none transition-all"
                style={{
                  cursor: 'pointer',
                  backgroundColor: formData.role === 'client' ? '#ffffff' : '#FCFBF7',
                  borderColor: formData.role === 'client' ? '#C9A227' : 'rgba(94, 23, 119, 0.08)',
                  boxShadow: formData.role === 'client' ? '0 8px 20px -8px rgba(201, 162, 39, 0.25)' : 'none'
                }}
                onClick={() => setFormData(prev => ({ ...prev, role: 'client' }))}
              >
                <i className="bi bi-person-heart d-block fs-4 mb-1" style={{ color: formData.role === 'client' ? '#5E1777' : '#8A7F91' }} />
                <span className="small fw-bold">زبون (حجز وتنسيق)</span>
              </div>

              <div 
                className="p-3 border rounded-3 flex-fill text-center user-select-none transition-all"
                style={{
                  cursor: 'pointer',
                  backgroundColor: formData.role === 'vendor' ? '#ffffff' : '#FCFBF7',
                  borderColor: formData.role === 'vendor' ? '#C9A227' : 'rgba(94, 23, 119, 0.08)',
                  boxShadow: formData.role === 'vendor' ? '0 8px 20px -8px rgba(201, 162, 39, 0.25)' : 'none'
                }}
                onClick={() => setFormData(prev => ({ ...prev, role: 'vendor' }))}
              >
                <i className="bi bi-shop d-block fs-4 mb-1" style={{ color: formData.role === 'vendor' ? '#5E1777' : '#8A7F91' }} />
                <span className="small fw-bold">مزود خدمات (قاعات، تموين...)</span>
              </div>
            </div>
          </div>

        </div>

        {/* زر التقديم */}
        <button
          type="submit"
          className="btn w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 border-0 mt-4"
          style={{ 
            background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', 
            borderRadius: '14px',
            boxShadow: '0 15px 35px -10px rgba(94, 23, 119, 0.4)'
          }}
          disabled={loading}
        >
          {loading ? (
            <div className="spinner-border spinner-border-sm text-light" role="status" />
          ) : (
            <>
              <span>إنشاء العضوية الملوكية</span>
              <i className="bi bi-person-plus-fill fs-5" />
            </>
          )}
        </button>

        {/* رابط تسجيل الدخول إن كان الحساب موجوداً بالفعل */}
        <div className="text-center mt-4 pt-1">
          <span className="small text-muted">لديك حساب بالفعل؟ </span>
          <Link href="/login" className="text-decoration-none small fw-bold" style={{ color: '#5E1777' }}>
            تسجيل الدخول مباشرة
          </Link>
        </div>

      </form>
    </div>
  );
}