import React from 'react';
import { Heart, User, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { setIsWishlistOpen, navigatePage, currentUser, showToast, settings } = useStore();
  const storeName = settings?.storeName || 'Zigzet';

  const handleSubscribe = (e) => {
    e.preventDefault();
    showToast('Subscribed Successfully!', 'Check your inbox for your 15% discount welcome code.');
    e.target.reset();
  };

  return (
    <footer className="main-footer">
      {/* Top Footer Links Grid */}
      <div className="container" style={{ padding: '36px 20px 28px 20px', borderBottom: '1px solid #f1f5f9' }}>
        <div className="footer-links-grid">
          {/* Brand Info */}
          <div className="footer-col brand-col">
            <h4 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '8px' }}>{storeName}</h4>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.6', marginBottom: '14px' }}>
              Your premium destination for curated authentic beauty, modern skincare, and lifestyle essentials with fast delivery.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: '600' }}>
              <ShieldCheck size={16} />
              <span>100% Encrypted & Safe Checkout</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h5>Explore Store</h5>
            <span className="footer-nav-link" onClick={() => navigatePage('shop')}>All Products</span>
            <span className="footer-nav-link" onClick={() => navigatePage('brands')}>Official Brands</span>
            <span className="footer-nav-link" onClick={() => navigatePage('deals')}>Deals & Offers</span>
            <span className="footer-nav-link" onClick={() => navigatePage('categories')}>Departments</span>
            <span className="footer-nav-link" onClick={() => navigatePage('track')}>Track Your Order</span>
          </div>

          {/* Customer Care */}
          <div className="footer-col">
            <h5>Customer Care</h5>
            <span className="footer-nav-link" onClick={() => navigatePage('about')}>About {storeName}</span>
            <span className="footer-nav-link" onClick={() => navigatePage('contact')}>24/7 Support</span>
            <span className="footer-nav-link" onClick={() => setIsWishlistOpen(true)}>Saved Wishlist</span>
            <span className="footer-nav-link" onClick={() => navigatePage(currentUser ? 'user-dashboard' : 'user-login')}>My Profile</span>
            <span 
              className="footer-nav-link" 
              onClick={() => navigatePage('influencer-portal')}
              style={{ color: '#5A1F2D', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '5px' }}
            >
              <Sparkles size={13} />
              <span>Influencer & Creator Hub</span>
            </span>
          </div>

          {/* Newsletter Box */}
          <div className="footer-col newsletter-col">
            <h5>Stay in the Loop</h5>
            <p style={{ fontSize: '12.5px', color: '#6b7280', marginBottom: '12px' }}>
              Subscribe to get special discount codes and early access to VIP flash deals.
            </p>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '6px' }}>
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

        {/* Creator / Influencer Invitation Banner */}
        <div style={{
          marginTop: '28px',
          padding: '16px 22px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #faf0f2 0%, #ffffff 100%)',
          border: '1px solid #f2d6dc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #5A1F2D, #461722)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              flexShrink: 0
            }}>
              <Sparkles size={18} />
            </div>
            <div>
              <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#111827' }}>
                Join the Zigzet Creator & Influencer Program
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                Earn up to 12% commission, exclusive follower discount codes, and points on every sale.
              </div>
            </div>
          </div>
          <button
            onClick={() => navigatePage('influencer-portal')}
            style={{
              padding: '9px 18px',
              borderRadius: '9999px',
              background: '#5A1F2D',
              color: '#fff',
              fontSize: '12.5px',
              fontWeight: '700',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(90, 31, 45, 0.25)'
            }}
          >
            <span>Apply as Influencer</span>
            <ArrowRight size={14} />
          </button>
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
            onClick={() => navigatePage(currentUser ? 'user-dashboard' : 'user-login')}
          >
            <User size={15} />
            <span>My Account</span>
          </span>
          <span className="footer-divider">|</span>
          <span 
            className="footer-link" 
            onClick={() => navigatePage('influencer-portal')}
            style={{ color: '#5A1F2D', fontWeight: '700' }}
          >
            <Sparkles size={14} color="#5A1F2D" />
            <span>Creator Portal</span>
          </span>
        </div>

        {/* Footer Center */}
        <div className="footer-center">
          <span>{storeName} © 2026. All rights reserved.</span>
        </div>

        {/* Footer Right */}
        <div className="footer-right">
          <a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy', 'Your personal data is encrypted and 100% secure.', 'info'); }}>
            Privacy Policy
          </a>
          <span className="footer-divider">|</span>
          <a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service', '30-Day money back guarantee on all authentic purchases.', 'info'); }}>
            Terms of Service
          </a>
          <span className="footer-flag" title="United States">USA</span>
        </div>
      </div>
    </footer>
  );
};
