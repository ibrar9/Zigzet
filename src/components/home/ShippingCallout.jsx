import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const ShippingCallout = () => {
  const { settings, navigatePage, formatPrice } = useStore();
  const threshold = settings?.freeShippingThreshold || 150;

  return (
    <section className="shipping-callout-section">
      <div className="container">
        <div className="shipping-callout-card">
          <div className="callout-left">
            <div className="callout-icon-box">
              <Truck size={36} strokeWidth={1.8} />
            </div>
            <div className="callout-text">
              <h3>Fast &amp; Reliable Express Delivery</h3>
              <p>Enjoy free express shipping on orders over {formatPrice(threshold)} with full real-time package tracking.</p>
            </div>
          </div>

          <button 
            className="callout-btn"
            onClick={() => navigatePage('track')}
            title="Track your shipment"
          >
            <span>Track Order</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
