import React, { useState } from 'react';
import { Truck, Search, CheckCircle2, Package, MapPin, Clock, ArrowRight, ShieldCheck, Calendar, Phone } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TrackOrderPage = () => {
  const { orders, settings } = useStore();
  const [orderInput, setOrderInput] = useState('ORD-9841');
  const [searchedOrder, setSearchedOrder] = useState(
    orders.find((o) => o.id === 'ORD-9841') || orders[0] || null
  );

  const curr = settings?.currency || 'AED';

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    const cleanId = orderInput.replace('#', '').trim().toUpperCase();
    const found = orders.find((o) => o.id.toUpperCase() === cleanId);
    setSearchedOrder(found || null);
  };

  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 1;
      case 'Processing': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 2;
    }
  };

  const currentStep = searchedOrder ? getStepIndex(searchedOrder.status) : 1;

  const steps = [
    { label: 'Order Placed', desc: 'Payment verified', icon: <CheckCircle2 size={16} /> },
    { label: 'Processing', desc: 'Disinfected & packed', icon: <Package size={16} /> },
    { label: 'In Transit', desc: 'Out for courier dispatch', icon: <Truck size={16} /> },
    { label: 'Delivered', desc: 'Handed to recipient', icon: <MapPin size={16} /> }
  ];

  return (
    <div className="track-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
            <div className="hero-offer-badge" style={{ backgroundColor: '#eff6ff', color: '#2563eb', margin: '0 auto 12px auto' }}>
              <Truck size={15} />
              <span>Live Order & Courier Tracking</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '8px', color: 'var(--color-text-primary, #0f172a)' }}>
              Track Your Shipment
            </h1>
            <p style={{ color: 'var(--color-text-secondary, #4b5563)', fontSize: '14.5px' }}>
              Enter your Zigzet Order ID to view current transit progress, courier status, and estimated delivery date.
            </p>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '36px 20px 70px 20px', maxWidth: '840px' }}>
        {/* Search Box */}
        <div className="track-search-card">
          <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '12px' }}>
            <div className="search-input-box" style={{ flex: 1, padding: '12px 18px', background: 'var(--color-surface-subtle, #f8fafc)', border: '1px solid var(--color-border, #e2e8f0)' }}>
              <Search size={18} color="var(--color-text-muted, #6b7280)" />
              <input
                type="text"
                placeholder="Enter Order ID (e.g. ORD-9841)..."
                value={orderInput}
                onChange={(e) => setOrderInput(e.target.value)}
                style={{ fontSize: '14.5px' }}
                required
              />
            </div>
            <button type="submit" className="hero-cta-btn" style={{ padding: '12px 28px', whiteSpace: 'nowrap' }}>
              <span>Track Order</span>
              <ArrowRight size={16} />
            </button>
          </form>

          {/* Quick Demo Order Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', fontSize: '12.5px', color: 'var(--color-text-muted, #6b7280)', flexWrap: 'wrap' }}>
            <span>Try sample orders:</span>
            {orders.slice(0, 3).map((o) => (
              <button
                key={o.id}
                type="button"
                onClick={() => { setOrderInput(o.id); setSearchedOrder(o); }}
                className="track-sample-chip"
              >
                #{o.id} ({o.status})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details */}
        {searchedOrder ? (
          <div className="track-details-card">
            {/* Status Header */}
            <div className="track-card-header">
              <div>
                <span style={{ fontSize: '12px', color: 'var(--color-text-muted, #6b7280)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Live Shipment Status
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', marginTop: '2px', color: 'var(--color-text-primary, #0f172a)' }}>
                  Order #{searchedOrder.id}
                </h3>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span className={`status-badge ${searchedOrder.status}`} style={{ fontSize: '13px', padding: '6px 14px' }}>
                  ● {searchedOrder.status}
                </span>
                <div style={{ fontSize: '12px', color: 'var(--color-text-muted, #6b7280)', marginTop: '4px' }}>
                  Carrier: Aramex Express (UAE)
                </div>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="tracking-stepper">
              {steps.map((step, idx) => {
                const isPassed = idx + 1 <= currentStep;
                const isCurrent = idx + 1 === currentStep;

                return (
                  <div key={idx} className={`stepper-step ${isPassed ? 'completed' : ''} ${isCurrent ? 'active-step' : ''}`}>
                    <div className="stepper-circle">
                      {step.icon}
                    </div>
                    <div className="stepper-label">
                      <h5>{step.label}</h5>
                      <span>{step.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Destination & Package Items */}
            <div className="track-info-grid">
              <div>
                <h5 className="track-section-title">
                  Delivery Destination
                </h5>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'var(--color-text-primary, #111827)' }}>
                  {searchedOrder.customerName}
                </p>
                <p style={{ fontSize: '13px', color: 'var(--color-text-secondary, #6b7280)', marginTop: '2px' }}>
                  {searchedOrder.shippingAddress || 'Downtown Dubai, Boulevard Plaza Tower 1'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px', fontSize: '12px', color: '#10b981', fontWeight: '700' }}>
                  <Calendar size={13} />
                  <span>Est. Delivery: Within 24-48 Hours</span>
                </div>
              </div>

              <div>
                <h5 className="track-section-title">
                  Package Summary
                </h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {searchedOrder.items && searchedOrder.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                      <span style={{ color: 'var(--color-text-primary, #111827)', fontWeight: '500' }}>{item.name} (x{item.quantity})</span>
                      <span style={{ fontWeight: '700' }}>{curr} {(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13.5px', fontWeight: '800', borderTop: '1px solid var(--color-border, #e2e8f0)', paddingTop: '6px', marginTop: '4px', color: 'var(--color-text-primary, #111827)' }}>
                    <span>Total Amount</span>
                    <span style={{ color: '#10b981' }}>{curr} {Number(searchedOrder.total).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="track-not-found-box">
            <Package size={48} color="#9ca3af" />
            <h3 style={{ fontSize: '18px', fontWeight: '800', marginTop: '12px' }}>Order Not Found</h3>
            <p style={{ fontSize: '13.5px', color: '#6b7280', marginTop: '4px' }}>
              Please check your order number or select one of the sample orders above.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
