import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Truck, 
  HelpCircle, 
  Headphones, 
  ArrowRight, 
  CheckCircle2,
  ChevronDown,
  User
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const StoreAiChat = () => {
  const { 
    isAiChatOpen, 
    setIsAiChatOpen, 
    products, 
    orders, 
    addToCart, 
    submitContactMessage, 
    navigatePage,
    viewMode
  } = useStore();

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Zigzet AI, your smart shopping assistant. How can I help you find the perfect product, track an order, or answer any questions today?',
      time: 'Just now',
      suggestions: ['Show best headphones', 'Track my order', 'Shipping policy', 'Deals under $50']
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isAiChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiChatOpen, isTyping]);

  // If in admin mode, hide customer storefront AI chat
  if (viewMode === 'admin') return null;

  const handleSendMessage = (textToSend) => {
    const userText = (textToSend || input).trim();
    if (!userText) return;

    // Add user message
    const newMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: newMsgId, sender: 'user', text: userText, time: 'Just now' }
    ]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI thinking and smart NLP logic
    setTimeout(() => {
      generateAiResponse(userText);
      setIsTyping(false);
    }, 700);
  };

  const generateAiResponse = (query) => {
    const lower = query.toLowerCase();

    // 1. Order Tracking Lookup
    if (lower.includes('track') || lower.includes('order') || lower.includes('ord-') || lower.includes('status')) {
      // Find matching order in store
      const orderMatch = orders.find((o) => 
        lower.includes(o.id.toLowerCase()) || 
        lower.includes(o.customerName.toLowerCase())
      ) || orders[0];

      if (orderMatch) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'ai',
            text: `Here is the live status for order #${orderMatch.id}:`,
            time: 'Just now',
            orderCard: orderMatch
          }
        ]);
        return;
      }
    }

    // 2. Product Search & Recommendations
    let matchedProducts = [];
    if (lower.includes('headphone') || lower.includes('audio') || lower.includes('music') || lower.includes('sound')) {
      matchedProducts = products.filter((p) => p.name.toLowerCase().includes('headphone'));
    } else if (lower.includes('watch') || lower.includes('smartwatch') || lower.includes('tech')) {
      matchedProducts = products.filter((p) => p.category === 'electronics');
    } else if (lower.includes('shoe') || lower.includes('running') || lower.includes('sneaker') || lower.includes('footwear')) {
      matchedProducts = products.filter((p) => p.name.toLowerCase().includes('shoe'));
    } else if (lower.includes('fashion') || lower.includes('hoodie') || lower.includes('clothes') || lower.includes('apparel')) {
      matchedProducts = products.filter((p) => p.category === 'fashion');
    } else if (lower.includes('beauty') || lower.includes('serum') || lower.includes('skin') || lower.includes('skincare')) {
      matchedProducts = products.filter((p) => p.category === 'beauty');
    } else if (lower.includes('deal') || lower.includes('discount') || lower.includes('sale') || lower.includes('cheap') || lower.includes('under 50') || lower.includes('under $50')) {
      matchedProducts = products.filter((p) => p.price <= 50 || p.isSale).slice(0, 3);
    }

    if (matchedProducts.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: `I found ${matchedProducts.length} curated products matching your request:`,
          time: 'Just now',
          productCards: matchedProducts
        }
      ]);
      return;
    }

    // 3. Shipping Policy
    if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('free ship') || lower.includes('courier')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: 'We provide Free Standard USA Shipping on all orders over $50! Standard orders are delivered in 2–4 business days via FedEx, DHL, or USPS Priority. Expedited 2-Day Air is also available at checkout.',
          time: 'Just now',
          suggestions: ['Show me best deals', 'Track an order', 'Return policy']
        }
      ]);
      return;
    }

    // 4. Returns & Warranty
    if (lower.includes('return') || lower.includes('refund') || lower.includes('warranty') || lower.includes('exchange')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: 'Zigzet offers a 100% 30-Day Hassle-Free Return Guarantee on all items. Plus, all electronic and lifestyle products come with an Official 2-Year Manufacturer Warranty.',
          time: 'Just now',
          suggestions: ['Explore products', 'Talk to human agent']
        }
      ]);
      return;
    }

    // 5. Human Agent Support Handoff
    if (lower.includes('human') || lower.includes('agent') || lower.includes('representative') || lower.includes('support') || lower.includes('help')) {
      submitContactMessage({
        name: 'Website Visitor (Live Chat)',
        email: 'visitor@chat.zigzet.com',
        subject: 'Live Chat Support Request',
        message: query
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: 'I have transferred your inquiry directly to our live support team in the Admin Operations Hub. A customer specialist will assist you shortly!',
          time: 'Just now'
        }
      ]);
      return;
    }

    // 6. General Fallback
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: "I'd be glad to help you with that! You can explore our featured catalog, search for electronics, fashion, or home goods, or ask me to track an order.",
        time: 'Just now',
        suggestions: ['Show electronics', 'Browse modern fashion', 'Track order #ORD-4405', 'Shipping info']
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isAiChatOpen && (
        <button
          className="store-ai-launcher-btn"
          onClick={() => setIsAiChatOpen(true)}
          aria-label="Open Zigzet AI Shopping Assistant"
        >
          <div className="ai-launcher-avatar">
            <Bot size={22} color="#ffffff" />
          </div>
          <div className="ai-launcher-text">
            <span className="ai-title">Ask Zigzet AI</span>
            <span className="ai-status">Instant Answers</span>
          </div>
          <span className="ai-online-ping"></span>
        </button>
      )}

      {/* Slide-Up Chat Window */}
      {isAiChatOpen && (
        <div className="store-ai-chat-window">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-profile">
              <div className="ai-avatar-badge">
                <Bot size={20} color="#ffffff" />
                <span className="ai-badge-dot"></span>
              </div>
              <div>
                <h4 className="ai-agent-name">Zigzet AI Concierge</h4>
                <p className="ai-agent-subtitle">Smart Shopping & Live Support</p>
              </div>
            </div>

            <button 
              className="ai-chat-close-btn"
              onClick={() => setIsAiChatOpen(false)}
              aria-label="Close Chat"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Feed */}
          <div className="ai-messages-feed">
            {messages.map((m) => (
              <div key={m.id} className={`ai-message-row ${m.sender === 'user' ? 'user' : 'ai'}`}>
                {m.sender === 'ai' && (
                  <div className="ai-msg-avatar">
                    <Bot size={15} color="#7c3aed" />
                  </div>
                )}

                <div className="ai-msg-bubble-container">
                  <div className="ai-msg-bubble">
                    <p>{m.text}</p>

                    {/* Render Order Card if present */}
                    {m.orderCard && (
                      <div className="ai-order-card">
                        <div className="ai-order-head">
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Truck size={15} color="#7c3aed" />
                            <strong>Order #{m.orderCard.id}</strong>
                          </div>
                          <span className="status-pill completed" style={{ fontSize: '11px', padding: '2px 8px' }}>
                            {m.orderCard.status}
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#475569', marginTop: '6px' }}>
                          <div>Customer: <strong>{m.orderCard.customerName}</strong></div>
                          <div>Total: <strong>${Number(m.orderCard.total).toFixed(2)}</strong></div>
                          <div>Tracking: <code style={{ color: '#7c3aed', fontWeight: '700' }}>{m.orderCard.trackingNumber}</code></div>
                        </div>
                      </div>
                    )}

                    {/* Render Product Cards if present */}
                    {m.productCards && (
                      <div className="ai-products-grid">
                        {m.productCards.map((prod) => (
                          <div key={prod.id} className="ai-product-item">
                            <img src={prod.image} alt={prod.name} className="ai-prod-thumb" />
                            <div className="ai-prod-info">
                              <span className="ai-prod-title">{prod.name}</span>
                              <span className="ai-prod-price">${Number(prod.price).toFixed(2)}</span>
                              <button
                                className="ai-prod-add-btn"
                                onClick={() => addToCart(prod, 1)}
                              >
                                <ShoppingBag size={12} />
                                <span>Add to Bag</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Suggestion Chips */}
                  {m.suggestions && (
                    <div className="ai-suggestions-list">
                      {m.suggestions.map((sug, idx) => (
                        <button
                          key={idx}
                          className="ai-suggestion-chip"
                          onClick={() => handleSendMessage(sug)}
                        >
                          <span>{sug}</span>
                          <ArrowRight size={11} />
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="ai-msg-time">{m.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row ai">
                <div className="ai-msg-avatar">
                  <Bot size={15} color="#7c3aed" />
                </div>
                <div className="ai-msg-bubble typing">
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                  <span className="typing-dot"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form 
            className="ai-chat-input-bar"
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
          >
            <input
              type="text"
              placeholder="Ask for recommendations, track order..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="ai-send-btn"
              aria-label="Send message"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
