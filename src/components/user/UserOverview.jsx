import React from 'react';
import {
  Package, Truck, Heart, Tag, ChevronRight,
  ArrowRight, ShoppingBag, CheckCircle2, Clock, MoreVertical, MapPin
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const STATUS_META = {
  'Delivered': { color: '#16a34a', bg: '#dcfce7', label: 'Delivered' },
  'Shipped': { color: '#7c3aed', bg: '#ede9fe', label: 'Shipped' },
  'Processing': { color: '#d97706', bg: '#fef3c7', label: 'In Transit' },
  'Cancelled': { color: '#dc2626', bg: '#fee2e2', label: 'Cancelled' },
};

const STAT_CARDS = (orders, inProgress, wishlistLen, couponsLen) => [
  {
    label: 'Total Orders',
    value: orders,
    sub: 'View all orders →',
    icon: '🛍️',
    iconBg: '#ede9fe',
    tabId: 'orders'
  },
  {
    label: 'In Progress',
    value: inProgress,
    sub: 'Track your orders →',
    icon: '🚚',
    iconBg: '#fef3c7',
    tabId: 'orders'
  },
  {
    label: 'Wishlist',
    value: wishlistLen,
    sub: 'See your wishlist →',
    icon: '❤️',
    iconBg: '#ffe4e6',
    tabId: 'wishlist'
  },
  {
    label: 'Coupons',
    value: couponsLen,
    sub: 'View coupons →',
    icon: '🏷️',
    iconBg: '#dcfce7',
    tabId: 'loyalty'
  },
];

export const UserOverview = ({ setActiveTab, myOrders, inProgress }) => {
  const { wishlist, coupons, navigatePage, currentUser } = useStore();

  const firstName = currentUser?.name?.split(' ')[0] || 'there';
  const recentOrders = myOrders.slice(0, 3);
  const stats = STAT_CARDS(myOrders.length, inProgress, wishlist.length, coupons?.length || 3);

  const RECOMMENDED = [
    { name: 'Wireless Headphones', price: '$149.99', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&auto=format&fit=crop&q=80' },
    { name: 'Smart Watch Series 9', price: '$299.99', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80' },
    { name: 'Running Sneakers', price: '$89.99', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&auto=format&fit=crop&q=80' },
    { name: 'Laptop Backpack', price: '$49.99', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&auto=format&fit=crop&q=80' },
  ];

  return (
    <div className="ud2-overview">
      {/* Greeting */}
      <div className="ud2-greeting">
        <div>
          <h2>Hi, {firstName}! 👋</h2>
          <p>Welcome back. Manage your orders and account from here.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="ud2-stat-row">
        {stats.map(s => (
          <button
            key={s.label}
            className="ud2-stat-card"
            onClick={() => setActiveTab(s.tabId)}
          >
            <div className="ud2-stat-icon" style={{ background: s.iconBg }}>
              <span>{s.icon}</span>
            </div>
            <div className="ud2-stat-body">
              <p className="ud2-stat-label">{s.label}</p>
              <p className="ud2-stat-value">{s.value}</p>
              <span className="ud2-stat-link">{s.sub}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom 3-column layout */}
      <div className="ud2-bottom-grid">
        {/* Left: Recent Orders + Promo */}
        <div className="ud2-main-col">
          {/* Recent Orders */}
          <div className="ud2-section-card">
            <div className="ud2-section-head">
              <h3>Recent Orders</h3>
              <button className="ud2-view-all" onClick={() => setActiveTab('orders')}>
                View All Orders <ArrowRight size={14} />
              </button>
            </div>

            {recentOrders.length === 0 ? (
              <div className="ud2-empty-mini">
                <ShoppingBag size={36} />
                <p>No orders yet</p>
                <button onClick={() => navigatePage('shop')}>Shop Now</button>
              </div>
            ) : (
              <table className="ud2-orders-table">
                <tbody>
                  {recentOrders.map(order => {
                    const meta = STATUS_META[order.status] || STATUS_META['Processing'];
                    const item = order.items?.[0];
                    return (
                      <tr key={order.id}>
                        <td>
                          <div className="ud2-order-product">
                            <div className="ud2-order-img">
                              {item?.image
                                ? <img src={item.image} alt={item.name} />
                                : <Package size={20} />}
                            </div>
                            <div>
                              <p className="ud2-order-name">{item?.name || 'Product'}</p>
                              <p className="ud2-order-meta">Order #{order.id} · {order.date}</p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="ud2-order-price">AED {(order.total || 0).toFixed(2)}</p>
                          <p className="ud2-order-items-count">{order.items?.length || 1} Item</p>
                        </td>
                        <td>
                          <span
                            className="ud2-status-badge"
                            style={{ color: meta.color, background: meta.bg }}
                          >
                            {meta.label}
                          </span>
                          {order.status === 'Shipped' && (
                            <p className="ud2-arriving">Arriving {order.date}</p>
                          )}
                        </td>
                        <td>
                          <div className="ud2-order-actions">
                            <button
                              className="ud2-btn-track"
                              onClick={() => navigatePage('track')}
                            >
                              {order.status === 'Delivered' ? 'Buy Again' : 'Track Order'}
                            </button>
                            <button className="ud2-btn-details">View Details</button>
                          </div>
                        </td>
                        <td>
                          <button className="ud2-more-btn"><MoreVertical size={16} /></button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          {/* Promo Banner */}
          <div className="ud2-promo-row">
            {/* Exclusive Offer card */}
            <div className="ud2-promo-card">
              <div className="ud2-promo-badge">%</div>
              <div>
                <h4>Exclusive Offers Just For You!</h4>
                <p>Use code <strong>WELCOME15</strong> and get 15% off on your next purchase.</p>
                <button onClick={() => navigatePage('shop')}>Shop Now</button>
              </div>
              <div className="ud2-promo-gift">🎁</div>
            </div>

            {/* Recommended */}
            <div className="ud2-recommended">
              <h4>Recommended For You</h4>
              <div className="ud2-rec-grid">
                {RECOMMENDED.map(p => (
                  <button
                    key={p.name}
                    className="ud2-rec-card"
                    onClick={() => navigatePage('shop')}
                  >
                    <div className="ud2-rec-img">
                      <img src={p.img} alt={p.name} />
                      <span className="ud2-rec-heart">♡</span>
                    </div>
                    <p className="ud2-rec-name">{p.name}</p>
                    <p className="ud2-rec-price">{p.price}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="ud2-right-col">
          {/* Quick Actions */}
          <div className="ud2-section-card">
            <h3>Quick Actions</h3>
            {[
              { label: 'Track an Order', icon: Truck, tab: 'orders' },
              { label: 'Return an Item', icon: Package, tab: 'returns' },
              { label: 'Manage Address', icon: MapPin, tab: 'addresses' },
              { label: 'Payment Methods', icon: Tag, tab: 'payment' },
            ].map(a => {
              const Icon = a.icon;
              return (
                <button
                  key={a.label}
                  className="ud2-quick-action"
                  onClick={() => setActiveTab(a.tab)}
                >
                  <div className="ud2-qa-icon"><Icon size={15} /></div>
                  <span>{a.label}</span>
                  <ChevronRight size={15} />
                </button>
              );
            })}
          </div>

          {/* Shipping Address */}
          <div className="ud2-section-card">
            <h3>Shipping Address</h3>
            <div className="ud2-address-block">
              <div className="ud2-address-icon"><MapPin size={16} /></div>
              <div>
                <div className="ud2-address-header">
                  <span className="ud2-address-type">Home</span>
                  <span className="ud2-address-default">Default</span>
                </div>
                <p className="ud2-address-name">{currentUser?.name || 'Customer'}</p>
                <p className="ud2-address-text">
                  {currentUser?.address || '742 Evergreen Terrace'}<br />
                  {currentUser?.city || 'Springfield'}, {currentUser?.zip || '97477'}<br />
                  United States<br />
                  {currentUser?.phone || '+1 (555) 123-4567'}
                </p>
                <button className="ud2-manage-addr" onClick={() => setActiveTab('addresses')}>
                  Manage Addresses →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
