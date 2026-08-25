import React, { useState } from 'react';
import {
  LayoutDashboard, Package, RotateCcw, Heart, MapPin,
  CreditCard, Tag, Bell, Star, Settings, HelpCircle,
  LogOut, ShoppingBag, Search, ChevronRight, Menu, X,
  Award, Phone
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserOverview } from './UserOverview';
import { UserOrders } from './UserOrders';
import { UserWishlist } from './UserWishlist';
import { UserLoyalty } from './UserLoyalty';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';

const NAV_SECTIONS = [
  {
    items: [
      { id: 'overview', label: 'Overview', icon: LayoutDashboard },
      { id: 'orders', label: 'Orders', icon: Package },
      { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw },
      { id: 'wishlist', label: 'Wishlist', icon: Heart },
      { id: 'addresses', label: 'Addresses', icon: MapPin },
      { id: 'payment', label: 'Payment Methods', icon: CreditCard },
      { id: 'loyalty', label: 'Coupons & Offers', icon: Tag },
      { id: 'notifications', label: 'Notifications', icon: Bell, badge: 3 },
      { id: 'reviews', label: 'Reviews', icon: Star },
      { id: 'profile', label: 'Account Settings', icon: Settings },
      { id: 'help', label: 'Help & Support', icon: HelpCircle },
    ]
  }
];

export const UserDashboard = () => {
  const { currentUser, logoutUser, wishlist, orders, coupons, navigatePage } = useStore();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const myOrders = orders.filter(o =>
    o.email?.toLowerCase() === currentUser?.email?.toLowerCase()
  );
  const inProgress = myOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <UserOverview setActiveTab={setActiveTab} myOrders={myOrders} inProgress={inProgress} />;
      case 'orders':
      case 'returns': return <UserOrders myOrders={myOrders} />;
      case 'wishlist': return <UserWishlist />;
      case 'loyalty': return <UserLoyalty myOrders={myOrders} />;
      case 'profile':
      case 'addresses':
      case 'payment': return <UserProfile />;
      case 'settings':
      case 'notifications':
      case 'reviews':
      case 'help': return <UserSettings />;
      default: return <UserOverview setActiveTab={setActiveTab} myOrders={myOrders} inProgress={inProgress} />;
    }
  };

  const currentNavLabel = NAV_SECTIONS[0].items.find(n => n.id === activeTab)?.label || 'Overview';

  return (
    <div className="ud2-root">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="ud2-overlay" onClick={() => setSidebarOpen(false)} />}

      {/* ===== SIDEBAR ===== */}
      <aside className={`ud2-sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Logo */}
        <div className="ud2-sidebar-logo" onClick={() => navigatePage('home')}>
          <div className="ud2-logo-icon">
            <ShoppingBag size={18} />
          </div>
          <span className="ud2-logo-text">Zigzet</span>
        </div>

        {/* Nav */}
        <nav className="ud2-nav">
          {NAV_SECTIONS[0].items.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`ud2-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ud2-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sign Out */}
        <div className="ud2-sidebar-bottom">
          <button
            className="ud2-signout-btn"
            onClick={() => { logoutUser(); navigatePage('home'); }}
          >
            <LogOut size={17} />
            <span>Sign Out</span>
          </button>

          {/* Help Card */}
          <div className="ud2-help-card">
            <div className="ud2-help-icon">
              <Phone size={16} />
            </div>
            <div>
              <p className="ud2-help-title">Need Help?</p>
              <p className="ud2-help-desc">Our support team is here to help you.</p>
            </div>
            <button className="ud2-help-btn" onClick={() => navigatePage('contact')}>
              Contact Support
            </button>
          </div>
        </div>
      </aside>

      {/* ===== MAIN ===== */}
      <div className="ud2-main">
        {/* Top Header */}
        <header className="ud2-topbar">
          <div className="ud2-topbar-left">
            <button className="ud2-mobile-menu" onClick={() => setSidebarOpen(p => !p)}>
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="ud2-search-box">
              <Search size={15} />
              <input placeholder="Search for products, brands and more..." readOnly onClick={() => navigatePage('shop')} />
            </div>
          </div>
          <div className="ud2-topbar-right">
            <button className="ud2-topbar-icon-btn" title="Notifications">
              <Bell size={19} />
              <span className="ud2-topbar-badge">3</span>
            </button>
            <div className="ud2-user-chip">
              <div className="ud2-user-avatar">
                {currentUser?.name?.[0]?.toUpperCase() || 'U'}
              </div>
              <span className="ud2-user-chip-name">{currentUser?.name?.split(' ')[0] || 'User'}</span>
              <ChevronRight size={14} style={{ opacity: 0.4 }} />
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="ud2-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
