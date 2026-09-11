import React, { useState } from 'react';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit, 
  Search, 
  Sparkles, 
  Sun, 
  Droplets, 
  Shield, 
  Gift, 
  Smile, 
  Palette, 
  Flame, 
  Zap, 
  Heart, 
  Star, 
  Box, 
  CheckCircle2, 
  X, 
  Save, 
  Check, 
  Tag
} from 'lucide-react';
import { useStore } from '../../context/StoreContext';

const ICON_MAP = {
  Sun: Sun,
  Sparkles: Sparkles,
  Droplets: Droplets,
  Shield: Shield,
  Gift: Gift,
  Smile: Smile,
  Palette: Palette,
  Flame: Flame,
  Zap: Zap,
  Heart: Heart,
  Star: Star,
  Box: Box,
  Layers: Layers
};

export const AdminCategories = () => {
  const { categories, addCategory, updateCategory, deleteCategory, products, showToast } = useStore();

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  const [form, setForm] = useState({
    name: '',
    id: '',
    icon: 'Sparkles',
    image: '',
    popular: false,
    description: ''
  });

  const totalCategories = categories.length;
  const popularCount = categories.filter((c) => c.popular).length;

  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase())
  );

  const getProductCount = (cat) => {
    return products.filter((p) => {
      const pCat = (p.category || '').toLowerCase();
      const cId = (cat.id || '').toLowerCase();
      const cName = (cat.name || '').toLowerCase();
      return pCat === cId || pCat === cName || pCat.includes(cId);
    }).length;
  };

  const handleOpenAdd = () => {
    setEditingCategory(null);
    setForm({
      name: '',
      id: '',
      icon: 'Sparkles',
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
      popular: true,
      description: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (cat) => {
    setEditingCategory(cat);
    setForm({
      name: cat.name || '',
      id: cat.id || '',
      icon: cat.icon || 'Sparkles',
      image: cat.image || '',
      popular: !!cat.popular,
      description: cat.description || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      showToast('Validation Error', 'Category name is required', 'error');
      return;
    }

    const slug = form.id.trim() || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    if (editingCategory) {
      updateCategory(editingCategory.id, {
        name: form.name.trim(),
        icon: form.icon,
        image: form.image.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        popular: form.popular,
        description: form.description.trim()
      });
    } else {
      // Check for duplicate ID
      if (categories.some((c) => c.id === slug)) {
        showToast('Duplicate Category', `A category with identifier "${slug}" already exists.`, 'error');
        return;
      }

      addCategory({
        id: slug,
        name: form.name.trim(),
        icon: form.icon,
        image: form.image.trim() || 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80',
        popular: form.popular,
        itemCount: '0 products',
        description: form.description.trim()
      });
    }

    setIsModalOpen(false);
  };

  const handleDelete = (cat) => {
    if (window.confirm(`Are you sure you want to delete the "${cat.name}" category? Products assigned to it will retain their data.`)) {
      deleteCategory(cat.id);
    }
  };

  return (
    <div className="admin-page-container">
      {/* Header Title & Actions */}
      <div className="admin-page-header">
        <div>
          <h2 className="admin-section-title">Categories & Departments ({totalCategories})</h2>
          <p className="admin-section-desc">Manage store departments, icons, banners, and homepage navigation taxonomy</p>
        </div>

        <div className="admin-page-actions">
          <button
            className="hero-cta-btn"
            onClick={handleOpenAdd}
            style={{ padding: '10px 22px', fontSize: '13.5px', background: '#5A1F2D' }}
          >
            <Plus size={16} />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="admin-overview-stats-grid" style={{ marginBottom: '24px' }}>
        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper purple" style={{ background: 'rgba(90, 31, 45, 0.12)', color: '#5A1F2D' }}>
            <Layers size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Categories</span>
            <span className="stat-main-number">{totalCategories}</span>
            <span className="stat-sub-text">Active departments</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper emerald">
            <Sparkles size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Featured / Popular</span>
            <span className="stat-main-number">{popularCount}</span>
            <span className="stat-sub-text">Shown on homepage</span>
          </div>
        </div>

        <div className="admin-stat-summary-card">
          <div className="stat-icon-wrapper amber">
            <Box size={22} />
          </div>
          <div className="stat-info-stack">
            <span className="stat-label-text">Total Catalog Products</span>
            <span className="stat-main-number">{products.length}</span>
            <span className="stat-sub-text">Assigned across categories</span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-controls-card" style={{ marginBottom: '20px' }}>
        <div className="admin-search-wrapper" style={{ flex: 1, maxWidth: '380px' }}>
          <Search size={16} className="admin-search-icon" />
          <input
            type="text"
            placeholder="Search categories by name or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="admin-search-input"
          />
          {search && (
            <button onClick={() => setSearch('')} className="search-clear-btn">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '20px'
      }}>
        {filteredCategories.map((cat) => {
          const IconComp = ICON_MAP[cat.icon] || Layers;
          const count = getProductCount(cat);

          return (
            <div
              key={cat.id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s ease'
              }}
            >
              {/* Category Image Header */}
              <div style={{ position: 'relative', height: '140px', background: '#f8fafc', overflow: 'hidden' }}>
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80';
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 60%)'
                }} />

                {/* Popular Badge */}
                {cat.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: '#5A1F2D',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <Sparkles size={12} /> Popular
                  </span>
                )}

                {/* Icon Pill */}
                <div style={{
                  position: 'absolute',
                  bottom: '12px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '10px',
                    background: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#5A1F2D',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
                  }}>
                    <IconComp size={20} />
                  </div>
                  <div>
                    <h3 style={{ margin: 0, color: '#ffffff', fontSize: '16px', fontWeight: 700 }}>
                      {cat.name}
                    </h3>
                    <span style={{ color: '#e2e8f0', fontSize: '12px' }}>
                      Slug: #{cat.id}
                    </span>
                  </div>
                </div>
              </div>

              {/* Category Details Body */}
              <div style={{ padding: '16px 20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>Assigned Products:</span>
                    <span style={{
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0f172a',
                      background: '#f1f5f9',
                      padding: '3px 10px',
                      borderRadius: '12px'
                    }}>
                      {count} items
                    </span>
                  </div>
                  {cat.description && (
                    <p style={{ margin: '0 0 14px 0', fontSize: '13px', color: '#475569', lineHeight: 1.4 }}>
                      {cat.description}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '14px', marginTop: '10px' }}>
                  <button
                    onClick={() => handleOpenEdit(cat)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      background: '#ffffff',
                      color: '#334155',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(cat)}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #fee2e2',
                      background: '#fff5f5',
                      color: '#dc2626',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCategories.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: '#ffffff',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1'
        }}>
          <Layers size={40} color="#94a3b8" style={{ marginBottom: '12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#334155', margin: '0 0 6px 0' }}>
            No categories found
          </h3>
          <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
            {search ? `No results matching "${search}"` : 'Create your first category to organize your catalog.'}
          </p>
        </div>
      )}

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.55)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: '16px'
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '16px',
            maxWidth: '520px',
            width: '100%',
            padding: '28px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            position: 'relative',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <button
              onClick={() => setIsModalOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                border: 'none',
                background: '#f3f4f6',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280'
              }}
            >
              <X size={18} />
            </button>

            <div style={{ marginBottom: '20px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {editingCategory ? `Updating "${editingCategory.name}"` : 'Create a new department for your products'}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sun Care & SPF"
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setForm((f) => ({
                      ...f,
                      name,
                      id: editingCategory ? f.id : name.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    }));
                  }}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Category Identifier / Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. sunscreen"
                  value={form.id}
                  disabled={!!editingCategory}
                  onChange={(e) => setForm((f) => ({ ...f, id: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box',
                    background: editingCategory ? '#f8fafc' : '#ffffff',
                    cursor: editingCategory ? 'not-allowed' : 'text'
                  }}
                />
                <span style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', display: 'block' }}>
                  Used for URLs and product assignments (e.g. #shop?category={form.id || 'slug'}).
                </span>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Icon Style
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(6, 1fr)',
                  gap: '8px'
                }}>
                  {Object.keys(ICON_MAP).map((iconKey) => {
                    const Icon = ICON_MAP[iconKey];
                    const isSelected = form.icon === iconKey;
                    return (
                      <button
                        type="button"
                        key={iconKey}
                        onClick={() => setForm((f) => ({ ...f, icon: iconKey }))}
                        style={{
                          padding: '10px',
                          borderRadius: '8px',
                          border: isSelected ? '2px solid #5A1F2D' : '1px solid #e2e8f0',
                          background: isSelected ? 'rgba(90, 31, 45, 0.08)' : '#ffffff',
                          color: isSelected ? '#5A1F2D' : '#64748b',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '11px',
                          fontWeight: isSelected ? 700 : 500
                        }}
                      >
                        <Icon size={18} />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>
                  Banner Image URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={form.image}
                  onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    fontSize: '14px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={(e) => setForm((f) => ({ ...f, popular: e.target.checked }))}
                    style={{ accentColor: '#5A1F2D', width: '16px', height: '16px', cursor: 'pointer' }}
                  />
                  <div>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1f2937' }}>
                      Feature on Homepage (Popular Category)
                    </span>
                    <span style={{ display: 'block', fontSize: '12px', color: '#6b7280' }}>
                      Shows this department in the prominent top category carousel.
                    </span>
                  </div>
                </label>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{
                    flex: 1,
                    padding: '11px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: '#ffffff',
                    color: '#374151',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 2,
                    padding: '11px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#5A1F2D',
                    color: '#ffffff',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Save size={16} />
                  <span>{editingCategory ? 'Save Changes' : 'Create Category'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
