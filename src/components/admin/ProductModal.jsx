import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Image as ImageIcon, Sparkles, Tag, DollarSign, Layers } from 'lucide-react';
import { categories } from '../../data/categories';
import { CustomDropdown } from '../common/CustomDropdown';

export const ProductModal = ({ isOpen, onClose, onSave, editingProduct }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'electronics',
    categoryName: 'Electronics',
    price: '',
    originalPrice: '',
    stock: 25,
    image: '',
    description: ''
  });

  const categoryOptions = categories.map((c) => ({
    value: c.id,
    label: c.name,
    dot: c.id === 'electronics' ? '#3b82f6' : c.id === 'fashion' ? '#ec4899' : c.id === 'beauty' ? '#8b5cf6' : '#10b981'
  }));

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || 'electronics',
        categoryName: editingProduct.categoryName || 'Electronics',
        price: editingProduct.price !== undefined ? editingProduct.price.toString() : '',
        originalPrice: editingProduct.originalPrice ? editingProduct.originalPrice.toString() : '',
        stock: editingProduct.stock !== undefined ? editingProduct.stock : 20,
        image: editingProduct.image || '',
        description: editingProduct.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'electronics',
        categoryName: 'Electronics',
        price: '',
        originalPrice: '',
        stock: 25,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
        description: ''
      });
    }
  }, [editingProduct, isOpen]);

  if (!isOpen) return null;

  const handleCategorySelect = (catId) => {
    const catObj = categories.find((c) => c.id === catId);
    setFormData({
      ...formData,
      category: catId,
      categoryName: catObj ? catObj.name : 'General'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.price) {
      alert('Please provide product name and valid price.');
      return;
    }

    onSave({
      ...formData,
      name: formData.name.trim(),
      price: parseFloat(formData.price) || 0,
      originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
      stock: parseInt(formData.stock) || 0,
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    });
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '640px', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>

        <div style={{ marginBottom: '20px', paddingBottom: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '12px', color: '#7c3aed', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {editingProduct ? 'Inventory Update' : 'New Catalog Item'}
          </span>
          <h3 style={{ fontSize: '22px', fontWeight: '800', marginTop: '2px', color: '#0f172a' }}>
            {editingProduct ? `Edit "${editingProduct.name}"` : 'Create New Product'}
          </h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="checkout-form-grid">
            {/* Product Name */}
            <div className="form-group full-width">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Premium Noise-Cancelling Headphones"
                required
              />
            </div>

            {/* Category Custom Dropdown */}
            <div className="form-group">
              <label>Category *</label>
              <CustomDropdown
                options={categoryOptions}
                value={formData.category}
                onChange={handleCategorySelect}
                width="100%"
              />
            </div>

            {/* Stock Quantity */}
            <div className="form-group">
              <label>Initial Stock Units *</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
                required
              />
            </div>

            {/* Price ($) */}
            <div className="form-group">
              <label>Selling Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="149.99"
                required
              />
            </div>

            {/* Original Price ($) */}
            <div className="form-group">
              <label>Original Price ($) (For Sale badge)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="199.99"
              />
            </div>

            {/* Image URL & Live Preview */}
            <div className="form-group full-width">
              <label>Product Image URL *</label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <input
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://images.unsplash.com/photo-..."
                  style={{ flex: 1 }}
                  required
                />
                <div style={{ width: '46px', height: '46px', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden', flexShrink: 0, background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {formData.image ? (
                    <img src={formData.image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <ImageIcon size={18} color="#94a3b8" />
                  )}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group full-width">
              <label>Description & Features</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Key specifications, materials, and benefits..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #e2e8f0' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 20px', borderRadius: '10px', background: '#f1f5f9', color: '#475569', fontWeight: '600', fontSize: '13.5px' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hero-cta-btn"
              style={{ padding: '10px 28px', fontSize: '13.5px' }}
            >
              <Save size={15} />
              <span>{editingProduct ? 'Save Changes' : 'Create Product'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
