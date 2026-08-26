import React, { useState } from 'react';
import { 
  Bell, Package, Tag, MessageSquare, Award, Check, 
  Trash2, ExternalLink, CheckCheck, Clock, ShieldAlert
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const UserNotifications = ({ setActiveTab }) => {
  const { 
    userNotifications, 
    markUserNotificationRead, 
    markAllUserNotificationsRead, 
    deleteUserNotification, 
    clearAllUserNotifications,
    navigatePage 
  } = useStore();

  const [filterType, setFilterType] = useState('all'); // 'all' | 'order' | 'promo' | 'support' | 'loyalty'

  const filteredNotifs = userNotifications.filter(n => {
    if (filterType === 'all') return true;
    return n.type === filterType;
  });

  const unreadCount = userNotifications.filter(n => n.unread).length;

  const handleActionClick = (notif) => {
    markUserNotificationRead(notif.id);
    if (notif.actionTab && setActiveTab) {
      setActiveTab(notif.actionTab);
    } else if (notif.actionPage) {
      navigatePage(notif.actionPage);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'order':
        return { icon: Package, color: '#7c3aed', bg: '#ede9fe' };
      case 'promo':
        return { icon: Tag, color: '#ea580c', bg: '#ffedd5' };
      case 'support':
        return { icon: MessageSquare, color: '#0284c7', bg: '#e0f2fe' };
      case 'loyalty':
        return { icon: Award, color: '#16a34a', bg: '#dcfce7' };
      default:
        return { icon: Bell, color: '#7c3aed', bg: '#ede9fe' };
    }
  };

  return (
    <div className="ud2-orders-page">
      {/* Heading */}
      <div className="ud2-page-heading" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h2>Notifications Center</h2>
          <p>Stay updated on orders, exclusive flash sales, support messages, and rewards</p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {unreadCount > 0 && (
            <button
              onClick={markAllUserNotificationsRead}
              style={{
                background: '#ede9fe',
                color: '#7c3aed',
                border: 'none',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <CheckCheck size={14} /> Mark All Read
            </button>
          )}
          {userNotifications.length > 0 && (
            <button
              onClick={clearAllUserNotifications}
              style={{
                background: '#f8fafc',
                color: '#64748b',
                border: '1px solid #e2e8f0',
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 6
              }}
            >
              <Trash2 size={14} /> Clear All
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6, marginBottom: 20 }}>
        {[
          { id: 'all', label: 'All Alerts', count: userNotifications.length },
          { id: 'order', label: 'Orders', count: userNotifications.filter(n => n.type === 'order').length },
          { id: 'promo', label: 'Deals & Promos', count: userNotifications.filter(n => n.type === 'promo').length },
          { id: 'support', label: 'Support & Tickets', count: userNotifications.filter(n => n.type === 'support').length },
          { id: 'loyalty', label: 'Loyalty Points', count: userNotifications.filter(n => n.type === 'loyalty').length },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterType(tab.id)}
            style={{
              padding: '8px 14px',
              borderRadius: 20,
              border: filterType === tab.id ? '2px solid #7c3aed' : '1px solid #e2e8f0',
              background: filterType === tab.id ? '#7c3aed' : '#fff',
              color: filterType === tab.id ? '#fff' : '#475569',
              fontWeight: 600,
              fontSize: 13,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            <span>{tab.label}</span>
            <span style={{
              background: filterType === tab.id ? 'rgba(255,255,255,0.25)' : '#f1f5f9',
              color: filterType === tab.id ? '#fff' : '#64748b',
              padding: '1px 6px',
              borderRadius: 10,
              fontSize: 11
            }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Notification List */}
      {filteredNotifs.length === 0 ? (
        <div className="ud2-empty-page">
          <Bell size={48} />
          <h3>No Notifications</h3>
          <p>You have caught up with all your updates and alerts.</p>
          <button onClick={() => setFilterType('all')}>View All Notifications</button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {filteredNotifs.map((notif) => {
            const { icon: Icon, color, bg } = getIcon(notif.type);
            return (
              <div
                key={notif.id}
                className="ud2-section-card"
                style={{
                  padding: 16,
                  borderRadius: 14,
                  border: notif.unread ? '1.5px solid #c4b5fd' : '1px solid #e2e8f0',
                  background: notif.unread ? '#faf5ff' : '#fff',
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: 14,
                  transition: 'all 0.2s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1 }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: bg, color: color, display: 'grid', placeItems: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Icon size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <p style={{ fontWeight: 700, fontSize: 14.5, color: '#0f172a' }}>{notif.title}</p>
                      {notif.unread && (
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
                      )}
                    </div>
                    <p style={{ fontSize: 13.5, color: '#475569', lineHeight: 1.4, marginBottom: 8 }}>{notif.message}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <Clock size={12} /> {notif.time}
                      </span>
                      {notif.actionTab && (
                        <button
                          onClick={() => handleActionClick(notif)}
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: '#7c3aed',
                            fontSize: 12.5,
                            fontWeight: 700,
                            cursor: 'pointer',
                            padding: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4
                          }}
                        >
                          View Details <ExternalLink size={11} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  {notif.unread && (
                    <button
                      onClick={() => markUserNotificationRead(notif.id)}
                      title="Mark as read"
                      style={{ background: '#f1f5f9', border: 'none', borderRadius: 8, width: 30, height: 30, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#475569' }}
                    >
                      <Check size={14} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteUserNotification(notif.id)}
                    title="Remove notification"
                    style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, width: 30, height: 30, display: 'grid', placeItems: 'center', cursor: 'pointer', color: '#94a3b8' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
