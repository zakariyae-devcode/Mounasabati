import React from 'react';
import ServiceCard from './ServiceCard';

export default function ServicesGrid() {
  // بيانات الخدمات الأربعة مع الـ UUIDs الموحدة للمشروع
  const servicesData = [
    {
      id: "b3a8c1f4-9d2e-4a6b-8f1c-3d5e7a9b2c4d", 
      title: 'النكافة المغربية',
      description: 'أرقى أزياء العروس المغربية، العمارية الفاخرة، والبرزة الأسطورية بإشراف خبيرات المحترفات.',
      image: '/images/PHOTO-ID-35.png', 
      icon: 'bi-gem' 
    },
    {
      id: "c4b9d2e5-0e3f-5b7c-9a2d-4e6f8b0c3d5e",
      title: 'الديكور والقاعات',
      description: 'تنسيق قاعات الحفلات بنقوش أندلسية ساحرة، ثريات كريستالية، وإضاءة تضفي لمسة ملوكية.',
      image: '/images/royal-hall-morocco.jpg',
      icon: 'bi-palette'
    },
    {
      id: "d5c0e3f6-1f4a-6c8d-0b3e-5f7a9c1d4e6f",
      title: 'الضيافة والتموين',
      description: 'أطباق مغربية أصيلة وحلويات ملكية فاخرة تُقدم بطقوس تقليدية تليق بضيوفكم.',
      image: '/images/catering.jpg',
      icon: 'bi-cup-hot'
    },
    {
      id: "e6d1f4a7-2a5b-7d9e-1c4f-6a8b0c2d5e7f",
      title: 'التصوير الاحترافي',
      description: 'توثيق سينمائي وفوتوغرافي متكامل لجميع تفاصيل ليلة العمر بأحدث التقنيات وبأعلى دقة.',
      image: '/images/photography.jpg',
      icon: 'bi-camera-reels'
    }
  ];

  return (
    <section className="py-5">
      <div className="container">
        <div className="row">
          {servicesData.map((service) => (
            <ServiceCard 
              key={service.id}
              id={service.id}
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