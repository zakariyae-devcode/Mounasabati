import React from 'react';
import ServicesHero from '../components/Service/ServicesHero';
import ServicesGrid from '../components/Service/ServicesGrid';

// إعدادات الميتا لتهيئة محركات البحث (SEO) لتناسب فخامة الموقع
export const metadata = {
  title: 'خدماتنا الفاخرة | مناسباتي',
  description: 'اكتشف خدمات تنظيم الحفلات والأعراس المغربية الأسطورية من نكافة، ديكور أندلسي، ضيافة ملكية وتصوير احترافي.',
};

export default function ServicesPage() {
  return (
    <main style={{ backgroundColor: '#fcfbf7', minHeight: '100vh' }}>
      {/* 1. الواجهة العلوية الفاخرة للخدمات */}
      <ServicesHero />

      {/* 2. قسم عرض بطاقات الخدمات الأربعة وزر الحجز */}
      <ServicesGrid />
    </main>
  );
}