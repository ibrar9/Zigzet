import React from 'react';
import {
  Package, Truck, Heart, Tag, ChevronRight,
  ArrowRight, ShoppingBag, CheckCircle2, Clock, MoreVertical, MapPin,
  RotateCcw, CreditCard, MessageSquare, Headphones, Gift, RotateCw
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
    icon: ShoppingBag,
    iconColor: '#7c3aed',
    iconBg: '#ede9fe',
    tabId: 'orders'
  },
  {
    label: 'In Progress',
    value: inProgress,
    sub: 'Track your orders →',
    icon: Truck,
    iconColor: '#d97706',
    iconBg: '#fef3c7',
    tabId: 'orders'
  },
  {
    label: 'Wishlist',
    value: wishlistLen,
    sub: 'See your wishlist →',
    icon: Heart,
    iconColor: '#e11d48',
    iconBg: '#ffe4e6',
    tabId: 'wishlist'
  },
  {
    label: 'Coupons',
    value: couponsLen,
    sub: 'View coupons →',
    icon: Tag,
    iconColor: '#16a34a',
    iconBg: '#dcfce7',
    tabId: 'loyalty'
  },
];

export const UserOverview = ({ setActiveTab, myOrders, inProgress }) => {
  const { wishlist, coupons, navigatePage, currentUser, products, settings, userAddresses, reorderItems } = useStore();

  const firstName = currentUser?.name?.split(' ')[0] || 'there';
  const recentOrders = myOrders.slice(0, 3);
  const stats = STAT_CARDS(myOrders.length, inProgress, wishlist.length, coupons?.length || 3);
  const recommendedProducts = (products || []).filter(p => p.isActive !== false).slice(0, 3);

  const defaultAddress = (userAddresses || []).find(a => a.isDefault) || userAddresses?.[0] || {
    name: currentUser?.name || 'Sarah Jenkins',
    street: currentUser?.address || '742 Evergreen Terrace',
    city: currentUser?.city || 'Springfield',
    zip: currentUser?.zip || '97477',
    country: 'United States',
    phone: currentUser?.phone || '+1 (555) 123-4567',
    type: 'Home'
  };

  return (
    <div className="ud2-overview">
      {/* Greeting */}
      <div className="ud2-greeting">
        <div>
          <h2>Hi, {firstName}!</h2>
          <p>Welcome back. Manage your orders, returns, saved addresses and loyalty perks.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="ud2-stat-row">
        {stats.map(s => {
          const IconComp = s.icon;
          return (
            <button
              key={s.label}
              className="ud2-stat-card"
              onClick={() => setActiveTab(s.tabId)}
            >
              <div className="ud2-stat-icon-wrap" style={{ background: s.iconBg, color: s.iconColor, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '42px', height: '42px', borderRadius: '12px' }}>
                <IconComp size={20} />
              </div>
              <div className="ud2-stat-body">
                <span className="ud2-stat-label">{s.label}</span>
                <span className="ud2-stat-val">{s.value}</span>
                <span className="ud2-stat-sub">{s.sub}</span>
              </div>
            </button>
          );
        })}
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
                          <p className="ud2-order-price">{settings?.currency || 'AED'} {(order.total || 0).toFixed(2)}</p>
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
                              onClick={() => {
                                if (order.status === 'Delivered') {
                                  reorderItems(order.items);
                                } else {
                                  navigatePage('track');
                                }
                              }}
                            >
                              {order.status === 'Delivered' ? 'Buy Again' : 'Track Order'}
                            </button>
                            <button className="ud2-btn-details" onClick={() => setActiveTab('orders')}>
                              View Details
                            </button>
                          </div>
                        </td>
                        <td>
                          <button className="ud2-more-btn" onClick={() => setActiveTab('orders')}>
                            <MoreVertical size={16} />
                          </button>
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
              <div className="ud2-promo-gift" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Gift size={24} color="#7c3aed" />
              </div>
            </div>

            {/* Recommended */}
            <div className="ud2-recommended">
              <h4>Recommended For You</h4>
              <div className="ud2-rec-grid">
                {recommendedProducts.map(p => (
                  <button
                    key={p.id}
                    className="ud2-rec-card"
                    onClick={() => navigatePage('shop')}
                  >
                    <div className="ud2-rec-img">
                      <img src={p.image} alt={p.name} />
                      <span className="ud2-rec-heart">
                        <Heart size={13} />
                      </span>
                    </div>
                    <p className="ud2-rec-name">{p.name}</p>
                    <p className="ud2-rec-price">{settings?.currency || 'AED'} {Number(p.price).toFixed(2)}</p>
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
              { label: 'Return / Exchange Item', icon: RotateCcw, tab: 'returns' },
              { label: 'Manage Address Book', icon: MapPin, tab: 'addresses' },
              { label: 'Payment & Wallet', icon: CreditCard, tab: 'payment' },
              { label: 'Product Reviews', icon: MessageSquare, tab: 'reviews' },
              { label: 'Help & Live Tickets', icon: Headphones, tab: 'help' },
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
                  <span className="ud2-address-type">{defaultAddress.type || 'Home'}</span>
                  <span className="ud2-address-default">Default</span>
                </div>
                <p className="ud2-address-name">{defaultAddress.name}</p>
                <p className="ud2-address-text">
                  {defaultAddress.street}<br />
                  {defaultAddress.city}, {defaultAddress.state || ''} {defaultAddress.zip}<br />
                  {defaultAddress.country || 'United States'}<br />
                  {defaultAddress.phone}
                </p>
                <button className="ud2-manage-addr" onClick={() => setActiveTab('addresses')}>
                  Manage Addresses ({userAddresses?.length || 1}) →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
