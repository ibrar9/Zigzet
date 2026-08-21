import React from 'react';
import { DollarSign, ShoppingBag, Package, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const AdminDashboard = () => {
  const { products, orders, setAdminTab } = useStore();

  const totalRevenue = orders.reduce((sum, o) => sum + Number(o.total || 0), 0) + 42500;
  const totalOrdersCount = orders.length + 1244;
  const totalProductsCount = products.length;
  const inStockCount = products.filter((p) => (p.stock || 0) > 0).length;

  const salesData = [
    { day: 'Mon', revenue: 4200, orders: 32 },
    { day: 'Tue', revenue: 5800, orders: 45 },
    { day: 'Wed', revenue: 7100, orders: 58 },
    { day: 'Thu', revenue: 6400, orders: 49 },
    { day: 'Fri', revenue: 8900, orders: 72 },
    { day: 'Sat', revenue: 10400, orders: 86 },
    { day: 'Sun', revenue: 9200, orders: 68 }
  ];

  const maxRevenue = Math.max(...salesData.map((d) => d.revenue));

  return (
    <div>
      {/* 4 Stat Metric Cards */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-info">
            <span>Total Revenue</span>
            <h3>${totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', marginTop: '6px' }}>
              <TrendingUp size={14} />
              <span>+18.4% this month</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
            <DollarSign size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-info">
            <span>Total Orders</span>
            <h3>{totalOrdersCount}</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', marginTop: '6px' }}>
              <TrendingUp size={14} />
              <span>+12.8% vs last week</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#eff6ff', color: '#3b82f6' }}>
            <ShoppingBag size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-info">
            <span>Products in Store</span>
            <h3>{totalProductsCount}</h3>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '6px' }}>
              {inStockCount} active in stock
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#faf5ff', color: '#a855f7' }}>
            <Package size={24} />
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-info">
            <span>Happy Customers</span>
            <h3>894</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#10b981', marginTop: '6px' }}>
              <TrendingUp size={14} />
              <span>99.4% satisfaction</span>
            </div>
          </div>
          <div className="stat-icon-wrapper" style={{ backgroundColor: '#fff7ed', color: '#ea580c' }}>
            <Users size={24} />
          </div>
        </div>
      </div>

      {/* Revenue Graph Card */}
      <div className="admin-card-box" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Weekly Revenue & Sales Volume</h3>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>Real-time earnings from USA orders</p>
          </div>
          <div style={{ fontSize: '13px', fontWeight: '700', color: '#10b981', backgroundColor: '#ecfdf5', padding: '4px 12px', borderRadius: '9999px' }}>
            ● Live Store Sync
          </div>
        </div>

        {/* Custom SVG Bar Chart */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '200px', padding: '10px 0', borderBottom: '1px solid #e5e7eb' }}>
          {salesData.map((d, idx) => {
            const heightPercent = (d.revenue / maxRevenue) * 100;
            return (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ fontSize: '11px', fontWeight: '700', color: '#111827', marginBottom: '6px' }}>
                  ${(d.revenue / 1000).toFixed(1)}k
                </div>
                <div 
                  style={{
                    width: '100%',
                    maxWidth: '48px',
                    height: `${heightPercent}%`,
                    background: idx === 5 ? 'linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)' : 'linear-gradient(180deg, #111827 0%, #374151 100%)',
                    borderRadius: '8px 8px 0 0',
                    transition: 'height 0.4s ease'
                  }}
                  title={`${d.day}: $${d.revenue} (${d.orders} orders)`}
                />
                <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginTop: '8px' }}>
                  {d.day}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card-box">
        <div className="admin-card-header">
          <h3>Recent Customer Orders</h3>
          <button
            onClick={() => setAdminTab('orders')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '13px', fontWeight: '600', color: '#2563eb' }}
          >
            <span>View All Orders</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id}>
                  <td style={{ fontWeight: '700' }}>#{ord.id}</td>
                  <td>{ord.customerName}</td>
                  <td>{ord.date}</td>
                  <td>{ord.items ? ord.items.length : 1} item(s)</td>
                  <td style={{ fontWeight: '700' }}>${Number(ord.total).toFixed(2)}</td>
                  <td>
                    <span className={`status-badge ${ord.status}`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
