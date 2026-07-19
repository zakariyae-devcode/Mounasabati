"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Amiri, Tajawal } from 'next/font/google';

const amiri = Amiri({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-amiri' });
const tajawal = Tajawal({ subsets: ['arabic'], weight: ['300', '400', '500', '700'], variable: '--font-tajawal' });

const COLORS = {
  plum: '#3D0B4F',
  purple: '#5E1777',
  gold: '#C9A227',
  goldLight: '#E4C766',
  ivory: '#FBF8F2',
  ink: '#2B2530',
  muted: '#8A7F91',
  cream: '#FCFBF7'
};

export default function BookingForm({ services = [] }) {
  const searchParams = useSearchParams();
  const serviceIdFromUrl = searchParams.get('serviceId');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: [], // 🎯 تم تحويلها إلى مصفوفة لدعم تعدد الخيارات
    event_date: '',
    notes: ''
  });

  // التقاط الخدمة الممررة من رابط صفحة الخدمات وإضافتها للمصفوفة
  useEffect(() => {
    if (serviceIdFromUrl) {
      setFormData(prev => ({ ...prev, service: [serviceIdFromUrl] }));
    }
  }, [serviceIdFromUrl]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // دالة ذكية لإضافة أو إزالة الخدمات أو اختيار الكل
  const handleServiceSelect = (id) => {
    setFormData(prev => {
      const isAlreadySelected = prev.service.includes(id);
      if (isAlreadySelected) {
        // إذا كانت مختارة سابقاً، نلغي اختيارها
        return { ...prev, service: prev.service.filter(item => item !== id) };
      } else {
        // إذا لم تكن مختارة، نضيفها للمصفوفة
        return { ...prev, service: [...prev.service, id] };
      }
    });
  };

  // دالة سريعة لاختيار جميع الخدمات بضغطة زر واحدة
  const handleSelectAll = () => {
    if (formData.service.length === services.length) {
      setFormData(prev => ({ ...prev, service: [] })); // إلغاء تحديد الكل
    } else {
      setFormData(prev => ({ ...prev, service: services.map(srv => srv.id) })); // تحديد الكل
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.service.length === 0) {
      alert('يرجى اختيار خدمة واحدة على الأقل لتنسيق حفلكم الفاخر.');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccessMessage('تم استلام طلب حجزك بنجاح! سنتواصل معك قريباً لتأكيد الموعد.');
      setFormData({ name: '', phone: '', service: [], event_date: '', notes: '' });
    }, 1500);
  };

  return (
    <div className={`${amiri.variable} ${tajawal.variable} booking-frame`} dir="rtl">
      <div className="booking-card">
        {successMessage ? (
          <div className="text-center py-5 success-wrap">
            <div className="success-badge">
              <i className="bi bi-check" />
            </div>
            <h3 className="success-title">طلب حجز مكتمل</h3>
            <p className="success-copy">{successMessage}</p>
            <button
              type="button"
              className="btn-return"
              onClick={() => setSuccessMessage('')}
            >
              العودة للاستمارة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-heading">
              <span className="eyebrow">PREMIUM EXPERIENCES</span>
              <h2 className="form-title">تنسيق المناسبات الملوكية</h2>
              <div className="modern-divider">
                <span className="dot" />
              </div>
            </div>

            {/* حقل الاسم الكامل */}
            <div className="field-group">
              <label className="field-label">الاسم الكامل</label>
              <div className="input-wrapper">
                <i className="bi bi-person input-icon" />
                <input
                  type="text"
                  className="field-input"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="صاحب السمو / الفخامة"
                />
              </div>
            </div>

            {/* حقل رقم الهاتف */}
            <div className="field-group">
              <label className="field-label">رقم الهاتف للاتصال</label>
              <div className="input-wrapper">
                <i className="bi bi-telephone input-icon" />
                <input
                  type="tel"
                  className="field-input"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="06 XXXXXXXX"
                />
              </div>
            </div>

            {/* قسم اختيار الخدمات المتعددة مع زر تحديد الكل */}
            <div className="field-group">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <label className="field-label m-0">الخدمات المراد تنسيقها (يمكنك اختيار أكثر من خدمة)</label>
                <button 
                  type="button" 
                  onClick={handleSelectAll}
                  className="btn-select-all"
                >
                  {formData.service.length === services.length ? 'إلغاء الكل' : 'اختيار الكل'}
                </button>
              </div>

              <div className="services-selector-grid">
                {services.map((srv) => {
                  const isSelected = formData.service.includes(srv.id);
                  return (
                    <div 
                      key={srv.id} 
                      className={`service-option-card ${isSelected ? 'active' : ''}`}
                      onClick={() => handleServiceSelect(srv.id)}
                    >
                      {/* المربع الصغير المتجاوب (Checkbox Style) */}
                      <span className="checkbox-box">
                        {isSelected && <i className="bi bi-check-short text-white" />}
                      </span>
                      <span className="service-opt-title">{srv.title}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* تاريخ المناسبة */}
            <div className="field-group">
              <label className="field-label">تاريخ الحفل المقترح</label>
              <div className="input-wrapper">
                <i className="bi bi-calendar-event input-icon" />
                <input
                  type="date"
                  className="field-input"
                  name="event_date"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* طلبات خاصة */}
            <div className="field-group mb-4">
              <label className="field-label">رؤيتكم وتفاصيلكم الخاصة</label>
              <div className="input-wrapper">
                <i className="bi bi-chat-quote input-icon textarea-icon" />
                <textarea
                  className="field-input"
                  name="notes"
                  rows="3"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="أضف أي تفاصيل تود إطلاع خبير التنسيق عليها..."
                />
              </div>
            </div>

            {/* زر تأكيد الحجز */}
            <button
              type="submit"
              className="btn-submit-modern"
              disabled={loading}
            >
              {loading ? (
                <div className="spinner-border spinner-border-sm text-light" role="status" />
              ) : (
                <>
                  <span>إرسال طلب التنسيق المجمع</span>
                  <i className="bi bi-arrow-left-short fs-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .booking-frame {
          --font-heading: var(--font-amiri), 'Amiri', serif;
          --font-body: var(--font-tajawal), 'Tajawal', sans-serif;
          display: flex;
          justify-content: center;
          padding: 20px 15px;
          font-family: var(--font-body);
        }

        .booking-card {
          position: relative;
          width: 100%;
          max-width: 560px;
          background: rgba(251, 248, 242, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(201, 162, 39, 0.2);
          border-radius: 24px;
          padding: 50px 40px;
          box-shadow: 0 40px 90px -30px rgba(61, 11, 79, 0.25);
          animation: smoothRise 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes smoothRise {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-heading {
          text-align: center;
          margin-bottom: 35px;
        }

        .eyebrow {
          font-size: 0.68rem;
          letter-spacing: 0.2em;
          color: ${COLORS.gold};
          font-weight: 700;
          display: block;
          margin-bottom: 6px;
        }

        .form-title {
          font-family: var(--font-heading);
          font-size: 1.95rem;
          font-weight: 700;
          color: ${COLORS.plum};
          margin: 0;
        }

        .modern-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 12px;
        }
        .modern-divider .dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: ${COLORS.gold};
          box-shadow: 0 0 8px 1px ${COLORS.gold};
        }

        .field-group {
          margin-bottom: 24px;
        }

        .field-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 700;
          color: ${COLORS.purple};
          margin-bottom: 8px;
          letter-spacing: 0.03em;
        }

        .btn-select-all {
          background: transparent;
          border: none;
          color: ${COLORS.gold};
          font-size: 0.78rem;
          font-weight: 700;
          cursor: pointer;
          padding: 0 4px;
          transition: color 0.2s;
        }
        .btn-select-all:hover {
          color: ${COLORS.plum};
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          right: 16px;
          color: ${COLORS.muted};
          font-size: 1.1rem;
          pointer-events: none;
          transition: color 0.3s;
        }
        .textarea-icon {
          top: 14px;
        }

        .field-input {
          width: 100%;
          padding: 14px 44px 14px 16px;
          font-size: 0.92rem;
          color: ${COLORS.ink};
          background: ${COLORS.cream};
          border: 1px solid rgba(94, 23, 119, 0.08);
          border-bottom: 2px solid rgba(94, 23, 119, 0.15);
          border-radius: 12px;
          outline: none;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .field-input:focus {
          background: #ffffff;
          border-color: rgba(201, 162, 39, 0.3);
          border-bottom-color: ${COLORS.gold};
          box-shadow: 0 10px 25px -10px rgba(201, 162, 39, 0.15);
        }
        .field-input:focus + .input-icon {
          color: ${COLORS.gold};
        }

        .services-selector-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .service-option-card {
          background: ${COLORS.cream};
          border: 1px solid rgba(94, 23, 119, 0.06);
          border-radius: 12px;
          padding: 14px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          transition: all 0.25s ease;
          user-select: none;
        }

        .service-option-card:hover {
          border-color: rgba(201, 162, 39, 0.4);
          background: #ffffff;
        }

        .service-option-card.active {
          background: #ffffff;
          border-color: ${COLORS.gold};
          box-shadow: 0 8px 20px -8px rgba(201, 162, 39, 0.25);
        }

        /* مربع الاختيار المتعدد العصري */
        .checkbox-box {
          width: 16px;
          height: 16px;
          border-radius: 4px;
          border: 1.5px solid ${COLORS.muted};
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          background: #ffffff;
        }

        .service-option-card.active .checkbox-box {
          border-color: ${COLORS.purple};
          background: ${COLORS.purple};
        }

        .service-opt-title {
          font-size: 0.88rem;
          font-weight: 500;
          color: ${COLORS.ink};
        }
        .service-option-card.active .service-opt-title {
          color: ${COLORS.plum};
          font-weight: 700;
        }

        .btn-submit-modern {
          width: 100%;
          padding: 15px;
          background: linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.plum} 100%);
          border: none;
          border-radius: 14px;
          color: #ffffff;
          font-weight: 700;
          font-size: 0.98rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 15px 35px -10px rgba(94, 23, 119, 0.4);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-submit-modern:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 20px 40px -10px rgba(94, 23, 119, 0.5);
          background: linear-gradient(135deg, #711c8f 0%, ${COLORS.purple} 100%);
        }

        .btn-submit-modern:active {
          transform: translateY(0);
        }

        .success-badge {
          width: 70px;
          height: 70px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          border: 2px solid ${COLORS.gold};
          border-radius: 50%;
          color: ${COLORS.gold};
          font-size: 2.5rem;
          box-shadow: 0 15px 30px -10px rgba(201, 162, 39, 0.3);
        }

        .success-title {
          font-family: var(--font-heading);
          font-size: 1.75rem;
          color: ${COLORS.plum};
          font-weight: 700;
        }

        .success-copy {
          color: ${COLORS.muted};
          font-size: 0.92rem;
          max-width: 320px;
          margin: 10px auto 25px;
          line-height: 1.6;
        }

        .btn-return {
          padding: 10px 24px;
          background: transparent;
          border: 1px solid ${COLORS.gold};
          color: ${COLORS.purple};
          border-radius: 10px;
          font-size: 0.88rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s;
        }
        .btn-return:hover {
          background: ${COLORS.gold};
          color: #ffffff;
        }

        @media (max-width: 576px) {
          .booking-card {
            padding: 35px 20px;
          }
          .services-selector-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .form-title {
            font-size: 1.6rem;
          }
        }
      `}</style>
    </div>
  );
}