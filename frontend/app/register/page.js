import React from 'react';
import RegisterForm from '../components/Register/RegisterForm';

export default function RegisterPage() {
  return (
    <div 
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-5" 
      dir="rtl" 
      style={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(circle at center, rgba(94, 23, 119, 0.03) 0%, transparent 70%)'
      }}
    >
      <RegisterForm />
    </div>
  );
}