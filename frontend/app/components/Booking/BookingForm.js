"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function BookingForm({ services = [] }) {
  const searchParams = useSearchParams();
  const router = useRouter(); 
  const serviceIdFromUrl = searchParams.get('serviceId');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: [], 
    event_date: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (serviceIdFromUrl) {
      setFormData(prev => ({ ...prev, service: [serviceIdFromUrl] }));
    }
  }, [serviceIdFromUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleServiceSelect = (id) => {
    setFormData(prev => {
      const isAlreadySelected = prev.service.includes(id);
      let updatedServices = [];
      if (isAlreadySelected) {
        updatedServices = prev.service.filter(item => item !== id);
      } else {
        updatedServices = [...prev.service, id];
      }
      
      if (updatedServices.length > 0 && errors.service) {
        setErrors(prevErr => ({ ...prevErr, service: '' }));
      }
      
      return { ...prev, service: updatedServices };
    });
  };

  const handleSelectAll = () => {
    if (formData.service.length === services.length) {
      setFormData(prev => ({ ...prev, service: [] }));
    } else {
      setFormData(prev => ({ ...prev, service: services.map(srv => srv.id) }));
      setErrors(prev => ({ ...prev, service: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = {};
    
    if (!formData.name || formData.name.trim() === '') {
      validationErrors.name = 'عليك ملء الاستمارة: يرجى إدخال الاسم الكامل.';
    }
    if (!formData.phone || formData.phone.trim() === '') {
      validationErrors.phone = 'عليك ملء الاستمارة: يرجى إدخال رقم الهاتف.';
    }
    if (!formData.service || formData.service.length === 0) {
      validationErrors.service = 'عليك ملء الاستمارة: يرجى اختيار خدمة واحدة على الأقل.';
    }
    if (!formData.event_date) {
      validationErrors.event_date = 'عليك ملء الاستمارة: يرجى تحديد تاريخ الحفل.';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; 
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      
      const queryParams = new URLSearchParams({
        name: formData.name,
        phone: formData.phone,
        services: formData.service.join(','), 
        date: formData.event_date,
        notes: formData.notes
      }).toString();

      router.push(`/payment?${queryParams}`);
    }, 1000);
  };

  return (
    <div className="container-fluid py-5 d-flex justify-content-center align-items-center" dir="rtl" style={{ backgroundColor: 'transparent' }}>
      <div 
        className="card shadow-lg border-0 p-4 p-sm-5 text-start w-100" 
        style={{ 
          maxWidth: '580px', 
          backgroundColor: 'rgba(251, 248, 242, 0.96)', 
          borderRadius: '24px',
          boxShadow: '0 40px 90px -30px rgba(61, 11, 79, 0.25) !important'
        }}
      >
        <form onSubmit={handleSubmit} noValidate>
          <div className="text-center mb-4">
            <span className="d-block text-uppercase fw-bold mb-1" style={{ color: '#C9A227', fontSize: '0.68rem', letterSpacing: '0.2em' }}>
              PREMIUM EXPERIENCES
            </span>
            <h2 className="fw-bold m-0" style={{ color: '#3D0B4F' }}>تنسيق المناسبات الملوكية</h2>
            <div className="d-flex align-items-center justify-content-center mt-2">
              <span className="p-1 rounded-circle" style={{ background: '#C9A227', boxShadow: '0 0 8px 1px #C9A227' }} />
            </div>
          </div>

          {/* حقل الاسم الكامل */}
          <div className="mb-3">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>الاسم الكامل</label>
            <div 
              className="input-group" 
              style={errors.name ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}
            >
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}>
                <i className="bi bi-person" />
              </span>
              <input
                type="text"
                className="form-content form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50"
                style={errors.name ? { borderRadius: '12px 0 0 12px', fontSize: '0.92rem', border: '1px solid #dc3545 !important' } : { borderRadius: '12px 0 0 12px', fontSize: '0.92rem' }}
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="صاحب السمو / الفخامة"
              />
            </div>
            {errors.name && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.8rem' }}>⚠️ {errors.name}</div>}
          </div>

          {/* حقل رقم الهاتف */}
          <div className="mb-3">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>رقم الهاتف للاتصال</label>
            <div 
              className="input-group" 
              style={errors.phone ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}
            >
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}>
                <i className="bi bi-telephone" />
              </span>
              <input
                type="tel"
                className="form-content form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50"
                style={errors.phone ? { borderRadius: '12px 0 0 12px', fontSize: '0.92rem', border: '1px solid #dc3545 !important' } : { borderRadius: '12px 0 0 12px', fontSize: '0.92rem' }}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 XXXXXXXX"
              />
            </div>
            {errors.phone && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.8rem' }}>⚠️ {errors.phone}</div>}
          </div>

          {/* قسم اختيار الخدمات المتعددة */}
          <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <label className="form-label small fw-bold m-0" style={{ color: '#5E1777' }}>
                الخدمات المراد تنسيقها (يمكنك اختيار أكثر من خدمة)
              </label>
              <button 
                type="button" 
                onClick={handleSelectAll}
                className="btn btn-link p-0 text-decoration-none small fw-bold"
                style={{ color: '#C9A227', fontSize: '0.78rem' }}
              >
                {formData.service.length === services.length ? 'إلغاء الكل' : 'اختيار الكل'}
              </button>
            </div>

            <div className="row g-2">
              {services.map((srv) => {
                const isSelected = formData.service.includes(srv.id);
                return (
                  <div key={srv.id} className="col-12 col-sm-6">
                    <div 
                      className="d-flex align-items-center gap-2 p-3 rounded-3 border user-select-none transition-all"
                      style={{
                        backgroundColor: isSelected ? '#ffffff' : '#FCFBF7',
                        borderColor: isSelected ? '#C9A227' : (errors.service ? '#dc3545 !important' : 'rgba(94, 23, 119, 0.06)'),
                        boxShadow: isSelected ? '0 8px 20px -8px rgba(201, 162, 39, 0.25)' : 'none',
                        cursor: 'pointer',
                        borderWidth: errors.service ? '2px !important' : '1px'
                      }}
                      onClick={() => handleServiceSelect(srv.id)}
                    >
                      <div 
                        className="rounded d-flex align-items-center justify-content-center"
                        style={{
                          width: '18px',
                          height: '18px',
                          border: `1.5px solid ${isSelected ? '#5E1777' : (errors.service ? '#dc3545 !important' : '#8A7F91')}`,
                          backgroundColor: isSelected ? '#5E1777' : '#ffffff'
                        }}
                      >
                        {isSelected && <i className="bi bi-check text-white" style={{ fontSize: '0.75rem' }} />}
                      </div>
                      <span className={`small ${isSelected ? 'fw-bold' : 'fw-medium'}`} style={{ color: isSelected ? '#3D0B4F' : '#2B2530' }}>
                        {srv.title}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            {errors.service && <div className="text-danger small mt-2 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.8rem' }}>⚠️ {errors.service}</div>}
          </div>

          {/* تاريخ المناسبة */}
          <div className="mb-3">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>تاريخ الحفل المقترح</label>
            <div 
              className="input-group" 
              style={errors.event_date ? { border: '2px solid #dc3545 !important', borderRadius: '12px', overflow: 'hidden' } : {}}
            >
              <span className="input-group-text bg-white border-end-0 text-muted px-3" style={{ borderRadius: '0 12px 12px 0' }}>
                <i className="bi bi-calendar-event" />
              </span>
              <input
                type="date"
                className="form-content form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50"
                style={errors.event_date ? { borderRadius: '12px 0 0 12px', fontSize: '0.92rem', border: '1px solid #dc3545 !important' } : { borderRadius: '12px 0 0 12px', fontSize: '0.92rem' }}
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
              />
            </div>
            {errors.event_date && <div className="text-danger small mt-1 fw-bold d-block" style={{ color: '#dc3545', fontSize: '0.8rem' }}>⚠️ {errors.event_date}</div>}
          </div>

          {/* طلبات خاصة */}
          <div className="mb-4">
            <label className="form-label small fw-bold" style={{ color: '#5E1777' }}>رؤيتكم وتفاصيلكم الخاصة</label>
            <div className="input-group align-items-start">
              <span className="input-group-text bg-white border-end-0 text-muted px-3 pt-2" style={{ borderRadius: '0 12px 12px 0', minHeight: '86px' }}>
                <i className="bi bi-chat-quote" />
              </span>
              <textarea
                className="form-content form-control shadow-none border-start-0 py-2 bg-light bg-opacity-50"
                style={{ borderRadius: '12px 0 0 12px', fontSize: '0.92rem' }}
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                placeholder="أضف أي تفاصيل تود إطلاع خبير التنسيق عليها..."
              />
            </div>
          </div>

          {/* زر الإرسال والتوجيه */}
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
                <span>تأكيد الحجز والانتقال للدفع الآمن</span>
                <i className="bi bi-arrow-left-short fs-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}