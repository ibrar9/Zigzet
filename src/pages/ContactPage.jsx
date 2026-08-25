import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, MessageSquare, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactPage = () => {
  const { submitContactMessage } = useStore();

  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [openFaq, setOpenFaq] = useState(0);

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
      q: 'How fast is your USA shipping?',
      a: 'All orders over $50 qualify for FREE USA Standard Shipping (2-4 business days). Expedited 1-2 day express shipping is also available at checkout.'
    },
    {
      q: 'What is your return policy?',
      a: 'We offer a 30-day money-back guarantee on all unused products in original packaging with prepaid return labels provided upon request.'
    },
    {
      q: 'How can I track my shipment?',
      a: 'Once your order is dispatched, you receive an automated tracking code. You can also visit our "Track Order" page anytime and enter your Order ID.'
    },
    {
      q: 'Are my payment and credit card details safe?',
      a: 'Absolutely. All transactions are encrypted using enterprise 256-bit SSL and processed via certified PCI-DSS compliant gateways.'
    },
    {
      q: 'Do your electronics include manufacturer warranty?',
      a: 'Yes, all electronic gadgets and appliances come with a minimum 1-year to 2-year full replacement warranty.'
    }
  ];

  return (
    <div className="contact-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280' }}>
              We Are Here For You
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '6px', marginBottom: '8px' }}>
              Contact & Customer Support
            </h1>
            <p style={{ color: '#4b5563', fontSize: '14.5px' }}>
              Have questions about your order or need product recommendations? Reach out to our friendly support team.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px 80px 20px' }}>
        {/* Contact Grid: Form + Info */}
        <div className="contact-main-grid">
          {/* Form */}
          <div className="contact-form-card">
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '6px' }}>
              Send Us a Message
            </h3>
            <p style={{ fontSize: '13.5px', color: '#6b7280', marginBottom: '24px' }}>
              Fill out the form below and we will get back to you promptly.
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
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Order Tracking & Status">Order Tracking & Status</option>
                    <option value="Returns & Refunds">Returns & Refunds</option>
                    <option value="Product Specifications">Product Specifications</option>
                    <option value="Wholesale & Bulk Orders">Wholesale & Bulk Orders</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Message *</label>
                  <textarea
                    rows="4"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="How can we assist you today?"
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
                <span>Submit Inquiry</span>
              </button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div className="contact-info-column">
            <div className="contact-info-card">
              <div className="info-item">
                <div className="info-icon">
                  <Mail size={18} />
                </div>
                <div>
                  <h5>Email Support</h5>
                  <p>support@zigzet.com</p>
                  <span>Replies within 2 hours</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Phone size={18} />
                </div>
                <div>
                  <h5>Toll-Free Phone</h5>
                  <p>1-800-ZIGZET (944-938)</p>
                  <span>Mon-Fri: 8AM - 8PM EST</span>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <MapPin size={18} />
                </div>
                <div>
                  <h5>USA Headquarters</h5>
                  <p>350 5th Avenue, Suite 4800<br />New York, NY 10118, USA</p>
                </div>
              </div>

              <div className="info-item">
                <div className="info-icon">
                  <Clock size={18} />
                </div>
                <div>
                  <h5>Warehouse Dispatch</h5>
                  <p>24/7 Automated Packing</p>
                  <span>Orders ship within 24 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Accordion Section */}
        <div style={{ marginTop: '64px', maxWidth: '800px', margin: '64px auto 0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '26px', fontWeight: '800' }}>Frequently Asked Questions</h3>
            <p style={{ color: '#6b7280', fontSize: '14px', marginTop: '4px' }}>Quick answers to common questions about orders, shipping, and returns.</p>
          </div>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="faq-item">
                  <button
                    className="faq-question"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.25s ease'
                      }}
                    />
                  </button>

                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
