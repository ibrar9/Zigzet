import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  Package, 
  CheckCircle2, 
  AlertTriangle, 
  DollarSign, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight,
  Eye,
  Star,
  Copy,
  Sparkles
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductModal } from './ProductModal';
import { CustomDropdown } from '../common/CustomDropdown';
import { categories } from '../../data/categories';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct, toggleProductActive } = useStore();

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [currentPageNum, setCurrentPageNum] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // 1. Metric Calculations
  const totalProducts = products.length;
  const activeProductsCount = products.filter((p) => p.isActive !== false).length;
  const lowStockCount = products.filter((p) => (p.stock || 0) <= 5).length;
  const totalCatalogValue = useMemo(() => {
    return products.reduce((sum, p) => sum + (Number(p.price) || 0) * (p.stock || 1), 0);
  }, [products]);

  // 2. Dropdown Options
  const categoryOptions = [
    { value: 'all', label: 'All Categories', dot: '#7c3aed', badge: totalProducts },
    ...categories.map((c) => ({
      value: c.id,
      label: c.name,
      dot: c.id === 'electronics' ? '#3b82f6' : c.id === 'fashion' ? '#ec4899' : c.id === 'beauty' ? '#8b5cf6' : '#10b981',
      badge: products.filter((p) => p.category === c.id).length
    }))
  ];

  const stockOptions = [
    { value: 'all', label: 'All Stock Statuses', dot: '#64748b' },
    { value: 'in-stock', label: 'In Stock (> 15)', dot: '#10b981' },
    { value: 'low-stock', label: 'Low Stock (≤ 15)', dot: '#f97316' },
    { value: 'out-of-stock', label: 'Out of Stock (0)', dot: '#ef4444' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Sort: Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' },
    { value: 'stock', label: 'Highest Stock' }
  ];

  // 3. Filter and Sort Logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        const matchesSearch =
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          (p.sku && p.sku.toLowerCase().includes(search.toLowerCase())) ||
          (p.categoryName && p.categoryName.toLowerCase().includes(search.toLowerCase()));

        // Category
        const matchesCat = catFilter === 'all' || p.category === catFilter;

        // Stock
        let matchesStock = true;
        if (stockFilter === 'in-stock') matchesStock = (p.stock || 0) > 15;
        if (stockFilter === 'low-stock') matchesStock = (p.stock || 0) > 0 && (p.stock || 0) <= 15;
        if (stockFilter === 'out-of-stock') matchesStock = (p.stock || 0) <= 0;

        return matchesSearch && matchesCat && matchesStock;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return (Number(a.price) || 0) - (Number(b.price) || 0);
        if (sortBy === 'price-desc') return (Number(b.price) || 0) - (Number(a.price) || 0);
        if (sortBy === 'rating') return (b.rating || 5) - (a.rating || 5);
        if (sortBy === 'stock') return (b.stock || 0) - (a.stock || 0);
        return 0; // default newest
      });
  }, [products, search, catFilter, stockFilter, sortBy]);

  // 4. Pagination
  const itemsPerPage = 6;
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (currentPageNum - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPageNum, itemsPerPage]);

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
  };

  const handleDuplicate = (prod) => {
    addProduct({
      ...prod,
      name: `${prod.name} (Copy)`,
      sku: `ZG-COPY-${Math.floor(Math.random() * 1000)}`
    });
  };

  const handleSave = (formData) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, formData);
    } else {
      addProduct(formData);
    }
  };

  const handleDelete = (prod) => {
    if (window.confirm(`Are you sure you want to delete "${prod.name}" from the store?`)) {
      deleteProduct(prod.id);
    }
  };

  return (
    <div className="admin-page-container">
      {/* 1. Header Title & Actions */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Products & Inventory Manager ({totalProducts})</h2>
          <p className="admin-section-desc">Add, edit stock, categorize products, and manage live storefront visibility</p>
        </div>

        <div className="admin-page-actions">
          <button
            className="hero-cta-btn"
            onClick={handleOpenAdd}
            style={{ padding: '10px 22px', fontSize: '13.5px' }}
          >
            <Plus size={16} />
            <span>Add New Product</span>
          </button>
        </div>
      </div>

      {/* 2. Top Stats Overview Grid */}
      <div className="admin-overview-stats-grid">
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple">
            <Package size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Products</span>
            <span className="stat-main-number">{totalProducts}</span>
            <span className="stat-sub-text">In catalog database</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <CheckCircle2 size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Live on Store</span>
            <span className="stat-main-number">{activeProductsCount}</span>
            <span className="stat-sub-text">Active storefront items</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper orange">
            <AlertTriangle size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Low Stock Alert</span>
            <span className="stat-main-number">{lowStockCount}</span>
            <span className="stat-sub-text">Needs replenishment</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper blue">
            <DollarSign size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Catalog Value</span>
            <span className="stat-main-number">
              ${totalCatalogValue.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="stat-sub-text">Total inventory worth</span>
          </div>
        </div>
      </div>

      {/* 3. Modern Filter & Controls Toolbar */}
      <div className="products-modern-toolbar">
        <div className="toolbar-left-group">
          {/* Search Input */}
          <div className="toolbar-search-box">
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPageNum(1);
              }}
            />
          </div>

          {/* Category Custom Dropdown */}
          <CustomDropdown
            options={categoryOptions}
            value={catFilter}
            onChange={(val) => {
              setCatFilter(val);
              setCurrentPageNum(1);
            }}
            minWidth="180px"
          />

          {/* Stock Status Custom Dropdown */}
          <CustomDropdown
            options={stockOptions}
            value={stockFilter}
            onChange={(val) => {
              setStockFilter(val);
              setCurrentPageNum(1);
            }}
            minWidth="175px"
          />
        </div>

        <div className="toolbar-right-group">
          {/* Sort By Custom Dropdown */}
          <CustomDropdown
            options={sortOptions}
            value={sortBy}
            onChange={(val) => setSortBy(val)}
            minWidth="185px"
            align="right"
          />
        </div>
      </div>

      {/* 4. Products Table Card */}
      <div className="dash-card">
        <div className="table-responsive-wrapper">
          <table className="zigzet-admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock Level</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Live on Store</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProducts.map((prod) => {
                const stockQty = prod.stock !== undefined ? prod.stock : 20;
                const isLowStock = stockQty <= 5;
                const isMediumStock = stockQty > 5 && stockQty <= 15;
                const stockColorClass = isLowStock ? 'red' : isMediumStock ? 'orange' : 'green';

                return (
                  <tr key={prod.id}>
                    {/* Product Column */}
                    <td>
                      <div className="product-cell-info">
                        <div className="table-product-thumb-box">
                          <img
                            src={prod.image || (prod.images && prod.images[0])}
                            alt={prod.name}
                            onError={(e) => {
                              e.target.src = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                        <div className="table-product-text">
                          <span className="product-name-heading" title={prod.name}>
                            {prod.name}
                          </span>
                          <span className="product-sku-badge">
                            SKU: {prod.sku || 'ZG-PROD'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Category Column */}
                    <td>
                      <span className="product-category-chip">
                        {prod.categoryName || prod.category || 'General'}
                      </span>
                    </td>

                    {/* Price Column */}
                    <td>
                      <div className="product-price-stack">
                        <span className="price-main-bold">
                          AED {Number(prod.price).toFixed(2)}
                        </span>
                        {prod.originalPrice && (
                          <span className="price-original-slash">
                            AED {Number(prod.originalPrice).toFixed(2)}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Stock Meter Column */}
                    <td>
                      <div className="stock-meter-container">
                        <div className="stock-meter-header">
                          <span className={`stock-qty-text ${isLowStock ? 'danger' : isMediumStock ? 'warning' : ''}`}>
                            {stockQty} {stockQty === 1 ? 'unit' : 'units'}
                          </span>
                          {isLowStock && (
                            <span style={{ fontSize: '10px', color: '#ef4444', fontWeight: '700' }}>LOW</span>
                          )}
                        </div>
                        <div className="stock-meter-track">
                          <div
                            className={`stock-meter-fill ${stockColorClass}`}
                            style={{ width: `${Math.min(100, Math.max(8, (stockQty / 60) * 100))}%` }}
                          />
                        </div>
                      </div>
                    </td>

                    {/* Rating Column */}
                    <td>
                      <span className="rating-stars-chip">
                        <Star size={12} fill="#f59e0b" color="#f59e0b" />
                        <span>{prod.rating || 5.0}</span>
                      </span>
                    </td>

                    {/* Sale / Regular Badge */}
                    <td>
                      {prod.isSale ? (
                        <span className="status-badge" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>
                          ● Sale
                        </span>
                      ) : (
                        <span className="status-badge" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>
                          ● Regular
                        </span>
                      )}
                    </td>

                    {/* Live On Store Toggle Switch */}
                    <td>
                      <label className="ios-switch" title="Toggle product on storefront">
                        <input
                          type="checkbox"
                          checked={prod.isActive !== false}
                          onChange={() => toggleProductActive(prod.id)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </td>

                    {/* Action Buttons */}
                    <td style={{ textAlign: 'right' }}>
                      <div className="action-icon-buttons">
                        <button
                          className="action-circle-btn"
                          onClick={() => handleDuplicate(prod)}
                          title="Duplicate product"
                        >
                          <Copy size={14} />
                        </button>
                        <button
                          className="action-circle-btn"
                          onClick={() => handleOpenEdit(prod)}
                          title="Edit product"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          className="action-circle-btn delete"
                          onClick={() => handleDelete(prod)}
                          title="Delete product"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {paginatedProducts.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '48px 0', color: '#94a3b8' }}>
                    <Package size={40} color="#cbd5e1" style={{ margin: '0 auto 12px auto' }} />
                    <p style={{ fontWeight: '600', color: '#475569' }}>No products match the selected filters.</p>
                    <button
                      onClick={() => { setSearch(''); setCatFilter('all'); setStockFilter('all'); }}
                      style={{ marginTop: '8px', color: '#7c3aed', fontWeight: '600', fontSize: '13px' }}
                    >
                      Reset filters
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="table-pagination-footer">
            <span className="pagination-info-text">
              Showing {(currentPageNum - 1) * itemsPerPage + 1} to {Math.min(currentPageNum * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} results
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
        )}
      </div>

      {/* Add / Edit Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        editingProduct={editingProduct}
      />
    </div>
  );
};
