import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  ArrowLeftRight,
  ShoppingBag,
  Users,
  Package,
  MessageSquare,
  Sliders,
  Bell,
  UserCheck,
  History,
  Headphones,
  Settings,
  LogOut,
  ChevronRight,
  Store,
  X
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSidebar = ({ isMobileOpen, setIsMobileOpen, onOpenInbox, onOpenNotifications }) => {
  const { adminTab, setAdminTab, setViewMode, logoutAdmin } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboards', icon: <LayoutDashboard size={18} />, hasSub: true },
    { id: 'wallet', label: 'My Wallet', icon: <Wallet size={18} /> },
    { id: 'transactions', label: 'Transaction', icon: <ArrowLeftRight size={18} /> },
    { id: 'orders', label: 'Order', icon: <ShoppingBag size={18} /> },
    { id: 'customers', label: 'Customers', icon: <Users size={18} /> },
    { id: 'products', label: 'Products', icon: <Package size={18} /> },
    { 
      id: 'inbox', 
      label: 'Inbox', 
      icon: <MessageSquare size={18} />, 
      badge: 3, 
      avatars: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80'
      ] 
    },
    { id: 'integrations', label: 'Integrations', icon: <Sliders size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} />, badge: 2, badgeColor: '#7c3aed' },
    { id: 'user', label: 'User', icon: <UserCheck size={18} /> },
    { id: 'history', label: 'History', icon: <History size={18} /> }
  ];

  const helpItems = [
    { id: 'support', label: 'Support', icon: <Headphones size={18} /> },
    { id: 'settings', label: 'Setting', icon: <Settings size={18} /> }
  ];

  const handleSelectTab = (tabId) => {
    if (tabId === 'inbox' && onOpenInbox) {
      onOpenInbox();
    } else if (tabId === 'notifications' && onOpenNotifications) {
      onOpenNotifications();
    } else {
      setAdminTab(tabId);
    }
    if (setIsMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div 
          className="admin-sidebar-backdrop"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`admin-sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
        {/* Brand Logo */}
        <div className="admin-sidebar-brand">
          <div className="admin-brand-logo-group">
            <div className="admin-brand-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path 
                  d="M12 2L2 7L12 12L22 7L12 2Z" 
                  fill="#7c3aed"
                />
                <path 
                  d="M2 17L12 22L22 17" 
                  stroke="#7c3aed" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <path 
                  d="M2 12L12 17L22 12" 
                  stroke="#9333ea" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div className="admin-brand-name">
              <span className="brand-main">Zigzet</span>
              <span className="brand-dot">.</span>
            </div>
          </div>

          <button 
            className="mobile-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        {/* Sidebar Nav Items */}
        <div className="admin-sidebar-content">
          {/* Menu Section */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Menu</div>
            <nav className="admin-nav-list">
              {menuItems.map((item) => {
                const isActive = adminTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTab(item.id)}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    <span className="nav-item-label">{item.label}</span>

                    {/* Stacked customer avatars for Inbox */}
                    {item.avatars && (
                      <div className="nav-avatar-stack">
                        {item.avatars.map((av, idx) => (
                          <img key={idx} src={av} alt="user" className="stack-avatar" />
                        ))}
                      </div>
                    )}

                    {/* Numeric Badge */}
                    {item.badge && (
                      <span 
                        className="nav-item-badge" 
                        style={{ backgroundColor: item.badgeColor || '#7c3aed' }}
                      >
                        {item.badge}
                      </span>
                    )}

                    {/* Chevron for items with sub/arrow */}
                    {item.hasSub && (
                      <ChevronRight size={14} className="nav-item-chevron" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Help Section */}
          <div className="admin-nav-group">
            <div className="admin-nav-heading">Help</div>
            <nav className="admin-nav-list">
              {helpItems.map((item) => {
                const isActive = adminTab === item.id;
                return (
                  <button
                    key={item.id}
                    className={`admin-nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleSelectTab(item.id)}
                  >
                    <span className="nav-item-icon">{item.icon}</span>
                    <span className="nav-item-label">{item.label}</span>
                  </button>
                );
              })}

              {/* Logout Button */}
              <button
                className="admin-nav-item logout"
                onClick={logoutAdmin}
              >
                <span className="nav-item-icon"><LogOut size={18} /></span>
                <span className="nav-item-label">Logout</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Bottom Storefront preview pill */}
        <div className="admin-sidebar-footer">
          <button
            className="storefront-link-btn"
            onClick={() => {
              window.location.hash = '';
              setViewMode('store');
            }}
          >
            <Store size={15} />
            <span>Switch to Storefront</span>
          </button>
        </div>
      </aside>
    </>
  );
};
