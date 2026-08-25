import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { cmsContent, navigatePage } = useStore();

  const slides = [
    {
      offer: cmsContent?.heroBadge || 'Limited Time Offer',
      titleLine1: cmsContent?.heroTitle ? cmsContent.heroTitle.split('.')[0] + '.' : 'Shop Smarter.',
      titleLine2: cmsContent?.heroTitle && cmsContent.heroTitle.split('.')[1] ? cmsContent.heroTitle.split('.')[1].trim() : 'Live Better.',
      subtitle: cmsContent?.heroSubtitle || 'Discover top-quality products with fast & reliable USA shipping.',
      buttonText: cmsContent?.ctaText || 'Shop Now'
    },
    {
      offer: 'Exclusive New Arrivals',
      titleLine1: 'Next-Gen Gear.',
      titleLine2: 'Elevate Life.',
      subtitle: 'Premium gadgets, trendy apparel, and modern home essentials.',
      buttonText: 'Explore Collection'
    },
    {
      offer: 'Season Super Sale',
      titleLine1: 'Up to 40% Off',
      titleLine2: 'Top Brands.',
      subtitle: 'Hassle-free 30-day returns and encrypted safe checkout.',
      buttonText: 'Claim Deals'
    }
  ];

  const currentSlide = slides[activeSlide];

  const handleShopNow = () => {
    navigatePage(cmsContent?.ctaLink || 'shop');
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-banner-card">
          {/* Left Column: Content */}
          <div className="hero-content">
            <div className="hero-offer-badge">
              <Flame size={15} />
              <span>{currentSlide.offer}</span>
            </div>

            <h1 className="hero-title">
              {currentSlide.titleLine1}
              <br />
              {currentSlide.titleLine2}
            </h1>

            <p className="hero-subtitle">
              {currentSlide.subtitle}
            </p>

            <button className="hero-cta-btn" onClick={handleShopNow}>
              <span>{currentSlide.buttonText}</span>
              <ArrowRight size={16} />
            </button>

            {/* Slide Indicator Dots */}
            <div className="hero-dots">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className={`hero-dot ${idx === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(idx)}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Hero Visual Collage */}
          <div className="hero-visual-collage">
            <div className="hero-composite-wrapper">
              {/* White Wireless Headphones */}
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80"
                alt="Premium Wireless Headphones"
                className="hero-floating-item hero-headphones"
              />

              {/* Apple Watch / Smartwatch */}
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&auto=format&fit=crop&q=80"
                alt="Smart Watch Series 9"
                className="hero-floating-item hero-watch"
              />

              {/* White Athletic Running Sneaker */}
              <img
                src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80"
                alt="Modern Athletic Sneakers"
                className="hero-floating-item hero-sneaker"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
