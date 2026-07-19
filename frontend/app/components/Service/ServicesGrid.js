import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesGrid() {
  // بيانات الخدمات الأربعة الرئيسية للموقع (تم تحويل الـ id إلى نصوص لتطابق صفحة الحجز)
  const servicesData = [
    {
      id: '1', 
      title: 'النكافة المغربية',
      description: 'أرقى أزياء العروس المغربية، العمارية الفاخرة، والبرزة الأسطورية بإشراف خبيرات المحترفات.',
      image: '/images/PHOTO-ID-35.png', 
      icon: 'bi-gem' 
    },
    {
      id: '2',
      title: 'الديكور والقاعات',
      description: 'تنسيق قاعات الحفلات بنقوش أندلسية ساحرة، ثريات كريستالية، وإضاءة تضفي لمسة ملوكية.',
      image: '/images/royal-hall-morocco.jpg',
      icon: 'bi-palette'
    },
    {
      id: '3',
      title: 'الضيافة والتموين',
      description: 'أطباق مغربية أصيلة وحلويات ملكية فاخرة تُقدم بطقوس تقليدية تليق بضيوفكم.',
      image: '/images/catering.jpg',
      icon: 'bi-cup-hot'
    },
    {
      id: '4',
      title: 'التصوير الاحترافي',
      description: 'توثيق سينمائي وفوتوغرافي متكامل لجميع تفاصيل ليلة العمر بأحدث التقنيات وبأعلى دقة.',
      image: '/images/photography.jpg',
      icon: 'bi-camera-reels'
    }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#fcfbf7' }}>
      <div className="container">
        <div className="row justify-content-center">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id} // 👈 ضروري جداً تمرير الـ id هنا ليعمل حجز الخدمة التلقائي
              title={service.title}
              description={service.description}
              image={service.image}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}