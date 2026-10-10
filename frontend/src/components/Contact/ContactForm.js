"use client";

import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = {};
    
    if (!formData.name.trim()) validationErrors.name = 'يرجى إدخال اسمكم الكريم.';
    if (!formData.email.trim()) {
      validationErrors.email = 'يرجى إدخال البريد الإلكتروني.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = 'البريد الإلكتروني غير صالح.';
    }
    if (!formData.subject.trim()) validationErrors.subject = 'يرجى تحديد موضوع الرسالة.';
    if (!formData.message.trim()) validationErrors.message = 'يرجى كتابة تفاصيل رسالتكم.';

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  if (isSent) {
    return (
      <div className="card border-0 p-4 p-sm-5 text-center h-100 d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)', borderRadius: '24px' }}>
        <div className="rounded-circle d-inline-flex align-items-center justify-content-center mb-3" style={{ backgroundColor: 'rgba(25, 135, 84, 0.1)', width: '80px', height: '80px' }}>
          <i className="bi bi-check-circle-fill text-success fs-1" />
        </div>
        <h3 className="fw-bold" style={{ color: '#3D0B4F' }}>تم الإرسال بنجاح</h3>
        <p className="text-muted small">سيتواصل معكم مستشار التنسيق الملوكي خلال أقل من 24 ساعة.</p>
        <button type="button" className="btn text-white px-4 py-2 mt-2" style={{ backgroundColor: '#5E1777', borderRadius: '8px' }} onClick={() => setIsSent(false)}>
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <div 
      className="card border-0 p-4 p-sm-5 text-start h-100" 
      style={{ backgroundColor: 'rgba(251, 248, 242, 0.96)', borderRadius: '24px', boxShadow: '0 40px 90px -30px rgba(61, 11, 79, 0.15)' }}
    >
      <form onSubmit={handleSubmit} noValidate>
        <h4 className="fw-bold mb-4" style={{ color: '#3D0B4F' }}>أرسل لنا رسالة مباشرة</h4>
        <div className="row g-3">
          
          {/* الاسم */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>الاسم بالكامل</label>
            <div className="input-group" style={errors.name ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-person" /></span>
              <input type="text" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="name" value={formData.name} onChange={handleChange} placeholder="الاسم الكريم" />
            </div>
            {errors.name && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.name}</div>}
          </div>

          {/* البريد */}
          <div className="col-12 col-sm-6">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>البريد الإلكتروني</label>
            <div className="input-group" style={errors.email ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-envelope" /></span>
              <input type="email" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50 text-start" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="email" value={formData.email} onChange={handleChange} placeholder="example@domain.com" />
            </div>
            {errors.email && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.email}</div>}
          </div>

          {/* الموضوع */}
          <div className="col-12">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>موضوع الرسالة</label>
            <div className="input-group" style={errors.subject ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}><i className="bi bi-bookmark-star" /></span>
              <input type="text" className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="subject" value={formData.subject} onChange={handleChange} placeholder="مثال: استفسار عن تنسيق حفل زفاف" />
            </div>
            {errors.subject && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.subject}</div>}
          </div>

          {/* نص الرسالة */}
          <div className="col-12">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>تفاصيل الرسالة</label>
            <div className="input-group align-items-start" style={errors.message ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}>
              <span className="input-group-text bg-white border-end-0 text-muted px-3 pt-2" style={{ borderRadius: '0 12px 12px 0', minHeight: '120px' }}><i className="bi bi-pencil-square" /></span>
              <textarea className="form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50" style={{ borderRadius: '12px 0 0 12px', fontSize: '0.9rem' }} name="message" rows="4" value={formData.message} onChange={handleChange} placeholder="اكتب تفاصيل رؤيتكم هنا..." />
            </div>
            {errors.message && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.78rem' }}>⚠️ {errors.message}</div>}
          </div>

        </div>

        <button type="submit" className="btn w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 border-0 mt-4" style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '14px', boxShadow: '0 15px 35px -10px rgba(94, 23, 119, 0.4)' }} disabled={loading}>
          {loading ? <div className="spinner-border spinner-border-sm text-light" role="status" /> : (
            <>
              <span>إرسال الرسالة الفاخرة</span>
              <i className="bi bi-send-fill fs-6" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}