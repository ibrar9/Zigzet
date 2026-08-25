import React, { useState } from 'react';
import { 
  FileText, 
  Printer, 
  Search, 
  QrCode, 
  Download, 
  CheckCircle2, 
  DollarSign, 
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminInvoices = () => {
  const { orders } = useStore();

  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  const filteredOrders = orders.filter((o) =>
    o.id.toLowerCase().includes(search.toLowerCase()) ||
    o.customerName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Commercial Tax Invoices & QR Receipts</h2>
          <p className="admin-section-desc">Generate compliant itemized PDF sales invoices with digital QR verification codes</p>
        </div>

        <div className="admin-page-actions">
          <button
            className="hero-cta-btn"
            onClick={handlePrint}
            style={{ padding: '9px 20px', fontSize: '13px' }}
          >
            <Printer size={15} />
            <span>Print Official Invoice</span>
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Left: Orders List Picker */}
        <div className="dash-card" style={{ padding: '18px' }}>
          <div className="toolbar-search-box" style={{ marginBottom: '14px' }}>
            <Search size={15} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search order ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '550px', overflowY: 'auto' }}>
            {filteredOrders.map((ord) => {
              const isSelected = selectedOrder && selectedOrder.id === ord.id;
              return (
                <button
                  key={ord.id}
                  onClick={() => setSelectedOrder(ord)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '12px 14px',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: isSelected ? '#7c3aed' : '#e2e8f0',
                    background: isSelected ? '#f5f3ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    textAlign: 'left'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <strong style={{ fontSize: '13.5px', color: isSelected ? '#7c3aed' : '#0f172a' }}>
                      #{ord.id}
                    </strong>
                    <span style={{ fontSize: '13px', fontWeight: '800', color: '#0f172a' }}>
                      ${Number(ord.total).toFixed(2)}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginTop: '4px', fontSize: '12px', color: '#64748b' }}>
                    <span>{ord.customerName}</span>
                    <span>{ord.date}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Itemized Printable Tax Invoice View */}
        {selectedOrder ? (
          <div
            id="printable-tax-invoice"
            className="dash-card"
            style={{
              padding: '36px 40px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '16px'
            }}
          >
            {/* Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #0f172a', paddingBottom: '24px', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Building2 size={16} color="#fff" />
                  </div>
                  <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#0f172a', letterSpacing: '-0.02em', margin: 0 }}>
                    ZIGZET
                  </h2>
                </div>
                <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.4' }}>
                  Zigzet E-Commerce LLC<br />
                  500 Mercer Blvd, Suite 800, Seattle, WA 98109<br />
                  Tax ID: US-WA-94820194 • support@zigzet.com
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '20px', fontWeight: '900', color: '#7c3aed', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  TAX INVOICE
                </span>
                <div style={{ marginTop: '6px', fontSize: '13px', color: '#334155' }}>
                  <div><strong>Invoice No:</strong> INV-{selectedOrder.id}</div>
                  <div><strong>Date:</strong> {selectedOrder.date}</div>
                  <div><strong>Payment:</strong> {selectedOrder.paymentMethod}</div>
                </div>
              </div>
            </div>

            {/* Bill To & QR Code */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc', padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', border: '1px solid #e2e8f0' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em' }}>
                  BILLED TO CUSTOMER:
                </span>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginTop: '2px' }}>
                  {selectedOrder.customerName}
                </h4>
                <p style={{ fontSize: '12.5px', color: '#475569', marginTop: '2px' }}>
                  {selectedOrder.email}<br />
                  {selectedOrder.shippingAddress || '742 Evergreen Terrace, Springfield, OR'}
                </p>
              </div>

              {/* QR Code Verification Simulation */}
              <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ padding: '6px', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                  <svg width="60" height="60" viewBox="0 0 100 100">
                    <rect x="0" y="0" width="30" height="30" fill="#000" />
                    <rect x="5" y="5" width="20" height="20" fill="#fff" />
                    <rect x="10" y="10" width="10" height="10" fill="#000" />
                    <rect x="70" y="0" width="30" height="30" fill="#000" />
                    <rect x="75" y="5" width="20" height="20" fill="#fff" />
                    <rect x="80" y="10" width="10" height="10" fill="#000" />
                    <rect x="0" y="70" width="30" height="30" fill="#000" />
                    <rect x="5" y="75" width="20" height="20" fill="#fff" />
                    <rect x="10" y="80" width="10" height="10" fill="#000" />
                    <rect x="40" y="40" width="20" height="20" fill="#000" />
                    <rect x="40" y="10" width="15" height="15" fill="#000" />
                    <rect x="70" y="50" width="15" height="35" fill="#000" />
                    <rect x="25" y="45" width="10" height="15" fill="#000" />
                  </svg>
                </div>
                <span style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '600' }}>
                  Scan to Track Order
                </span>
              </div>
            </div>

            {/* Line Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
              <thead>
                <tr style={{ borderBottom: '1.5px solid #e2e8f0', textAlign: 'left', fontSize: '12px', color: '#64748b', textTransform: 'uppercase' }}>
                  <th style={{ padding: '10px 0' }}>Item Description</th>
                  <th style={{ padding: '10px 0', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '10px 0', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '10px 0', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.items && selectedOrder.items.map((item, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', fontSize: '13.5px' }}>
                    <td style={{ padding: '12px 0', fontWeight: '700', color: '#0f172a' }}>
                      {item.name}
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'center', color: '#475569' }}>
                      {item.quantity}
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', color: '#475569' }}>
                      AED {Number(item.price).toFixed(2)}
                    </td>
                    <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '800', color: '#0f172a' }}>
                      AED {(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals Calculation (AED) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '2px solid #e2e8f0', paddingTop: '16px' }}>
              <div style={{ width: '260px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                  <span>Subtotal</span>
                  <span>AED {Number(selectedOrder.subtotal || selectedOrder.total * 0.95).toFixed(2)}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#10b981', marginBottom: '6px', fontWeight: '700' }}>
                    <span>Promo Discount ({selectedOrder.couponCode || 'VOUCHER'})</span>
                    <span>-AED {Number(selectedOrder.discount).toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                  <span>Estimated VAT (5%)</span>
                  <span>AED {Number(selectedOrder.total * 0.05).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '10px' }}>
                  <span>Shipping</span>
                  <span style={{ color: '#10b981', fontWeight: '700' }}>FREE UAE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: '900', color: '#0f172a', borderTop: '1.5px solid #0f172a', paddingTop: '8px' }}>
                  <span>Total Paid</span>
                  <span style={{ color: '#7c3aed' }}>AED {Number(selectedOrder.total).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="dash-card" style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
            <FileText size={44} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
            <p>Select an order on the left to view the official tax invoice.</p>
          </div>
        )}
      </div>
    </div>
  );
};
