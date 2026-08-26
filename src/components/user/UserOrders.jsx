import React, { useState } from 'react';
import {
  Package, CheckCircle2, Truck, Clock, Search,
  ChevronDown, ChevronUp, MapPin, CreditCard, X, ShoppingBag, MoreVertical
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

export const UserOrders = ({ myOrders }) => {
  const { navigatePage, settings } = useStore();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [expanded, setExpanded] = useState(null);

  const statuses = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  const filtered = myOrders.filter(o => {
    const s = o.id?.toLowerCase().includes(search.toLowerCase()) ||
      o.items?.some(i => i.name?.toLowerCase().includes(search.toLowerCase()));
    const f = filter === 'All' || o.status === filter;
    return s && f;
  });

  return (
    <div className="ud2-orders-page">
      <div className="ud2-page-heading">
        <h2>My Orders</h2>
        <p>Track and manage all your orders in one place</p>
      </div>

      {/* Toolbar */}
      <div className="ud2-orders-toolbar">
        <div className="ud2-search-bar">
          <Search size={15} />
          <input
            placeholder="Search orders..."
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
                    <button className="ud2-btn-track" onClick={e => { e.stopPropagation(); navigatePage('track'); }}>
                      {order.status === 'Delivered' ? 'Buy Again' : 'Track Order'}
                    </button>
                    <button className="ud2-btn-details" onClick={e => e.stopPropagation()}>View Details</button>
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
                          <p className="ud2-item-price">{settings?.currency || 'AED'} {((Number(it.price) || 0) * it.quantity).toFixed(2)}</p>
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
                        <p>Order Total</p><span>${(order.total || 0).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
