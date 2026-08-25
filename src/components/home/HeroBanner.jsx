import React, { useState } from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const { cmsContent, navigatePage } = useStore();

  const slides = [
    {
      offer: cmsContent?.heroBadge || '✨ Authentic K-Beauty & Skincare',
      titleLine1: cmsContent?.heroTitle ? cmsContent.heroTitle.split('.')[0] + '.' : 'Flawless Skin.',
      titleLine2: cmsContent?.heroTitle && cmsContent.heroTitle.split('.')[1] ? cmsContent.heroTitle.split('.')[1].trim() : 'Pure K-Beauty.',
      subtitle: cmsContent?.heroSubtitle || 'Discover premium Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas.',
      buttonText: cmsContent?.ctaText || 'Shop Collection'
    },
    {
      offer: '🔥 Exclusive Limited Bundles',
      titleLine1: 'Save Up to 45%',
      titleLine2: 'On Value Sets.',
      subtitle: 'Luxury day & night cream duos, soothing cooling masks, and iconic cleansing balms.',
      buttonText: 'Explore Sets'
    },
    {
      offer: '🌿 Clean & Dermatologist Tested',
      titleLine1: 'Gentle Actives.',
      titleLine2: 'Real Results.',
      subtitle: 'Formulated with Niacinamide, Hyaluronic Acid, Vitamin C, and calming Cica.',
      buttonText: 'Shop Best Sellers'
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
              {/* Product 1: Cooling Skincare Set */}
              <img
                src="https://cdn.shopify.com/s/files/1/0926/4742/4370/files/D4.png?v=1787424641"
                alt="Cell Fusion C Cooling Set"
                className="hero-floating-item hero-headphones"
                style={{ objectFit: 'contain', background: 'transparent' }}
              />

              {/* Product 2: SkinStandard Matcha NAD+ */}
              <img
                src="https://cdn.shopify.com/s/files/1/0926/4742/4370/files/SkinStandardMatchaActiveNAD_LiftingCream_55g.png?v=1787080369"
                alt="Matcha Active NAD+ Cream"
                className="hero-floating-item hero-watch"
                style={{ objectFit: 'contain', background: 'transparent' }}
              />

              {/* Product 3: Advanced Clear Sunscreen */}
              <img
                src="https://cdn.shopify.com/s/files/1/0926/4742/4370/files/AdvancedClearSunscreen100SPF50PA_50ml.png?v=1786558607"
                alt="Advanced Clear Sunscreen SPF50"
                className="hero-floating-item hero-sneaker"
                style={{ objectFit: 'contain', background: 'transparent' }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
