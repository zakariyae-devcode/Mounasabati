import React from 'react';

export default function ContactInfo() {
  return (
    <div 
      className="h-100 p-4 p-sm-5 text-white d-flex flex-column justify-content-between"
      style={{ 
        background: 'linear-gradient(135deg, #5E1777 0%, #3D0B4F 100%)', 
        borderRadius: '24px',
        boxShadow: '0 20px 40px -15px rgba(61, 11, 79, 0.3)'
      }}
    >
      <div>
        <h4 className="fw-bold mb-4" style={{ color: '#C9A227' }}>معلومات التواصل</h4>
        <p className="text-white-50 small mb-5">
          يمكنكم تشريفنا بالاتصال المباشر أو زيارة مقرنا الرئيسي لمناقشة كافة التفاصيل برفق تليق بكم.
        </p>

        {/* القنوات */}
        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '40px', height: '40px' }}>
            <i className="bi bi-telephone fs-5 text-white" />
          </div>
          <div>
            <span className="d-block small text-white-50">الخط الساخن</span>
            <span className="fw-bold" style={{ direction: 'ltr' }}>+212 600-000000</span>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3 mb-4">
          <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '40px', height: '40px' }}>
            <i className="bi bi-envelope fs-5 text-white" />
          </div>
          <div>
            <span className="d-block small text-white-50">البريد الإلكتروني الرسمي</span>
            <span className="fw-medium">royal@events.com</span>
          </div>
        </div>

        <div className="d-flex align-items-start gap-3">
          <div className="rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ backgroundColor: 'rgba(255,255,255,0.1)', width: '40px', height: '40px' }}>
            <i className="bi bi-geo-alt fs-5 text-white" />
          </div>
          <div>
            <span className="d-block small text-white-50">المقر الرئيسي</span>
            <span className="fw-medium">الرباط، المملكة المغربية</span>
          </div>
        </div>
      </div>

      {/* أوقات العمل */}
      <div className="mt-5 pt-4 border-top border-white border-opacity-10">
        <span className="d-block small text-white-50">ساعات الاستقبال الرسمي:</span>
        <span className="small fw-bold">يومياً من الساعة 09:00 صباحاً وحتى 08:00 مساءً</span>
      </div>
    </div>
  );
}