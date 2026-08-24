import React, { useState } from 'react';
import { X, Bell, ShoppingBag, AlertTriangle, Wallet, Check } from 'lucide-react';
import { adminNotificationsList } from '../../data/adminMockData';

export const AdminNotificationsDrawer = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState(adminNotificationsList);

  if (!isOpen) return null;

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

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
              {notifications.filter((n) => n.unread).length} new alerts
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button className="mark-all-read-btn" onClick={markAllAsRead}>
              <Check size={13} />
              <span>Mark all read</span>
            </button>

            <button className="drawer-close-btn" onClick={onClose}>
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
        </div>
      </div>
    </div>
  );
};
