import React, { useState } from 'react';
import { 
  Palette, 
  Upload, 
  Image as ImageIcon, 
  Save, 
  Eye, 
  Sparkles, 
  Plus, 
  Trash2, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Clock, 
  Flame, 
  Link, 
  Layers,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Smartphone,
  Monitor
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCustomizer = () => {
  const { cmsContent, updateCmsContent, showToast } = useStore();

  // Active Customizer Section: 'center-banners' | 'hero-slider'
  const [activeTab, setActiveTab] = useState('center-banners');

  // =========================================================================
  // 1. CENTER SCROLLING PROMO BANNERS STATE
  // =========================================================================
  const defaultPromoBanners = [
    {
      id: 'promo-1',
      title: 'Advanced UV Shield SPF50+',
      subtitle: 'Airy Korean sunscreens for 100% daily invisible protection',
      buttonText: 'Shop Sun Care →',
      linkType: 'category',
      linkValue: 'sun-care',
      buttonPosition: 'bottom-left',
      badge: 'Summer Essential',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400&auto=format&fit=crop&q=85',
      showText: false,
      active: true
    },
    {
      id: 'promo-2',
      title: 'Glass Skin Barrier Boost',
      subtitle: 'Triple PDRN & Hyaluronic Micro-Essence for deep hydration',
      buttonText: 'Explore Serums →',
      linkType: 'category',
      linkValue: 'serums-essences',
      buttonPosition: 'bottom-left',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1608248597359-009949989823?w=1400&auto=format&fit=crop&q=85',
      showText: false,
      active: true
    },
    {
      id: 'promo-3',
      title: 'Flash Savings & Luxury Bundles',
      subtitle: 'Save up to 35% on dermatologically proven beauty sets',
      buttonText: 'Shop Flash Deals →',
      linkType: 'page',
      linkValue: 'deals',
      buttonPosition: 'bottom-left',
      badge: 'Limited Offer',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&auto=format&fit=crop&q=85',
      showText: false,
      active: true
    }
  ];

  const initialPromoBanners = (cmsContent?.promoBanners && cmsContent.promoBanners.length > 0)
    ? cmsContent.promoBanners
    : defaultPromoBanners;

  const [promoBanners, setPromoBanners] = useState(initialPromoBanners);
  const [selectedPromoIndex, setSelectedPromoIndex] = useState(0);
  const [promoAutoPlay, setPromoAutoPlay] = useState(cmsContent?.promoBannersAutoPlay !== false);
  const [promoInterval, setPromoInterval] = useState(cmsContent?.promoBannersInterval || 4500);
  const [promoPreviewIndex, setPromoPreviewIndex] = useState(0);
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'mobile'

  const curatedPromoPresets = [
    {
      name: 'Airy Korean Sunscreen & UV Shield (SPF50)',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400&auto=format&fit=crop&q=85'
    },
    {
      name: 'Glass Skin Serums, Micro-Ampoules & Hydration',
      url: 'https://images.unsplash.com/photo-1608248597359-009949989823?w=1400&auto=format&fit=crop&q=85'
    },
    {
      name: 'Luxury Botanical Rituals & Cleansing Balms',
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&auto=format&fit=crop&q=85'
    },
    {
      name: 'Soothing Cica & Moisture Recovery Essence',
      url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1400&auto=format&fit=crop&q=85'
    },
    {
      name: 'Clean Organic Minimalist Glass Aesthetic',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1400&auto=format&fit=crop&q=85'
    }
  ];

  const activePromo = promoBanners[selectedPromoIndex] || promoBanners[0] || {};

  const handleUpdateActivePromo = (field, value) => {
    const updated = [...promoBanners];
    updated[selectedPromoIndex] = {
      ...updated[selectedPromoIndex],
      [field]: value
    };
    setPromoBanners(updated);
  };

  const handlePromoFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showToast('File too large', 'Please choose an image under 8MB for best performance.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      handleUpdateActivePromo('image', dataUrl);
      showToast('Photo Uploaded', 'Banner photo uploaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  const handleAddPromoBanner = () => {
    const newBanner = {
      id: `promo-${Date.now()}`,
      title: 'Special Collection 2026',
      subtitle: 'Discover exclusive Korean skincare routines',
      buttonText: 'Shop Now →',
      linkType: 'category',
      linkValue: 'all',
      buttonPosition: 'bottom-left',
      badge: 'New Offer',
      image: curatedPromoPresets[promoBanners.length % curatedPromoPresets.length].url,
      showText: false,
      active: true
    };
    const updated = [...promoBanners, newBanner];
    setPromoBanners(updated);
    setSelectedPromoIndex(updated.length - 1);
    setPromoPreviewIndex(updated.length - 1);
    showToast('Banner Added', 'New promotional banner created. Upload photo & set button below.');
  };

  const handleDeletePromoBanner = (indexToDelete) => {
    if (promoBanners.length <= 1) {
      showToast('Cannot Delete', 'At least one promotional banner is required.', 'warning');
      return;
    }
    const updated = promoBanners.filter((_, idx) => idx !== indexToDelete);
    setPromoBanners(updated);
    const newIndex = Math.max(0, Math.min(selectedPromoIndex, updated.length - 1));
    setSelectedPromoIndex(newIndex);
    setPromoPreviewIndex(newIndex);
    showToast('Banner Deleted', 'Banner removed from homepage center slider.');
  };

  const handleMovePromoBanner = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= promoBanners.length) return;
    const updated = [...promoBanners];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setPromoBanners(updated);
    setSelectedPromoIndex(toIndex);
    setPromoPreviewIndex(toIndex);
  };

  // =========================================================================
  // 2. TOP HERO SLIDER STATE (PRESERVED)
  // =========================================================================
  const initialHeroSlides = (cmsContent?.heroSlides && cmsContent.heroSlides.length > 0)
    ? cmsContent.heroSlides
    : [
        {
          id: 'slide-1',
          badge: 'LATEST ARRIVALS 2026',
          title: 'Shop Smarter. Live Better.',
          subtitle: 'Discover premium Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas with guaranteed fast delivery.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
          ctaText: 'Explore Catalog',
          ctaLink: 'shop',
          bgTheme: 'slate'
        },
        {
          id: 'slide-2',
          badge: 'EXCLUSIVE VALUE DEALS',
          title: 'Save Up to 45% on Luxury Sets',
          subtitle: 'Award-winning cleansing balms, cooling peptide ampoules, and complete daily glass skin routines at limited-time promotional prices.',
          image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
          ctaText: 'Explore Deals',
          ctaLink: 'deals',
          bgTheme: 'rose'
        },
        {
          id: 'slide-3',
          badge: '100% AUTHENTIC FORMULAS',
          title: 'Dermatologist Tested. Proven Results.',
          subtitle: 'High-potency Niacinamide, Micro Hyaluronic Acid, Cica, and NAD+ lifting creams for radiant, healthy skin.',
          image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80',
          ctaText: 'Shop Best Sellers',
          ctaLink: 'shop',
          bgTheme: 'amber'
        }
      ];

  const [heroSlides, setHeroSlides] = useState(initialHeroSlides);
  const [selectedHeroIndex, setSelectedHeroIndex] = useState(0);
  const [heroAutoPlay, setHeroAutoPlay] = useState(cmsContent?.autoPlay !== false);
  const [heroInterval, setHeroInterval] = useState(cmsContent?.autoPlayInterval || 5000);
  const [heroPreviewIndex, setHeroPreviewIndex] = useState(0);

  const activeHeroSlide = heroSlides[selectedHeroIndex] || heroSlides[0] || {};

  const handleUpdateActiveHeroSlide = (field, value) => {
    const updated = [...heroSlides];
    updated[selectedHeroIndex] = {
      ...updated[selectedHeroIndex],
      [field]: value
    };
    setHeroSlides(updated);
  };

  const handleHeroFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      showToast('File too large', 'Please choose an image under 8MB.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      handleUpdateActiveHeroSlide('image', dataUrl);
      showToast('Photo Uploaded', 'Hero slide photo uploaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  const handleAddHeroSlide = () => {
    const newSlide = {
      id: `slide-${Date.now()}`,
      badge: 'NEW CAMPAIGN 2026',
      title: 'Experience Pure Radiance',
      subtitle: 'Discover breakthrough dermatological skincare formulated for flawless results.',
      image: curatedPromoPresets[heroSlides.length % curatedPromoPresets.length].url,
      ctaText: 'Shop New Arrivals',
      ctaLink: 'shop',
      bgTheme: 'slate'
    };
    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    setSelectedHeroIndex(updated.length - 1);
    setHeroPreviewIndex(updated.length - 1);
    showToast('Slide Added', 'New hero slide added.');
  };

  const handleDeleteHeroSlide = (indexToDelete) => {
    if (heroSlides.length <= 1) {
      showToast('Cannot Delete', 'At least one slide is required for hero banner.', 'warning');
      return;
    }
    const updated = heroSlides.filter((_, idx) => idx !== indexToDelete);
    setHeroSlides(updated);
    const newIndex = Math.max(0, Math.min(selectedHeroIndex, updated.length - 1));
    setSelectedHeroIndex(newIndex);
    setHeroPreviewIndex(newIndex);
    showToast('Slide Deleted', 'Hero slide removed.');
  };

  const handleMoveHeroSlide = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= heroSlides.length) return;
    const updated = [...heroSlides];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setHeroSlides(updated);
    setSelectedHeroIndex(toIndex);
    setHeroPreviewIndex(toIndex);
  };

  // =========================================================================
  // SAVE BOTH SECTIONS LIVE TO STORE
  // =========================================================================
  const handleSaveAll = (e) => {
    if (e) e.preventDefault();

    const payload = {
      ...cmsContent,
      // Hero Slider Content
      heroBadge: heroSlides[0]?.badge || 'LATEST ARRIVALS 2026',
      heroTitle: heroSlides[0]?.title || 'Shop Smarter. Live Better.',
      heroSubtitle: heroSlides[0]?.subtitle || '',
      ctaText: heroSlides[0]?.ctaText || 'Explore Catalog',
      ctaLink: heroSlides[0]?.ctaLink || 'shop',
      autoPlay: heroAutoPlay,
      autoPlayInterval: heroInterval,
      heroSlides: heroSlides,

      // Center Promo Banners Content
      promoBanners: promoBanners,
      promoBannersAutoPlay: promoAutoPlay,
      promoBannersInterval: promoInterval
    };

    updateCmsContent(payload);
  };

  const currentPreviewPromo = promoBanners[promoPreviewIndex] || promoBanners[0] || {};
  const currentPreviewHero = heroSlides[heroPreviewIndex] || heroSlides[0] || {};

  return (
    <div className="admin-page-container">
      {/* Top Header */}
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '20px' }}>
        <div>
          <h2 className="admin-section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={22} color="#5A1F2D" />
            <span>Homepage Visual Banners CMS</span>
          </h2>
          <p className="admin-section-desc">
            Upload custom banner graphics from your device, configure scrolling carousels, and manage action buttons
          </p>
        </div>

        <button 
          onClick={handleSaveAll}
          className="hero-cta-btn" 
          style={{ padding: '10px 24px', fontSize: '13.5px', background: '#5A1F2D', boxShadow: '0 4px 14px rgba(90, 31, 45, 0.25)' }}
        >
          <Save size={16} />
          <span>Save All Changes Live</span>
        </button>
      </div>

      {/* Primary Section Switcher Tabs */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid #e2e8f0', paddingBottom: '12px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('center-banners')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '14px',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'center-banners' ? '#5A1F2D' : '#f1f5f9',
            color: activeTab === 'center-banners' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'center-banners' ? '0 4px 12px rgba(90, 31, 45, 0.25)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Sparkles size={16} />
          <span>Center Scrolling Banners ({promoBanners.length})</span>
          <span style={{ fontSize: '11px', background: activeTab === 'center-banners' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', color: activeTab === 'center-banners' ? '#fff' : '#475569', padding: '2px 8px', borderRadius: '9999px' }}>
            Homepage Center
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('hero-slider')}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '10px',
            fontWeight: '800',
            fontSize: '14px',
            cursor: 'pointer',
            border: 'none',
            background: activeTab === 'hero-slider' ? '#5A1F2D' : '#f1f5f9',
            color: activeTab === 'hero-slider' ? '#ffffff' : '#475569',
            boxShadow: activeTab === 'hero-slider' ? '0 4px 12px rgba(90, 31, 45, 0.25)' : 'none',
            transition: 'all 0.2s'
          }}
        >
          <Layers size={16} />
          <span>Top Hero Slider ({heroSlides.length})</span>
          <span style={{ fontSize: '11px', background: activeTab === 'hero-slider' ? 'rgba(255,255,255,0.25)' : '#e2e8f0', color: activeTab === 'hero-slider' ? '#fff' : '#475569', padding: '2px 8px', borderRadius: '9999px' }}>
            Top of Page
          </span>
        </button>
      </div>

      {/* =====================================================================
          TAB 1: CENTER SCROLLING PROMO BANNERS CMS
          ===================================================================== */}
      {activeTab === 'center-banners' && (
        <>
          {/* Live Storefront Preview Box */}
          <div className="dash-card" style={{ marginBottom: '24px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={17} color="#5A1F2D" />
                <span style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#5A1F2D', letterSpacing: '0.05em' }}>
                  Live Center Banner Preview (Banner {promoPreviewIndex + 1} of {promoBanners.length})
                </span>
              </div>

              {/* Viewport & Slider Switcher */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {/* Desktop / Mobile Preview Toggle */}
                <div style={{ display: 'inline-flex', background: '#f1f5f9', padding: '3px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('desktop')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      background: previewDevice === 'desktop' ? '#ffffff' : 'transparent',
                      color: previewDevice === 'desktop' ? '#0f172a' : '#64748b',
                      boxShadow: previewDevice === 'desktop' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <Monitor size={13} />
                    <span>Desktop</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPreviewDevice('mobile')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      border: 'none',
                      cursor: 'pointer',
                      background: previewDevice === 'mobile' ? '#ffffff' : 'transparent',
                      color: previewDevice === 'mobile' ? '#0f172a' : '#64748b',
                      boxShadow: previewDevice === 'mobile' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none'
                    }}
                  >
                    <Smartphone size={13} />
                    <span>Mobile</span>
                  </button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    className="admin-action-icon-btn"
                    onClick={() => setPromoPreviewIndex((prev) => (prev - 1 + promoBanners.length) % promoBanners.length)}
                    title="Previous Banner"
                    style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    className="admin-action-icon-btn"
                    onClick={() => setPromoPreviewIndex((prev) => (prev + 1) % promoBanners.length)}
                    title="Next Banner"
                    style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Visual Banner Preview Card */}
            <div 
              style={{
                maxWidth: previewDevice === 'mobile' ? '390px' : '100%',
                margin: '0 auto',
                transition: 'all 0.3s ease'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: previewDevice === 'mobile' ? '210px' : '320px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                  border: '1px solid rgba(0,0,0,0.08)'
                }}
              >
                <img
                  src={currentPreviewPromo.image}
                  alt="Center Banner Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400&auto=format&fit=crop&q=85';
                  }}
                />

                {/* Subtle vignette gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(15, 23, 42, 0.75) 0%, rgba(15, 23, 42, 0.2) 45%, transparent 100%)'
                  }}
                />

                {/* Overlay CTA Button & Badge (Clean, visual-first) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: previewDevice === 'mobile' ? '16px' : '28px',
                    left: currentPreviewPromo.buttonPosition === 'bottom-center' ? '50%' : currentPreviewPromo.buttonPosition === 'bottom-right' ? 'auto' : (previewDevice === 'mobile' ? '16px' : '32px'),
                    right: currentPreviewPromo.buttonPosition === 'bottom-right' ? (previewDevice === 'mobile' ? '16px' : '32px') : 'auto',
                    transform: currentPreviewPromo.buttonPosition === 'bottom-center' ? 'translateX(-50%)' : 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: currentPreviewPromo.buttonPosition === 'bottom-center' ? 'center' : currentPreviewPromo.buttonPosition === 'bottom-right' ? 'flex-end' : 'flex-start',
                    gap: '10px',
                    zIndex: 2,
                    maxWidth: previewDevice === 'mobile' ? '85%' : '600px'
                  }}
                >
                  {/* Optional Badge */}
                  {currentPreviewPromo.badge && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        background: 'rgba(255, 255, 255, 0.22)',
                        backdropFilter: 'blur(8px)',
                        color: '#ffffff',
                        fontSize: previewDevice === 'mobile' ? '10px' : '11px',
                        fontWeight: '800',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        letterSpacing: '0.04em',
                        border: '1px solid rgba(255, 255, 255, 0.35)'
                      }}
                    >
                      <Sparkles size={11} />
                      <span>{currentPreviewPromo.badge}</span>
                    </span>
                  )}

                  {/* Optional Text if toggled */}
                  {currentPreviewPromo.showText && currentPreviewPromo.title && (
                    <h3 style={{ margin: 0, color: '#ffffff', fontSize: previewDevice === 'mobile' ? '16px' : '22px', fontWeight: '900', lineHeight: 1.2 }}>
                      {currentPreviewPromo.title}
                    </h3>
                  )}
                  {currentPreviewPromo.showText && currentPreviewPromo.subtitle && (
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.9)', fontSize: previewDevice === 'mobile' ? '11px' : '13px', lineHeight: 1.3 }}>
                      {currentPreviewPromo.subtitle}
                    </p>
                  )}

                  {/* The CTA Button On Top */}
                  <button
                    type="button"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: '#ffffff',
                      color: '#0f172a',
                      fontWeight: '800',
                      fontSize: previewDevice === 'mobile' ? '12px' : '13.5px',
                      padding: previewDevice === 'mobile' ? '8px 18px' : '11px 24px',
                      borderRadius: '9999px',
                      border: 'none',
                      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.25)',
                      cursor: 'pointer'
                    }}
                  >
                    <span>{currentPreviewPromo.buttonText || 'Shop Now →'}</span>
                    <ArrowRight size={14} color="#5A1F2D" />
                  </button>
                </div>

                {/* Counter indicator */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(6px)',
                    color: '#fff',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  {promoPreviewIndex + 1} / {promoBanners.length}
                </div>
              </div>
            </div>
          </div>

          {/* Banner Slides List Navigation */}
          <div className="dash-card" style={{ marginBottom: '24px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={17} color="#5A1F2D" />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                  Center Carousel Banners ({promoBanners.length})
                </span>
              </div>

              <button 
                type="button"
                onClick={handleAddPromoBanner}
                className="hero-cta-btn"
                style={{ padding: '8px 16px', fontSize: '12.5px', background: '#10b981' }}
              >
                <Plus size={15} />
                <span>Add New Banner</span>
              </button>
            </div>

            {/* Horizontal Scrollable Thumbnails List */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              {promoBanners.map((banner, idx) => (
                <div
                  key={banner.id || idx}
                  onClick={() => {
                    setSelectedPromoIndex(idx);
                    setPromoPreviewIndex(idx);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    border: idx === selectedPromoIndex ? '2px solid #5A1F2D' : '1px solid #e2e8f0',
                    background: idx === selectedPromoIndex ? '#faf0f2' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '170px'
                  }}
                >
                  <div style={{ width: '38px', height: '28px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src={banner.image} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=200'; }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '12.5px', fontWeight: '700', color: idx === selectedPromoIndex ? '#5A1F2D' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Banner #{idx + 1}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {banner.buttonText || 'Shop Now'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Banner Detailed Editor Form */}
          <div className="dash-card" style={{ padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  Editing Banner #{selectedPromoIndex + 1}: {activePromo.buttonText || 'Shop Now'}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Upload graphic photos from your device, customize button text, and link destination
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleMovePromoBanner(selectedPromoIndex, -1)}
                  disabled={selectedPromoIndex === 0}
                  className="admin-action-icon-btn"
                  title="Move Left in Sequence"
                  style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedPromoIndex === 0 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMovePromoBanner(selectedPromoIndex, 1)}
                  disabled={selectedPromoIndex === promoBanners.length - 1}
                  className="admin-action-icon-btn"
                  title="Move Right in Sequence"
                  style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedPromoIndex === promoBanners.length - 1 ? 0.4 : 1 }}
                >
                  <ChevronRight size={16} />
                </button>
                {promoBanners.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeletePromoBanner(selectedPromoIndex)}
                    className="admin-action-icon-btn"
                    title="Delete this banner"
                    style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #fee2e2', color: '#ef4444', background: '#fef2f2' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* 1. PHOTO UPLOADER SECTION */}
            <div style={{ marginBottom: '28px', padding: '20px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px' }}>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Banner Photo (Upload from Device / External URL)
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'center' }}>
                {/* Image Preview Box */}
                <div style={{ height: '140px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', position: 'relative' }}>
                  <img
                    src={activePromo.image}
                    alt="Active Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400';
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                    Current Image
                  </div>
                </div>

                {/* Upload Action */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label 
                      htmlFor={`promo-upload-${selectedPromoIndex}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#5A1F2D',
                        color: '#ffffff',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(90, 31, 45, 0.25)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Upload size={16} />
                      <span>Choose Photo from Device</span>
                    </label>
                    <input 
                      type="file" 
                      id={`promo-upload-${selectedPromoIndex}`} 
                      accept="image/*" 
                      onChange={handlePromoFileUpload}
                      style={{ display: 'none' }}
                    />
                    <span style={{ marginLeft: '12px', fontSize: '12px', color: '#64748b' }}>
                      PNG, JPG, WEBP (Max 8MB)
                    </span>
                  </div>

                  {/* Or URL Input */}
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Or Paste Image URL directly:</label>
                    <input
                      type="url"
                      value={activePromo.image || ''}
                      onChange={(e) => handleUpdateActivePromo('image', e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>

                  {/* Curated Luxury Preset Photos */}
                  <div>
                    <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600', marginRight: '8px' }}>
                      Quick Curated Presets:
                    </span>
                    <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '6px', marginTop: '6px' }}>
                      {curatedPromoPresets.map((preset, pIdx) => (
                        <button
                          key={pIdx}
                          type="button"
                          onClick={() => handleUpdateActivePromo('image', preset.url)}
                          style={{
                            fontSize: '11px',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            background: activePromo.image === preset.url ? '#f6e6e9' : '#ffffff',
                            color: activePromo.image === preset.url ? '#5A1F2D' : '#475569',
                            cursor: 'pointer'
                          }}
                        >
                          {preset.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2. BUTTON & LINK CONFIGURATION ("Sirf Button Ho Uske Upar") */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
              {/* Button Text */}
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  Overlay CTA Button Text *
                </label>
                <input
                  type="text"
                  value={activePromo.buttonText || ''}
                  onChange={(e) => handleUpdateActivePromo('buttonText', e.target.value)}
                  placeholder="Shop Now →, Explore Sun Care →, Claim Deals →"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
                <span style={{ fontSize: '11px', color: '#64748b', display: 'block', marginTop: '4px' }}>
                  Clean, bold button displayed right on top of the banner graphic
                </span>
              </div>

              {/* Destination Action */}
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  Button Click Destination *
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <select
                    value={activePromo.linkType || 'category'}
                    onChange={(e) => handleUpdateActivePromo('linkType', e.target.value)}
                    style={{ width: '130px', padding: '9px 10px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                  >
                    <option value="category">Category Filter</option>
                    <option value="page">Store Page</option>
                  </select>

                  {activePromo.linkType === 'category' ? (
                    <select
                      value={activePromo.linkValue || 'sun-care'}
                      onChange={(e) => handleUpdateActivePromo('linkValue', e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="all">All Products (Shop Catalog)</option>
                      <option value="sun-care">Sun Care (SPF50 Protection)</option>
                      <option value="serums-essences">Serums & Ampoules</option>
                      <option value="moisturizers-creams">Moisturizers & Barrier Creams</option>
                      <option value="cleansers">Cleansers & Balms</option>
                      <option value="masks-treatments">Sheet Masks & Treatments</option>
                      <option value="anti-aging-pdrn">Triple PDRN & Lifting</option>
                    </select>
                  ) : (
                    <select
                      value={activePromo.linkValue || 'deals'}
                      onChange={(e) => handleUpdateActivePromo('linkValue', e.target.value)}
                      style={{ flex: 1, padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="deals">Flash Sale & Deals Page</option>
                      <option value="shop">Full Shop Catalog</option>
                      <option value="brands">Brand Spotlight</option>
                      <option value="categories">Categories Explorer</option>
                    </select>
                  )}
                </div>
              </div>

              {/* Button Position Alignment */}
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  Button Position Overlay
                </label>
                <select
                  value={activePromo.buttonPosition || 'bottom-left'}
                  onChange={(e) => handleUpdateActivePromo('buttonPosition', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="bottom-left">Bottom Left (Modern Editorial - Recommended)</option>
                  <option value="bottom-center">Bottom Center (Balanced)</option>
                  <option value="bottom-right">Bottom Right (Callout)</option>
                </select>
              </div>

              {/* Optional Badge */}
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>
                  Optional Badge / Tag
                </label>
                <input
                  type="text"
                  value={activePromo.badge || ''}
                  onChange={(e) => handleUpdateActivePromo('badge', e.target.value)}
                  placeholder="e.g. Summer Essential, Best Seller, Flash Deal"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            {/* 3. OPTIONAL TEXT OVERLAY TOGGLE */}
            <div style={{ padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: activePromo.showText ? '14px' : '0' }}>
                <div>
                  <label htmlFor="promo-show-text" style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="checkbox"
                      id="promo-show-text"
                      checked={activePromo.showText || false}
                      onChange={(e) => handleUpdateActivePromo('showText', e.target.checked)}
                      style={{ width: '16px', height: '16px', accentColor: '#5A1F2D' }}
                    />
                    <span>Show Headline & Subtitle Text Overlay</span>
                  </label>
                  <p style={{ margin: '2px 0 0 24px', fontSize: '12px', color: '#64748b' }}>
                    Uncheck to keep banner clean with <strong>only the graphic image and the floating CTA button</strong> on top.
                  </p>
                </div>
              </div>

              {activePromo.showText && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '12px', paddingTop: '12px', borderTop: '1px solid #e2e8f0' }}>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '600' }}>Banner Title</label>
                    <input
                      type="text"
                      value={activePromo.title || ''}
                      onChange={(e) => handleUpdateActivePromo('title', e.target.value)}
                      placeholder="e.g. Advanced UV Shield SPF50+"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '12.5px', fontWeight: '600' }}>Banner Subtitle</label>
                    <input
                      type="text"
                      value={activePromo.subtitle || ''}
                      onChange={(e) => handleUpdateActivePromo('subtitle', e.target.value)}
                      placeholder="e.g. 100% daily invisible protection"
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 4. AUTO-PLAY TIMING FOR CENTER CAROUSEL */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center', padding: '16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="promo-autoplay-toggle"
                  checked={promoAutoPlay}
                  onChange={(e) => setPromoAutoPlay(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#5A1F2D', cursor: 'pointer' }}
                />
                <label htmlFor="promo-autoplay-toggle" style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', margin: 0 }}>
                  Enable Center Carousel Auto-Scroll
                </label>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '12px', color: '#475569', fontWeight: '700' }}>Slide Duration</label>
                <select
                  value={promoInterval}
                  onChange={(e) => setPromoInterval(Number(e.target.value))}
                  disabled={!promoAutoPlay}
                  style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value={3000}>3 Seconds (Fast)</option>
                  <option value={4500}>4.5 Seconds (Recommended Standard)</option>
                  <option value={6000}>6 Seconds (Relaxed)</option>
                  <option value={8000}>8 Seconds (Slow)</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          TAB 2: TOP HERO SLIDER CMS (PRESERVED)
          ===================================================================== */}
      {activeTab === 'hero-slider' && (
        <>
          {/* Live Storefront Carousel Preview */}
          <div className="dash-card" style={{ marginBottom: '24px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Eye size={17} color="#5A1F2D" />
                <span style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#5A1F2D', letterSpacing: '0.05em' }}>
                  Live Storefront Preview (Slide {heroPreviewIndex + 1} of {heroSlides.length})
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  className="admin-action-icon-btn"
                  onClick={() => setHeroPreviewIndex((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
                  title="Previous Slide"
                  style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  className="admin-action-icon-btn"
                  onClick={() => setHeroPreviewIndex((prev) => (prev + 1) % heroSlides.length)}
                  title="Next Slide"
                  style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>

            {/* Mini Hero Card Preview */}
            <div 
              style={{ 
                background: currentPreviewHero.bgTheme === 'rose' 
                  ? 'linear-gradient(120deg, #fff1f2 0%, #ffe4e6 100%)'
                  : currentPreviewHero.bgTheme === 'amber'
                  ? 'linear-gradient(120deg, #fffbeb 0%, #fef3c7 100%)'
                  : currentPreviewHero.bgTheme === 'lavender'
                  ? 'linear-gradient(120deg, #fdf7f8 0%, #faf0f2 100%)'
                  : currentPreviewHero.bgTheme === 'mint'
                  ? 'linear-gradient(120deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'linear-gradient(120deg, #f8fafc 0%, #e2e8f0 100%)',
                border: '1px solid #e2e8f0', 
                borderRadius: '20px', 
                padding: '32px', 
                display: 'grid', 
                gridTemplateColumns: '1.2fr 1fr', 
                gap: '24px', 
                alignItems: 'center',
                minHeight: '260px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)'
              }}
            >
              <div>
                {currentPreviewHero.badge && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.05em', marginBottom: '12px' }}>
                    <Flame size={12} color="#059669" />
                    {currentPreviewHero.badge}
                  </span>
                )}
                <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: '1.2', marginBottom: '10px' }}>
                  {currentPreviewHero.title || 'Shop Smarter. Live Better.'}
                </h1>
                <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '18px', maxWidth: '420px' }}>
                  {currentPreviewHero.subtitle || 'Discover curated Korean skincare with fast delivery.'}
                </p>
                <button className="hero-cta-btn" style={{ padding: '9px 20px', fontSize: '13px' }}>
                  <span>{currentPreviewHero.ctaText || 'Explore Catalog'}</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              <div style={{ height: '220px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
                <img
                  src={currentPreviewHero.image}
                  alt="Slide Preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80';
                  }}
                />
              </div>
            </div>
          </div>

          {/* Slide Navigation Tabs */}
          <div className="dash-card" style={{ marginBottom: '24px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={17} color="#5A1F2D" />
                <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
                  Active Hero Slides ({heroSlides.length})
                </span>
              </div>

              <button 
                type="button"
                onClick={handleAddHeroSlide}
                className="hero-cta-btn"
                style={{ padding: '8px 16px', fontSize: '12.5px', background: '#10b981' }}
              >
                <Plus size={15} />
                <span>Add New Slide</span>
              </button>
            </div>

            {/* Tabs List */}
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
              {heroSlides.map((slide, idx) => (
                <div
                  key={slide.id || idx}
                  onClick={() => {
                    setSelectedHeroIndex(idx);
                    setHeroPreviewIndex(idx);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 16px',
                    borderRadius: '12px',
                    border: idx === selectedHeroIndex ? '2px solid #5A1F2D' : '1px solid #e2e8f0',
                    background: idx === selectedHeroIndex ? '#faf0f2' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    minWidth: '150px'
                  }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '6px', overflow: 'hidden', flexShrink: 0 }}>
                    <img 
                      src={slide.image} 
                      alt="" 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200'; }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: idx === selectedHeroIndex ? '#5A1F2D' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Slide #{idx + 1}
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {slide.title?.slice(0, 18) || 'Untitled'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Hero Slide Editor Form */}
          <div className="dash-card" style={{ padding: '32px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
                  Editing Hero Slide #{selectedHeroIndex + 1}: {activeHeroSlide.title || 'Untitled'}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
                  Upload an image from your computer or choose from curated high-res banners
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleMoveHeroSlide(selectedHeroIndex, -1)}
                  disabled={selectedHeroIndex === 0}
                  className="admin-action-icon-btn"
                  title="Move Left"
                  style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedHeroIndex === 0 ? 0.4 : 1 }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleMoveHeroSlide(selectedHeroIndex, 1)}
                  disabled={selectedHeroIndex === heroSlides.length - 1}
                  className="admin-action-icon-btn"
                  title="Move Right"
                  style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedHeroIndex === heroSlides.length - 1 ? 0.4 : 1 }}
                >
                  <ChevronRight size={16} />
                </button>
                {heroSlides.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDeleteHeroSlide(selectedHeroIndex)}
                    className="admin-action-icon-btn"
                    title="Delete this slide"
                    style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #fee2e2', color: '#ef4444', background: '#fef2f2' }}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* Photo Uploader */}
            <div style={{ marginBottom: '28px', padding: '20px', background: '#f8fafc', border: '1px dashed #cbd5e1', borderRadius: '16px' }}>
              <label style={{ display: 'block', fontSize: '13.5px', fontWeight: '800', color: '#0f172a', marginBottom: '8px' }}>
                Slide Banner Photo (Upload from PC / URL)
              </label>
              
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'center' }}>
                <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', position: 'relative' }}>
                  <img
                    src={activeHeroSlide.image}
                    alt="Selected Banner"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200';
                    }}
                  />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.65)', color: '#fff', fontSize: '11px', padding: '3px 8px', borderRadius: '6px', backdropFilter: 'blur(4px)' }}>
                    Live Banner
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <label 
                      htmlFor={`hero-upload-${selectedHeroIndex}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: '#5A1F2D',
                        color: '#ffffff',
                        padding: '10px 20px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        boxShadow: '0 2px 8px rgba(90, 31, 45, 0.25)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <Upload size={16} />
                      <span>Choose Photo from Computer</span>
                    </label>
                    <input 
                      type="file" 
                      id={`hero-upload-${selectedHeroIndex}`} 
                      accept="image/*" 
                      onChange={handleHeroFileUpload}
                      style={{ display: 'none' }}
                    />
                    <span style={{ marginLeft: '12px', fontSize: '12px', color: '#64748b' }}>
                      Supports PNG, JPG, WEBP (Under 8MB)
                    </span>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Or Paste Image URL directly:</label>
                    <input
                      type="url"
                      value={activeHeroSlide.image || ''}
                      onChange={(e) => handleUpdateActiveHeroSlide('image', e.target.value)}
                      placeholder="https://images.unsplash.com/photo-..."
                      style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & CTA Form */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Top Badge Pill</label>
                <input
                  type="text"
                  value={activeHeroSlide.badge || ''}
                  onChange={(e) => handleUpdateActiveHeroSlide('badge', e.target.value)}
                  placeholder="e.g. LATEST ARRIVALS 2026"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Background Tint Theme</label>
                <select
                  value={activeHeroSlide.bgTheme || 'slate'}
                  onChange={(e) => handleUpdateActiveHeroSlide('bgTheme', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="slate">Cool Slate Neutral</option>
                  <option value="rose">Soft Rose & Blossom</option>
                  <option value="amber">Warm Amber Gold</option>
                  <option value="lavender">Gentle Lavender Mist</option>
                  <option value="mint">Fresh Mint Botanical</option>
                </select>
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Headline Title *</label>
                <input
                  type="text"
                  value={activeHeroSlide.title || ''}
                  onChange={(e) => handleUpdateActiveHeroSlide('title', e.target.value)}
                  placeholder="e.g. Shop Smarter. Live Better."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', fontWeight: '700' }}
                />
              </div>

              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>Subtext Description</label>
                <textarea
                  value={activeHeroSlide.subtitle || ''}
                  onChange={(e) => handleUpdateActiveHeroSlide('subtitle', e.target.value)}
                  rows={2}
                  placeholder="e.g. Discover premium Korean skincare, advanced SPF50 sunscreens..."
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px', resize: 'vertical' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>CTA Button Label</label>
                <input
                  type="text"
                  value={activeHeroSlide.ctaText || ''}
                  onChange={(e) => handleUpdateActiveHeroSlide('ctaText', e.target.value)}
                  placeholder="e.g. Explore Catalog"
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>CTA Destination Target</label>
                <select
                  value={activeHeroSlide.ctaLink || 'shop'}
                  onChange={(e) => handleUpdateActiveHeroSlide('ctaLink', e.target.value)}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value="shop">Shop All Catalog</option>
                  <option value="deals">Flash Sale & Deals</option>
                  <option value="categories">Categories Grid</option>
                  <option value="brands">Brand Showcase</option>
                </select>
              </div>
            </div>
          </div>

          {/* Auto-Play Settings */}
          <div className="dash-card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Clock size={17} color="#5A1F2D" />
              <span>Hero Slider Auto-Play Settings</span>
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <input
                  type="checkbox"
                  id="admin-autoplay-toggle"
                  checked={heroAutoPlay}
                  onChange={(e) => setHeroAutoPlay(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#5A1F2D', cursor: 'pointer' }}
                />
                <label htmlFor="admin-autoplay-toggle" style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', margin: 0 }}>
                  Enable Automatic Slide Transitions
                </label>
              </div>

              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '12.5px', color: '#475569', fontWeight: '700' }}>Slide Transition Interval</label>
                <select
                  value={heroInterval}
                  onChange={(e) => setHeroInterval(Number(e.target.value))}
                  disabled={!heroAutoPlay}
                  style={{ width: '100%', padding: '9px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                >
                  <option value={3000}>3 Seconds (Fast)</option>
                  <option value={4000}>4 Seconds (Smooth)</option>
                  <option value={5000}>5 Seconds (Recommended Standard)</option>
                  <option value={7000}>7 Seconds (Relaxed)</option>
                  <option value={10000}>10 Seconds (Slow)</option>
                </select>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Global Save Button Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
        <button
          type="button"
          onClick={handleSaveAll}
          className="hero-cta-btn"
          style={{ padding: '12px 36px', fontSize: '14px', background: '#5A1F2D', boxShadow: '0 4px 16px rgba(90, 31, 45, 0.25)' }}
        >
          <Save size={17} />
          <span>Save & Apply All Homepage Banners</span>
        </button>
      </div>
    </div>
  );
};
