import React, { useState } from 'react';
import {
  Menu,
  Search,
  SlidersHorizontal,
  Bell,
  MessageSquare,
  Settings,
  ChevronDown,
  Store,
  LogOut,
  User
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminHeader = ({ 
  setIsMobileOpen, 
  onOpenInbox, 
  onOpenNotifications,
  searchVal,
  setSearchVal
}) => {
  const { adminTab, setAdminTab, setViewMode, logoutAdmin, settings } = useStore();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);

  const getPageTitle = () => {
    switch (adminTab) {
      case 'dashboard':
        return { title: 'Analysis', subtitle: "Let's check your store today" };
      case 'products':
        return { title: 'Products & Inventory', subtitle: 'Manage stock levels, categories, and catalog' };
      case 'orders':
        return { title: 'Customer Orders', subtitle: 'Track and fulfill customer purchases' };
      case 'customers':
        return { title: 'Customers Directory', subtitle: 'View customer insights, lifetime value, and contacts' };
      case 'wallet':
        return { title: 'My Wallet', subtitle: 'Review earnings, settlements, and payout methods' };
      case 'transactions':
        return { title: 'Transactions Ledger', subtitle: 'Real-time financial activity and audit log' };
      case 'integrations':
        return { title: 'Integrations & Apps', subtitle: 'Connected channels: Stripe, PayPal, DHL, Shopify' };
      case 'user':
        return { title: 'User Permissions', subtitle: 'Manage admin roles, team access, and security' };
      case 'history':
        return { title: 'Activity History', subtitle: 'Audit log of recent system modifications' };
      case 'support':
        return { title: 'Support & Help Desk', subtitle: 'Knowledge base and 24/7 dedicated assistance' };
      case 'settings':
        return { title: 'Store Settings', subtitle: 'Global configurations, policies, and credentials' };
      default:
        return { title: 'Analysis', subtitle: "Let's check your store today" };
    }
  };

  const { title, subtitle } = getPageTitle();

  const currencies = [
    { code: 'USD', flag: '🇺🇸', label: 'USD ($)' },
    { code: 'EUR', flag: '🇪🇺', label: 'EUR (€)' },
    { code: 'GBP', flag: '🇬🇧', label: 'GBP (£)' }
  ];

  return (
    <header className="admin-topbar">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="admin-topbar-left">
        <button 
          className="admin-mobile-toggle"
          onClick={() => setIsMobileOpen(true)}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="admin-header-title-box">
          <h1 className="admin-page-title">{title}</h1>
          <p className="admin-page-subtitle">{subtitle}</p>
        </div>
      </div>

      {/* Right: Search + Currency + Action Icons + Profile */}
      <div className="admin-topbar-right">
        {/* Search Input Bar */}
        <div className="admin-search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Search Dashboard"
            value={searchVal || ''}
            onChange={(e) => setSearchVal && setSearchVal(e.target.value)}
            className="admin-search-input"
          />
          <button className="search-filter-btn" title="Filter results">
            <SlidersHorizontal size={14} />
          </button>
        </div>

        {/* Currency / Language Flag Selector */}
        <div className="admin-dropdown-container">
          <button
            className="admin-currency-btn"
            onClick={() => setIsCurrencyOpen(!isCurrencyOpen)}
            title="Change Currency"
          >
            <span className="country-flag">
              {currencies.find((c) => c.code === selectedCurrency)?.flag || '🇺🇸'}
            </span>
            <span className="currency-code">{selectedCurrency}</span>
            <ChevronDown size={13} />
          </button>

          {isCurrencyOpen && (
            <div className="admin-dropdown-menu">
              {currencies.map((curr) => (
                <button
                  key={curr.code}
                  className={`admin-dropdown-item ${selectedCurrency === curr.code ? 'selected' : ''}`}
                  onClick={() => {
                    setSelectedCurrency(curr.code);
                    setIsCurrencyOpen(false);
                  }}
                >
                  <span>{curr.flag}</span>
                  <span>{curr.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons: Chat, Notification, Settings */}
        <div className="admin-action-icons-group">
          {/* Inbox / Messages */}
          <button 
            className="admin-icon-btn purple-btn" 
            onClick={onOpenInbox}
            title="Open Inbox"
          >
            <MessageSquare size={17} />
            <span className="icon-badge">3</span>
          </button>

          {/* Notifications */}
          <button 
            className="admin-icon-btn" 
            onClick={onOpenNotifications}
            title="Notifications"
          >
            <Bell size={17} />
            <span className="icon-dot-badge"></span>
          </button>

          {/* Settings */}
          <button 
            className="admin-icon-btn"
            onClick={() => setAdminTab('settings')}
            title="Store Settings"
          >
            <Settings size={17} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className="admin-profile-container">
          <button
            className="admin-profile-btn"
            onClick={() => setIsProfileOpen(!isProfileOpen)}
          >
            <div className="admin-avatar-box">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80"
                alt="Alex Johnson"
                className="admin-avatar-img"
              />
              <span className="admin-online-dot"></span>
            </div>
          </button>

          {isProfileOpen && (
            <div className="admin-profile-dropdown">
              <div className="profile-dropdown-header">
                <div className="profile-name">Alex Johnson</div>
                <div className="profile-role">Store Administrator</div>
                <div className="profile-store">{settings.storeName || 'Zigzet Store'}</div>
              </div>

              <div className="profile-dropdown-divider" />

              <button
                className="profile-dropdown-item"
                onClick={() => {
                  setIsProfileOpen(false);
                  window.location.hash = '';
                  setViewMode('store');
                }}
              >
                <Store size={15} />
                <span>Visit Storefront</span>
              </button>

              <button
                className="profile-dropdown-item"
                onClick={() => {
                  setIsProfileOpen(false);
                  setAdminTab('settings');
                }}
              >
                <Settings size={15} />
                <span>Account Settings</span>
              </button>

              <div className="profile-dropdown-divider" />

              <button
                className="profile-dropdown-item danger"
                onClick={() => {
                  setIsProfileOpen(false);
                  logoutAdmin();
                }}
              >
                <LogOut size={15} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
