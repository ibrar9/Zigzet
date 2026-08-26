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
  X,
  Tag,
  BarChart3,
  ShoppingCart,
  Zap,
  Star,
  Truck,
  Award,
  Palette,
  FileText,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminSidebar = ({ isMobileOpen, setIsMobileOpen, onOpenInbox, onOpenNotifications }) => {
  const { 
    adminTab, 
    setAdminTab, 
    setViewMode, 
    logoutAdmin, 
    inboxMessages, 
    notifications, 
    orders, 
    abandonedCarts, 
    reviews, 
    coupons,
    integrations 
  } = useStore();

  const unreadInboxCount = inboxMessages.filter((m) => m.unread).length;
  const unreadNotifsCount = notifications.filter((n) => n.unread).length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Pending' || o.status === 'Processing').length;
  const pendingReviewsCount = reviews.filter((r) => r.status === 'Pending').length;
  const abandonedCount = abandonedCarts.filter((c) => c.recoveryStatus === 'Pending').length;
  const connectedCount = Object.values(integrations || {}).filter((i) => i.status === 'Connected').length;

  const sections = [
    {
      title: 'CORE & INTELLIGENCE',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={17} /> },
        { id: 'analytics', label: 'Analytics & Profits', icon: <BarChart3 size={17} /> },
        { id: 'wallet', label: 'My Wallet', icon: <Wallet size={17} /> }
      ]
    },
    {
      title: 'SALES & COMMERCE',
      items: [
        { 
          id: 'orders', 
          label: 'Orders', 
          icon: <ShoppingBag size={17} />,
          badge: pendingOrdersCount > 0 ? pendingOrdersCount : null,
          badgeColor: '#10b981'
        },
        { id: 'products', label: 'Products & Stock', icon: <Package size={17} /> },
        { id: 'coupons', label: 'Discount Coupons', icon: <Tag size={17} /> },
        { id: 'campaigns', label: 'Flash Sale Timer', icon: <Zap size={17} /> },
        { 
          id: 'abandoned-carts', 
          label: 'Abandoned Carts', 
          icon: <ShoppingCart size={17} />,
          badge: abandonedCount > 0 ? abandonedCount : null,
          badgeColor: '#ea580c'
        }
      ]
    },
    {
      title: 'OPERATIONS & FULFILLMENT',
      items: [
        { id: 'customers', label: 'Customers CRM', icon: <Users size={17} /> },
        { id: 'shipments', label: 'Shipping & Labels', icon: <Truck size={17} /> },
        { 
          id: 'reviews', 
          label: 'Reviews Moderation', 
          icon: <Star size={17} />,
          badge: pendingReviewsCount > 0 ? pendingReviewsCount : null,
          badgeColor: '#f59e0b'
        },
        { id: 'loyalty', label: 'Loyalty & Rewards', icon: <Award size={17} /> },
        { id: 'invoices', label: 'Tax Invoices & QR', icon: <FileText size={17} /> }
      ]
    },
    {
      title: 'STORE MANAGEMENT',
      items: [
        { id: 'seo', label: 'SEO & Search Engine', icon: <Globe size={17} /> },
        { id: 'customizer', label: 'Visual Hero CMS', icon: <Palette size={17} /> },
        { id: 'staff', label: 'Staff & Roles', icon: <ShieldCheck size={17} /> },
        { 
          id: 'integrations', 
          label: 'Integrations & Apps', 
          icon: <Sliders size={17} />,
          badge: connectedCount > 0 ? `${connectedCount} live` : null,
          badgeColor: '#6366f1'
        },
        { id: 'settings', label: 'Store Settings', icon: <Settings size={17} /> }
      ]
    }
  ];

  const handleSelectTab = (tabId) => {
    setAdminTab(tabId);
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
              <span className="brand-badge">ADMIN</span>
            </div>
          </div>

          <button 
            className="sidebar-close-btn"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Section Container */}
        <div className="admin-sidebar-menu-scrollable" style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {sections.map((sec, sIdx) => (
            <div key={sIdx}>
              <div style={{ fontSize: '10.5px', fontWeight: '800', color: '#94a3b8', letterSpacing: '0.06em', padding: '0 12px 6px 12px' }}>
                {sec.title}
              </div>

              <ul className="admin-menu-list" style={{ display: 'flex', flexDirection: 'column', gap: '2px', listStyle: 'none' }}>
                {sec.items.map((item) => {
                  const isActive = adminTab === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        className={`admin-menu-item ${isActive ? 'active' : ''}`}
                        onClick={() => handleSelectTab(item.id)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: isActive ? '700' : '500',
                          color: isActive ? '#7c3aed' : '#475569',
                          background: isActive ? '#f5f3ff' : 'transparent',
                          transition: 'all 0.15s ease'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ color: isActive ? '#7c3aed' : '#64748b', display: 'flex', alignItems: 'center' }}>
                            {item.icon}
                          </span>
                          <span>{item.label}</span>
                        </div>

                        {item.badge && (
                          <span
                            style={{
                              background: item.badgeColor || '#7c3aed',
                              color: '#ffffff',
                              fontSize: '10.5px',
                              fontWeight: '800',
                              padding: '2px 6px',
                              borderRadius: '9999px'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom User / Storefront Switcher */}
        <div className="admin-sidebar-footer" style={{ borderTop: '1px solid #e2e8f0', padding: '16px 14px' }}>
          <button
            className="storefront-switch-btn"
            onClick={() => {
              window.location.hash = '';
              setViewMode('store');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              width: '100%',
              padding: '9px 14px',
              borderRadius: '10px',
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              fontSize: '12.5px',
              fontWeight: '700',
              color: '#334155',
              marginBottom: '10px'
            }}
          >
            <Store size={15} color="#7c3aed" />
            <span>View Customer Store</span>
          </button>

          <button
            className="admin-logout-btn"
            onClick={logoutAdmin}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              width: '100%',
              padding: '8px 14px',
              borderRadius: '10px',
              color: '#ef4444',
              fontSize: '12.5px',
              fontWeight: '600',
              background: 'transparent'
            }}
          >
            <LogOut size={14} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};
