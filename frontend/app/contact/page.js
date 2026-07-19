import React from 'react';
import ContactInfo from '../components/Contact/ContactInfo';
import ContactForm from '../components/Contact/ContactForm';

export default function ContactPage() {
  return (
    <div className="container tabular-layout py-5" dir="rtl" style={{ backgroundColor: 'transparent' }}>
      
      {/* رأس الصفحة الثابت */}
      <div className="text-center mb-5">
        <span className="d-block text-uppercase fw-bold mb-1" style={{ color: '#C9A227', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
          GET IN TOUCH
        </span>
        <h1 className="fw-bold" style={{ color: '#3D0B4F' }}>تواصل مع خبراء التنسيق</h1>
        <p className="text-muted small mx-auto" style={{ maxWidth: '500px' }}>
          نحن هنا للاستماع إلى رؤيتكم وتحويل مناسباتكم القادمة إلى تحفة فنية تليق بفخامتكم.
        </p>
        <div className="d-flex align-items-center justify-content-center mt-2">
          <span className="p-1 rounded-circle" style={{ background: '#C9A227', boxShadow: '0 0 8px 1px #C9A227' }} />
        </div>
      </div>

      {/* استدعاء القطع (Components) بجانب بعضها البعض */}
      <div className="row g-4 justify-content-center align-items-stretch">
        <div className="col-12 col-lg-4">
          <ContactInfo />
        </div>
        <div className="col-12 col-lg-7">
          <ContactForm />
        </div>
      </div>

    </div>
  );
}