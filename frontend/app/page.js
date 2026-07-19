'use client'
import React from 'react';
import HeroSlider from './components/Home/saliderBar'; 

import AboutSection from './components/Home/AboutSection';

import ServicesSection from './components/Home/ServicesSection';

import GallerySection from './components/Home/GallerySection';

export default function page() {
  return (
    <main style={{ backgroundColor: '#1e0b36', minHeight: '100vh' }}>
      {/* 1. السلايدر الفخم في المقدمة */}
      <HeroSlider />

      <AboutSection/>

      <ServicesSection/>

      <GallerySection/>

      
      
    </main>
  );
}
