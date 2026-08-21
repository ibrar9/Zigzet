import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { ProductModal } from './ProductModal';
import { categories } from '../../data/categories';

export const AdminProducts = () => {
  const { products, addProduct, updateProduct, deleteProduct } = useStore();

  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
      (p.sku && p.sku.toLowerCase().includes(search.toLowerCase()));
    const matchesCat = catFilter === 'all' || p.category === catFilter;
    return matchesSearch && matchesCat;
  });

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setIsModalOpen(true);
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
    <div>
      {/* Header and Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Product Inventory ({products.length})</h2>
          <p style={{ fontSize: '13.5px', color: '#6b7280' }}>Add, edit, manage stock, and organize categories</p>
        </div>

        <button
          className="hero-cta-btn"
          onClick={handleOpenAdd}
          style={{ padding: '10px 22px', fontSize: '13.5px' }}
        >
          <Plus size={16} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card-box" style={{ padding: '16px 20px', marginBottom: '20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div className="search-input-box" style={{ flex: 1, minWidth: '220px' }}>
          <Search size={16} color="#9ca3af" />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="#6b7280" />
          <select
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: '8px', border: '1px solid #e5e7eb', fontSize: '13.5px', outline: 'none' }}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="admin-card-box">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Rating</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((prod) => (
                <tr key={prod.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '44px', height: '44px', background: '#f8fafc', borderRadius: '8px', padding: '4px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src={prod.image} alt={prod.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                      </div>
                      <div>
                        <div style={{ fontWeight: '700', color: '#111827' }}>{prod.name}</div>
                        <div style={{ fontSize: '11.5px', color: '#9ca3af' }}>SKU: {prod.sku || 'N/A'}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: '12.5px', background: '#f1f5f9', padding: '3px 8px', borderRadius: '6px', fontWeight: '500' }}>
                      {prod.categoryName}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: '700' }}>${Number(prod.price).toFixed(2)}</span>
                    {prod.originalPrice && (
                      <span style={{ fontSize: '12px', color: '#9ca3af', textDecoration: 'line-through', marginLeft: '6px' }}>
                        ${Number(prod.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: '600', color: (prod.stock || 0) < 15 ? '#ea580c' : '#10b981' }}>
                      {prod.stock || 0} units
                    </span>
                  </td>
                  <td>⭐ {prod.rating || 5.0}</td>
                  <td>
                    {prod.isSale ? (
                      <span className="status-badge" style={{ backgroundColor: '#fee2e2', color: '#ef4444' }}>Sale</span>
                    ) : (
                      <span className="status-badge" style={{ backgroundColor: '#ecfdf5', color: '#10b981' }}>Regular</span>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => handleOpenEdit(prod)}
                        style={{ padding: '6px', borderRadius: '6px', background: '#f1f5f9', color: '#111827' }}
                        title="Edit product"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(prod)}
                        style={{ padding: '6px', borderRadius: '6px', background: '#fee2e2', color: '#ef4444' }}
                        title="Delete product"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
