'use client'
import React from 'react';
import HeroSlider from './components/home/saliderBar'; 

import AboutSection from './components/home/AboutSection';

import ServicesSection from './components/home/ServicesSection';

import GallerySection from './components/home/GallerySection';

export default function HomePage() {
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
