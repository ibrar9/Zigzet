import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, MessageSquare, CheckCircle2, Sparkles, HelpCircle, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CustomDropdown } from '../components/common/CustomDropdown';

export const ContactPage = () => {
  const { submitContactMessage, setIsAiChatOpen, settings } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);
  const curr = settings?.currency || 'AED';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    submitContactMessage({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message
    });
    setForm({ name: '', email: '', subject: 'General Inquiry', message: '' });
  };

  const faqs = [
    {
      q: `How fast is your delivery across the UAE?`,
      a: `All orders over ${curr} 150 qualify for FREE UAE Express Delivery (1-2 business days). Orders in Dubai & Abu Dhabi placed before 1:00 PM are often delivered same or next day.`
    },
    {
      q: 'Are all skincare and cosmetic products 100% authentic?',
      a: 'Yes, 100% authentic and directly sourced from verified Korean manufacturers with valid batch codes, origin seals, and tamper-evident packaging.'
    },
    {
      q: 'What is your return & exchange policy?',
      a: 'We offer an easy 14-day return and exchange policy on unused, sealed items in original packaging with prepaid return pickup courier.'
    },
    {
      q: 'How can I track my shipment in real-time?',
      a: 'Once your order is dispatched, you receive automated SMS & WhatsApp tracking links. You can also visit our "Track Order" page anytime and enter your Order ID.'
    },
    {
      q: 'What payment options do you support?',
      a: 'We support Visa, MasterCard, Apple Pay, Tabby / Tamara 4-Month 0% Installments, and Cash on Delivery (COD) across all Emirates.'
    }
  ];

  return (
    <div className="contact-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#7c3aed' }}>
              We Are Here For You 24/7
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '6px', marginBottom: '8px', color: 'var(--color-text-primary, #0f172a)' }}>
              Contact & Customer Care
            </h1>
            <p style={{ color: 'var(--color-text-secondary, #4b5563)', fontSize: '14.5px' }}>
              Have questions about your order, shipping, or need Korean skincare routine recommendations? Reach out to our team anytime.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px 80px 20px' }}>
        {/* Contact Grid: Form + Info */}
        <div className="contact-main-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px', color: 'var(--color-text-primary, #0f172a)' }}>
              Send Us a Direct Message
            </h3>
            <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted, #6b7280)', marginBottom: '24px' }}>
              Fill out the form below and our specialists will respond within 2-4 hours.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="checkout-form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Sarah Jenkins"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="sarah@example.com"
                    required
                  />
                </div>

                <div className="form-group full-width">
                  <label>Inquiry Topic</label>
                  <CustomDropdown
                    options={[
                      { value: 'General Inquiry', label: 'General Inquiry', dot: '#7c3aed' },
                      { value: 'Order Tracking & Status', label: 'Order Tracking & Status', dot: '#3b82f6' },
                      { value: 'Returns & Refunds', label: 'Returns & Refunds', dot: '#f59e0b' },
                      { value: 'Skincare Advice & Ingredients', label: 'Skincare Advice & Ingredients', dot: '#10b981' },
                      { value: 'Wholesale & Bulk Orders', label: 'Wholesale & Bulk Orders', dot: '#ec4899' }
                    ]}
                    value={form.subject}
                    onChange={(val) => setForm({ ...form, subject: val })}
                    width="100%"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Message *</label>
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist your shopping experience today?"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="hero-cta-btn"
                style={{ width: '100%', justifyContent: 'center', marginTop: '16px' }}
              >
                <Send size={15} />
                <span>Send Message</span>
              </button>
            </form>
          </div>

          {/* Info Side Cards */}
          <div className="contact-info-cards-col">
            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: '#f5f3ff', color: '#7c3aed' }}>
                <Mail size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary, #0f172a)' }}>
                  Email Support
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted, #6b7280)' }}>
                  24/7 dedicated inbox assistance
                </p>
                <a href="mailto:support@zigzet.com" style={{ color: '#7c3aed', fontWeight: '700', fontSize: '14px', marginTop: '4px', display: 'inline-block' }}>
                  support@zigzet.com
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: '#ecfdf5', color: '#10b981' }}>
                <Phone size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary, #0f172a)' }}>
                  Phone & WhatsApp Helpline
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-muted, #6b7280)' }}>
                  Mon - Sat, 9:00 AM - 9:00 PM GST
                </p>
                <a href="tel:+97148009449" style={{ color: '#10b981', fontWeight: '700', fontSize: '14px', marginTop: '4px', display: 'inline-block' }}>
                  +971 4 800-ZIGZET (9449)
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-info-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
                <MapPin size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '800', marginBottom: '4px', color: 'var(--color-text-primary, #0f172a)' }}>
                  UAE Distribution Center
                </h4>
                <p style={{ fontSize: '13.5px', color: 'var(--color-text-secondary, #4b5563)' }}>
                  Boulevard Plaza, Tower 1, Downtown Dubai, United Arab Emirates
                </p>
              </div>
            </div>

            {/* Instant AI Assistant Card */}
            <div className="contact-ai-chat-card" onClick={() => setIsAiChatOpen(true)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="ai-chat-card-icon">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', fontWeight: '800', margin: 0, color: '#ffffff' }}>
                    Zigzet AI Beauty Assistant
                  </h4>
                  <p style={{ fontSize: '12.5px', margin: '2px 0 0 0', opacity: 0.9 }}>
                    Instant product routines & order questions 24/7
                  </p>
                </div>
              </div>
              <span className="ai-chat-pill">Ask AI →</span>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ marginTop: '70px', maxWidth: '800px', margin: '70px auto 0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="hero-offer-badge" style={{ margin: '0 auto 8px auto' }}>
              <HelpCircle size={15} />
              <span>Got Questions?</span>
            </div>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--color-text-primary, #0f172a)' }}>
              Frequently Asked Questions
            </h2>
          </div>

          <div className="contact-faq-list">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className={`contact-faq-item ${openFaq === idx ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
              >
                <div className="faq-question-row">
                  <h4>{faq.q}</h4>
                  <ChevronDown size={18} className={`faq-chevron ${openFaq === idx ? 'rotate' : ''}`} />
                </div>
                {openFaq === idx && (
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
