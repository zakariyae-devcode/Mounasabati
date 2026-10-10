"use client";

import React from 'react';

// قاموس بيانات الخدمات بمعرفات UUID ثابتة وموحدة
const DETAILS_DATA = {
  "b3a8c1f4-9d2e-4a6b-8f1c-3d5e7a9b2c4d": {
    id: "b3a8c1f4-9d2e-4a6b-8f1c-3d5e7a9b2c4d",
    title: "النكافة المغربية",
    vendorName: "دار العروس الفاخرة",
    price: "4000 د.م",
    rating: "4.9",
    description: "أرقى أزياء العروس المغربية، العمارية الفاخرة، والبرزة الأسطورية بإشراف خبيرات المحترفات.",
    image: "/images/PHOTO-ID-35.png",
    items: [
      "تشكيلة تكاشيط ملكية فاخرة",
      "عماريات وشوار مغربي أصيل",
      "طقم مجوهرات وتاج العروس",
      "مرافقة كاملة من خبيرات النكافة طوال الحفل"
    ]
  },
  "c4b9d2e5-0e3f-5b7c-9a2d-4e6f8b0c3d5e": {
    id: "c4b9d2e5-0e3f-5b7c-9a2d-4e6f8b0c3d5e",
    title: "الديكور والقاعات",
    vendorName: "قصور الأندلس للأفراح",
    price: "8000 د.م",
    rating: "4.8",
    description: "تنسيق قاعات الحفلات بنقوش أندلسية ساحرة، ثريات كريستالية، وإضاءة تضفي لمسة ملوكية.",
    image: "/images/royal-hall-morocco.jpg",
    items: [
      "تنسيق الكوشة والمدخل الرئيسي",
      "إضاءة ليزر وثريات كريستال",
      "طاولات وكراسي مغطاة بأقمشة فاخرة",
      "تزيين بالورود الطبيعية المنسقة"
    ]
  },
  "d5c0e3f6-1f4a-6c8d-0b3e-5f7a9c1d4e6f": {
    id: "d5c0e3f6-1f4a-6c8d-0b3e-5f7a9c1d4e6f",
    title: "الضيافة والتموين",
    vendorName: "تموين الأفراح الملكية",
    price: "250 د.م / للشخص",
    rating: "4.9",
    description: "أطباق مغربية أصيلة وحلويات ملكية فاخرة تُقدم بطقوس تقليدية تليق بضيوفكم.",
    image: "/images/catering.jpg",
    items: [
      "بسطيلة بالدجاج واللوز / بسطيلة السمك",
      "طواجن اللحم المغربي بالمبرقوق والأناناس",
      "تشكيلة الحلويات المغربية مع الشاي المنعنع",
      "طاقم ضيافة بزي تقليدي موحد وخدمة احترافية"
    ]
  },
  "e6d1f4a7-2a5b-7d9e-1c4f-6a8b0c2d5e7f": {
    id: "e6d1f4a7-2a5b-7d9e-1c4f-6a8b0c2d5e7f",
    title: "التصوير الاحترافي",
    vendorName: "استوديو الأسطورة",
    price: "3500 د.م",
    rating: "4.7",
    description: "توثيق سينمائي وفوتوغرافي متكامل لجميع تفاصيل ليلة العمر بأحدث التقنيات وبأعلى دقة.",
    image: "/images/photography.jpg",
    items: [
      "تصوير فيديو 4K كاميرتين سينمائيتين",
      "تصوير طائرة درون (Drone) للقاعة",
      "ألبوم صور فاخر بطباعة حرارية",
      "فيديو مجزء للمنصات وفيديو سينمائي كامل"
    ]
  }
};

const DEFAULT_UUID = "b3a8c1f4-9d2e-4a6b-8f1c-3d5e7a9b2c4d";

export default function ServiceDetail({ id }) {
  // مطابقة الـ id القادم من المكون الأب مع القاموس أو العودة للخدمة الافتراضية
  const service = DETAILS_DATA[id] || DETAILS_DATA[DEFAULT_UUID];

  return (
    <div className="card border-0 shadow-sm overflow-hidden mb-5" style={{ borderRadius: '20px', backgroundColor: '#FCFBF7' }}>
      <div className="row g-0">
        
        {/* صورة الخدمة */}
        <div className="col-lg-5 position-relative">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-100 h-100 object-fit-cover"
            style={{ minHeight: '350px' }}
          />
        </div>

        {/* تفاصيل الخدمة */}
        <div className="col-lg-7 p-4 p-md-5 d-flex flex-column justify-content-between">
          <div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small">المزود: <strong style={{ color: '#5E1777' }}>{service.vendorName}</strong></span>
              <span className="badge bg-warning text-dark px-3 py-2 rounded-pill">★ {service.rating}</span>
            </div>

            <h2 className="fw-bold mb-3" style={{ color: '#5E1777' }}>{service.title}</h2>
            <p className="text-muted mb-4">{service.description}</p>

            <h6 className="fw-bold mb-3" style={{ color: '#5E1777' }}>قائمة التفاصيل والخدمات المدرجة:</h6>
            <ul className="list-unstyled mb-4">
              {service.items.map((item, index) => (
                <li key={index} className="d-flex align-items-center gap-2 mb-2">
                  <i className="bi bi-check-circle-fill text-warning"></i>
                  <span className="small">{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}