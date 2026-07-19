import React, { Suspense } from 'react';
import BookingForm from '../components/Booking/BookingForm';

export const metadata = {
  title: 'حجز موعد جديد | مناسباتي',
  description: 'قم بحجز موعدك وتنسيق مناسبتك الفاخرة مع أفضل خبراء التنظيم والديكور والضيافة المغربية.',
};

export default function BookingPage() {
  // 🎯 تم تصحيح وترتيب الخدمات والـ IDs لتطابق تماماً ملف ServicesGrid
  const dummyServices = [
    { id: '1', title: 'النكافة المغربية' },
    { id: '2', title: 'الديكور والقاعات' },
    { id: '3', title: 'الضيافة والتموين' },
    { id: '4', title: 'التصوير الاحترافي' },
  ];

  return (
    <main 
      className="py-5 d-flex align-items-center justify-content-center" 
      style={{ 
        minHeight: '100vh', 
        backgroundColor: '#5E1777', 
        backgroundImage: 'linear-gradient(135deg, #5E1777 0%, #3b0d4b 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div 
        className="position-absolute top-0 start-0 w-100 h-100 opacity-10"
        style={{
          backgroundImage: 'url(/images/pattern.png)', 
          backgroundSize: 'contain'
        }}
      ></div>

      <div className="container position-relative" style={{ zIndex: '2', maxWidth: '700px' }}>
        <div className="text-center mb-4 text-white">
          <h1 style={{ fontFamily: 'var(--andalusian-font, serif)', color: '#D4AF37', fontWeight: 'bold' }}>
            مناسباتي
          </h1>
          <p style={{ opacity: '0.8' }}>بوابتكم نحو احتفال لا يُنسى</p>
        </div>

        <Suspense fallback={<div className="text-center text-white py-5">جاري تحميل استمارة الحجز...</div>}>
          <BookingForm services={dummyServices} />
        </Suspense>
      </div>
    </main>
  );
}