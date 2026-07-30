"use client";

import React, { useState } from 'react';
import ClientHeroHeader from './client/ClientHeroHeader';
import ClientUserInfoCard from './client/ClientUserInfoCard';
import ClientCountdownCard from './client/ClientCountdownCard';
import ClientBookingsTable from './client/ClientBookingsTable';

export default function ClientProfile({ user }) {
  const [profileData, setProfileData] = useState(user || {
    username: 'Zakariyae_Dev',
    email: 'zakariyae@example.com',
    cin: 'FK123456',
    role: 'client',
    profile: {
      phone: '0612345678',
      city: 'Taourirt',
      address: 'Bassatine Taourirt',
      image: null
    }
  });

  const handleEditClick = () => {
    alert("فتح نافذة تعديل البيانات...");
  };

  return (
    <div className="container py-4" dir="rtl">
      {/* 1. الغلاف العلوي */}
      <ClientHeroHeader profileData={profileData} onEditClick={handleEditClick} />

      <div className="row g-4">
        {/* 2. العمود الأيمن: بيانات العضوية */}
        <div className="col-12 col-lg-4">
          <ClientUserInfoCard profileData={profileData} totalBookings={2} />
        </div>

        {/* 3. العمود الأيسر: العداد التنازلي وسجل الحجوزات */}
        <div className="col-12 col-lg-8">
          <ClientCountdownCard />
          <ClientBookingsTable />
        </div>
      </div>
    </div>
  );
}