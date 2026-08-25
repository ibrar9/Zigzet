import React, { useState } from 'react';
import { 
  Truck, 
  Printer, 
  Package, 
  MapPin, 
  CheckCircle2, 
  Search, 
  ExternalLink, 
  Barcode, 
  Calendar,
  X,
  FileText
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminShipments = () => {
  const { orders } = useStore();

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedCarrier, setSelectedCarrier] = useState('FedEx');
  const [isLabelModalOpen, setIsLabelModalOpen] = useState(false);

  const carriers = [
    { value: 'FedEx', label: 'FedEx Express Worldwide', dot: '#4f46e5' },
    { value: 'DHL', label: 'DHL International Express', dot: '#eab308' },
    { value: 'USPS', label: 'USPS Priority USA', dot: '#2563eb' },
    { value: 'UPS', label: 'UPS Ground Air', dot: '#92400e' }
  ];

  const handleOpenLabel = (order) => {
    setSelectedOrder(order);
    setIsLabelModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Shipping Logistics & Barcode Label Generator</h2>
          <p className="admin-section-desc">Generate commercial shipping manifests, courier tracking waybills, and printable package labels</p>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <Truck size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Ready to Dispatch</span>
            <span className="stat-main-number">
              {orders.filter((o) => o.status === 'Processing' || o.status === 'Pending').length}
            </span>
            <span className="stat-sub-text">Awaiting shipping label</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <Package size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">In Transit</span>
            <span className="stat-main-number">
              {orders.filter((o) => o.status === 'Shipped').length}
            </span>
            <span className="stat-sub-text">With delivery couriers</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Delivered (30d)</span>
            <span className="stat-main-number">
              {orders.filter((o) => o.status === 'Delivered').length}
            </span>
            <span className="stat-sub-text">Successfully completed</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <MapPin size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Primary Carriers</span>
            <span className="stat-main-number">4 Partners</span>
            <span className="stat-sub-text">FedEx, DHL, USPS, UPS</span>
          </div>
        </div>
      </div>

      {/* Orders Ready for Manifest Table */}
      <div className="dash-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Fulfillment Queue & Shipping Labels</h3>
            <p style={{ fontSize: '13px', color: '#64748b' }}>Generate 4x6 standard thermal shipping barcode labels for package packing</p>
          </div>
        </div>

        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Order Number</th>
                <th>Recipient / Customer</th>
                <th>Destination Address</th>
                <th>Order Items</th>
                <th>Tracking Number</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Label Generator</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((ord) => (
                <tr key={ord.id}>
                  <td className="table-bold-cell">#{ord.id}</td>
                  <td>
                    <div style={{ fontWeight: '700', color: '#0f172a' }}>{ord.customerName}</div>
                    <div style={{ fontSize: '12px', color: '#64748b' }}>{ord.email}</div>
                  </td>
                  <td>
                    <div style={{ fontSize: '12.5px', color: '#334155', maxWidth: '200px' }}>
                      {ord.shippingAddress || '742 Evergreen Terrace, Springfield, OR'}
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', color: '#1e293b' }}>
                      {ord.items ? ord.items.length : 1} items
                    </span>
                  </td>
                  <td>
                    <span style={{ fontFamily: 'monospace', fontWeight: '700', color: '#7c3aed', background: '#f5f3ff', padding: '3px 8px', borderRadius: '6px', fontSize: '11.5px' }}>
                      {ord.trackingNumber || `ZG-USPS-${ord.id}`}
                    </span>
                  </td>
                  <td>
                    <span className={`status-pill ${ord.status.toLowerCase()}`}>
                      <span className="status-dot-indicator" style={{ backgroundColor: ord.status === 'Delivered' ? '#10b981' : ord.status === 'Shipped' ? '#f59e0b' : '#3b82f6' }} />
                      {ord.status}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button
                      className="hero-cta-btn"
                      onClick={() => handleOpenLabel(ord)}
                      style={{ padding: '6px 14px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Printer size={13} />
                      <span>Print Label</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Thermal Shipping Label Modal */}
      {isLabelModalOpen && selectedOrder && (
        <div className="modal-overlay open" onClick={() => setIsLabelModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: '500px', padding: '28px' }} onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-icon" onClick={() => setIsLabelModalOpen(false)}>
              <X size={18} />
            </button>

            {/* Carrier Switcher inside modal */}
            <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: '#334155' }}>Select Carrier:</span>
              <CustomDropdown
                options={carriers}
                value={selectedCarrier}
                onChange={(val) => setSelectedCarrier(val)}
                minWidth="200px"
              />
            </div>

            {/* Thermal Label Card (USPS / FedEx standard 4x6 design) */}
            <div
              id="shipping-label-printable"
              style={{
                background: '#ffffff',
                border: '2px solid #000000',
                padding: '20px',
                fontFamily: 'monospace, Arial, sans-serif',
                color: '#000000'
              }}
            >
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #000', paddingBottom: '10px', marginBottom: '12px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: '900', margin: 0, textTransform: 'uppercase' }}>
                    {selectedCarrier} PRIORITY AIR
                  </h3>
                  <span style={{ fontSize: '11px' }}>COMMERCIAL PARCEL - 2 DAY EXPEDITE</span>
                </div>
                <div style={{ border: '2px solid #000', padding: '4px 10px', fontWeight: '900', fontSize: '16px' }}>
                  ZONE 4
                </div>
              </div>

              {/* Sender info */}
              <div style={{ fontSize: '11px', lineHeight: '1.4', borderBottom: '1px solid #000', paddingBottom: '8px', marginBottom: '10px' }}>
                <strong>FROM:</strong><br />
                ZIGZET E-COMMERCE LOGISTICS HUB<br />
                500 MERCER BLVD, SUITE 800<br />
                SEATTLE, WA 98109 USA
              </div>

              {/* Recipient info */}
              <div style={{ fontSize: '13px', lineHeight: '1.4', borderBottom: '2px solid #000', paddingBottom: '12px', marginBottom: '14px' }}>
                <strong style={{ fontSize: '11px' }}>SHIP TO:</strong><br />
                <span style={{ fontSize: '15px', fontWeight: '900' }}>{selectedOrder.customerName.toUpperCase()}</span><br />
                <span>{selectedOrder.shippingAddress || '742 EVERGREEN TERRACE, SPRINGFIELD, OR'}</span><br />
                <span>TEL: +1 (555) 019-2834</span>
              </div>

              {/* Barcode Simulation & Tracking */}
              <div style={{ textAlign: 'center', padding: '10px 0' }}>
                {/* SVG Barcode */}
                <svg width="100%" height="50" viewBox="0 0 300 50">
                  {Array.from({ length: 50 }).map((_, i) => {
                    const width = (i % 3 === 0 ? 4 : i % 2 === 0 ? 2 : 6);
                    const x = i * 6;
                    return <rect key={i} x={x} y="0" width={width} height="50" fill="#000000" />;
                  })}
                </svg>
                <div style={{ fontSize: '13px', fontWeight: '900', letterSpacing: '0.15em', marginTop: '6px' }}>
                  {selectedOrder.trackingNumber || `ZG-4820-9921-US`}
                </div>
              </div>

              {/* Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #000', paddingTop: '8px', marginTop: '10px', fontSize: '11px' }}>
                <span>ORDER: #{selectedOrder.id}</span>
                <span>WEIGHT: 2.4 LBS</span>
                <span>DEPT: E-COMMERCE</span>
              </div>
            </div>

            {/* Print Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setIsLabelModalOpen(false)}
                style={{ padding: '8px 18px', borderRadius: '8px', background: '#f1f5f9', color: '#64748b', fontSize: '13px', fontWeight: '600' }}
              >
                Close
              </button>
              <button
                className="hero-cta-btn"
                onClick={handlePrint}
                style={{ padding: '8px 24px', fontSize: '13px' }}
              >
                <Printer size={15} />
                <span>Print Barcode Label</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
