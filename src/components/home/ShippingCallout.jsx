import React from 'react';
import { Truck, ArrowRight } from 'lucide-react';

export const ShippingCallout = () => {
  return (
    <section className="shipping-callout-section">
      <div className="container">
        <div className="shipping-callout-card">
          <div className="callout-left">
            <div className="callout-icon-box">
              <Truck size={36} strokeWidth={1.8} />
            </div>
            <div className="callout-text">
              <h3>Fast & Reliable USA Shipping</h3>
              <p>Get your favorite products delivered quickly across the United States.</p>
            </div>
          </div>

          <button 
            className="callout-btn"
            onClick={() => alert('Fast USA Shipping: All orders are dispatched within 24 hours with real-time tracking numbers.')}
          >
            <span>Learn More</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
};
