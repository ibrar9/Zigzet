import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, Layers, ShieldCheck, Zap, Activity, 
  TrendingUp, ArrowUpRight, Search, Sliders, Bell, 
  CheckCircle2, Compass, Smartphone, Monitor, Palette
} from 'lucide-react';

export const ModernUiShowcase = () => {
  // Theme state
  const [activeTheme, setActiveTheme] = useState('indigo');
  const [activeTab, setActiveTab] = useState('overview');
  const [isHovering3D, setIsHovering3D] = useState(false);
  const [cardTilt, setCardTilt] = useState({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  const [searchQuery, setSearchQuery] = useState('');
  const [liveCounter, setLiveCounter] = useState(94.8);
  const cardRef = useRef(null);

  // Theme palettes configuration
  const themes = {
    indigo: {
      name: 'Cyber Indigo',
      primary: '#6366F1',
      accent: '#38BDF8',
      glow: 'rgba(99, 102, 241, 0.35)',
      gradient: 'linear-gradient(135deg, #6366F1 0%, #38BDF8 100%)',
      surface: 'rgba(15, 23, 42, 0.85)',
      border: 'rgba(99, 102, 241, 0.25)',
      badgeBg: 'rgba(99, 102, 241, 0.12)',
    },
    emerald: {
      name: 'Aurora Emerald',
      primary: '#10B981',
      accent: '#06B6D4',
      glow: 'rgba(16, 185, 129, 0.35)',
      gradient: 'linear-gradient(135deg, #10B981 0%, #06B6D4 100%)',
      surface: 'rgba(6, 30, 25, 0.85)',
      border: 'rgba(16, 185, 129, 0.25)',
      badgeBg: 'rgba(16, 185, 129, 0.12)',
    },
    rose: {
      name: 'Sunset Rose',
      primary: '#F43F5E',
      accent: '#FB923C',
      glow: 'rgba(244, 63, 94, 0.35)',
      gradient: 'linear-gradient(135deg, #F43F5E 0%, #FB923C 100%)',
      surface: 'rgba(30, 10, 20, 0.85)',
      border: 'rgba(244, 63, 94, 0.25)',
      badgeBg: 'rgba(244, 63, 94, 0.12)',
    },
    amber: {
      name: 'Electric Amber',
      primary: '#F59E0B',
      accent: '#EC4899',
      glow: 'rgba(245, 158, 11, 0.35)',
      gradient: 'linear-gradient(135deg, #F59E0B 0%, #EC4899 100%)',
      surface: 'rgba(28, 20, 5, 0.85)',
      border: 'rgba(245, 158, 11, 0.25)',
      badgeBg: 'rgba(245, 158, 11, 0.12)',
    }
  };

  const currentTheme = themes[activeTheme];

  // 3D Card tilt physics calculation
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max 12 deg tilt
    const rotateY = ((x - centerX) / centerX) * 12;
    const shineX = (x / rect.width) * 100;
    const shineY = (y / rect.height) * 100;

    setCardTilt({ rotateX, rotateY, shineX, shineY });
  };

  const handleMouseLeave = () => {
    setIsHovering3D(false);
    setCardTilt({ rotateX: 0, rotateY: 0, shineX: 50, shineY: 50 });
  };

  // Live metric tick effect
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveCounter((prev) => +(prev + (Math.random() * 0.4 - 0.2)).toFixed(1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="modern-ui-studio-container" style={{
      background: 'radial-gradient(ellipse at 50% 0%, #1e1b4b 0%, #090d16 60%, #030712 100%)',
      minHeight: '100vh',
      padding: '4rem 1.5rem',
      color: '#F8FAFC',
      fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif",
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Animated Aurora Glow Orbs */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: '20%',
        width: '500px',
        height: '500px',
        background: currentTheme.glow,
        filter: 'blur(140px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        transition: 'all 0.8s ease',
        zIndex: 0
      }} />

      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '450px',
        height: '450px',
        background: 'rgba(56, 189, 248, 0.2)',
        filter: 'blur(160px)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 0
      }} />

      <div style={{ maxWidth: '1240px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header Title Section */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.4rem 1rem',
            borderRadius: '9999px',
            background: currentTheme.badgeBg,
            border: `1px solid ${currentTheme.border}`,
            color: currentTheme.accent,
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginBottom: '1rem',
            boxShadow: `0 0 20px ${currentTheme.glow}`
          }}>
            <Sparkles size={14} />
            <span>State-of-the-Art UI Studio 2026</span>
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            margin: '0.5rem 0 1.25rem',
            background: 'linear-gradient(180deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Next-Generation <span style={{
              background: currentTheme.gradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>Modern UI Experience</span>
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#94A3B8',
            maxWidth: '680px',
            margin: '0 auto 2rem',
            lineHeight: 1.6
          }}>
            Crafted with Glassmorphism 2.0, interactive 3D physics, fluid micro-interactions, and high-contrast accessibility.
          </p>

          {/* Interactive Theme Palette Selector */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '0.5rem 0.85rem',
            borderRadius: '9999px',
            background: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Palette size={15} style={{ color: '#94A3B8', marginLeft: '0.25rem' }} />
            <span style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: 500 }}>Select Theme:</span>
            {Object.keys(themes).map((key) => {
              const t = themes[key];
              const isSelected = activeTheme === key;
              return (
                <button
                  key={key}
                  onClick={() => setActiveTheme(key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '9999px',
                    border: isSelected ? `1px solid ${t.primary}` : '1px solid transparent',
                    background: isSelected ? t.badgeBg : 'transparent',
                    color: isSelected ? '#FFFFFF' : '#94A3B8',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    transition: 'all 0.25s ease'
                  }}
                >
                  <span style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: t.gradient,
                    boxShadow: isSelected ? `0 0 10px ${t.primary}` : 'none'
                  }} />
                  {t.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Grid: Left 3D Hero Widget, Right Interactive Lab */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 520px), 1fr))',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          
          {/* LEFT: Interactive 3D Physics Glass Card */}
          <div
            style={{ perspective: '1000px', cursor: 'grab' }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering3D(true)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              ref={cardRef}
              style={{
                background: currentTheme.surface,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '1.5rem',
                padding: '2.5rem',
                border: `1px solid ${currentTheme.border}`,
                boxShadow: isHovering3D 
                  ? `0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 40px ${currentTheme.glow}` 
                  : '0 15px 35px rgba(0, 0, 0, 0.4)',
                transform: `rotateX(${cardTilt.rotateX}deg) rotateY(${cardTilt.rotateY}deg) scale3d(${isHovering3D ? 1.02 : 1}, ${isHovering3D ? 1.02 : 1}, 1)`,
                transition: isHovering3D ? 'transform 0.1s ease-out, box-shadow 0.3s ease' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Dynamic Mouse Glare Specular Reflection */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle at ${cardTilt.shineX}% ${cardTilt.shineY}%, rgba(255, 255, 255, 0.12) 0%, transparent 60%)`,
                pointerEvents: 'none',
                opacity: isHovering3D ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                <div style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '1rem',
                  background: currentTheme.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: `0 8px 20px ${currentTheme.glow}`
                }}>
                  <Zap size={26} color="#FFFFFF" />
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '9999px',
                  background: 'rgba(34, 197, 94, 0.15)',
                  color: '#4ADE80',
                  fontSize: '0.8rem',
                  fontWeight: 600
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80', animation: 'pulse 1.5s infinite' }} />
                  Live Reactive 60fps
                </div>
              </div>

              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '0 0 0.5rem', letterSpacing: '-0.02em' }}>
                Interactive 3D Glass Surface
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Move your cursor over this surface to inspect real-time gyroscopic matrix transforms and dynamic specular highlights.
              </p>

              {/* Live Metric Display */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '1rem',
                padding: '1.25rem',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem'
              }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>System Performance</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    {liveCounter}%
                    <TrendingUp size={16} color="#4ADE80" />
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem', color: '#64748B', display: 'block', marginBottom: '0.25rem' }}>Render Latency</span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 700, color: currentTheme.accent }}>
                    0.8 ms
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Modern Component Laboratory */}
          <div style={{
            background: 'rgba(15, 23, 42, 0.7)',
            backdropFilter: 'blur(16px)',
            borderRadius: '1.5rem',
            padding: '2rem',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.75rem'
          }}>
            
            {/* Component 1: Animated Tab Pill Switcher */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', display: 'block', marginBottom: '0.75rem' }}>
                1. Animated Floating Tabs
              </label>
              <div style={{
                display: 'flex',
                background: 'rgba(30, 41, 59, 0.6)',
                padding: '0.35rem',
                borderRadius: '0.75rem',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}>
                {['overview', 'analytics', 'security', 'settings'].map((tab) => {
                  const active = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      style={{
                        flex: 1,
                        padding: '0.6rem 0.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        background: active ? currentTheme.gradient : 'transparent',
                        color: active ? '#FFFFFF' : '#94A3B8',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: active ? `0 4px 15px ${currentTheme.glow}` : 'none',
                        textTransform: 'capitalize'
                      }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Component 2: High-Tech Search Field with Shortcut */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', display: 'block', marginBottom: '0.75rem' }}>
                2. Glassmorphic Live Search Input
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '0.75rem',
                padding: '0.75rem 1rem',
                gap: '0.75rem',
                transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
              }}>
                <Search size={18} color="#94A3B8" />
                <input
                  type="text"
                  placeholder="Quick search components, APIs, design tokens..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    outline: 'none',
                    color: '#F8FAFC',
                    width: '100%',
                    fontSize: '0.95rem'
                  }}
                />
                <kbd style={{
                  padding: '0.2rem 0.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '0.35rem',
                  fontSize: '0.75rem',
                  color: '#94A3B8',
                  fontFamily: 'monospace',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>⌘K</kbd>
              </div>
            </div>

            {/* Component 3: Modern Glow Action Buttons */}
            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600, color: '#94A3B8', display: 'block', marginBottom: '0.75rem' }}>
                3. Micro-Interaction Action Buttons
              </label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <button style={{
                  background: currentTheme.gradient,
                  border: 'none',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1.5rem',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  boxShadow: `0 4px 20px ${currentTheme.glow}`,
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                }}>
                  <Zap size={16} />
                  <span>Explore Components</span>
                  <ArrowUpRight size={16} />
                </button>

                <button style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '0.75rem',
                  padding: '0.85rem 1.5rem',
                  color: '#F8FAFC',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}>
                  <ShieldCheck size={16} color="#38BDF8" />
                  <span>Verify Compliance</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Metric Summary Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {[
            { icon: Activity, title: 'Real-Time Frame Rate', value: '120 FPS', desc: 'Hardware-accelerated CSS GPU rasterization' },
            { icon: Layers, title: 'Design Token System', value: '100% OKLCH', desc: 'Harmonious semantic color scales & dark mode' },
            { icon: Compass, title: 'Accessibility Rating', value: 'WCAG 2.1 AA', desc: '100% screen-reader and keyboard navigable' },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(14px)',
                  borderRadius: '1.25rem',
                  padding: '1.75rem',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }}
              >
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '0.75rem',
                  background: currentTheme.badgeBg,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                  color: currentTheme.primary
                }}>
                  <Icon size={20} />
                </div>
                <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#F8FAFC', marginBottom: '0.25rem' }}>
                  {item.value}
                </div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#94A3B8', margin: '0 0 0.4rem' }}>
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: '#64748B', margin: 0, lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
