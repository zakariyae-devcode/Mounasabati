"use client";

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};

    if (!formData.email.trim()) {
      validationErrors.email = 'يرجى إدخال البريد الإلكتروني العضوية.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'حساب البريد الإلكتروني غير صحيح.';
    }
    
    if (!formData.password) {
      validationErrors.password = 'يرجى إدخال كلمة المرور الخاصة بك.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // هنا تضع منطق الـ Authentication الخاص بك لاحقاً (مثل Auth.js / NextAuth أو API)
    setTimeout(() => {
      setLoading(false);
      alert('مرحباً بعودتكم إلى الفخامة الملوكية!');
    }, 1200);
  };

  return (
    <div 
      className="card border-0 p-4 p-sm-5 text-start w-100" 
      style={{ 
        maxWidth: '460px', 
        backgroundColor: 'rgba(251, 248, 242, 0.96)', 
        borderRadius: '24px',
        boxShadow: '0 40px 90px -30px rgba(61, 11, 79, 0.25)'
      }}
    >
      <form onSubmit={handleSubmit} noValidate>
        
        {/* الهيدر المصغر للبطاقة */}
        <div className="text-center mb-4">
          <span className="d-block text-uppercase fw-bold mb-1" style={{ color: '#C9A227', fontSize: '0.65rem', letterSpacing: '0.2em' }}>
            WELCOME BACK
          </span>
          <h3 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>بوابة الأعضاء الكرام</h3>
          <div className="d-flex align-items-center justify-content-center mt-2">
            <span className="p-1 rounded-circle" style={{ background: '#C9A227', boxShadow: '0 0 8px 1px #C9A227' }} />
          </div>
        </div>

        {/* حقل البريد الإلكتروني */}
        <div className="mb-3">
          <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>البريد الإلكتروني</label>
          <div className="input-group" style={errors.email ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
            <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}>
              <i className="bi bi-envelope" />
            </span>
            <input
              type="email"
              className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-start"
              style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }}
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="royal@example.com"
            />
          </div>
          {errors.email && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.email}</div>}
        </div>

        {/* حقل كلمة المرور */}
        <div className="mb-3">
          <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>كلمة المرور</label>
          <div className="input-group" style={errors.password ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
            <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}>
              <i className="bi bi-lock" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-none border-x-0 py-2 bg-light bg-opacity-50 text-start"
              style={{ fontSize: '0.9rem' }}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
            <button 
              type="button" 
              className="input-group-text bg-white border-start-0 text-muted px-3" 
              style={{ borderRadius: '12px 0 0 12px', cursor: 'pointer' }}
              onClick={() => setShowPassword(!showPassword)}
            >
              <i className={`bi bi-${showPassword ? 'eye-slash' : 'eye'}`} />
            </button>
          </div>
          {errors.password && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.password}</div>}
        </div>

        {/* خيارات إضافية: تذكرني ونسيت كلمة المرور */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="form-check d-flex align-items-center gap-2 m-0 p-0">
            <input
              type="checkbox"
              className="form-check-input shadow-none m-0"
              style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#5E1777' }}
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label className="form-check-label small user-select-none" htmlFor="rememberMe" style={{ color: '#8A7F91', cursor: 'pointer' }}>
              تذكر حسابي
            </label>
          </div>
          <Link href="/forgot-password" className="text-decoration-none small fw-bold" style={{ color: '#C9A227', fontSize: '0.8rem' }}>
            نسيت تفاصيل المرور؟
          </Link>
        </div>

        {/* زر الدخول الملوكي */}
        <button
          type="submit"
          className="btn w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 border-0"
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
              <span>دخول الآمن إلى المنصة</span>
              <i className="bi bi-box-arrow-in-left fs-5" />
            </>
          )}
        </button>

        {/* رابط إنشاء حساب جديد */}
        <div className="text-center mt-4 pt-2">
          <span className="small text-muted">ليس لديك عضوية ملوكية بعد؟ </span>
          <Link href="/register" className="text-decoration-none small fw-bold" style={{ color: '#5E1777' }}>
            طلب إنشاء حساب جديد
          </Link>
        </div>

      </form>
    </div>
  );
}