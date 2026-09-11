import React, { useState } from 'react';
import { Heart, User, ShieldCheck, Sparkles, ArrowRight, Instagram, Facebook, Youtube, Twitter, X, FileText, Lock } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const Footer = () => {
  const { setIsWishlistOpen, navigatePage, currentUser, showToast, settings } = useStore();
  const storeName = settings?.storeName || 'Zigzet';
  const [legalModal, setLegalModal] = useState(null); // 'privacy' | 'terms' | null

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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#10b981', fontWeight: '600', marginBottom: '14px' }}>
              <ShieldCheck size={16} />
              <span>100% Encrypted & Safe Checkout</span>
            </div>

            {/* Social Media Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(90, 31, 45, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D',
                  transition: 'all 0.2s'
                }}
                title="Follow us on Instagram"
              >
                <Instagram size={16} />
              </a>
              <a 
                href="https://tiktok.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(90, 31, 45, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D',
                  transition: 'all 0.2s'
                }}
                title="Follow us on TikTok"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z"/>
                </svg>
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(90, 31, 45, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D',
                  transition: 'all 0.2s'
                }}
                title="Watch tutorials on YouTube"
              >
                <Youtube size={16} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(90, 31, 45, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D',
                  transition: 'all 0.2s'
                }}
                title="Like us on Facebook"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(90, 31, 45, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D',
                  transition: 'all 0.2s'
                }}
                title="Follow us on X"
              >
                <Twitter size={16} />
              </a>
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
                  backgroundColor: '#5A1F2D',
                  color: '#fff',
                  padding: '8px 14px',
                  borderRadius: '9999px',
                  fontSize: '12.5px',
                  fontWeight: '600',
                  border: 'none',
                  cursor: 'pointer'
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

      {/* Bottom Bar */}
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
          <button 
            onClick={() => setLegalModal('privacy')}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12.5px', cursor: 'pointer', padding: 0 }}
          >
            Privacy Policy
          </button>
          <span className="footer-divider">|</span>
          <button 
            onClick={() => setLegalModal('terms')}
            style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '12.5px', cursor: 'pointer', padding: 0 }}
          >
            Terms of Service
          </button>
          <span className="footer-flag" title="United States">USA</span>
        </div>
      </div>

      {/* Interactive Legal Policy Modal */}
      {legalModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999999,
          padding: '20px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '650px',
            width: '100%',
            maxHeight: '85vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
          }}>
            {/* Modal Header */}
            <div style={{
              padding: '20px 24px',
              borderBottom: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fafafa'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '8px',
                  background: 'rgba(90, 31, 45, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#5A1F2D'
                }}>
                  {legalModal === 'privacy' ? <Lock size={18} /> : <FileText size={18} />}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#0f172a' }}>
                    {legalModal === 'privacy' ? 'Privacy & Data Protection Policy' : 'Terms of Service & Sales Agreement'}
                  </h3>
                  <span style={{ fontSize: '12px', color: '#64748b' }}>
                    Last Updated: September 2026 · Official {storeName} Legal Document
                  </span>
                </div>
              </div>
              <button
                onClick={() => setLegalModal(null)}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  borderRadius: '50%',
                  width: '32px',
                  height: '32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b'
                }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div style={{ padding: '24px', overflowY: 'auto', fontSize: '13.5px', lineHeight: '1.7', color: '#334155' }}>
              {legalModal === 'privacy' ? (
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: 0 }}>1. Data Collection and Integrity</h4>
                  <p>
                    At {storeName}, we are committed to safeguarding your privacy. When you visit our website, register an account, or complete a purchase, we collect necessary customer details such as your name, billing address, shipping address, email address, and order records. We utilize bank-grade 256-bit TLS/SSL encryption for all transactions.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>2. Use of Information</h4>
                  <p>
                    Your personal information is used exclusively to fulfill purchases, process dispatch tracking, communicate real-time order updates, prevent fraudulent transactions, and—with your consent—send personalized promotional offers and flash discount vouchers. We do not sell, rent, or trade your personally identifiable information to third parties.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>3. Creator & Affiliate Attribution Cookies</h4>
                  <p>
                    When accessing {storeName} via an influencer partner link (containing referral identifiers such as <code>?ref=CODE</code>), a session identifier is securely stored to accurately attribute commission points and automatically apply your exclusive creator discounts.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>4. Your Rights</h4>
                  <p>
                    You maintain the right to view, modify, or request the deletion of your account records at any time by accessing your User Dashboard or contacting our 24/7 customer care concierge.
                  </p>
                </div>
              ) : (
                <div>
                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: 0 }}>1. Store Agreement & Terms</h4>
                  <p>
                    By accessing, browsing, or purchasing from {storeName}, you agree to be bound by these Terms of Service. All product descriptions, pricing, and stock availability are subject to change without prior notice.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>2. Pricing, Coupons & Orders</h4>
                  <p>
                    Promotional coupon codes and influencer vouchers must be applied at checkout prior to final payment submission. Discount codes may not be combined unless explicitly stated. In the event an item is ordered beyond physical warehouse availability, our operations team will issue an immediate full refund or priority restock allocation.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>3. 30-Day Money-Back Guarantee & Returns</h4>
                  <p>
                    We stand behind the authenticity and quality of every product sold on {storeName}. Unopened items in their original packaging are eligible for return and full refund within 30 days of delivery.
                  </p>

                  <h4 style={{ color: '#0f172a', fontSize: '15px', fontWeight: 700, marginTop: '16px' }}>4. Creator Program Terms</h4>
                  <p>
                    Influencer partners must adhere to standard FTC disclosure guidelines when sharing affiliate links and promotional vouchers. Fraudulent self-referrals or code abuse may result in commission forfeiture and account suspension.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 24px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'flex-end',
              background: '#fafafa'
            }}>
              <button
                onClick={() => setLegalModal(null)}
                style={{
                  padding: '9px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  background: '#5A1F2D',
                  color: '#ffffff',
                  fontWeight: 600,
                  fontSize: '13px',
                  cursor: 'pointer'
                }}
              >
                I Understand &amp; Agree
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
