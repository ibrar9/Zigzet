import React, { useState, useMemo } from 'react';
import {
  Calendar,
  ChevronDown,
  Plus,
  ArrowUpRight,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  TrendingDown,
  PackageCheck,
  ShoppingBag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import {
  geoLocationData
} from '../../data/adminMockData';
import { ProductModal } from './ProductModal';

export const AdminDashboard = () => {
  const { 
    setAdminTab, 
    addProduct, 
    products, 
    orders, 
    toggleProductActive 
  } = useStore();

  // Interactive states
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Sun as highlight
  const [geoPeriod, setGeoPeriod] = useState('Monthly');
  const [isGeoDropdownOpen, setIsGeoDropdownOpen] = useState(false);
  const [topProductSort, setTopProductSort] = useState('Most sales');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Compute store sales totals
  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
  }, [orders]);

  // Dynamic Top Products based on products and sort choice
  const sortedTopProducts = useMemo(() => {
    const list = [...products];
    if (topProductSort === 'Highest price') {
      list.sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
    } else if (topProductSort === 'Newest') {
      list.reverse();
    } else {
      // Default: Most sales
      list.sort((a, b) => (b.salesCount || 0) - (a.salesCount || 0));
    }
    return list.slice(0, 5);
  }, [products, topProductSort]);

  // Paginated products for the table
  const itemsPerPage = 5;
  const totalPages = Math.max(1, Math.ceil(products.length / itemsPerPage));
  const currentTableProducts = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return products.slice(start, start + itemsPerPage);
  }, [products, currentPageNum, itemsPerPage]);

  const handleSaveProduct = (formData) => {
    addProduct(formData);
    setIsAddModalOpen(false);
  };

  // SVG Chart Calculation
  const chartPoints = [
    { x: 30, y: 110, day: 'Fri', profit: `$${Math.round(totalRevenue * 0.12 + 2800).toLocaleString()}`, expense: '$45' },
    { x: 130, y: 25, day: 'Sun', profit: `$${Math.round(totalRevenue * 0.28 + 4200).toLocaleString()}`, expense: '$68' },
    { x: 230, y: 55, day: 'Mon', profit: `$${Math.round(totalRevenue * 0.18 + 3100).toLocaleString()}`, expense: '$50' },
    { x: 330, y: 135, day: 'Tue', profit: `$${Math.round(totalRevenue * 0.08 + 1900).toLocaleString()}`, expense: '$85' },
    { x: 430, y: 48, day: 'Wed', profit: `$${Math.round(totalRevenue * 0.22 + 3800).toLocaleString()}`, expense: '$40' },
    { x: 530, y: 65, day: 'Thu', profit: `$${Math.round(totalRevenue * 0.15 + 3400).toLocaleString()}`, expense: '$60' },
    { x: 630, y: 120, day: 'Fri', profit: `$${Math.round(totalRevenue * 0.10 + 2200).toLocaleString()}`, expense: '$35' }
  ];

  const activePoint = chartPoints[selectedDayIndex] || chartPoints[1];

  // Bezier curve path string
  const svgPathD = `
    M ${chartPoints[0].x} ${chartPoints[0].y}
    C 80 120, 90 25, ${chartPoints[1].x} ${chartPoints[1].y}
    C 170 25, 190 55, ${chartPoints[2].x} ${chartPoints[2].y}
    C 270 55, 290 135, ${chartPoints[3].x} ${chartPoints[3].y}
    C 370 135, 390 48, ${chartPoints[4].x} ${chartPoints[4].y}
    C 470 48, 490 65, ${chartPoints[5].x} ${chartPoints[5].y}
    C 570 65, 590 120, ${chartPoints[6].x} ${chartPoints[6].y}
  `;

  const svgAreaD = `
    ${svgPathD}
    L ${chartPoints[6].x} 180
    L ${chartPoints[0].x} 180
    Z
  `;

  return (
    <div className="admin-dashboard-root">
      {/* =========================================================================
          ROW 1: Shop Analysis Area Chart (Left) & Geo Location Widget (Right)
          ========================================================================= */}
      <div className="dashboard-grid-row-1">
        {/* SHOP ANALYSIS CARD */}
        <div className="dash-card shop-analysis-card">
          <div className="dash-card-header">
            <div className="analysis-header-left">
              <div className="analysis-title-group">
                <h2 className="dash-card-title">Shop Analysis</h2>
                <span className="analysis-growth-badge positive">
                  <TrendingUp size={12} />
                  <span>+{orders.length > 5 ? '18.4%' : '8.2%'}</span>
                </span>
              </div>

              {/* Legend Dots */}
              <div className="analysis-legends">
                <span className="legend-item">
                  <span className="dot purple" /> Enrolled
                </span>
                <span className="legend-item">
                  <span className="dot slate" /> Left
                </span>
              </div>
            </div>

            {/* Date Range Filter Selector */}
            <div className="analysis-date-btn">
              <Calendar size={14} />
              <span>Apr 25 - Apr 28</span>
              <ChevronDown size={13} />
            </div>
          </div>

          {/* Bezier Area Chart SVG with Tooltip */}
          <div className="chart-canvas-wrapper">
            <svg viewBox="0 0 660 180" className="analysis-svg-chart">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Background Horizontal Grid Lines */}
              <line x1="20" y1="35" x2="640" y2="35" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="85" x2="640" y2="85" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="20" y1="135" x2="640" y2="135" stroke="#f1f5f9" strokeWidth="1" strokeDasharray="4 4" />

              {/* Vertical dotted drop line for active point */}
              <line
                x1={activePoint.x}
                y1={activePoint.y}
                x2={activePoint.x}
                y2="170"
                stroke="#10b981"
                strokeWidth="1.5"
                strokeDasharray="3 3"
              />

              {/* Gradient Filled Area */}
              <path d={svgAreaD} fill="url(#areaGradient)" />

              {/* Glowing Curved Stroke Line */}
              <path
                d={svgPathD}
                fill="none"
                stroke="#10b981"
                strokeWidth="2.75"
                strokeLinecap="round"
              />

              {/* Clickable / Hoverable Data Points */}
              {chartPoints.map((pt, idx) => (
                <g key={idx} onClick={() => setSelectedDayIndex(idx)} style={{ cursor: 'pointer' }}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === selectedDayIndex ? 6 : 4}
                    fill={idx === selectedDayIndex ? '#10b981' : '#ffffff'}
                    stroke="#10b981"
                    strokeWidth="2.5"
                  />
                  {idx === selectedDayIndex && (
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r="11"
                      fill="#10b981"
                      opacity="0.2"
                    />
                  )}
                </g>
              ))}
            </svg>

            {/* Interactive Floating Tooltip */}
            <div
              className="chart-floating-tooltip"
              style={{
                left: `${(activePoint.x / 660) * 100}%`,
                top: `${activePoint.y - 12}px`
              }}
            >
              <div className="tooltip-line">
                <span className="dot purple" />
                <span className="tooltip-label">Profit:</span>
                <strong>{activePoint.profit}</strong>
              </div>
              <div className="tooltip-line">
                <span className="dot slate" />
                <span className="tooltip-label">Expense:</span>
                <strong>{activePoint.expense}</strong>
              </div>
            </div>
          </div>

          {/* Day Buttons on X-Axis */}
          <div className="chart-days-row">
            {chartPoints.map((pt, idx) => (
              <button
                key={idx}
                className={`chart-day-btn ${idx === selectedDayIndex ? 'active' : ''}`}
                onClick={() => setSelectedDayIndex(idx)}
              >
                {pt.day}
              </button>
            ))}
          </div>
        </div>

        {/* GEO LOCATION CARD */}
        <div className="dash-card geo-location-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Geo Location</h2>

            {/* Timeframe Dropdown */}
            <div className="geo-dropdown-box">
              <button
                className="geo-filter-btn"
                onClick={() => setIsGeoDropdownOpen(!isGeoDropdownOpen)}
              >
                <span>{geoPeriod}</span>
                <ChevronDown size={13} />
              </button>

              {isGeoDropdownOpen && (
                <div className="geo-dropdown-menu">
                  {['Monthly', 'Weekly', 'Yearly'].map((period) => (
                    <button
                      key={period}
                      className={`geo-menu-item ${geoPeriod === period ? 'active' : ''}`}
                      onClick={() => {
                        setGeoPeriod(period);
                        setIsGeoDropdownOpen(false);
                      }}
                    >
                      {period}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Vector Map Preview Graphic with Pulsing Location Pins */}
          <div className="geo-map-container">
            <svg viewBox="0 0 400 180" className="geo-vector-map">
              <path
                d="M50 40 C70 30, 110 35, 120 60 C130 85, 110 110, 80 120 C50 130, 30 100, 40 70 Z"
                fill="#e2e8f0"
              />
              <path
                d="M175 75 C190 75, 215 90, 210 120 C205 145, 185 150, 175 135 C165 120, 165 90, 175 75 Z"
                fill="#e2e8f0"
              />
              <path
                d="M260 25 C310 15, 360 30, 370 60 C360 85, 300 80, 280 65 C265 55, 255 35, 260 25 Z"
                fill="#e2e8f0"
              />
              <path
                d="M310 110 C340 105, 360 120, 355 140 C340 155, 315 150, 305 135 C300 125, 305 115, 310 110 Z"
                fill="#e2e8f0"
              />

              {/* Pulsing Map Pins */}
              {geoLocationData.map((item, idx) => (
                <g key={idx} className="map-pin-group">
                  <circle
                    cx={`${item.coords.x}%`}
                    cy={`${item.coords.y}%`}
                    r="8"
                    className="pin-pulse"
                    fill={item.isPositive ? '#10b981' : '#ef4444'}
                    opacity="0.3"
                  />
                  <circle
                    cx={`${item.coords.x}%`}
                    cy={`${item.coords.y}%`}
                    r="4"
                    fill={item.isPositive ? '#10b981' : '#ef4444'}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
            </svg>
          </div>

          {/* Countries List */}
          <div className="geo-countries-list">
            {geoLocationData.map((item, idx) => (
              <div key={idx} className="geo-country-row">
                <div className="country-info-left">
                  <span className="country-flag-icon">{item.flag}</span>
                  <div className="country-text-stack">
                    <span className="country-name">{item.country}</span>
                    <span className="country-sales-count">{item.sales}</span>
                  </div>
                </div>

                <div className="country-info-right">
                  <span className="country-revenue">{item.revenue}</span>
                  <span className={`country-growth-pill ${item.isPositive ? 'positive' : 'negative'}`}>
                    {item.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 2: Top Products Carousel / Gallery (Live Store Products)
          ========================================================================= */}
      <div className="dashboard-grid-row-2">
        <div className="dash-card top-products-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Top products ({products.length} catalog items)</h2>

            <div className="top-products-actions">
              {/* Sort By Dropdown */}
              <div className="sort-dropdown-box">
                <span className="sort-label">Sort by:</span>
                <button
                  className="sort-trigger-btn"
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                >
                  <span>{topProductSort}</span>
                  <ChevronDown size={13} />
                </button>

                {isSortDropdownOpen && (
                  <div className="sort-dropdown-menu">
                    {['Most sales', 'Highest price', 'Newest'].map((opt) => (
                      <button
                        key={opt}
                        className={`sort-menu-item ${topProductSort === opt ? 'active' : ''}`}
                        onClick={() => {
                          setTopProductSort(opt);
                          setIsSortDropdownOpen(false);
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Add Products Button */}
              <button 
                className="add-product-purple-btn"
                onClick={() => setIsAddModalOpen(true)}
              >
                <Plus size={14} />
                <span>Add products</span>
              </button>
            </div>
          </div>

          {/* Top Products Horizontal Cards List */}
          <div className="top-products-grid">
            {sortedTopProducts.map((prod, idx) => {
              const progressVal = Math.min(100, Math.max(30, (prod.salesCount || 10) * 1.5));
              const barColors = ['#10b981', '#7c3aed', '#f97316', '#06b6d4', '#6366f1'];
              const color = barColors[idx % barColors.length];

              return (
                <div key={prod.id} className="top-product-item-card">
                  <div className="product-image-frame">
                    <img src={prod.image || (prod.images && prod.images[0])} alt={prod.name} />
                  </div>

                  <div className="product-card-body">
                    <h4 className="top-prod-title" title={prod.name}>{prod.name}</h4>

                    <div className="top-prod-meta">
                      <span className="top-prod-price">${Number(prod.price).toFixed(2)}</span>
                      <span className="top-prod-sales">{prod.salesCount || 12} sales</span>
                    </div>

                    {/* Progress Indicator Bar */}
                    <div className="top-prod-progress-track">
                      <div
                        className="top-prod-progress-fill"
                        style={{
                          width: `${progressVal}%`,
                          backgroundColor: color
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* =========================================================================
          ROW 3: Product List Table (Left) & Latest Sale Feed (Right)
          ========================================================================= */}
      <div className="dashboard-grid-row-3">
        {/* PRODUCT LIST TABLE */}
        <div className="dash-card product-list-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Product List & Inventory</h2>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                Toggle switch to activate or deactivate products on the storefront
              </p>
            </div>

            <button 
              className="view-all-table-btn"
              onClick={() => setAdminTab('products')}
            >
              <span>Manage Products</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Interactive Products Table */}
          <div className="table-responsive-wrapper">
            <table className="zigzet-admin-table">
              <thead>
                <tr>
                  <th>Product Info</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>SKU</th>
                  <th>Status</th>
                  <th>Live on Store</th>
                </tr>
              </thead>
              <tbody>
                {currentTableProducts.map((p) => (
                  <tr key={p.id}>
                    {/* Product Info */}
                    <td>
                      <div className="product-cell-info">
                        <div className="table-product-thumb">
                          <img src={p.image || (p.images && p.images[0])} alt={p.name} />
                        </div>
                        <div className="table-product-text">
                          <span className="table-prod-name">{p.name}</span>
                          <span className="table-prod-sku">{p.categoryName || p.category || 'Apparel'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="table-price-cell">${Number(p.price).toFixed(2)}</td>

                    {/* Stock */}
                    <td className="table-stock-cell">
                      <span className={`stock-number-pill ${p.stock <= 5 ? 'low' : ''}`}>
                        {p.stock} units
                      </span>
                    </td>

                    {/* SKU */}
                    <td className="table-date-cell">{p.sku || 'ZG-PROD'}</td>

                    {/* Statistics Progress Bar */}
                    <td>
                      <div className="table-stats-cell">
                        <div className="stats-header-row">
                          <span className="stats-badge-text">
                            {p.stock <= 5 ? 'Low Stock' : p.stock > 30 ? 'In Stock' : 'Optimal'}
                          </span>
                          <span className="stats-sales-number">{p.salesCount || 0} sold</span>
                        </div>
                        <div className="stats-progress-track">
                          <div
                            className="stats-progress-bar"
                            style={{
                              width: `${Math.min(100, (p.stock / 50) * 100)}%`,
                              backgroundColor: p.stock <= 5 ? '#ef4444' : p.isActive ? '#7c3aed' : '#9ca3af'
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Action: Interactive iOS-style Toggle Switch */}
                    <td>
                      <label className="ios-switch" title="Toggle active status on storefront">
                        <input
                          type="checkbox"
                          checked={p.isActive !== false}
                          onChange={() => toggleProductActive(p.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Table Pagination Footer */}
          <div className="table-pagination-footer">
            <span className="pagination-info-text">
              Showing {(currentPageNum - 1) * itemsPerPage + 1} to {Math.min(currentPageNum * itemsPerPage, products.length)} of {products.length} products
            </span>

            <div className="pagination-pill-group">
              <button 
                className="pagination-nav-btn"
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  className={`pagination-num-btn ${currentPageNum === num ? 'active' : ''}`}
                  onClick={() => setCurrentPageNum(num)}
                >
                  {num}
                </button>
              ))}

              <button 
                className="pagination-nav-btn"
                disabled={currentPageNum === totalPages}
                onClick={() => setCurrentPageNum((p) => Math.min(totalPages, p + 1))}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* LATEST SALE ACTIVITY FEED (Connected to live orders) */}
        <div className="dash-card latest-sale-card">
          <div className="dash-card-header">
            <div>
              <h2 className="dash-card-title">Latest Sale Feed</h2>
              <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>Real-time orders placed from storefront</p>
            </div>

            <button className="options-icon-btn" onClick={() => setAdminTab('orders')}>
              <ShoppingBag size={16} />
            </button>
          </div>

          {/* Latest Sales Items List */}
          <div className="latest-sales-list">
            {orders.slice(0, 6).map((order) => {
              const firstItem = order.items && order.items[0];
              const title = firstItem ? firstItem.name : `Order #${order.id}`;
              const avatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';

              return (
                <div key={order.id} className="latest-sale-row">
                  <div className="sale-avatar-wrapper">
                    <img src={avatar} alt={order.customerName} className="sale-avatar-img" />
                  </div>

                  <div className="sale-details-stack">
                    <span className="sale-item-name" title={title}>{order.customerName} - {title}</span>
                    <span className="sale-item-meta">
                      <strong className="sale-amount">${Number(order.total).toFixed(2)}</strong> · #{order.id} ({order.date})
                    </span>
                  </div>

                  <div className="sale-growth-badge-box">
                    <span className={`growth-pill ${order.status === 'Delivered' ? 'positive' : 'positive'}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              );
            })}

            {orders.length === 0 && (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#6b7280', fontSize: '13px' }}>
                No sales yet. Place an order on the storefront!
              </div>
            )}
          </div>

          {/* Bottom View All Button */}
          <div className="latest-sale-footer">
            <button 
              className="view-all-sales-outline-btn"
              onClick={() => setAdminTab('orders')}
            >
              View All Orders ({orders.length})
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <ProductModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveProduct}
        editingProduct={null}
      />
    </div>
  );
};
