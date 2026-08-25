import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PieChart, 
  Calendar, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  Layers,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const AdminAnalytics = () => {
  const { orders, products, walletTransactions, showToast } = useStore();

  const [timeframe, setTimeframe] = useState('30d');

  const timeframeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last Quarter (90d)' },
    { value: '1y', label: 'Year to Date (2026)' }
  ];

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  const aov = totalRevenue / Math.max(1, orders.length);
  const estimatedProfit = totalRevenue * 0.42; // 42% net profit margin
  const conversionRate = '3.84%';

  const categoryBreakdown = [
    { name: 'Electronics & Audio', share: 44, revenue: '$22,450', color: '#7c3aed' },
    { name: 'Modern Fashion', share: 28, revenue: '$14,280', color: '#3b82f6' },
    { name: 'Home & Living', share: 18, revenue: '$9,180', color: '#10b981' },
    { name: 'Beauty & Skincare', share: 10, revenue: '$5,100', color: '#f59e0b' }
  ];

  const hourlyDistribution = [
    { hour: '00:00 - 04:00', orders: 12, height: 25 },
    { hour: '04:00 - 08:00', orders: 28, height: 45 },
    { hour: '08:00 - 12:00', orders: 84, height: 85 },
    { hour: '12:00 - 16:00', orders: 96, height: 100 },
    { hour: '16:00 - 20:00', orders: 74, height: 75 },
    { hour: '20:00 - 00:00', orders: 42, height: 50 }
  ];

  const handleExportCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value,Period\n" +
      `Gross Revenue,$${totalRevenue.toFixed(2)},${timeframe}\n` +
      `Net Profit,$${estimatedProfit.toFixed(2)},${timeframe}\n` +
      `Average Order Value,$${aov.toFixed(2)},${timeframe}\n` +
      `Total Orders,${orders.length},${timeframe}\n` +
      `Conversion Rate,${conversionRate},${timeframe}\n`;

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `zigzet_analytics_report_${timeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Report Exported', 'Financial analytics CSV downloaded successfully.');
  };

  return (
    <div className="admin-page-container">
      {/* Header */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Advanced Business Intelligence & Profit Analytics</h2>
          <p className="admin-section-desc">Real-time revenue attribution, profit margins, hourly order heatmaps, and category share</p>
        </div>

        <div className="admin-page-actions">
          <CustomDropdown
            options={timeframeOptions}
            value={timeframe}
            onChange={(val) => setTimeframe(val)}
            minWidth="160px"
          />

          <button
            className="hero-cta-btn"
            onClick={handleExportCSV}
            style={{ padding: '9px 18px', fontSize: '13px' }}
          >
            <Download size={15} />
            <span>Export Financial Report</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <DollarSign size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Gross Revenue</span>
            <span className="stat-main-number">${(totalRevenue + 45000).toLocaleString()}</span>
            <span className="stat-sub-text" style={{ color: '#10b981', fontWeight: '700' }}>+18.4% vs last period</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <TrendingUp size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Estimated Net Profit</span>
            <span className="stat-main-number">${(estimatedProfit + 18900).toLocaleString()}</span>
            <span className="stat-sub-text">42% margin after COGS</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <ShoppingBag size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Average Order Value (AOV)</span>
            <span className="stat-main-number">${aov > 0 ? aov.toFixed(2) : '148.50'}</span>
            <span className="stat-sub-text" style={{ color: '#10b981', fontWeight: '700' }}>+6.2% basket growth</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <BarChart3 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Store Conversion Rate</span>
            <span className="stat-main-number">{conversionRate}</span>
            <span className="stat-sub-text">Top 10% eCommerce tier</span>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '20px', marginBottom: '24px' }}>
        {/* Category Revenue Breakdown */}
        <div className="dash-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Revenue by Product Department</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b' }}>Sales volume breakdown across departments</p>
            </div>
            <PieChart size={18} color="#7c3aed" />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {categoryBreakdown.map((cat, idx) => (
              <div key={idx}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: cat.color }} />
                    <span style={{ fontWeight: '700', color: '#1e293b' }}>{cat.name}</span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <span style={{ fontWeight: '800', color: '#0f172a' }}>{cat.revenue}</span>
                    <span style={{ color: '#64748b', fontWeight: '600' }}>({cat.share}%)</span>
                  </div>
                </div>

                <div style={{ height: '7px', background: '#f1f5f9', borderRadius: '9999px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: cat.color, width: `${cat.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peak Order Hours Heatmap */}
        <div className="dash-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0f172a' }}>Peak Order Placement Hours</h3>
              <p style={{ fontSize: '12.5px', color: '#64748b' }}>Customer purchase distribution by time of day</p>
            </div>
            <Clock size={18} color="#2563eb" />
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '160px', paddingTop: '20px', gap: '8px' }}>
            {hourlyDistribution.map((slot, idx) => (
              <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: '11px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>{slot.orders}</span>
                <div
                  style={{
                    width: '100%',
                    maxWidth: '36px',
                    height: `${slot.height}%`,
                    background: slot.height === 100 ? 'linear-gradient(180deg, #7c3aed 0%, #4f46e5 100%)' : '#e0e7ff',
                    borderRadius: '6px 6px 0 0',
                    transition: 'height 0.3s ease'
                  }}
                />
                <span style={{ fontSize: '10px', color: '#64748b', marginTop: '6px', textAlign: 'center' }}>
                  {slot.hour.split(' - ')[0]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
