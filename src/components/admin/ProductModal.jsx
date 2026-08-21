import React, { useState, useEffect } from 'react';
import { X, Save, Plus } from 'lucide-react';
import { categories } from '../../data/categories';

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

  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || '',
        category: editingProduct.category || 'electronics',
        categoryName: editingProduct.categoryName || 'Electronics',
        price: editingProduct.price || '',
        originalPrice: editingProduct.originalPrice || '',
        stock: editingProduct.stock || 20,
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

  const handleCategoryChange = (e) => {
    const catId = e.target.value;
    const catObj = categories.find((c) => c.id === catId);
    setFormData({
      ...formData,
      category: catId,
      categoryName: catObj ? catObj.name : 'General'
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price) {
      alert('Please provide at least product name and price.');
      return;
    }

    onSave({
      ...formData,
      image: formData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
    });
    onClose();
  };

  return (
    <div className="modal-overlay open" onClick={onClose}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '600px', padding: '32px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-icon" onClick={onClose}>
          <X size={18} />
        </button>

        <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '20px' }}>
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="checkout-form-grid">
            <div className="form-group full-width">
              <label>Product Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Wireless Pro Earbuds"
                required
              />
            </div>

            <div className="form-group">
              <label>Category *</label>
              <select value={formData.category} onChange={handleCategoryChange}>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Stock Quantity</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                min="0"
              />
            </div>

            <div className="form-group">
              <label>Price ($) *</label>
              <input
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="149.99"
                required
              />
            </div>

            <div className="form-group">
              <label>Original Price ($) (Optional for Sale badge)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                placeholder="199.99"
              />
            </div>

            <div className="form-group full-width">
              <label>Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Detailed description of features and quality..."
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 20px', borderRadius: '9999px', fontWeight: '600', color: '#6b7280', fontSize: '13.5px' }}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hero-cta-btn"
              style={{ padding: '10px 24px', fontSize: '13.5px' }}
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
