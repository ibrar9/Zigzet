import React from 'react';
import { Heart, User, ShieldCheck } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { setIsWishlistOpen, navigatePage, setViewMode } = useStore();

  return (
    <footer className="main-footer">
      {/* Top Footer Links Grid */}
      <div className="container" style={{ padding: '36px 20px 28px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <div className="footer-links-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>Zigzet</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '14px' }}>
              Your premium destination for curated electronics, modern apparel, and home living essentials with fast USA shipping.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              <span>100% Encrypted & Safe Checkout</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Quick Navigation</h5>
            <span className="footer-nav-link" onClick={() => navigatePage('home')}>Home</span>
            <span className="footer-nav-link" onClick={() => navigatePage('shop')}>All Products</span>
            <span className="footer-nav-link" onClick={() => navigatePage('categories')}>Departments</span>
            <span className="footer-nav-link" onClick={() => navigatePage('deals')}>Flash Deals 🔥</span>
            <span className="footer-nav-link" onClick={() => navigatePage('track')}>Track Order 🚚</span>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h5>Customer Support</h5>
            <span className="footer-nav-link" onClick={() => navigatePage('contact')}>Help Center & FAQs</span>
            <span className="footer-nav-link" onClick={() => navigatePage('about')}>About Zigzet</span>
            <span className="footer-nav-link" onClick={() => setIsWishlistOpen(true)}>Saved Wishlist</span>
            <span className="footer-nav-link" onClick={() => navigatePage('contact')}>Contact Support</span>
          </div>

          {/* Newsletter Signup */}
          <div className="footer-col newsletter-col">
            <h5>Stay in the Loop</h5>
            <p style={{ fontSize: '12.5px', color: '#6b7280', marginBottom: '12px' }}>
              Subscribe to get special discount codes and early access to USA flash deals.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing! Check your email for a 15% discount coupon.'); }} style={{ display: 'flex', gap: '6px' }}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                style={{
                  padding: '8px 12px',
                  borderRadius: '9999px',
                  border: '1px solid #e5e7eb',
                  fontSize: '12.5px',
                  flex: 1,
                  outline: 'none'
                }}
              />
              <button 
                type="submit" 
                style={{
                  backgroundColor: '#111827',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: '600'
                }}
              >
                Join
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching exact reference image */}
      <div className="container footer-container" style={{ paddingTop: '18px' }}>
        {/* Footer Left */}
        <div className="footer-left">
          <span 
            className="footer-link" 
            onClick={() => setIsWishlistOpen(true)}
          >
            <Heart size={15} />
            <span>My Wishlist</span>
          </span>
          <span className="footer-divider">|</span>
          <span 
            className="footer-link" 
            onClick={() => {
              window.location.hash = '#admin';
              setViewMode('admin');
            }}
          >
            <User size={15} />
            <span>My Account</span>
          </span>
        </div>

        {/* Footer Center */}
        <div className="footer-center">
          <span>Zigzet © 2026. All rights reserved.</span>
        </div>

        {/* Footer Right */}
        <div className="footer-right">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); alert('Zigzet Privacy Policy: 100% secure personal data handling.'); }}>
            Privacy Policy
          </a>
          <span className="footer-divider">|</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); alert('Zigzet Terms of Service: 30-day money-back guarantee.'); }}>
            Terms of Service
          </a>
          <span className="footer-flag" title="United States">🇺🇸</span>
        </div>
      </div>
    </footer>
  );
};
