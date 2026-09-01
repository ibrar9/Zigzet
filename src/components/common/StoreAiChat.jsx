import React, { useState, useRef, useEffect } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Truck, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  User,
  Eye,
  Check
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
    viewMode,
    settings,
    setQuickViewProduct,
    quickViewProduct,
    isCheckoutOpen,
    isCartOpen,
    isWishlistOpen
  } = useStore();

  const isAnyModalOpen = Boolean(quickViewProduct || isCheckoutOpen || isCartOpen || isWishlistOpen);

  const currency = settings?.currency || 'AED';
  const freeShipLimit = settings?.freeShippingThreshold || 150;

  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [addedProdId, setAddedProdId] = useState(null);

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: 'Hello! I am Zigzet AI, your smart Korean skincare concierge. How can I help you find the right SPF, recommend soothing serums, track an order, or answer skincare questions today?',
      time: 'Just now',
      suggestions: ['Top Sunscreens SPF50+', 'Cleansers & Balms', 'Cooling Peptide Ampoules', 'Track my order', 'Shipping Policy']
    }
  ]);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isAiChatOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isAiChatOpen, isTyping]);

  // If in admin mode or a modal is currently open, hide customer storefront AI chat launcher
  if (viewMode === 'admin') return null;

  const handleAddProductToCart = (prod) => {
    addToCart(prod, 1);
    setAddedProdId(prod.id);
    setTimeout(() => setAddedProdId(null), 1800);
  };

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
    }, 600);
  };

  const generateAiResponse = (query) => {
    const raw = query.trim();
    const lower = raw.toLowerCase();

    // 1. Order Tracking Lookup
    if (lower.includes('track') || lower.includes('order') || lower.includes('ord-') || lower.includes('status') || lower.includes('where is my') || lower.includes('shipment')) {
      const orderMatch = (orders && orders.length > 0)
        ? (orders.find((o) => 
            lower.includes(o.id.toLowerCase()) || 
            (o.customerName && lower.includes(o.customerName.toLowerCase())) ||
            (o.trackingNumber && lower.includes(o.trackingNumber.toLowerCase()))
          ) || orders[0])
        : null;

      if (orderMatch) {
        setMessages((prev) => [
          ...prev,
          {
            id: Date.now(),
            sender: 'ai',
            text: `Here is the live fulfillment status for order #${orderMatch.id}:`,
            time: 'Just now',
            orderCard: orderMatch,
            suggestions: ['Shipping policy', 'Top Sunscreens SPF50+', 'View best sellers']
          }
        ]);
        return;
      }
    }

    // 2. Shipping & Delivery
    if (lower.includes('shipping') || lower.includes('delivery') || lower.includes('free ship') || lower.includes('courier') || lower.includes('how long') || lower.includes('deliver')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: `We provide Free Express Delivery on all orders over ${currency} ${freeShipLimit}! Standard orders arrive within 1–3 business days via premier tracked couriers. Same-day / next-day delivery options are also available.`,
          time: 'Just now',
          suggestions: ['Top Sunscreens SPF50+', 'Cleansers & Balms', 'Deals under 50 AED']
        }
      ]);
      return;
    }

    // 3. Authenticity & Return Policy
    if (lower.includes('return') || lower.includes('refund') || lower.includes('exchange') || lower.includes('authentic') || lower.includes('fake') || lower.includes('original') || lower.includes('guarantee')) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: `All skincare and beauty products on Zigzet are 100% verified authentic, sourced directly from certified Korean manufacturers (Cell Fusion C, BANILA CO, etc.). We offer a 30-Day Hassle-Free Return Guarantee on all unopened items.`,
          time: 'Just now',
          suggestions: ['Top Sunscreens SPF50+', 'Cooling Peptide Ampoules', 'Talk to human agent']
        }
      ]);
      return;
    }

    // 4. Human Agent Handoff
    if (lower.includes('human') || lower.includes('agent') || lower.includes('representative') || lower.includes('support') || lower.includes('help') || lower.includes('contact') || lower.includes('talk to someone')) {
      submitContactMessage({
        name: 'Website Visitor (Live AI Chat)',
        email: 'visitor@chat.zigzet.com',
        subject: 'Live Skincare Specialist Inquiry',
        message: raw
      });

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: 'I have routed your inquiry directly to our live customer specialist team in the Admin Operations Hub. An agent will assist you shortly!',
          time: 'Just now',
          suggestions: ['Browse catalog', 'Top Sunscreens SPF50+']
        }
      ]);
      return;
    }

    // 5. Intelligent Product Search & Skincare Matching from LIVE store products
    let matchedProducts = [];
    let customAiNote = '';

    // A. Price budget search (e.g. "under 50", "under 100", "cheap", "affordable")
    const priceMatch = lower.match(/under\s*(\d+)|below\s*(\d+)|less than\s*(\d+)/i);
    const budget = priceMatch ? Number(priceMatch[1] || priceMatch[2] || priceMatch[3]) : (lower.includes('cheap') || lower.includes('affordable') ? 40 : null);
    
    if (budget) {
      matchedProducts = products
        .filter((p) => Number(p.price) <= budget)
        .sort((a, b) => (b.rating || 0) - (a.rating || 0))
        .slice(0, 4);
      customAiNote = `Here are our best Korean skincare products under ${currency} ${budget}:`;
    } 
    // B. Deals / Sale / Discounts
    else if (lower.includes('deal') || lower.includes('discount') || lower.includes('sale') || lower.includes('promo') || lower.includes('offer')) {
      matchedProducts = products
        .filter((p) => p.isSale || (p.originalPrice && Number(p.originalPrice) > Number(p.price)))
        .slice(0, 4);
      if (matchedProducts.length === 0) {
        matchedProducts = [...products].sort((a, b) => a.price - b.price).slice(0, 4);
      }
      customAiNote = 'Here are our top promotional deals and value skincare picks:';
    }
    // C. Sunscreens / Sun Care / SPF
    else if (lower.includes('sunscreen') || lower.includes('sun screen') || lower.includes('spf') || lower.includes('sun') || lower.includes('uv') || lower.includes('sunblock') || lower.includes('pa++++')) {
      matchedProducts = products
        .filter((p) => 
          p.category === 'sunscreen' || 
          p.name.toLowerCase().includes('sunscreen') || 
          p.name.toLowerCase().includes('spf') ||
          p.name.toLowerCase().includes('aquatica') ||
          p.name.toLowerCase().includes('laser uv')
        )
        .slice(0, 4);
      customAiNote = 'Here are our top-rated Korean SPF50+ sunscreens for broad-spectrum UV protection without white cast:';
    }
    // D. Cleansers & Cleansing Balms
    else if (lower.includes('cleanser') || lower.includes('cleansing') || lower.includes('balm') || lower.includes('wash') || lower.includes('makeup remover') || lower.includes('clean it zero')) {
      matchedProducts = products
        .filter((p) => 
          p.category === 'cleansers' || 
          p.name.toLowerCase().includes('cleans') || 
          p.name.toLowerCase().includes('balm')
        )
        .slice(0, 4);
      customAiNote = 'Here are our top gentle Korean facial cleansers and sherbet cleansing balms:';
    }
    // E. Serums, Ampoules, Peptides & PDRN
    else if (lower.includes('serum') || lower.includes('ampoule') || lower.includes('peptide') || lower.includes('pdrn') || lower.includes('essence')) {
      matchedProducts = products
        .filter((p) => 
          p.category === 'serums' || 
          p.name.toLowerCase().includes('serum') || 
          p.name.toLowerCase().includes('ampoule') ||
          p.name.toLowerCase().includes('peptide') ||
          p.name.toLowerCase().includes('pdrn')
        )
        .slice(0, 4);
      customAiNote = 'Here are our high-potency Korean serums and cooling peptide ampoules:';
    }
    // F. Masks & Sheet Treatments
    else if (lower.includes('mask') || lower.includes('sheet') || lower.includes('patch')) {
      matchedProducts = products
        .filter((p) => 
          p.category === 'masks' || 
          p.name.toLowerCase().includes('mask')
        )
        .slice(0, 4);
      customAiNote = 'Here are our soothing sheet masks and intensive skin treatments:';
    }
    // G. Acne / Oily / Pores / Clarifying / BHA
    else if (lower.includes('acne') || lower.includes('pimple') || lower.includes('oily') || lower.includes('sebum') || lower.includes('pore') || lower.includes('blackhead') || lower.includes('bha') || lower.includes('aha') || lower.includes('clear')) {
      matchedProducts = products
        .filter((p) => 
          p.name.toLowerCase().includes('clear') || 
          p.description?.toLowerCase().includes('acne') || 
          p.description?.toLowerCase().includes('pore') ||
          p.description?.toLowerCase().includes('sebum') ||
          p.description?.toLowerCase().includes('bha')
        )
        .slice(0, 4);
      customAiNote = 'Here are our best dermatologist-tested formulas for acne-prone skin, pore care, and oil control:';
    }
    // H. Sensitive / Redness / Calming / Cica / Centella
    else if (lower.includes('sensitive') || lower.includes('redness') || lower.includes('cica') || lower.includes('centella') || lower.includes('calm') || lower.includes('sooth') || lower.includes('barrier')) {
      matchedProducts = products
        .filter((p) => 
          p.name.toLowerCase().includes('cica') || 
          p.description?.toLowerCase().includes('cica') || 
          p.description?.toLowerCase().includes('centella') ||
          p.description?.toLowerCase().includes('soothing') ||
          p.description?.toLowerCase().includes('calm') ||
          p.description?.toLowerCase().includes('sensitive')
        )
        .slice(0, 4);
      customAiNote = 'Here are our gentle Centella & Cica soothing products to calm redness and restore the skin barrier:';
    }
    // I. Cooling / Sun Burn / Heat Relief
    else if (lower.includes('cooling') || lower.includes('heat') || lower.includes('hot') || lower.includes('post-sun') || lower.includes('burn')) {
      matchedProducts = products
        .filter((p) => 
          p.name.toLowerCase().includes('cooling') || 
          p.description?.toLowerCase().includes('cooling')
        )
        .slice(0, 4);
      customAiNote = 'Here are our instant-cooling skincare treatments to refresh sun-exposed skin:';
    }
    // J. Hydration / Dry Skin / Hyaluronic Acid
    else if (lower.includes('dry') || lower.includes('hydrate') || lower.includes('hydration') || lower.includes('hyaluronic') || lower.includes('moisture') || lower.includes('dewy') || lower.includes('glass skin')) {
      matchedProducts = products
        .filter((p) => 
          p.name.toLowerCase().includes('aquatica') || 
          p.description?.toLowerCase().includes('hyaluronic') || 
          p.description?.toLowerCase().includes('hydrat')
        )
        .slice(0, 4);
      customAiNote = 'Here are our deeply moisturizing products with Hyaluronic Acid for plump, glowing skin:';
    }
    // K. Specific Brand Searches (e.g. Cell Fusion C, Banila Co, etc.)
    else if (lower.includes('cell fusion') || lower.includes('banila') || products.some(p => p.brand && lower.includes(p.brand.toLowerCase()))) {
      const matchedBrand = products.find(p => p.brand && lower.includes(p.brand.toLowerCase()))?.brand || 'Cell Fusion C';
      matchedProducts = products
        .filter((p) => p.brand && p.brand.toLowerCase().includes(matchedBrand.toLowerCase()))
        .slice(0, 4);
      customAiNote = `Here are authentic ${matchedBrand} skincare products from our collection:`;
    }
    // L. Best Sellers / Top Rated
    else if (lower.includes('best') || lower.includes('top') || lower.includes('popular') || lower.includes('recommend') || lower.includes('favorite')) {
      matchedProducts = products
        .filter((p) => p.featured || (p.rating && p.rating >= 4.8))
        .sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0))
        .slice(0, 4);
      customAiNote = 'Here are our most-loved Korean skincare bestsellers:';
    }
    // M. Generic Keyword Token Search across all product fields
    else {
      const stopWords = new Set(['the', 'a', 'an', 'and', 'or', 'for', 'in', 'on', 'with', 'show', 'me', 'i', 'want', 'need', 'is', 'of', 'to', 'can', 'you', 'give']);
      const tokens = lower.split(/[\s,]+/).filter(t => t.length > 2 && !stopWords.has(t));

      if (tokens.length > 0) {
        const scored = products.map((p) => {
          let score = 0;
          const pName = (p.name || '').toLowerCase();
          const pBrand = (p.brand || '').toLowerCase();
          const pCat = (p.categoryName || p.category || '').toLowerCase();
          const pDesc = (p.description || '').toLowerCase();

          tokens.forEach((token) => {
            if (pName.includes(token)) score += 10;
            if (pBrand.includes(token)) score += 6;
            if (pCat.includes(token)) score += 5;
            if (pDesc.includes(token)) score += 2;
          });
          return { product: p, score };
        });

        matchedProducts = scored
          .filter(s => s.score > 0)
          .sort((a, b) => b.score - a.score)
          .map(s => s.product)
          .slice(0, 4);

        if (matchedProducts.length > 0) {
          customAiNote = `I found ${matchedProducts.length} matching products for "${raw}" in our skincare catalog:`;
        }
      }
    }

    // If products were found:
    if (matchedProducts.length > 0) {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: customAiNote || `Here are ${matchedProducts.length} curated products for you:`,
          time: 'Just now',
          productCards: matchedProducts,
          suggestions: ['Top Sunscreens SPF50+', 'Cleansers & Balms', 'Track an order', 'Deals under 50 AED']
        }
      ]);
      return;
    }

    // 6. Intelligent Fallback (Display real best sellers instead of dummy text!)
    const fallbackFeatured = products.slice(0, 3);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: `I'd love to help you find the best skincare routine! You can ask for sunscreens, cleansing balms, cooling ampoules, acne care, or order tracking. Here are our top featured products:`,
        time: 'Just now',
        productCards: fallbackFeatured,
        suggestions: ['Top Sunscreens SPF50+', 'Cleansers & Balms', 'Cooling Peptide Ampoules', 'Deals under 50 AED']
      }
    ]);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isAiChatOpen && !isAnyModalOpen && (
        <div className={`store-ai-launcher-wrapper ${isMobileExpanded ? 'is-expanded' : 'is-collapsed'}`}>
          {/* Mobile Sleek Mini Arrow Trigger Tab */}
          <button
            type="button"
            className="store-ai-mini-tab"
            onClick={() => setIsMobileExpanded(true)}
            aria-label="Open Zigzet AI Assistant"
            title="Ask Zigzet AI"
          >
            <div className="mini-tab-arrow">
              <ChevronLeft size={16} />
            </div>
            <div className="mini-tab-avatar">
              <Bot size={15} color="#ffffff" />
              <span className="mini-tab-dot"></span>
            </div>
            <span className="mini-tab-text">AI</span>
          </button>

          {/* Full / Expanded Pill */}
          <div className="store-ai-pill-container">
            <button
              type="button"
              className="store-ai-launcher-btn"
              onClick={() => setIsAiChatOpen(true)}
              aria-label="Open Zigzet AI Shopping Assistant"
            >
              <div className="ai-launcher-avatar">
                <Bot size={20} color="#ffffff" />
              </div>
              <div className="ai-launcher-text">
                <span className="ai-title">Ask Zigzet AI</span>
                <span className="ai-status">Instant Answers</span>
              </div>
              <span className="ai-online-ping"></span>
            </button>

            {/* Mobile Collapse Arrow */}
            <button
              type="button"
              className="ai-collapse-arrow-btn"
              onClick={(e) => {
                e.stopPropagation();
                setIsMobileExpanded(false);
              }}
              aria-label="Collapse AI Assistant"
              title="Minimize"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
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
                <p className="ai-agent-subtitle">Smart Skincare & Live Support</p>
              </div>
            </div>

            <button 
              className="ai-chat-close-btn"
              onClick={() => {
                setIsAiChatOpen(false);
                setIsMobileExpanded(false);
              }}
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
                          <div>Total: <strong>{currency} {Number(m.orderCard.total).toFixed(2)}</strong></div>
                          <div>Tracking: <code style={{ color: '#7c3aed', fontWeight: '700' }}>{m.orderCard.trackingNumber}</code></div>
                        </div>
                      </div>
                    )}

                    {/* Render Product Cards if present */}
                    {m.productCards && (
                      <div className="ai-products-grid">
                        {m.productCards.map((prod) => (
                          <div key={prod.id} className="ai-product-item">
                            <img 
                              src={prod.image} 
                              alt={prod.name} 
                              className="ai-prod-thumb" 
                              onClick={() => setQuickViewProduct(prod)}
                            />
                            <div className="ai-prod-info">
                              {prod.brand && <span className="ai-prod-brand">{prod.brand}</span>}
                              <span 
                                className="ai-prod-title" 
                                title={prod.name}
                                onClick={() => setQuickViewProduct(prod)}
                              >
                                {prod.name}
                              </span>
                              <div className="ai-prod-meta-row">
                                <span className="ai-prod-price">
                                  {currency} {Number(prod.price).toFixed(2)}
                                </span>
                                {prod.rating && (
                                  <span className="ai-prod-rating">★ {prod.rating}</span>
                                )}
                              </div>
                              <div className="ai-prod-actions">
                                <button
                                  type="button"
                                  className={`ai-prod-add-btn ${addedProdId === prod.id ? 'added' : ''}`}
                                  onClick={() => handleAddProductToCart(prod)}
                                >
                                  {addedProdId === prod.id ? (
                                    <>
                                      <Check size={12} />
                                      <span>Added!</span>
                                    </>
                                  ) : (
                                    <>
                                      <ShoppingBag size={12} />
                                      <span>Add to Bag</span>
                                    </>
                                  )}
                                </button>
                                <button
                                  type="button"
                                  className="ai-prod-view-btn"
                                  onClick={() => setQuickViewProduct(prod)}
                                  title="Quick View Details"
                                >
                                  <Eye size={12} />
                                  <span>View</span>
                                </button>
                              </div>
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
                          type="button"
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
              placeholder="Ask for sunscreen, serums, acne care, track order..."
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
