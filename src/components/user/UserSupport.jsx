import React, { useState } from 'react';
import { 
  HelpCircle, MessageSquare, Plus, Send, CheckCircle2, 
  Clock, AlertCircle, ChevronDown, ChevronUp, Phone, Mail, 
  MessageCircle, ExternalLink, X, ShieldCheck, User, Headphones
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const FAQS = [
  {
    q: 'How do I track my order delivery?',
    a: 'You can track your order anytime from the Orders tab in this dashboard or by visiting our Live Track Order page with your tracking waybill number.'
  },
  {
    q: 'What is your returns and refund policy?',
    a: 'We offer a 14-day hassle-free return guarantee on all unopened and authentic products. Once your return is picked up, refunds are processed within 24 hours to your Zigzet Wallet or 3-5 days to your bank.'
  },
  {
    q: 'Are all Korean skincare products 100% authentic?',
    a: 'Yes, 100%! All our products are imported directly from certified Korean manufacturers and undergo strict dermatologist quality inspections.'
  },
  {
    q: 'How long does express shipping take?',
    a: 'Orders placed before 2:00 PM are dispatched the same day. Delivery takes 1-2 business days across all UAE emirates and 2-4 business days for USA & GCC.'
  }
];

export const UserSupport = () => {
  const { userTickets, createUserTicket, replyUserTicket, closeUserTicket, orders, currentUser, navigatePage } = useStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedTicketId, setExpandedTicketId] = useState(userTickets[0]?.id || null);
  const [replyText, setReplyText] = useState({});
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // New Ticket Form State
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('Delivery & Shipping');
  const [orderId, setOrderId] = useState('');
  const [priority, setPriority] = useState('Normal');
  const [message, setMessage] = useState('');

  const myOrders = orders.filter(o =>
    o.email?.toLowerCase() === currentUser?.email?.toLowerCase() || !currentUser?.email
  );

  const openNewTicketModal = () => {
    setSubject('');
    setCategory('Delivery & Shipping');
    setOrderId(myOrders[0]?.id || 'General Inquiry');
    setPriority('Normal');
    setMessage('');
    setIsModalOpen(true);
  };

  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;

    const t = createUserTicket({
      subject,
      category,
      orderId: orderId || 'General Inquiry',
      priority,
      message
    });

    setIsModalOpen(false);
    setExpandedTicketId(t.id);
  };

  const handleSendReply = (ticketId) => {
    const text = replyText[ticketId];
    if (!text || !text.trim()) return;

    replyUserTicket(ticketId, text.trim());
    setReplyText(prev => ({ ...prev, [ticketId]: '' }));
  };

  return (
    <div className="ud2-orders-page">
      {/* Header */}
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Help &amp; Support Desk</h2>
          <p>Get instant assistance from our 24/7 dedicated customer care specialists</p>
        </div>
        <button 
          className="ud2-btn-track" 
          onClick={openNewTicketModal}
          style={{ background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', gap: 6, padding: '10px 18px', borderRadius: 10, fontSize: 13.5, fontWeight: 600 }}
        >
          <Plus size={16} /> Open Support Ticket
        </button>
      </div>

      {/* Quick Contact Channels Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 24 }}>
        <div className="ud2-section-card" style={{ padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#dcfce7', color: '#16a34a', display: 'grid', placeItems: 'center' }}>
            <MessageCircle size={20} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 13.5, color: '#1e293b' }}>WhatsApp Care</p>
            <p style={{ fontSize: 12, color: '#64748b' }}>+971 50 123 4567</p>
          </div>
        </div>

        <div className="ud2-section-card" style={{ padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ede9fe', color: '#7c3aed', display: 'grid', placeItems: 'center' }}>
            <Mail size={20} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 13.5, color: '#1e293b' }}>Email Support</p>
            <p style={{ fontSize: 12, color: '#64748b' }}>support@zigzet.com</p>
          </div>
        </div>

        <div className="ud2-section-card" style={{ padding: 16, borderRadius: 12, display: 'flex', alignItems: 'center', gap: 12, border: '1px solid #e2e8f0' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: '#ffedd5', color: '#ea580c', display: 'grid', placeItems: 'center' }}>
            <Clock size={20} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 13.5, color: '#1e293b' }}>Support Hours</p>
            <p style={{ fontSize: 12, color: '#64748b' }}>24/7 Priority Support</p>
          </div>
        </div>
      </div>

      {/* Support Tickets Section */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14 }}>My Support Tickets</h3>

        {userTickets.length === 0 ? (
          <div className="ud2-empty-page" style={{ padding: '32px 16px' }}>
            <Headphones size={44} />
            <h3>No Support Tickets</h3>
            <p>Have an inquiry about an order or product? Our support team is here to assist.</p>
            <button onClick={openNewTicketModal}>Create Ticket</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {userTickets.map((t) => {
              const isOpen = expandedTicketId === t.id;
              const isResolved = t.status === 'Resolved';
              return (
                <div 
                  key={t.id} 
                  className="ud2-section-card" 
                  style={{ borderRadius: 14, border: '1px solid #e2e8f0', overflow: 'hidden' }}
                >
                  {/* Ticket Header Row */}
                  <div 
                    onClick={() => setExpandedTicketId(isOpen ? null : t.id)}
                    style={{ 
                      padding: '16px 20px', 
                      background: isOpen ? '#f8fafc' : '#fff', 
                      cursor: 'pointer', 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      flexWrap: 'wrap', 
                      gap: 12,
                      borderBottom: isOpen ? '1px solid #e2e8f0' : 'none'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: 14, color: '#7c3aed' }}>{t.id}</span>
                        <span style={{ 
                          background: isResolved ? '#dcfce7' : '#ede9fe', 
                          color: isResolved ? '#16a34a' : '#7c3aed', 
                          fontSize: 11.5, 
                          fontWeight: 700, 
                          padding: '2px 8px', 
                          borderRadius: 6 
                        }}>
                          {t.status}
                        </span>
                        <span style={{ background: '#f1f5f9', color: '#475569', fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 6 }}>
                          {t.category}
                        </span>
                      </div>
                      <p style={{ fontWeight: 700, fontSize: 14.5, color: '#0f172a' }}>{t.subject}</p>
                      <p style={{ fontSize: 12, color: '#64748b' }}>
                        Created on {t.createdAt} · Order Reference: <strong>{t.orderId}</strong>
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>
                        {t.messages?.length || 1} message(s)
                      </span>
                      <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}>
                        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Conversation Thread */}
                  {isOpen && (
                    <div style={{ padding: 20 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 20 }}>
                        {t.messages?.map((msg, idx) => (
                          <div 
                            key={idx} 
                            style={{ 
                              display: 'flex', 
                              gap: 12, 
                              alignItems: 'flex-start',
                              alignSelf: msg.isStaff ? 'flex-start' : 'flex-end',
                              maxWidth: '85%'
                            }}
                          >
                            <div style={{ 
                              padding: '12px 16px', 
                              borderRadius: 12, 
                              background: msg.isStaff ? '#faf5ff' : '#f1f5f9',
                              border: msg.isStaff ? '1px solid #e9d5ff' : '1px solid #e2e8f0',
                              borderTopLeftRadius: msg.isStaff ? 2 : 12,
                              borderTopRightRadius: !msg.isStaff ? 2 : 12
                            }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                                <span style={{ fontWeight: 700, fontSize: 12.5, color: msg.isStaff ? '#7c3aed' : '#0f172a' }}>
                                  {msg.sender}
                                </span>
                                <span style={{ fontSize: 11, color: '#94a3b8' }}>{msg.time}</span>
                              </div>
                              <p style={{ fontSize: 13.5, color: '#334155', lineHeight: 1.45, whiteSpace: 'pre-wrap' }}>
                                {msg.text}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Reply Input Box */}
                      {!isResolved ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                          <div style={{ display: 'flex', gap: 10 }}>
                            <input
                              style={{ flex: 1, padding: '11px 14px', borderRadius: 10, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                              placeholder="Type your reply to customer care..."
                              value={replyText[t.id] || ''}
                              onChange={e => setReplyText({ ...replyText, [t.id]: e.target.value })}
                              onKeyDown={e => { if (e.key === 'Enter') handleSendReply(t.id); }}
                            />
                            <button
                              onClick={() => handleSendReply(t.id)}
                              style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 10, padding: '0 18px', fontWeight: 600, fontSize: 13.5, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                            >
                              <Send size={14} /> Send
                            </button>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => closeUserTicket(t.id)}
                              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: 12.5, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Mark this ticket as resolved
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div style={{ background: '#dcfce7', padding: '10px 14px', borderRadius: 8, textAlign: 'center', color: '#16a34a', fontWeight: 600, fontSize: 13 }}>
                          ✓ This support ticket has been resolved. Open a new ticket if you need further help.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAQs Section */}
      <div className="ud2-section-card" style={{ padding: 22, borderRadius: 16, border: '1px solid #e2e8f0' }}>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <HelpCircle size={18} style={{ color: '#7c3aed' }} /> Frequently Asked Questions
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((faq, i) => {
            const isOpen = openFaqIdx === i;
            return (
              <div key={i} style={{ border: '1px solid #e2e8f0', borderRadius: 10, overflow: 'hidden' }}>
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : i)}
                  style={{ width: '100%', padding: '14px 16px', background: isOpen ? '#f8fafc' : '#fff', border: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', textAlign: 'left', fontWeight: 600, fontSize: 13.5, color: '#1e293b' }}
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={16} color="#64748b" /> : <ChevronDown size={16} color="#64748b" />}
                </button>
                {isOpen && (
                  <div style={{ padding: '12px 16px', background: '#fff', borderTop: '1px solid #f1f5f9', fontSize: 13, color: '#475569', lineHeight: 1.5 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Create Ticket Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 520, padding: 24, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a' }}>Create Support Ticket</h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Subject *</label>
                <input
                  required
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="Brief summary of your question or issue"
                  value={subject}
                  onChange={e => setSubject(e.target.value)}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Category</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                  >
                    <option value="Delivery & Shipping">Delivery &amp; Shipping</option>
                    <option value="Payments & Refunds">Payments &amp; Refunds</option>
                    <option value="Damaged or Missing Item">Damaged / Missing Item</option>
                    <option value="Skincare Consultation">Skincare Consultation</option>
                    <option value="Account & Login">Account &amp; Login</option>
                    <option value="Other">Other Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Priority</label>
                  <select
                    style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent / High Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Related Order (Optional)</label>
                <select
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5, background: '#fff' }}
                  value={orderId}
                  onChange={e => setOrderId(e.target.value)}
                >
                  <option value="General Inquiry">None / General Inquiry</option>
                  {myOrders.map(o => (
                    <option key={o.id} value={o.id}>Order #{o.id} ({o.date})</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: 12.5, fontWeight: 600, color: '#475569', display: 'block', marginBottom: 6 }}>Detailed Message *</label>
                <textarea
                  required
                  rows={4}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 13.5 }}
                  placeholder="Describe your inquiry in detail..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: '1px solid #cbd5e1', background: '#f8fafc', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '11px', borderRadius: 10, border: 'none', background: '#7c3aed', color: '#fff', fontWeight: 600, cursor: 'pointer' }}
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
