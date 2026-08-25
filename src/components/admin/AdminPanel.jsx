import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { AdminLogin } from './AdminLogin';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminWallet } from './AdminWallet';
import { AdminSettings } from './AdminSettings';
import { AdminInboxDrawer } from './AdminInboxDrawer';
import { AdminNotificationsDrawer } from './AdminNotificationsDrawer';
import { 
  Sliders, 
  ShieldCheck, 
  History, 
  Headphones, 
  Sparkles,
  ExternalLink,
  CheckCircle2,
  CreditCard,
  Wallet,
  Truck,
  Mail,
  BarChart3,
  Target
} from 'lucide-react';

export const AdminPanel = () => {
  const { adminTab, setAdminTab, isAdminAuthenticated } = useStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isInboxOpen, setIsInboxOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // If not authenticated, show secure Login Portal
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  return (
    <div className="zigzet-admin-layout">
      {/* 1. Left Sidebar */}
      <AdminSidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
        onOpenInbox={() => setIsInboxOpen(true)}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
      />

      {/* 2. Main Content Wrapper */}
      <div className="zigzet-admin-main-wrapper">
        {/* Top Navigation Bar */}
        <AdminHeader
          setIsMobileOpen={setIsMobileOpen}
          onOpenInbox={() => setIsInboxOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          searchVal={searchVal}
          setSearchVal={setSearchVal}
        />

        {/* Dynamic Tab Views */}
        <main className="zigzet-admin-content-container">
          {adminTab === 'dashboard' && <AdminDashboard />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'customers' && <AdminCustomers onOpenInbox={() => setIsInboxOpen(true)} />}
          {adminTab === 'wallet' && <AdminWallet />}
          {adminTab === 'transactions' && <AdminWallet isTransactionsOnly={true} />}
          {adminTab === 'settings' && <AdminSettings />}

          {/* Integrations Tab View */}
          {adminTab === 'integrations' && (
            <div className="admin-page-container">
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-section-title">Integrations & Connected Channels</h2>
                  <p className="admin-section-desc">Manage API keys, payment gateways, and shipping webhooks</p>
                </div>
              </div>

              <div className="integrations-grid">
                {[
                  { name: 'Stripe Payments', desc: 'Accept credit cards, Apple Pay, Google Pay', status: 'Connected', icon: <CreditCard size={22} color="#6366f1" /> },
                  { name: 'PayPal Checkout', desc: 'Express multi-currency checkout gateway', status: 'Connected', icon: <Wallet size={22} color="#0284c7" /> },
                  { name: 'DHL Express & FedEx', desc: 'Real-time parcel tracking and shipping rates', status: 'Connected', icon: <Truck size={22} color="#f59e0b" /> },
                  { name: 'Mailchimp & Klaviyo', desc: 'Automated email marketing and abandoned carts', status: 'Ready to connect', icon: <Mail size={22} color="#ec4899" /> },
                  { name: 'Google Analytics 4', desc: 'Track visitor traffic and ecommerce conversion', status: 'Connected', icon: <BarChart3 size={22} color="#10b981" /> },
                  { name: 'Facebook & TikTok Pixel', desc: 'Social ad retargeting and conversion tags', status: 'Ready to connect', icon: <Target size={22} color="#8b5cf6" /> }
                ].map((integ, idx) => (
                  <div key={idx} className="dash-card integration-card">
                    <div className="integ-header">
                      <span className="integ-icon" style={{ display: 'flex', alignItems: 'center' }}>{integ.icon}</span>
                      <span className={`integ-status-pill ${integ.status === 'Connected' ? 'connected' : ''}`}>
                        {integ.status === 'Connected' && <CheckCircle2 size={12} />}
                        {integ.status}
                      </span>
                    </div>
                    <h3 className="integ-name">{integ.name}</h3>
                    <p className="integ-desc">{integ.desc}</p>
                    <button className="integ-configure-btn">
                      <span>{integ.status === 'Connected' ? 'Configure' : 'Connect Account'}</span>
                      <ExternalLink size={13} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* User Roles & Permissions Tab View */}
          {adminTab === 'user' && (
            <div className="admin-page-container">
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-section-title">User Permissions & Admin Roles</h2>
                  <p className="admin-section-desc">Control team access levels and security settings</p>
                </div>
              </div>

              <div className="dash-card" style={{ padding: '24px' }}>
                <div className="user-roles-list">
                  {[
                    { name: 'Alex Johnson', role: 'Super Admin', email: 'alex@zigzet.com', access: 'Full Access (All Modules)', active: true },
                    { name: 'Maria Gonzalez', role: 'Store Manager', email: 'maria@zigzet.com', access: 'Products, Orders, Customers', active: true },
                    { name: 'Liam Chen', role: 'Support Agent', email: 'liam@zigzet.com', access: 'Inbox, Orders (Read-only)', active: true }
                  ].map((usr, idx) => (
                    <div key={idx} className="user-role-row">
                      <div className="user-info-group">
                        <div className="user-avatar-circle">{usr.name.charAt(0)}</div>
                        <div>
                          <div className="user-name">{usr.name}</div>
                          <div className="user-email">{usr.email}</div>
                        </div>
                      </div>
                      <div className="user-role-badge">{usr.role}</div>
                      <div className="user-access-text">{usr.access}</div>
                      <button className="user-manage-btn">Manage</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* History / Audit Log Tab View */}
          {adminTab === 'history' && (
            <div className="admin-page-container">
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-section-title">Audit Log & System History</h2>
                  <p className="admin-section-desc">Timeline of all administrative actions and inventory changes</p>
                </div>
              </div>

              <div className="dash-card" style={{ padding: '24px' }}>
                <div className="audit-timeline">
                  {[
                    { action: 'Product Price Updated', detail: 'Suit jacket pants price set to $400.99 by Alex Johnson', time: '15 mins ago' },
                    { action: 'Order Status Changed', detail: 'Order #ORD-7812 marked as Shipped via DHL', time: '1 hour ago' },
                    { action: 'Payout Initiated', detail: 'Weekly settlement of $5,200.00 requested to Bank Account', time: '3 hours ago' },
                    { action: 'Inventory Stock Replenished', detail: 'Added +50 units to Spring Wardrobe collection', time: 'Yesterday' }
                  ].map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-dot" />
                      <div className="timeline-content">
                        <div className="timeline-action">{item.action}</div>
                        <div className="timeline-detail">{item.detail}</div>
                        <span className="timeline-time">{item.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Support Tab View */}
          {adminTab === 'support' && (
            <div className="admin-page-container">
              <div className="admin-page-header">
                <div>
                  <h2 className="admin-section-title">Support & Help Desk</h2>
                  <p className="admin-section-desc">Get fast 24/7 assistance or browse administrative guides</p>
                </div>
              </div>

              <div className="support-cards-grid">
                <div className="dash-card support-card">
                  <Headphones size={28} className="support-icon purple" />
                  <h3>Live Merchant Support</h3>
                  <p>Chat directly with an ecommerce technical specialist for immediate resolution.</p>
                  <button className="support-action-btn purple">Start Live Chat</button>
                </div>

                <div className="dash-card support-card">
                  <Sparkles size={28} className="support-icon green" />
                  <h3>Zigzet Knowledge Base</h3>
                  <p>Comprehensive docs on payment gateways, shipping rules, and custom SEO setups.</p>
                  <button className="support-action-btn outline">Explore Docs</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Global Admin Slide-over Drawers */}
      <AdminInboxDrawer
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
      />

      <AdminNotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};
