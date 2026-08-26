import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Flame, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const HeroBanner = () => {
  const { cmsContent, navigatePage } = useStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef(null);

  const fallbackSlides = [
    {
      id: 'slide-1',
      badge: cmsContent?.heroBadge || '🔥 LATEST ARRIVALS 2026',
      title: cmsContent?.heroTitle || 'Shop Smarter. Live Better.',
      subtitle: cmsContent?.heroSubtitle || 'Discover premium Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas with guaranteed fast delivery.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      ctaText: cmsContent?.ctaText || 'Explore Catalog',
      ctaLink: cmsContent?.ctaLink || 'shop',
      bgTheme: 'slate'
    },
    {
      id: 'slide-2',
      badge: '✨ EXCLUSIVE VALUE DEALS',
      title: 'Save Up to 45% on Luxury Sets',
      subtitle: 'Award-winning cleansing balms, cooling peptide ampoules, and complete daily glass skin routines at limited-time promotional prices.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
      ctaText: 'Explore Deals',
      ctaLink: 'deals',
      bgTheme: 'rose'
    },
    {
      id: 'slide-3',
      badge: '🌿 100% AUTHENTIC FORMULAS',
      title: 'Dermatologist Tested. Proven Results.',
      subtitle: 'High-potency Niacinamide, Micro Hyaluronic Acid, Cica, and NAD+ lifting creams for radiant, healthy skin.',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80',
      ctaText: 'Shop Best Sellers',
      ctaLink: 'shop',
      bgTheme: 'amber'
    }
  ];

  const slides = (cmsContent?.heroSlides && cmsContent.heroSlides.length > 0)
    ? cmsContent.heroSlides
    : fallbackSlides;

  const totalSlides = slides.length;
  const isAutoPlay = cmsContent?.autoPlay !== false;
  const intervalMs = cmsContent?.autoPlayInterval || 5000;

  // Auto-play interval
  useEffect(() => {
    if (!isAutoPlay || totalSlides <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goToNextSlide();
    }, intervalMs);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentSlideIndex, isAutoPlay, intervalMs, isHovered, totalSlides]);

  const goToNextSlide = () => {
    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => (prev + 1) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const goToPrevSlide = () => {
    setIsTransitioning(true);
    setCurrentSlideIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const goToSlide = (idx) => {
    if (idx === currentSlideIndex) return;
    setIsTransitioning(true);
    setCurrentSlideIndex(idx);
    setTimeout(() => setIsTransitioning(false), 450);
  };

  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handleCtaClick = () => {
    const targetLink = activeSlide.ctaLink || 'shop';
    navigatePage(targetLink);
  };

  // Get theme gradient style
  const getThemeClass = (theme) => {
    switch (theme) {
      case 'rose':
        return 'theme-rose';
      case 'amber':
        return 'theme-amber';
      case 'lavender':
        return 'theme-lavender';
      case 'mint':
        return 'theme-mint';
      case 'dark':
        return 'theme-dark';
      default:
        return 'theme-slate';
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div 
          className={`hero-slider-wrapper ${getThemeClass(activeSlide.bgTheme)}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Ambient Glow */}
          <div className="hero-ambient-glow" />

          {/* Left / Right Nav Arrows */}
          {totalSlides > 1 && (
            <>
              <button 
                className="hero-arrow-btn hero-arrow-prev" 
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="hero-arrow-btn hero-arrow-next" 
                onClick={goToNextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          <div className={`hero-banner-inner ${isTransitioning ? 'slide-fade-enter' : ''}`}>
            {/* Left Column: Content */}
            <div className="hero-content">
              {activeSlide.badge && (
                <div className="hero-offer-badge">
                  <Flame size={14} className="hero-badge-icon" />
                  <span>{activeSlide.badge}</span>
                </div>
              )}

              <h1 className="hero-title">
                {activeSlide.title}
              </h1>

              <p className="hero-subtitle">
                {activeSlide.subtitle}
              </p>

              <div className="hero-actions-wrap">
                <button className="hero-cta-btn" onClick={handleCtaClick}>
                  <span>{activeSlide.ctaText || 'Shop Collection'}</span>
                  <ArrowRight size={16} />
                </button>

                <div className="hero-perk-chip">
                  <ShieldCheck size={14} color="#10b981" />
                  <span>100% Authentic Guarantee</span>
                </div>
              </div>

              {/* Slide Indicator Dots / Progress Bar */}
              {totalSlides > 1 && (
                <div className="hero-pagination-bar">
                  <div className="hero-dots">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.id || idx}
                        className={`hero-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        {idx === currentSlideIndex && isAutoPlay && !isHovered && (
                          <span 
                            className="hero-dot-progress" 
                            style={{ animationDuration: `${intervalMs}ms` }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  <span className="hero-slide-counter">
                    0{currentSlideIndex + 1} <span className="counter-sep">/</span> 0{totalSlides}
                  </span>
                </div>
              )}
            </div>

            {/* Right Column: Uploaded Custom Banner Image */}
            <div className="hero-visual-frame" onClick={handleCtaClick} style={{ cursor: 'pointer' }}>
              <div className="hero-image-card">
                <img
                  key={activeSlide.id || currentSlideIndex}
                  src={activeSlide.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80'}
                  alt={activeSlide.title || 'Store Banner'}
                  className="hero-main-photo"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80';
                  }}
                />
                
                {/* Floating Micro Badge */}
                <div className="hero-card-floating-badge">
                  <Sparkles size={13} color="#f59e0b" />
                  <span>Top Trending K-Beauty</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
