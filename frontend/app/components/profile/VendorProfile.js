"use client";

import React, { useState } from 'react';
import VendorHeroHeader from './vendor/VendorHeroHeader';
import VendorStatsCards from './vendor/VendorStatsCards';
import VendorServicesList from './vendor/VendorServicesList';
import VendorIncomingOrders from './vendor/VendorIncomingOrders';

export default function VendorProfile({ user }) {
  const [vendorData, setVendorData] = useState(user || {
    username: 'Vendor_Zakariyae',
    businessName: 'قاعات وتموين الملوك',
    category: 'تموين وقاعات أفراح',
    email: 'vendor@example.com',
    cin: 'FK998877',
    role: 'vendor',
    profile: {
      phone: '0611223344',
      city: 'Taourirt',
      address: 'الحي المحمدي - تاوريرت',
      image: null
    }
  });

  return (
    <div className="container py-4" dir="rtl">
      {/* 1. الهيدر التجاري */}
      <VendorHeroHeader 
        vendorData={vendorData} 
        onEditClick={() => alert("إعدادات المتجر...")} 
      />

      {/* 2. الإحصائيات والأرقام */}
      <VendorStatsCards />

      {/* 3. إدارة الكتالوج والخدمات */}
      <VendorServicesList onAddService={() => alert("إضافة خدمة جديد...")} />

      {/* 4. طلبات الحجز المباشرة */}
      <VendorIncomingOrders />
    </div>
  );
}