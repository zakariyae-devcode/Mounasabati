// src/components/Payment/CheckoutPage.jsx
"use client";

import React, { useState } from 'react';
import OrderSummary from './OrderSummary';
import PaymentMethods from './PaymentMethods';

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // محاكاة استجابة الـ API وتغيير الـ Status
    setTimeout(() => {
      setIsProcessing(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="container my-5 py-5 text-center" dir="rtl">
        <div className="card border-0 shadow-sm p-5 mx-auto" style={{ maxWidth: '550px', borderRadius: '20px' }}>
          <div className="mb-4"><i className="bi bi-check-circle-fill text-success" style={{ fontSize: '5rem' }}></i></div>
          <h3 className="fw-bold text-dark mb-2">تمت عملية الدفع بنجاح!</h3>
          <p className="text-muted mb-4">تم تأكيد حجزك الفاخر وتحديث حالة المعاملة بنجاح.</p>
          <button className="btn w-100 text-white fw-bold py-2.5 border-0" style={{ background: '#5E1777', borderRadius: '12px' }}>
            الانتقال إلى تفاصيل الحجز
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5" dir="rtl">
      <div className="row justify-content-center mb-4">
        <div className="col-12 text-center">
          <span className="badge bg-light text-dark border px-3 py-2 rounded-pill small shadow-sm">
            <i className="bi bi-shield-lock-fill text-success me-1"></i> بوابة دفع آمنة ومصنفة لتأمين حجزك
          </span>
        </div>
      </div>

      <div className="row g-4">
        {/* الشق الأيمن: ملخص الفاتورة */}
        <div className="col-12 col-lg-5 order-lg-2">
          <OrderSummary amount={4500} />
        </div>

        {/* الشق الأيسر: بوابات الدفع والزر النهائي */}
        <div className="col-12 col-lg-7 order-lg-1">
          <div className="card border-0 p-4 shadow-sm" style={{ borderRadius: '16px' }}>
            <form onSubmit={handlePaymentSubmit}>
              
              <PaymentMethods selectedMethod={selectedMethod} setSelectedMethod={setSelectedMethod} />

              <button
                type="submit"
                disabled={isProcessing}
                className="btn w-100 py-3 text-white fw-bold d-flex align-items-center justify-content-center gap-2 border-0 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', borderRadius: '12px' }}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                    <span>جاري معالجة المعاملة الآمنة...</span>
                  </>
                ) : (
                  <>
                    <span>
                      {selectedMethod === 'card' ? 'تأكيد الدفع بالبطاقة' : selectedMethod === 'paypal' ? 'الانتقال إلى PayPal' : 'تأكيد الحجز والدفع لاحقاً'}
                    </span>
                    <i className="bi bi-arrow-left small" />
                  </>
                )}
              </button>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}