import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Settings, 
  Store, 
  ArrowLeft,
  Sparkles,
  ExternalLink 
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { AdminDashboard } from './AdminDashboard';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminSettings } from './AdminSettings';

export const AdminPanel = () => {
  const { adminTab, setAdminTab, setViewMode } = useStore();

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> },
    { id: 'products', label: 'Products & Inventory', icon: <Package size={16} /> },
    { id: 'orders', label: 'Customer Orders', icon: <ShoppingBag size={16} /> },
    { id: 'settings', label: 'Store Settings', icon: <Settings size={16} /> }
  ];

  return (
    <div className="admin-container">
      {/* Admin Header */}
      <header className="admin-header">
        <div className="admin-brand">
          <button 
            onClick={() => setViewMode('store')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '600', color: '#4b5563', marginRight: '8px' }}
          >
            <ArrowLeft size={16} />
            <span>Back to Store</span>
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', fontFamily: 'var(--font-primary)' }}>ShopNest</span>
            <span className="admin-badge">Admin Suite</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="admin-nav-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`admin-tab-btn ${adminTab === tab.id ? 'active' : ''}`}
              onClick={() => setAdminTab(tab.id)}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* View Storefront CTA */}
        <div>
          <button
            onClick={() => setViewMode('store')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: '#111827',
              color: '#ffffff',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '13px',
              fontWeight: '600'
            }}
          >
            <Store size={15} />
            <span>View Live Store</span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-content-area">
        {adminTab === 'dashboard' && <AdminDashboard />}
        {adminTab === 'products' && <AdminProducts />}
        {adminTab === 'orders' && <AdminOrders />}
        {adminTab === 'settings' && <AdminSettings />}
      </main>
    </div>
  );
};
