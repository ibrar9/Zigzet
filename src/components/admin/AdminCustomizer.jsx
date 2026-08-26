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
  RefreshCw
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminCustomizer = () => {
  const { cmsContent, updateCmsContent, showToast } = useStore();

  const initialSlides = (cmsContent?.heroSlides && cmsContent.heroSlides.length > 0)
    ? cmsContent.heroSlides
    : [
        {
          id: 'slide-1',
          badge: '🔥 LATEST ARRIVALS 2026',
          title: 'Shop Smarter. Live Better.',
          subtitle: 'Discover premium Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas with guaranteed fast delivery.',
          image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
          ctaText: 'Explore Catalog',
          ctaLink: 'shop',
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

  const [slides, setSlides] = useState(initialSlides);
  const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(cmsContent?.autoPlay !== false);
  const [autoPlayInterval, setAutoPlayInterval] = useState(cmsContent?.autoPlayInterval || 5000);
  const [previewIndex, setPreviewIndex] = useState(0);

  const curatedPresets = [
    {
      name: 'K-Beauty Glass Skin Hero',
      url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Luxury Skincare Routine & Botanicals',
      url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Clean Organic Minimalist Aesthetic',
      url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Soothing Cica & Moisture Drops',
      url: 'https://images.unsplash.com/photo-1608248597359-009949989823?w=1200&auto=format&fit=crop&q=80'
    },
    {
      name: 'Luxury Sunscreen & Protection',
      url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200&auto=format&fit=crop&q=80'
    }
  ];

  const activeSlide = slides[selectedSlideIndex] || slides[0] || {};

  const handleUpdateActiveSlide = (field, value) => {
    const updated = [...slides];
    updated[selectedSlideIndex] = {
      ...updated[selectedSlideIndex],
      [field]: value
    };
    setSlides(updated);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      showToast('File too large', 'Please choose an image under 5MB for best performance.', 'warning');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const dataUrl = uploadEvent.target.result;
      handleUpdateActiveSlide('image', dataUrl);
      showToast('Photo Uploaded', 'Banner photo uploaded successfully.');
    };
    reader.readAsDataURL(file);
  };

  const handleAddSlide = () => {
    const newSlideId = `slide-${Date.now()}`;
    const newSlide = {
      id: newSlideId,
      badge: '✨ NEW CAMPAIGN 2026',
      title: 'Experience Pure Radiance',
      subtitle: 'Discover breakthrough dermatological skincare formulated for flawless results.',
      image: curatedPresets[slides.length % curatedPresets.length].url,
      ctaText: 'Shop New Arrivals',
      ctaLink: 'shop',
      bgTheme: 'slate'
    };
    const updated = [...slides, newSlide];
    setSlides(updated);
    setSelectedSlideIndex(updated.length - 1);
    setPreviewIndex(updated.length - 1);
    showToast('Slide Added', 'New banner slide added. Customize its photo and text below.');
  };

  const handleDeleteSlide = (indexToDelete) => {
    if (slides.length <= 1) {
      showToast('Cannot Delete', 'At least one slide is required for the hero banner.', 'warning');
      return;
    }
    const updated = slides.filter((_, idx) => idx !== indexToDelete);
    setSlides(updated);
    const newIndex = Math.max(0, Math.min(selectedSlideIndex, updated.length - 1));
    setSelectedSlideIndex(newIndex);
    setPreviewIndex(newIndex);
    showToast('Slide Deleted', 'Banner slide removed from the homepage carousel.');
  };

  const handleMoveSlide = (fromIndex, direction) => {
    const toIndex = fromIndex + direction;
    if (toIndex < 0 || toIndex >= slides.length) return;
    const updated = [...slides];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setSlides(updated);
    setSelectedSlideIndex(toIndex);
    setPreviewIndex(toIndex);
  };

  const handleSaveAll = (e) => {
    if (e) e.preventDefault();

    const payload = {
      ...cmsContent,
      heroBadge: slides[0]?.badge || 'LATEST ARRIVALS 2026',
      heroTitle: slides[0]?.title || 'Shop Smarter. Live Better.',
      heroSubtitle: slides[0]?.subtitle || '',
      ctaText: slides[0]?.ctaText || 'Explore Catalog',
      ctaLink: slides[0]?.ctaLink || 'shop',
      autoPlay: autoPlay,
      autoPlayInterval: autoPlayInterval,
      heroSlides: slides
    };

    updateCmsContent(payload);
  };

  const currentPreviewSlide = slides[previewIndex] || slides[0] || {};

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 className="admin-section-title" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Palette size={22} color="#7c3aed" />
            <span>Visual Homepage Hero Slider CMS</span>
          </h2>
          <p className="admin-section-desc">
            Upload custom banner photos, create multi-slide auto-moving carousels, and customize headlines with live preview
          </p>
        </div>

        <button 
          onClick={handleSaveAll}
          className="hero-cta-btn" 
          style={{ padding: '10px 24px', fontSize: '13.5px', background: '#7c3aed' }}
        >
          <Save size={16} />
          <span>Save Slider Changes</span>
        </button>
      </div>

      {/* Live Storefront Carousel Preview */}
      <div className="dash-card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={17} color="#7c3aed" />
            <span style={{ fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: '#7c3aed', letterSpacing: '0.05em' }}>
              Live Storefront Preview (Slide {previewIndex + 1} of {slides.length})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              className="admin-action-icon-btn"
              onClick={() => setPreviewIndex((prev) => (prev - 1 + slides.length) % slides.length)}
              title="Previous Slide"
              style={{ width: '32px', height: '32px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="admin-action-icon-btn"
              onClick={() => setPreviewIndex((prev) => (prev + 1) % slides.length)}
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
            background: currentPreviewSlide.bgTheme === 'rose' 
              ? 'linear-gradient(120deg, #fff1f2 0%, #ffe4e6 100%)'
              : currentPreviewSlide.bgTheme === 'amber'
              ? 'linear-gradient(120deg, #fffbeb 0%, #fef3c7 100%)'
              : currentPreviewSlide.bgTheme === 'lavender'
              ? 'linear-gradient(120deg, #faf5ff 0%, #f3e8ff 100%)'
              : currentPreviewSlide.bgTheme === 'mint'
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
            {currentPreviewSlide.badge && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: '#ecfdf5', color: '#059669', fontSize: '11px', fontWeight: '800', padding: '4px 12px', borderRadius: '9999px', letterSpacing: '0.05em', marginBottom: '12px' }}>
                <Flame size={12} color="#059669" />
                {currentPreviewSlide.badge}
              </span>
            )}
            <h1 style={{ fontSize: '26px', fontWeight: '900', color: '#0f172a', lineHeight: '1.2', marginBottom: '10px' }}>
              {currentPreviewSlide.title || 'Shop Smarter. Live Better.'}
            </h1>
            <p style={{ fontSize: '13px', color: '#475569', lineHeight: '1.5', marginBottom: '18px', maxWidth: '420px' }}>
              {currentPreviewSlide.subtitle || 'Discover curated Korean skincare with fast delivery.'}
            </p>
            <button className="hero-cta-btn" style={{ padding: '9px 20px', fontSize: '13px' }}>
              <span>{currentPreviewSlide.ctaText || 'Explore Catalog'}</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ height: '220px', borderRadius: '16px', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }}>
            <img
              src={currentPreviewSlide.image}
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
            <Layers size={17} color="#7c3aed" />
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
              Active Banner Slides ({slides.length})
            </span>
          </div>

          <button 
            type="button"
            onClick={handleAddSlide}
            className="hero-cta-btn"
            style={{ padding: '8px 16px', fontSize: '12.5px', background: '#10b981' }}
          >
            <Plus size={15} />
            <span>Add New Slide</span>
          </button>
        </div>

        {/* Tabs List */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '6px' }}>
          {slides.map((slide, idx) => (
            <div
              key={slide.id || idx}
              onClick={() => {
                setSelectedSlideIndex(idx);
                setPreviewIndex(idx);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 16px',
                borderRadius: '12px',
                border: idx === selectedSlideIndex ? '2px solid #7c3aed' : '1px solid #e2e8f0',
                background: idx === selectedSlideIndex ? '#f5f3ff' : '#ffffff',
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
                <div style={{ fontSize: '13px', fontWeight: '700', color: idx === selectedSlideIndex ? '#7c3aed' : '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
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

      {/* Current Slide Editor Form */}
      <div className="dash-card" style={{ padding: '32px', marginBottom: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#0f172a', margin: '0 0 4px 0' }}>
              Editing Slide #{selectedSlideIndex + 1}: {activeSlide.title || 'Untitled'}
            </h3>
            <p style={{ fontSize: '12.5px', color: '#64748b', margin: 0 }}>
              Upload an image from your computer or choose from curated high-res banners
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => handleMoveSlide(selectedSlideIndex, -1)}
              disabled={selectedSlideIndex === 0}
              className="admin-action-icon-btn"
              title="Move Left"
              style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedSlideIndex === 0 ? 0.4 : 1 }}
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => handleMoveSlide(selectedSlideIndex, 1)}
              disabled={selectedSlideIndex === slides.length - 1}
              className="admin-action-icon-btn"
              title="Move Right"
              style={{ width: '34px', height: '34px', borderRadius: '8px', border: '1px solid #e2e8f0', opacity: selectedSlideIndex === slides.length - 1 ? 0.4 : 1 }}
            >
              <ChevronRight size={16} />
            </button>
            {slides.length > 1 && (
              <button
                type="button"
                onClick={() => handleDeleteSlide(selectedSlideIndex)}
                className="admin-action-icon-btn"
                title="Delete this slide"
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
            📸 Slide Banner Photo (Upload from PC / URL)
          </label>
          
          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '20px', alignItems: 'center' }}>
            {/* Image Preview Box */}
            <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0', background: '#fff', position: 'relative' }}>
              <img
                src={activeSlide.image}
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

            {/* Upload Controls */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label 
                  htmlFor={`banner-upload-${selectedSlideIndex}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#7c3aed',
                    color: '#ffffff',
                    padding: '10px 20px',
                    borderRadius: '10px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(124, 58, 237, 0.25)',
                    transition: 'all 0.2s'
                  }}
                >
                  <Upload size={16} />
                  <span>Choose Photo from Computer</span>
                </label>
                <input 
                  type="file" 
                  id={`banner-upload-${selectedSlideIndex}`} 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  style={{ display: 'none' }} 
                />
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', marginTop: '6px' }}>
                  Supports JPG, PNG, WebP (Instant auto-preview, no server needed)
                </span>
              </div>

              {/* Or URL input */}
              <div className="form-group" style={{ margin: 0 }}>
                <label style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>Or Paste Image Web Link</label>
                <input
                  type="url"
                  value={activeSlide.image || ''}
                  onChange={(e) => handleUpdateActiveSlide('image', e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ fontSize: '12.5px', padding: '8px 12px' }}
                />
              </div>

              {/* Quick Preset Picker */}
              <div>
                <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Or Choose from Curated K-Beauty Presets:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {curatedPresets.map((preset, pIdx) => (
                    <button
                      key={pIdx}
                      type="button"
                      onClick={() => handleUpdateActiveSlide('image', preset.url)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontSize: '11.5px',
                        border: activeSlide.image === preset.url ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                        background: activeSlide.image === preset.url ? '#f5f3ff' : '#ffffff',
                        color: activeSlide.image === preset.url ? '#7c3aed' : '#334155',
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

        {/* 2. SLIDE TEXT & BUTTON SETTINGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div className="checkout-form-grid">
            {/* Pill Badge */}
            <div className="form-group">
              <label>Top Pill Badge Text</label>
              <input
                type="text"
                value={activeSlide.badge || ''}
                onChange={(e) => handleUpdateActiveSlide('badge', e.target.value)}
                placeholder="e.g. 🔥 LATEST ARRIVALS 2026"
              />
            </div>

            {/* Background Theme Style */}
            <div className="form-group">
              <label>Background Theme Style</label>
              <select
                value={activeSlide.bgTheme || 'slate'}
                onChange={(e) => handleUpdateActiveSlide('bgTheme', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              >
                <option value="slate">Clean Slate (Modern Gray)</option>
                <option value="rose">Warm Rose (Soft Pastel)</option>
                <option value="amber">Golden Amber (Warm Glow)</option>
                <option value="lavender">Lavender Glow (Luxury)</option>
                <option value="mint">Fresh Mint (Clean & Organic)</option>
              </select>
            </div>
          </div>

          {/* Main Headline */}
          <div className="form-group">
            <label>Headline Title *</label>
            <input
              type="text"
              value={activeSlide.title || ''}
              onChange={(e) => handleUpdateActiveSlide('title', e.target.value)}
              placeholder="e.g. Shop Smarter. Live Better."
              required
            />
          </div>

          {/* Subtitle */}
          <div className="form-group">
            <label>Subtitle Description</label>
            <textarea
              rows="2"
              value={activeSlide.subtitle || ''}
              onChange={(e) => handleUpdateActiveSlide('subtitle', e.target.value)}
              placeholder="Brief description of the collection or offer..."
            />
          </div>

          <div className="checkout-form-grid">
            {/* CTA Button Label */}
            <div className="form-group">
              <label>CTA Button Label</label>
              <input
                type="text"
                value={activeSlide.ctaText || ''}
                onChange={(e) => handleUpdateActiveSlide('ctaText', e.target.value)}
                placeholder="e.g. Explore Catalog"
              />
            </div>

            {/* CTA Link Target */}
            <div className="form-group">
              <label>CTA Destination Page</label>
              <select
                value={activeSlide.ctaLink || 'shop'}
                onChange={(e) => handleUpdateActiveSlide('ctaLink', e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13.5px' }}
              >
                <option value="shop">Shop Catalog (All Products)</option>
                <option value="deals">Special Deals & Bundles</option>
                <option value="categories">Categories Page</option>
                <option value="about">About Store</option>
                <option value="contact">Contact Support</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 3. GLOBAL CAROUSEL / AUTOPLAY SETTINGS */}
      <div className="dash-card" style={{ padding: '24px', marginBottom: '24px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={17} color="#7c3aed" />
          <span>Carousel Auto-Play Settings</span>
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
          {/* Toggle Auto-Play */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <input
              type="checkbox"
              id="admin-autoplay-toggle"
              checked={autoPlay}
              onChange={(e) => setAutoPlay(e.target.checked)}
              style={{ width: '18px', height: '18px', accentColor: '#7c3aed', cursor: 'pointer' }}
            />
            <label htmlFor="admin-autoplay-toggle" style={{ fontSize: '13.5px', fontWeight: '700', color: '#1e293b', cursor: 'pointer', margin: 0 }}>
              Enable Automatic Slide Transitions
            </label>
          </div>

          {/* Speed Selector */}
          <div className="form-group" style={{ margin: 0 }}>
            <label style={{ fontSize: '12.5px', color: '#475569', fontWeight: '700' }}>Slide Transition Interval</label>
            <select
              value={autoPlayInterval}
              onChange={(e) => setAutoPlayInterval(Number(e.target.value))}
              disabled={!autoPlay}
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

      {/* Save Button Bar */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        <button
          type="button"
          onClick={handleSaveAll}
          className="hero-cta-btn"
          style={{ padding: '12px 32px', fontSize: '14px', background: '#7c3aed', boxShadow: '0 4px 14px rgba(124, 58, 237, 0.3)' }}
        >
          <Save size={16} />
          <span>Save & Apply Homepage Hero Slider</span>
        </button>
      </div>
    </div>
  );
};
