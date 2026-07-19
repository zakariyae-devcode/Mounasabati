'use client'
import React from 'react';

export default function FeaturesList() {
  const features = [
    {
      icon: "👑",
      title: "أصالة مغربية ملكية",
      desc: "تنسيق الديكورات والأزياء وفق أرفع طقوس العمارية والبرزة المغربية العريقة."
    },
    {
      icon: "✨",
      title: "دقة وتنظيم متكامل",
      desc: "نهتم بأدق التفاصيل والجدولة الزمنية لضمان راحة أصحاب الحفل وسلاسة الفقرات."
    },
    {
      icon: "🤝",
      title: "شراكات مع النخبة",
      desc: "نخبة من أمهر النكافات، الطهاة، والمصورين في المغرب لتقديم خدمة تليق بضيوفكم."
    }
  ];

  return (
    <div className="features-list text-end">
      {features.map((item, index) => (
        <div key={index} className="d-flex align-items-start gap-3 mb-4 text-white">
          <span className="feature-icon bg-opacity-10 bg-warning border border-warning border-opacity-25 px-3 py-2 rounded-circle fs-4 text-gold">
            {item.icon}
          </span>
          <div>
            <h4 className="andalusian-font text-gold fw-bold fs-4 mb-2">{item.title}</h4>
            <p className="text-white-50 fs-6">{item.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}