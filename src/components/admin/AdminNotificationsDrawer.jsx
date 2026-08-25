import React from 'react';
import { X, Bell, ShoppingBag, AlertTriangle, Wallet, Check } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminNotificationsDrawer = ({ isOpen, onClose }) => {
  const { notifications, markAllNotificationsRead } = useStore();

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => n.unread).length;

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return <ShoppingBag size={16} className="notif-icon-purple" />;
      case 'alert':
        return <AlertTriangle size={16} className="notif-icon-orange" />;
      case 'wallet':
        return <Wallet size={16} className="notif-icon-green" />;
      default:
        return <Bell size={16} className="notif-icon-blue" />;
    }
  };

  return (
    <div className="admin-drawer-backdrop" onClick={onClose}>
      <div className="admin-drawer-panel notifications-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <h3>Notifications Center</h3>
            <span className="drawer-badge purple">
              {unreadCount > 0 ? `${unreadCount} new alert${unreadCount > 1 ? 's' : ''}` : 'No new alerts'}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {unreadCount > 0 && (
              <button className="mark-all-read-btn" onClick={markAllNotificationsRead}>
                <Check size={13} />
                <span>Mark all read</span>
              </button>
            )}

            <button className="drawer-close-btn" onClick={onClose} aria-label="Close Drawer">
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="notifications-list-body">
          {notifications.map((n) => (
            <div key={n.id} className={`notification-item-card ${n.unread ? 'unread' : ''}`}>
              <div className="notification-icon-wrapper">
                {getIcon(n.type)}
              </div>

              <div className="notification-text-content">
                <div className="notification-header-row">
                  <h4 className="notif-title">{n.title}</h4>
                  <span className="notif-time">{n.time}</span>
                </div>
                <p className="notif-desc">{n.description}</p>
              </div>

              {n.unread && <span className="notif-unread-dot" />}
            </div>
          ))}

          {notifications.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 16px', color: '#94a3b8' }}>
              <Bell size={32} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
              <p>No notifications at this time.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
