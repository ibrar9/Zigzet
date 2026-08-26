import React, { useState } from 'react';
import {
  Package, CheckCircle2, Truck, Clock, Search,
  ChevronDown, ChevronUp, MapPin, CreditCard, X, ShoppingBag, 
  Printer, Download, RotateCcw, ArrowRight, FileText, Check
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const STATUS_META = {
  'Delivered': { color: '#16a34a', bg: '#dcfce7', label: 'Delivered' },
  'Shipped': { color: '#7c3aed', bg: '#ede9fe', label: 'Shipped' },
  'Processing': { color: '#d97706', bg: '#fef3c7', label: 'In Transit' },
  'Cancelled': { color: '#dc2626', bg: '#fee2e2', label: 'Cancelled' },
};

const STEPS = ['Order Placed', 'Processing', 'Shipped', 'Delivered'];
const STEP_FLAGS = {
  'Delivered': [true, true, true, true],
  'Shipped': [true, true, true, false],
  'Processing': [true, true, false, false],
  'Cancelled': [true, false, false, false],
};

export const UserOrders = ({ myOrders, setActiveTab }) => {
  const { navigatePage, settings, reorderItems } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filtered = myOrders.filter(o => {
    const s = o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.items?.some(i => i.name?.toLowerCase().includes(search.toLowerCase()));
    const f = filter === 'All' || o.status === filter;
    return s && f;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>My Orders</h2>
        <p>Track, manage, reorder, and download official invoices for all your purchases</p>
      </div>

      {/* Toolbar */}
      <div className="ud2-orders-toolbar">
        <div className="ud2-search-bar">
          <Search size={15} />
          <input
            placeholder="Search by order ID, product name..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && <button onClick={() => setSearch('')}><X size={13} /></button>}
        </div>
        <div className="ud2-filter-pills">
          {statuses.map(s => (
            <button
              key={s}
              className={`ud2-pill ${filter === s ? 'active' : ''}`}
              onClick={() => setFilter(s)}
            >{s}</button>
          ))}
        </div>
      </div>

      {myOrders.length === 0 ? (
        <div className="ud2-empty-page">
          <ShoppingBag size={60} />
          <h3>No orders yet</h3>
          <p>Your order history will appear here once you make a purchase.</p>
          <button onClick={() => navigatePage('shop')}>Start Shopping</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="ud2-empty-page">
          <Package size={48} />
          <h3>No orders match</h3>
          <button onClick={() => { setFilter('All'); setSearch(''); }}>Clear Filters</button>
        </div>
      ) : (
        <div className="ud2-orders-list">
          {filtered.map(order => {
            const meta = STATUS_META[order.status] || STATUS_META['Processing'];
            const steps = STEP_FLAGS[order.status] || STEP_FLAGS['Processing'];
            const isOpen = expanded === order.id;
            const item = order.items?.[0];

            return (
              <div className={`ud2-order-card2 ${isOpen ? 'open' : ''}`} key={order.id}>
                <div className="ud2-order-card2-header" onClick={() => setExpanded(isOpen ? null : order.id)}>
                  <div className="ud2-order-thumb2">
                    {item?.image ? <img src={item.image} alt="" /> : <Package size={22} />}
                  </div>
                  <div className="ud2-order-info2">
                    <p className="ud2-order-name2">{item?.name || 'Order'}</p>
                    <p className="ud2-order-sub2">Order #{order.id} &nbsp;·&nbsp; {order.date} &nbsp;·&nbsp; {order.items?.length || 1} item(s)</p>
                  </div>
                  <div className="ud2-order-price2">{settings?.currency || 'AED'} {Number(order.total || 0).toFixed(2)}</div>
                  <span className="ud2-status-badge" style={{ color: meta.color, background: meta.bg }}>{meta.label}</span>
                  
                  <div className="ud2-order-card2-btns">
                    <button 
                      className="ud2-btn-track" 
                      onClick={e => { 
                        e.stopPropagation(); 
                        if (order.status === 'Delivered') {
                          reorderItems(order.items);
                        } else {
                          navigatePage('track');
                        }
                      }}
                      title={order.status === 'Delivered' ? 'Add all items back to Cart' : 'Track live courier status'}
                    >
                      {order.status === 'Delivered' ? '🔁 Buy Again' : 'Track Order'}
                    </button>
                    <button 
                      className="ud2-btn-details" 
                      onClick={e => {
                        e.stopPropagation();
                        setInvoiceOrder(order);
                      }}
                      title="View &amp; Print Invoice"
                    >
                      <FileText size={13} style={{ marginRight: 4 }} /> Invoice
                    </button>
                  </div>
                  <button className="ud2-expand-btn2">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </div>

                {isOpen && (
                  <div className="ud2-order-card2-body">
                    {/* Steps */}
                    <div className="ud2-steps">
                      {STEPS.map((step, i) => (
                        <div key={step} className="ud2-step-item">
                          <div className={`ud2-step-circle ${steps[i] ? 'done' : ''}`}>
                            {steps[i] ? <CheckCircle2 size={14} /> : <span>{i + 1}</span>}
                          </div>
                          {i < STEPS.length - 1 && (
                            <div className={`ud2-step-line ${steps[i + 1] ? 'done' : ''}`} />
                          )}
                          <p className={`ud2-step-name ${steps[i] ? 'done' : ''}`}>{step}</p>
                        </div>
                      ))}
                    </div>

                    {/* Items */}
                    <div className="ud2-items-detail">
                      {order.items?.map((it, idx) => (
                        <div className="ud2-item-row" key={idx}>
                          <img src={it.image} alt={it.name} />
                          <div className="ud2-item-info">
                            <p>{it.name}</p>
                            <span>Qty: {it.quantity}</span>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p className="ud2-item-price">{settings?.currency || 'AED'} {((Number(it.price) || 0) * it.quantity).toFixed(2)}</p>
                            <button
                              onClick={() => reorderItems([it])}
                              style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 11.5, fontWeight: 700, cursor: 'pointer', padding: 0, marginTop: 4 }}
                            >
                              + Buy Again
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="ud2-order-footer-info">
                      {order.shippingAddress && (
                        <div className="ud2-info-chip">
                          <MapPin size={14} />
                          <div><p>Delivery Address</p><span>{order.shippingAddress}</span></div>
                        </div>
                      )}
                      {order.paymentMethod && (
                        <div className="ud2-info-chip">
                          <CreditCard size={14} />
                          <div><p>Payment</p><span>{order.paymentMethod}</span></div>
                        </div>
                      )}
                      <div className="ud2-info-chip total">
                        <p>Order Total</p><span>{settings?.currency || 'AED'} {(order.total || 0).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Bottom Action bar */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10, marginTop: 16, paddingTop: 14, borderTop: '1px solid #f1f5f9' }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {order.status === 'Delivered' && setActiveTab && (
                          <button
                            onClick={() => setActiveTab('returns')}
                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                          >
                            <RotateCcw size={13} /> Request Return / Refund
                          </button>
                        )}
                        {setActiveTab && (
                          <button
                            onClick={() => setActiveTab('reviews')}
                            style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '6px 12px', borderRadius: 8, fontSize: 12, fontWeight: 600, color: '#475569', cursor: 'pointer' }}
                          >
                            ⭐ Review Products
                          </button>
                        )}
                      </div>

                      <button
                        onClick={() => setInvoiceOrder(order)}
                        style={{ background: '#ede9fe', color: '#7c3aed', border: 'none', padding: '6px 14px', borderRadius: 8, fontSize: 12.5, fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                      >
                        <Printer size={13} /> Printable Invoice
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Printable Invoice Modal */}
      {invoiceOrder && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', zIndex: 9999, display: 'grid', placeItems: 'center', padding: 16 }}>
          <div style={{ background: '#fff', borderRadius: 16, width: '100%', maxWidth: 640, padding: 32, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', maxHeight: '92vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, borderBottom: '2px solid #f1f5f9', paddingBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 6, background: '#7c3aed', color: '#fff', display: 'grid', placeItems: 'center' }}>
                    <ShoppingBag size={16} />
                  </div>
                  <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a' }}>Zigzet Store</h2>
                </div>
                <p style={{ fontSize: 12, color: '#64748b' }}>Official Order Tax Invoice &amp; Receipt</p>
              </div>

              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handlePrint}
                  style={{ background: '#7c3aed', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 12px', fontSize: 12.5, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                >
                  <Printer size={14} /> Print
                </button>
                <button
                  onClick={() => setInvoiceOrder(null)}
                  style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 32, height: 32, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#64748b' }}
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Invoice Meta Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, background: '#f8fafc', padding: 16, borderRadius: 12 }}>
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Invoice Details</p>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b' }}>Order #{invoiceOrder.id}</p>
                <p style={{ fontSize: 12.5, color: '#64748b' }}>Date: {invoiceOrder.date}</p>
                <p style={{ fontSize: 12.5, color: '#64748b' }}>Status: <strong>{invoiceOrder.status}</strong></p>
              </div>
              <div>
                <p style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', fontWeight: 700 }}>Billed &amp; Shipped To</p>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: '#1e293b' }}>{invoiceOrder.customerName || 'Sarah Jenkins'}</p>
                <p style={{ fontSize: 12.5, color: '#64748b' }}>{invoiceOrder.shippingAddress || '742 Evergreen Terrace, Springfield, OR'}</p>
                <p style={{ fontSize: 12.5, color: '#64748b' }}>Payment: {invoiceOrder.paymentMethod || 'Credit Card'}</p>
              </div>
            </div>

            {/* Items Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e2e8f0', textAlign: 'left', fontSize: 12, color: '#64748b' }}>
                  <th style={{ padding: '8px 4px' }}>Item Description</th>
                  <th style={{ padding: '8px 4px', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Unit Price</th>
                  <th style={{ padding: '8px 4px', textAlign: 'right' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoiceOrder.items?.map((it, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9', fontSize: 13, color: '#334155' }}>
                    <td style={{ padding: '10px 4px', fontWeight: 600 }}>{it.name}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'center' }}>{it.quantity}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right' }}>{settings?.currency || 'AED'} {Number(it.price || 0).toFixed(2)}</td>
                    <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 700 }}>{settings?.currency || 'AED'} {(Number(it.price || 0) * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Invoice Totals */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
              <div style={{ width: '220px', display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Subtotal:</span>
                  <span>{settings?.currency || 'AED'} {(Number(invoiceOrder.subtotal || invoiceOrder.total) || 0).toFixed(2)}</span>
                </div>
                {invoiceOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                    <span>Discount:</span>
                    <span>-{settings?.currency || 'AED'} {Number(invoiceOrder.discount).toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Estimated Tax (5%):</span>
                  <span>{settings?.currency || 'AED'} {((invoiceOrder.total || 0) * 0.05).toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Shipping:</span>
                  <span style={{ color: '#16a34a' }}>FREE Express</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: 15, color: '#0f172a', borderTop: '2px solid #e2e8f0', paddingTop: 8, marginTop: 4 }}>
                  <span>Invoice Total:</span>
                  <span style={{ color: '#7c3aed' }}>{settings?.currency || 'AED'} {Number(invoiceOrder.total || 0).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: 16, textAlign: 'center', fontSize: 12, color: '#94a3b8' }}>
              <p>Thank you for shopping with Zigzet! For inquiries, reach out to support@zigzet.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
