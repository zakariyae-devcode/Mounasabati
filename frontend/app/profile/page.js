import React from 'react';
import ClientProfile from '../components/profile/ClientProfile';
import VendorProfile from '../components/profile/VendorProfile';

export default async function ProfilePage() {
  // مستقبلاً: سيتم جلب هذه البيانات من Django REST API أو NextAuth Session
  const currentUser = {
    username: 'Zakariyae_Dev',
    email: 'zakariyae@example.com',
    cin: 'FK123456',
    role: 'client', // جرب تغيير قيمتها إلى 'vendor' لمعاينة صفحة مزود الخدمة
    profile: {
      phone: '0612345678',
      city: 'Taourirt',
      address: 'Bassatine Taourirt',
      image: null
    }
  };

  // العرض المشروط بناءً على دور المستخدم
  return (
    <div 
      className="min-vh-100 py-4" 
      style={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(circle at center, rgba(94, 23, 119, 0.03) 0%, transparent 70%)'
      }}
    >
      {currentUser.role === 'client' ? (
        <VendorProfile user={currentUser} />
      ) : (
        <ClientProfile user={currentUser} />
      )}
    </div>
  );
}