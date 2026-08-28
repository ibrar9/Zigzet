import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, Flame, ChevronLeft, ChevronRight, Sparkles, 
  ShieldCheck, Sun, Droplets, Leaf, ShoppingBag 
} from 'lucide-react';
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
      titleLine1: 'Shop Smarter.',
      titleLine2: 'Live Better.',
      subtitle: cmsContent?.heroSubtitle || 'Premium Korean Skincare & Advanced Sun Protection for Healthy, Radiant Skin Every Day.',
      tagline: '“ Real Ingredients. Real Results. ”',
      features: [
        { icon: Sun, title: 'Advanced SPF50', desc: 'UVA/UVB Protection' },
        { icon: Droplets, title: 'Triple PDRN', desc: 'Barrier Repair' },
        { icon: Leaf, title: 'Gentle. Safe.', desc: 'Authentic.' }
      ],
      trendingBadge: {
        tag: 'Top Trending',
        title: 'K-Beauty',
        sub: 'Loved by Thousands'
      },
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85',
      ctaText: cmsContent?.ctaText || 'Explore Catalog',
      ctaLink: cmsContent?.ctaLink || 'shop',
      bgTheme: 'rose'
    },
    {
      id: 'slide-2',
      badge: '✨ EXCLUSIVE VALUE DEALS',
      titleLine1: 'Save Up to 45%',
      titleLine2: 'On Luxury Sets.',
      subtitle: 'Award-winning cleansing balms, cooling peptide ampoules, and complete daily glass skin routines at promotional prices.',
      tagline: '“ Dermatologist Tested. Clinically Proven. ”',
      features: [
        { icon: Sparkles, title: 'NAD+ Boost', desc: 'Cellular Renewal' },
        { icon: Droplets, title: 'Hyaluronic Micro', desc: 'Deep 72h Moisture' },
        { icon: ShieldCheck, title: '100% Sealed', desc: 'Direct From Seoul' }
      ],
      trendingBadge: {
        tag: 'Flash Promo',
        title: 'Save 45%',
        sub: 'Limited Stock'
      },
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1600&auto=format&fit=crop&q=85',
      ctaText: 'Explore Deals',
      ctaLink: 'deals',
      bgTheme: 'lavender'
    },
    {
      id: 'slide-3',
      badge: '🌿 100% AUTHENTIC FORMULAS',
      titleLine1: 'Radiant Glow.',
      titleLine2: 'Pure Ingredients.',
      subtitle: 'High-potency Niacinamide, Micro Hyaluronic Acid, Cica, and Collagen lifting creams for radiant, youthful skin.',
      tagline: '“ Empowering Your Everyday Skincare Ritual. ”',
      features: [
        { icon: Leaf, title: 'Clean Beauty', desc: 'Zero Harsh Chemicals' },
        { icon: Sun, title: 'Daily Defense', desc: 'Pollution Shield' },
        { icon: ShieldCheck, title: 'Batch Verified', desc: 'Official Warranty' }
      ],
      trendingBadge: {
        tag: 'Top Rated',
        title: '4.9 / 5.0',
        sub: 'Over 12,000 Reviews'
      },
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1600&auto=format&fit=crop&q=85',
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
  const intervalMs = cmsContent?.autoPlayInterval || 6000;

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

  const features = activeSlide.features || [
    { icon: Sun, title: 'Advanced SPF50', desc: 'UVA/UVB Protection' },
    { icon: Droplets, title: 'Triple PDRN', desc: 'Barrier Repair' },
    { icon: Leaf, title: 'Gentle. Safe.', desc: 'Authentic.' }
  ];

  const trending = activeSlide.trendingBadge || {
    tag: 'Top Trending',
    title: 'K-Beauty',
    sub: 'Loved by Thousands'
  };

  // Smart Title Formatting to prevent duplication
  let displayTitleLine1 = activeSlide.titleLine1;
  let displayTitleLine2 = activeSlide.titleLine2;

  if (!displayTitleLine1) {
    const fullTitle = activeSlide.title || 'Shop Smarter. Live Better.';
    if (fullTitle.includes('.')) {
      const parts = fullTitle.split(/(?<=\.)\s+/);
      displayTitleLine1 = parts[0] || 'Shop Smarter.';
      displayTitleLine2 = parts.slice(1).join(' ') || 'Live Better.';
    } else if (fullTitle.toLowerCase().includes(' on ')) {
      const idx = fullTitle.toLowerCase().indexOf(' on ');
      displayTitleLine1 = fullTitle.substring(0, idx);
      displayTitleLine2 = fullTitle.substring(idx + 1);
    } else {
      const words = fullTitle.split(' ');
      const mid = Math.ceil(words.length / 2);
      displayTitleLine1 = words.slice(0, mid).join(' ');
      displayTitleLine2 = words.slice(mid).join(' ');
    }
  }

  const displaySubtitle = currentSlideIndex === 0
    ? 'Premium Korean Skincare & Advanced Sun Protection for Healthy, Radiant Skin Every Day.'
    : (activeSlide.subtitle || 'Discover curated Korean skincare routines with fast delivery.');

  return (
    <section className="hero-section">
      <div className="container">
        <div 
          className={`hero-lux-canvas theme-${activeSlide.bgTheme || 'rose'}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Full Bleed Background Image */}
          <div className="hero-lux-bg-layer">
            <img
              src={activeSlide.image || 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1600&auto=format&fit=crop&q=85'}
              alt={displayTitleLine1 || 'K-Beauty Hero'}
              className="hero-lux-bg-img"
            />
          </div>

          {/* Luxury Rose Gradient Overlay Scrim for Crystal Clear Typography */}
          <div className="hero-lux-scrim-overlay" />

          {/* Left / Right Nav Arrows */}
          {totalSlides > 1 && (
            <>
              <button 
                className="hero-lux-arrow hero-lux-arrow-prev" 
                onClick={goToPrevSlide}
                aria-label="Previous slide"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                className="hero-lux-arrow hero-lux-arrow-next" 
                onClick={goToNextSlide}
                aria-label="Next slide"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}

          {/* Main Hero Content */}
          <div className={`hero-lux-inner ${isTransitioning ? 'lux-fade-transition' : ''}`}>
            <div className="hero-lux-content">
              {/* Badge */}
              {activeSlide.badge && (
                <div className="hero-lux-badge">
                  <Flame size={13} className="hero-lux-fire-icon" />
                  <span>{activeSlide.badge}</span>
                </div>
              )}

              {/* Title */}
              <h1 className="hero-lux-title">
                {displayTitleLine1}
                <br />
                <span className="hero-lux-title-accent">
                  {displayTitleLine2}
                </span>
              </h1>

              {/* Subtitle */}
              <p className="hero-lux-subtitle">
                {displaySubtitle}
              </p>

              {/* 3 Feature Highlight Circles */}
              <div className="hero-lux-features-row">
                {features.map((feat, idx) => {
                  const IconComp = feat.icon || Sparkles;
                  return (
                    <div key={idx} className="hero-lux-feature-item">
                      <div className="hero-lux-feature-circle">
                        <IconComp size={15} />
                      </div>
                      <div className="hero-lux-feature-text">
                        <strong>{feat.title}</strong>
                        <span>{feat.desc}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA Action Buttons */}
              <div className="hero-lux-actions-row">
                <button className="hero-lux-cta-btn" onClick={handleCtaClick}>
                  <ShoppingBag size={15} />
                  <span>{activeSlide.ctaText || 'Explore Catalog'}</span>
                  <ArrowRight size={15} />
                </button>

                <div className="hero-lux-guarantee-pill">
                  <ShieldCheck size={14} />
                  <span>100% AUTHENTIC GUARANTEE</span>
                </div>
              </div>

              {/* Elegant Cursive Tagline */}
              <div className="hero-lux-tagline">
                <span>{activeSlide.tagline || '“ Real Ingredients. Real Results. ”'}</span>
              </div>

              {/* Slide Dots / Counter Indicator */}
              {totalSlides > 1 && (
                <div className="hero-lux-pagination">
                  <div className="hero-lux-dots">
                    {slides.map((slide, idx) => (
                      <button
                        key={slide.id || idx}
                        className={`hero-lux-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                      >
                        {idx === currentSlideIndex && isAutoPlay && !isHovered && (
                          <span 
                            className="hero-lux-dot-fill" 
                            style={{ animationDuration: `${intervalMs}ms` }}
                          />
                        )}
                      </button>
                    ))}
                  </div>
                  <span className="hero-lux-counter">
                    0{currentSlideIndex + 1} / 0{totalSlides}
                  </span>
                </div>
              )}
            </div>

            {/* Bottom-Right Floating Glassmorphic Badge */}
            <div className="hero-lux-floating-card" onClick={handleCtaClick}>
              <div className="floating-card-tag">
                <Sparkles size={12} />
                <span>{trending.tag}</span>
              </div>
              <h3 className="floating-card-title">{trending.title}</h3>
              <p className="floating-card-sub">{trending.sub}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
