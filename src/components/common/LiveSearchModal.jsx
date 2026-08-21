import React, { useState } from 'react';
import { X, Search, ShoppingCart, ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';
import { categories } from '../../data/categories';

export const LiveSearchModal = () => {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    searchQuery, 
    setSearchQuery, 
    products, 
    setQuickViewProduct,
    addToCart,
    setActiveCategory
  } = useStore();

  const [selectedCatFilter, setSelectedCatFilter] = useState('all');

  if (!isSearchOpen) return null;

  const filteredProducts = products.filter((prod) => {
    const matchesQuery = searchQuery.trim() === '' || 
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.categoryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.description && prod.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCatFilter === 'all' || prod.category === selectedCatFilter;

    return matchesQuery && matchesCategory;
  });

  const handleSelectProduct = (prod) => {
    setIsSearchOpen(false);
    setQuickViewProduct(prod);
  };

  return (
    <div className="modal-overlay open" onClick={() => setIsSearchOpen(false)}>
      <div 
        className="modal-box" 
        style={{ maxWidth: '640px', padding: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
          <div className="search-input-box" style={{ flex: 1, padding: '10px 16px' }}>
            <Search size={18} color="#6b7280" />
            <input 
              type="text" 
              placeholder="Search products by name, category, or feature..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{ color: '#9ca3af' }}>
                <X size={16} />
              </button>
            )}
          </div>
          <button 
            className="drawer-close-btn"
            onClick={() => setIsSearchOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Category Filter Chips */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '16px' }}>
          <button
            onClick={() => setSelectedCatFilter('all')}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              fontSize: '12px',
              fontWeight: '600',
              backgroundColor: selectedCatFilter === 'all' ? '#111827' : '#f3f4f6',
              color: selectedCatFilter === 'all' ? '#ffffff' : '#4b5563',
              whiteSpace: 'nowrap'
            }}
          >
            All Items
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCatFilter(c.id)}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                fontSize: '12px',
                fontWeight: '600',
                backgroundColor: selectedCatFilter === c.id ? '#111827' : '#f3f4f6',
                color: selectedCatFilter === c.id ? '#ffffff' : '#4b5563',
                whiteSpace: 'nowrap'
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div style={{ maxHeight: '360px', overflowY: 'auto' }}>
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px 0', color: '#6b7280' }}>
              <p>No products found for "{searchQuery}".</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => handleSelectProduct(prod)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: '#f9fafb',
                    border: '1px solid #f3f4f6',
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f3f4f6'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f9fafb'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '44px', height: '44px', background: '#fff', borderRadius: '8px', padding: '4px', border: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <img src={prod.image} alt={prod.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '13.5px', fontWeight: '700', color: '#111827', margin: 0 }}>
                        {prod.name}
                      </h4>
                      <span style={{ fontSize: '12px', color: '#6b7280' }}>
                        {prod.categoryName} • ⭐ {prod.rating}
                      </span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#111827' }}>
                      ${Number(prod.price).toFixed(2)}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(prod, 1);
                      }}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '9999px',
                        backgroundColor: '#111827',
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      title="Add to cart"
                    >
                      <ShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
