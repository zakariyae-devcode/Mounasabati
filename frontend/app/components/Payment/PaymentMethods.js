// src/components/Payment/PaymentMethods.jsx
import React from 'react';

export default function PaymentMethods({ selectedMethod, setSelectedMethod }) {
  return (
    <div className="mb-4">
      <h5 className="fw-bold mb-4" style={{ color: '#3D0B4F' }}>اختر وسيلة الدفع المعتمدة</h5>

      {/* أزرار الاختيار الراديو المخصصة */}
      <div className="row g-3 mb-4">
        {/* بطاقة بنكية */}
        <div className="col-12 col-md-4">
          <div 
            className={`card p-3 border text-center h-100 transition-all ${selectedMethod === 'card' ? 'border-primary bg-primary bg-opacity-10' : 'bg-light bg-opacity-50'}`}
            style={{ cursor: 'pointer', borderRadius: '12px', transition: 'all 0.2s' }}
            onClick={() => setSelectedMethod('card')}
          >
            <div className="fs-3 mb-1"><i className="bi bi-credit-card-2-front" style={{ color: selectedMethod === 'card' ? '#5E1777' : '#8A7F91' }}></i></div>
            <span className="fw-bold small d-block text-dark">بطاقة بنكية</span>
          </div>
        </div>

        {/* باي بال */}
        <div className="col-12 col-md-4">
          <div 
            className={`card p-3 border text-center h-100 transition-all ${selectedMethod === 'paypal' ? 'border-primary bg-primary bg-opacity-10' : 'bg-light bg-opacity-50'}`}
            style={{ cursor: 'pointer', borderRadius: '12px', transition: 'all 0.2s' }}
            onClick={() => setSelectedMethod('paypal')}
          >
            <div className="fs-3 mb-1"><i className="bi bi-paypal text-primary"></i></div>
            <span className="fw-bold small d-block text-dark">حساب PayPal</span>
          </div>
        </div>

        {/* نقداً */}
        <div className="col-12 col-md-4">
          <div 
            className={`card p-3 border text-center h-100 transition-all ${selectedMethod === 'cash' ? 'border-primary bg-primary bg-opacity-10' : 'bg-light bg-opacity-50'}`}
            style={{ cursor: 'pointer', borderRadius: '12px', transition: 'all 0.2s' }}
            onClick={() => setSelectedMethod('cash')}
          >
            <div className="fs-3 mb-1"><i className="bi bi-cash-coin text-success"></i></div>
            <span className="fw-bold small d-block text-dark">نقداً / عند الحضور</span>
          </div>
        </div>
      </div>

      {/* حقول الإدخال الشرطية */}
      {selectedMethod === 'card' && (
        <div className="bg-light bg-opacity-25 p-4 rounded-3 border border-light mb-4">
          <h6 className="fw-bold text-dark mb-3 small"><i className="bi bi-lock-fill text-muted me-1"></i> تفاصيل البطاقة البنكية الآمنة</h6>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">الاسم الكامل المطبوع على البطاقة</label>
            <input type="text" required className="form-control shadow-none py-2" style={{ borderRadius: '8px' }} placeholder="ZAKARIYAE ABBIH" />
          </div>
          <div className="mb-3">
            <label className="form-label small fw-bold text-secondary">رقم البطاقة</label>
            <input type="text" required maxLength="19" className="form-control shadow-none py-2" style={{ borderRadius: '8px' }} placeholder="1234 5678 9101 1121" />
          </div>
          <div className="row g-3">
            <div className="col-6">
              <label className="form-label small fw-bold text-secondary">تاريخ الانتهاء</label>
              <input type="text" required maxLength="5" className="form-control shadow-none py-2 text-center" style={{ borderRadius: '8px' }} placeholder="MM/YY" />
            </div>
            <div className="col-6">
              <label className="form-label small fw-bold text-secondary">رمز الأمان (CVC)</label>
              <input type="password" required maxLength="3" className="form-control shadow-none py-2 text-center" style={{ borderRadius: '8px' }} placeholder="•••" />
            </div>
          </div>
        </div>
      )}

      {selectedMethod === 'paypal' && (
        <div className="text-center p-4 rounded-3 border border-dashed bg-light bg-opacity-50 mb-4">
          <i className="bi bi-paypal text-primary mb-2" style={{ fontSize: '3rem' }}></i>
          <h6 className="fw-bold text-dark">الدفع السريع والآمن عبر PayPal</h6>
          <p className="text-muted small mb-0">سيتم توجيهك لنافذة PayPal الخارجية لإتمام العملية.</p>
        </div>
      )}

      {selectedMethod === 'cash' && (
        <div className="p-4 rounded-3 border border-warning-subtle bg-warning bg-opacity-10 mb-4">
          <h6 className="fw-bold text-warning-emphasis mb-2"><i className="bi bi-exclamation-triangle-fill me-1"></i> تنويه بخصوص الدفع المباشر</h6>
          <p className="text-secondary small mb-0 lh-lg">يتوجب عليك تسديد المبلغ نقداً لإدارة المنصة لتفعيل الحجز نهائياً قبل موعد الحفل بـ 48 ساعة.</p>
        </div>
      )}
    </div>
  );
}