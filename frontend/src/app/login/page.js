import React from 'react';
import LoginForm from '../components/Login/LoginForm';

export default function LoginPage() {
  return (
    <div 
      className="container-fluid min-vh-100 d-flex justify-content-center align-items-center py-5" 
      dir="rtl" 
      style={{ 
        backgroundColor: 'transparent',
        backgroundImage: 'radial-gradient(circle at center, rgba(94, 23, 119, 0.03) 0%, transparent 70%)'
      }}
    >
      <LoginForm />
    </div>
  );
}