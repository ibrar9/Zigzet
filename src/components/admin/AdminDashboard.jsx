import React, { useState } from 'react';
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
  TrendingDown
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import {
  shopAnalysisData,
  geoLocationData,
  topProductsData,
  initialProductListTable,
  latestSalesData
} from '../../data/adminMockData';
import { ProductModal } from './ProductModal';

export const AdminDashboard = () => {
  const { setAdminTab, addProduct, products } = useStore();

  // Interactive states
  const [selectedDayIndex, setSelectedDayIndex] = useState(1); // Sun as highlight
  const [geoPeriod, setGeoPeriod] = useState('Monthly');
  const [isGeoDropdownOpen, setIsGeoDropdownOpen] = useState(false);
  const [topProductSort, setTopProductSort] = useState('Most sales');
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [currentPageNum, setCurrentPageNum] = useState(2);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Table items with toggle switch state
  const [tableProducts, setTableProducts] = useState(initialProductListTable);

  const toggleProductStatus = (id) => {
    setTableProducts((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const handleSaveProduct = (formData) => {
    addProduct(formData);
    setIsAddModalOpen(false);
  };

  // SVG Chart Calculation
  const chartPoints = [
    { x: 30, y: 110, day: 'Fri', profit: '$3,890', expense: '$45' },
    { x: 130, y: 25, day: 'Sun', profit: '$5,657', expense: '$68' },
    { x: 230, y: 55, day: 'Mon', profit: '$4,120', expense: '$50' },
    { x: 330, y: 135, day: 'Tue', profit: '$2,400', expense: '$85' },
    { x: 430, y: 48, day: 'Wed', profit: '$4,980', expense: '$40' },
    { x: 530, y: 65, day: 'Thu', profit: '$4,350', expense: '$60' },
    { x: 630, y: 120, day: 'Fri', profit: '$2,900', expense: '$35' }
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
                <span className="analysis-growth-badge negative">
                  <TrendingDown size={12} />
                  <span>-3.5%</span>
                </span>
              </div>

              {/* Legend: Enrolled & Left */}
              <div className="analysis-legend">
                <div className="legend-item">
                  <span className="legend-dot enrolled"></span>
                  <span>Enrolled</span>
                </div>
                <div className="legend-item">
                  <span className="legend-dot left"></span>
                  <span>Left</span>
                </div>
              </div>
            </div>

            {/* Date Range Selector Button */}
            <div className="analysis-header-right">
              <button className="date-range-picker-btn">
                <span>Apr 25 - Apr 28</span>
                <Calendar size={14} />
              </button>
            </div>
          </div>

          {/* Chart Container */}
          <div className="chart-canvas-container">
            {/* Y-Axis scale */}
            <div className="chart-y-axis">
              <span>80</span>
              <span>60</span>
              <span>40</span>
              <span>20</span>
              <span>0</span>
            </div>

            {/* SVG Graph Graphic */}
            <div className="chart-svg-wrapper">
              {/* Grid Lines */}
              <div className="chart-grid-lines">
                <div className="grid-line" style={{ top: '0%' }}></div>
                <div className="grid-line" style={{ top: '25%' }}></div>
                <div className="grid-line" style={{ top: '50%' }}></div>
                <div className="grid-line" style={{ top: '75%' }}></div>
                <div className="grid-line" style={{ top: '100%' }}></div>
              </div>

              <svg 
                viewBox="0 0 660 190" 
                preserveAspectRatio="none" 
                className="shop-analysis-svg"
              >
                <defs>
                  {/* Linear Gradient for area fill under the curve */}
                  <linearGradient id="areaGreenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.28" />
                    <stop offset="60%" stopColor="#10b981" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.00" />
                  </linearGradient>

                  {/* Vertical bar glow filter */}
                  <filter id="greenGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Shaded Area */}
                <path 
                  d={svgAreaD} 
                  fill="url(#areaGreenGrad)" 
                />

                {/* Highlighted vertical column indicator */}
                <rect
                  x={activePoint.x - 7}
                  y={activePoint.y}
                  width="14"
                  height={180 - activePoint.y}
                  fill="url(#areaGreenGrad)"
                  opacity="0.9"
                  rx="3"
                />

                {/* Main Green Trend Line */}
                <path
                  d={svgPathD}
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Interactive Points on Chart */}
                {chartPoints.map((pt, idx) => {
                  const isCurrent = idx === selectedDayIndex;
                  return (
                    <g 
                      key={idx} 
                      onClick={() => setSelectedDayIndex(idx)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r={isCurrent ? 5.5 : 4}
                        fill={isCurrent ? '#ffffff' : '#10b981'}
                        stroke="#10b981"
                        strokeWidth={isCurrent ? 3 : 2}
                        className="chart-data-node"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Floating Tooltip pinned to active point */}
              <div 
                className="chart-floating-tooltip"
                style={{
                  left: `${(activePoint.x / 660) * 100}%`,
                  top: `${(activePoint.y / 190) * 100}%`
                }}
              >
                <div className="tooltip-row profit">
                  <span className="tooltip-dot green"></span>
                  <span className="tooltip-label">Profit:</span>
                  <span className="tooltip-value">{activePoint.profit}</span>
                </div>
                <div className="tooltip-row expense">
                  <span className="tooltip-dot red"></span>
                  <span className="tooltip-label">Expense:</span>
                  <span className="tooltip-value">{activePoint.expense}</span>
                </div>
              </div>

              {/* X-Axis Day Labels */}
              <div className="chart-x-axis">
                {chartPoints.map((pt, idx) => (
                  <button
                    key={idx}
                    className={`x-axis-day-btn ${idx === selectedDayIndex ? 'active' : ''}`}
                    onClick={() => setSelectedDayIndex(idx)}
                  >
                    {pt.day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* GEO LOCATION WIDGET CARD */}
        <div className="dash-card geo-location-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Geo Location</h2>

            {/* Timeframe Dropdown */}
            <div className="geo-dropdown-wrapper">
              <button
                className="geo-dropdown-trigger"
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
                      className={`geo-dropdown-item ${geoPeriod === period ? 'active' : ''}`}
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

          {/* Minimalist World Map Illustration */}
          <div className="geo-map-visual">
            <svg viewBox="0 0 400 160" className="world-map-svg">
              <path
                d="M40 30 C50 20, 80 25, 90 40 C100 55, 80 80, 60 75 C45 70, 30 50, 40 30 Z"
                fill="#e2e8f0"
              />
              <path
                d="M70 90 C85 90, 100 110, 95 135 C90 150, 75 155, 65 140 C55 125, 60 100, 70 90 Z"
                fill="#e2e8f0"
              />
              <path
                d="M170 30 C190 20, 220 25, 230 45 C220 65, 180 70, 165 55 C160 45, 165 35, 170 30 Z"
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
          ROW 2: Top Products Carousel / Gallery
          ========================================================================= */}
      <div className="dashboard-grid-row-2">
        <div className="dash-card top-products-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Top products</h2>

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
            {topProductsData.map((prod) => (
              <div key={prod.id} className="top-product-item-card">
                <div className="product-image-frame">
                  <img src={prod.image} alt={prod.name} />
                </div>

                <div className="product-card-body">
                  <h4 className="top-prod-title">{prod.name}</h4>

                  <div className="top-prod-meta">
                    <span className="top-prod-price">${prod.price.toFixed(2)}</span>
                    <span className="top-prod-sales">{prod.salesCount}</span>
                  </div>

                  {/* Progress Indicator Bar */}
                  <div className="top-prod-progress-track">
                    <div
                      className="top-prod-progress-fill"
                      style={{
                        width: `${prod.progress}%`,
                        backgroundColor: prod.barColor
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
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
            <h2 className="dash-card-title">Product List</h2>

            <button 
              className="view-all-table-btn"
              onClick={() => setAdminTab('products')}
            >
              <span>View All</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Interactive Products Table */}
          <div className="table-responsive-wrapper">
            <table className="zigzet-admin-table">
              <thead>
                <tr>
                  <th>Product Info ⇅</th>
                  <th>Price ⇅</th>
                  <th>Stock ⇅</th>
                  <th>Start Date ⇅</th>
                  <th>Statistics ⇅</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tableProducts.map((p) => (
                  <tr key={p.id}>
                    {/* Product Info */}
                    <td>
                      <div className="product-cell-info">
                        <div className="table-product-thumb">
                          <img src={p.image} alt={p.name} />
                        </div>
                        <div className="table-product-text">
                          <span className="table-prod-name">{p.name}</span>
                          <span className="table-prod-sku">ID: {p.sku}</span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="table-price-cell">${p.price.toFixed(0)}</td>

                    {/* Stock */}
                    <td className="table-stock-cell">{p.stock}</td>

                    {/* Start Date */}
                    <td className="table-date-cell">{p.startDate}</td>

                    {/* Statistics Progress Bar */}
                    <td>
                      <div className="table-stats-cell">
                        <div className="stats-header-row">
                          <span className="stats-badge-text">{p.statistics}</span>
                          <span className="stats-sales-number">{p.salesMetric}</span>
                        </div>
                        <div className="stats-progress-track">
                          <div
                            className="stats-progress-bar"
                            style={{
                              width: p.statistics === 'Perfect' ? '70%' : '45%',
                              backgroundColor: p.progressColor
                            }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Action: Interactive iOS-style Toggle Switch */}
                    <td>
                      <label className="ios-switch">
                        <input
                          type="checkbox"
                          checked={p.isActive}
                          onChange={() => toggleProductStatus(p.id)}
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
              Showing 1 to 10 of 97 results
            </span>

            <div className="pagination-pill-group">
              <button 
                className="pagination-nav-btn"
                disabled={currentPageNum === 1}
                onClick={() => setCurrentPageNum((p) => Math.max(1, p - 1))}
              >
                <ChevronLeft size={14} />
              </button>

              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  className={`pagination-num-btn ${currentPageNum === num ? 'active' : ''}`}
                  onClick={() => setCurrentPageNum(num)}
                >
                  {num}
                </button>
              ))}

              <span className="pagination-ellipsis">...</span>

              {[20, 21].map((num) => (
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
                onClick={() => setCurrentPageNum((p) => Math.min(21, p + 1))}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* LATEST SALE ACTIVITY FEED */}
        <div className="dash-card latest-sale-card">
          <div className="dash-card-header">
            <h2 className="dash-card-title">Latest Sale</h2>

            <button className="options-icon-btn">
              <MoreHorizontal size={16} />
            </button>
          </div>

          {/* Latest Sales Items List */}
          <div className="latest-sales-list">
            {latestSalesData.map((sale) => (
              <div key={sale.id} className="latest-sale-row">
                <div className="sale-avatar-wrapper">
                  <img src={sale.avatar} alt={sale.name} className="sale-avatar-img" />
                </div>

                <div className="sale-details-stack">
                  <span className="sale-item-name">{sale.name}</span>
                  <span className="sale-item-meta">
                    <strong className="sale-amount">{sale.price}</strong> · {sale.date}
                  </span>
                </div>

                <div className="sale-growth-badge-box">
                  <span className={`growth-pill ${sale.isPositive ? 'positive' : 'negative'}`}>
                    {sale.growth}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom View All Button */}
          <div className="latest-sale-footer">
            <button 
              className="view-all-sales-outline-btn"
              onClick={() => setAdminTab('orders')}
            >
              View All
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
