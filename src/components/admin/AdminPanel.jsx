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
import { AdminSEO } from './AdminSEO';
import { AdminIntegrations } from './AdminIntegrations';
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
          {adminTab === 'seo' && <AdminSEO />}
          {adminTab === 'integrations' && <AdminIntegrations />}
          {adminTab === 'settings' && <AdminSettings />}
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
