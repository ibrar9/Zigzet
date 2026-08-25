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
import { AdminCoupons } from './AdminCoupons';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminAbandonedCarts } from './AdminAbandonedCarts';
import { AdminCampaigns } from './AdminCampaigns';
import { AdminReviews } from './AdminReviews';
import { AdminShipments } from './AdminShipments';
import { AdminLoyalty } from './AdminLoyalty';
import { AdminCustomizer } from './AdminCustomizer';
import { AdminInvoices } from './AdminInvoices';
import { AdminStaff } from './AdminStaff';
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
          {adminTab === 'analytics' && <AdminAnalytics />}
          {adminTab === 'products' && <AdminProducts />}
          {adminTab === 'orders' && <AdminOrders />}
          {adminTab === 'coupons' && <AdminCoupons />}
          {adminTab === 'campaigns' && <AdminCampaigns />}
          {adminTab === 'abandoned-carts' && <AdminAbandonedCarts />}
          {adminTab === 'customers' && <AdminCustomers onOpenInbox={() => setIsInboxOpen(true)} />}
          {adminTab === 'shipments' && <AdminShipments />}
          {adminTab === 'reviews' && <AdminReviews />}
          {adminTab === 'loyalty' && <AdminLoyalty />}
          {adminTab === 'invoices' && <AdminInvoices />}
          {adminTab === 'customizer' && <AdminCustomizer />}
          {adminTab === 'staff' && <AdminStaff />}
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
        </main>
      </div>

      {/* 3. Live Customer Chat Drawer */}
      <AdminInboxDrawer
        isOpen={isInboxOpen}
        onClose={() => setIsInboxOpen(false)}
      />

      {/* 4. Store Notifications Drawer */}
      <AdminNotificationsDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  );
};
