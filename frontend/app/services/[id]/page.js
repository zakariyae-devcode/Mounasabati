import React, { use } from 'react';
import ServiceDetail from '../../components/Service/ServiceDetail';
import ServiceReviews from '../../components/Service/ServiceReviews';

// الـ UUID الافتراضي المعتمد للخدمة الأولى (النكافة)
const DEFAULT_UUID = "b3a8c1f4-9d2e-4a6b-8f1c-3d5e7a9b2c4d";

export default function Page({ params }) {
  // فك Promise الخاص بالـ params في Next.js
  const resolvedParams = use(params);
  
  // التأكد من أخذ الـ id القادم من الرابط أو العودة للـ UUID الافتراضي
  const id = resolvedParams?.id || DEFAULT_UUID;

  return (
    <main className="container py-5" dir="rtl">
      {/* تمرير الـ UUID الموحد للمكونات الفرعية */}
      <ServiceDetail id={id} />
      <ServiceReviews id={id} />
    </main>
  );
}