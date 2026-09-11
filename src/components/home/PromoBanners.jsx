import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanners = ({ embedded = false, initialIndex = 0 }) => {
  const { cmsContent, navigatePage, setActiveCategory } = useStore();

  const rawBanners = cmsContent?.promoBanners || [];
  const banners = rawBanners.filter((b) => b.active !== false);

  const [currentIndex, setCurrentIndex] = useState(() => {
    if (banners.length === 0) return 0;
    return Math.abs(initialIndex) % banners.length;
  });
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoPlayTimer = useRef(null);

  // Keep index within bounds if banners change
  useEffect(() => {
    if (banners.length > 0 && currentIndex >= banners.length) {
      setCurrentIndex(0);
    }
  }, [banners.length, currentIndex]);

  const goToNext = useCallback(() => {
    if (banners.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, [banners.length]);

  const goToPrev = useCallback(() => {
    if (banners.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, [banners.length]);

  // Auto-play interval
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const intervalMs = cmsContent?.promoBannersInterval || 4500;
    autoPlayTimer.current = setInterval(goToNext, intervalMs);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [banners.length, isPaused, goToNext, cmsContent?.promoBannersInterval]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e) => {
    setIsPaused(true);
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    const diff = touchStartX.current - touchEndX.current;
    const threshold = 45; // min swipe distance in px

    if (touchEndX.current !== 0) {
      if (diff > threshold) {
        goToNext();
      } else if (diff < -threshold) {
        goToPrev();
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const handleBannerAction = (banner, e) => {
    if (e) e.stopPropagation();

    const linkType = banner.linkType || 'category';
    const linkValue = banner.linkValue || 'all';

    if (linkType === 'category') {
      setActiveCategory(linkValue);
      const elem = document.getElementById('featured-products');
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigatePage('shop');
      }
    } else if (linkType === 'page') {
      navigatePage(linkValue || 'shop');
    } else {
      navigatePage('shop');
    }
  };

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex] || banners[0];

  const carouselMarkup = (
    <div 
      className="center-promo-carousel-wrapper"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Banner Slides Container */}
      <div className="center-promo-slides">
        {banners.map((banner, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={banner.id || `banner-${index}`}
              className={`center-promo-slide ${isActive ? 'is-active' : ''}`}
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
                transform: isActive ? 'scale(1)' : 'scale(0.98)',
                transition: 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out'
              }}
              onClick={(e) => handleBannerAction(banner, e)}
              role="button"
              tabIndex={isActive ? 0 : -1}
              aria-hidden={!isActive}
            >
              {/* High Quality Banner Photo */}
              <img
                src={banner.image}
                alt={banner.title || 'Promotional Banner'}
                className="center-promo-slide-img"
                loading={index === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400&auto=format&fit=crop&q=85';
                }}
              />

              {/* Gradient Vignette so the Button Always Pops Cleanly */}
              <div className="center-promo-slide-overlay" />

              {/* Floating Content / Clean Button on Top */}
              <div className={`center-promo-content-overlay align-${banner.buttonPosition || 'bottom-left'}`}>
                {/* Optional Subtle Badge */}
                {banner.badge && (
                  <span className="center-promo-badge">
                    <Sparkles size={12} className="sparkle-icon" />
                    <span>{banner.badge}</span>
                  </span>
                )}

                {/* Optional Title/Subtitle if admin added it */}
                {banner.title && (
                  <h3 className="center-promo-title">{banner.title}</h3>
                )}
                {banner.subtitle && (
                  <p className="center-promo-subtitle">{banner.subtitle}</p>
                )}

                {/* The Hero Button On Top */}
                <button
                  type="button"
                  className="center-promo-cta-btn"
                  onClick={(e) => handleBannerAction(banner, e)}
                >
                  <span>{banner.buttonText || 'Shop Now'}</span>
                  <ArrowRight size={15} className="cta-arrow-icon" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Left / Right Arrow Buttons (Shown on Desktop & Tablet) */}
      {banners.length > 1 && (
        <>
          <button
            type="button"
            className="center-promo-nav-btn nav-prev"
            onClick={(e) => {
              e.stopPropagation();
              goToPrev();
            }}
            aria-label="Previous promotional banner"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            type="button"
            className="center-promo-nav-btn nav-next"
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            aria-label="Next promotional banner"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Pagination Indicators & Slide Counter */}
      {banners.length > 1 && (
        <div className="center-promo-pagination">
          {banners.map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              className={`center-promo-dot ${dotIdx === currentIndex ? 'is-active' : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(dotIdx);
              }}
              aria-label={`Go to slide ${dotIdx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Compact Slide Counter for Mobile */}
      {banners.length > 1 && (
        <div className="center-promo-counter-pill">
          {currentIndex + 1} / {banners.length}
        </div>
      )}
    </div>
  );

  return (
    <section 
      className={`center-promo-banners-section ${embedded ? 'is-embedded' : ''}`} 
      aria-label="Promotional Carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {embedded ? carouselMarkup : <div className="container">{carouselMarkup}</div>}
    </section>
  );
};
