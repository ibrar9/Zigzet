import React, { useState } from 'react';
import {
  LayoutDashboard, Package, RotateCcw, Heart, MapPin,
  CreditCard, Tag, Bell, Star, Settings, HelpCircle,
  LogOut, ShoppingBag, Search, ChevronRight, Menu, X,
  Award, Phone, MessageSquare
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { UserOverview } from './UserOverview';
import { UserOrders } from './UserOrders';
import { UserWishlist } from './UserWishlist';
import { UserLoyalty } from './UserLoyalty';
import { UserProfile } from './UserProfile';
import { UserSettings } from './UserSettings';
import { UserAddresses } from './UserAddresses';
import { UserReturns } from './UserReturns';
import { UserReviews } from './UserReviews';
import { UserNotifications } from './UserNotifications';
import { UserSupport } from './UserSupport';
import { UserPayment } from './UserPayment';

export const UserDashboard = () => {
  const { 
    currentUser, 
    logoutUser, 
    wishlist, 
    orders, 
    coupons, 
    userNotifications, 
    userReturns,
    navigatePage 
  } = useStore();

  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const myOrders = orders.filter(o =>
    o.email?.toLowerCase() === currentUser?.email?.toLowerCase() || !currentUser?.email
  );
  const inProgress = myOrders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
  const unreadNotifs = (userNotifications || []).filter(n => n.unread).length;
  const activeReturns = (userReturns || []).filter(r => r.status !== 'Refund Completed').length;

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: Package, badge: inProgress > 0 ? inProgress : null },
    { id: 'returns', label: 'Returns & Refunds', icon: RotateCcw, badge: activeReturns > 0 ? activeReturns : null },
    { id: 'wishlist', label: 'Wishlist', icon: Heart, badge: wishlist?.length > 0 ? wishlist.length : null },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'payment', label: 'Payment & Wallet', icon: CreditCard },
    { id: 'loyalty', label: 'Coupons & Offers', icon: Tag },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifs > 0 ? unreadNotifs : null },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'profile', label: 'Account Settings', icon: Settings },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <UserOverview setActiveTab={setActiveTab} myOrders={myOrders} inProgress={inProgress} />;
      case 'orders':
        return <UserOrders myOrders={myOrders} setActiveTab={setActiveTab} />;
      case 'returns':
        return <UserReturns />;
      case 'wishlist':
        return <UserWishlist />;
      case 'addresses':
        return <UserAddresses />;
      case 'payment':
        return <UserPayment />;
      case 'loyalty':
        return <UserLoyalty myOrders={myOrders} />;
      case 'notifications':
        return <UserNotifications setActiveTab={setActiveTab} />;
      case 'reviews':
        return <UserReviews />;
      case 'profile':
        return <UserProfile />;
      case 'settings':
        return <UserSettings />;
      case 'help':
        return <UserSupport />;
      default:
        return <UserOverview setActiveTab={setActiveTab} myOrders={myOrders} inProgress={inProgress} />;
    }
  };

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
          {navItems.map(item => {
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
                {item.badge ? (
                  <span className="ud2-nav-badge" style={item.id === 'notifications' ? { background: '#ef4444', color: '#fff' } : {}}>
                    {item.badge}
                  </span>
                ) : null}
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
              <p className="ud2-help-desc">Our support team is 24/7 active.</p>
            </div>
            <button className="ud2-help-btn" onClick={() => setActiveTab('help')}>
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
            <button 
              className="ud2-topbar-icon-btn" 
              title="Notifications"
              onClick={() => setActiveTab('notifications')}
            >
              <Bell size={19} />
              {unreadNotifs > 0 && (
                <span className="ud2-topbar-badge">{unreadNotifs}</span>
              )}
            </button>
            <div className="ud2-user-chip" onClick={() => setActiveTab('profile')} style={{ cursor: 'pointer' }}>
              <div className="ud2-user-avatar" style={{ overflow: 'hidden' }}>
                {currentUser?.avatar ? (
                  <img src={currentUser.avatar} alt="User" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  currentUser?.name?.[0]?.toUpperCase() || 'U'
                )}
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
