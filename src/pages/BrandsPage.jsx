import React, { useState, useMemo } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Search, 
  ShieldCheck, 
  Package, 
  Tag,
  Star
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const BrandsPage = () => {
  const { products, navigatePage } = useStore();
  const [brandSearch, setBrandSearch] = useState('');

  // Extract unique brands with their product counts and sample images
  const brandsList = useMemo(() => {
    const brandMap = new Map();

    products.forEach((p) => {
      if (p.brand && p.brand.trim() && p.isActive !== false) {
        const bName = p.brand.trim();
        if (!brandMap.has(bName)) {
          brandMap.set(bName, {
            name: bName,
            products: [],
            count: 0,
            sampleImages: [],
            categories: new Set()
          });
        }
        const bData = brandMap.get(bName);
        bData.products.push(p);
        bData.count += 1;
        if (p.image && bData.sampleImages.length < 3) {
          bData.sampleImages.push(p.image);
        }
        if (p.categoryName) {
          bData.categories.add(p.categoryName);
        }
      }
    });

    return Array.from(brandMap.values())
      .map((b) => ({
        ...b,
        categoriesList: Array.from(b.categories).slice(0, 3)
      }))
      .sort((a, b) => b.count - a.count);
  }, [products]);

  // Filtered by search term
  const filteredBrands = useMemo(() => {
    if (!brandSearch.trim()) return brandsList;
    const q = brandSearch.toLowerCase();
    return brandsList.filter((b) => b.name.toLowerCase().includes(q));
  }, [brandsList, brandSearch]);

  const handleSelectBrand = (brandName) => {
    navigatePage('shop', 'all', brandName);
  };

  return (
    <div className="brands-page-wrapper">
      {/* Header Banner */}
      <div className="shop-header-banner">
        <div className="container">
          <div style={{ maxWidth: '640px' }}>
            <span style={{ fontSize: '12.5px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={14} color="#10b981" />
              <span>100% Authentic Korean Skincare</span>
            </span>
            <h1 style={{ fontSize: '36px', fontWeight: '800', marginTop: '4px', marginBottom: '8px', color: '#0f172a' }}>
              Official Brand Directory
            </h1>
            <p style={{ color: '#4b5563', fontSize: '14.5px', lineHeight: '1.5' }}>
              Explore official dermatologist-approved K-Beauty brands. Browse complete product lines with guaranteed authenticity and fast delivery.
            </p>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container" style={{ padding: '36px 20px 70px 20px' }}>
        {/* Search & Quick Stats Bar */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          flexWrap: 'wrap', 
          gap: '16px', 
          marginBottom: '32px',
          padding: '16px 20px',
          background: '#f8fafc',
          borderRadius: '16px',
          border: '1px solid #e2e8f0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>
              Showing {filteredBrands.length} Verified Brands
            </span>
            <span style={{ fontSize: '12px', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '12px' }}>
              {products.filter(p => p.isActive !== false).length} Total Products
            </span>
          </div>

          {/* Quick Search */}
          <div style={{ position: 'relative', width: '280px', maxWidth: '100%' }}>
            <Search size={15} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
              placeholder="Search brands (e.g. Cell Fusion C)..."
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                borderRadius: '10px',
                border: '1px solid #cbd5e1',
                fontSize: '13px',
                background: '#ffffff',
                outline: 'none'
              }}
            />
          </div>
        </div>

        {/* Brands Grid */}
        {filteredBrands.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filteredBrands.map((brand) => (
              <div
                key={brand.name}
                onClick={() => handleSelectBrand(brand.name)}
                style={{
                  background: '#ffffff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '20px',
                  padding: '24px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 28px -6px rgba(124, 58, 237, 0.15)';
                  e.currentTarget.style.borderColor = '#c4b5fd';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)';
                  e.currentTarget.style.borderColor = '#e2e8f0';
                }}
              >
                <div>
                  {/* Brand Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', margin: 0 }}>
                          {brand.name}
                        </h3>
                        <ShieldCheck size={16} color="#7c3aed" />
                      </div>
                      <span style={{ fontSize: '12px', color: '#64748b' }}>
                        Official Store Catalog
                      </span>
                    </div>

                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      background: '#f5f3ff',
                      color: '#7c3aed',
                      fontSize: '12px',
                      fontWeight: '800',
                      padding: '4px 10px',
                      borderRadius: '9999px'
                    }}>
                      <Package size={12} />
                      <span>{brand.count} Product{brand.count === 1 ? '' : 's'}</span>
                    </span>
                  </div>

                  {/* Sample Product Thumbnails */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    marginBottom: '16px',
                    background: '#f8fafc',
                    padding: '10px',
                    borderRadius: '12px'
                  }}>
                    {brand.sampleImages.map((img, idx) => (
                      <div
                        key={idx}
                        style={{
                          aspectRatio: '1 / 1',
                          borderRadius: '8px',
                          background: '#ffffff',
                          border: '1px solid #e2e8f0',
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src={img}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }}
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Categories Tags */}
                  {brand.categoriesList.length > 0 && (
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                      {brand.categoriesList.map((cat, cIdx) => (
                        <span
                          key={cIdx}
                          style={{
                            fontSize: '11px',
                            fontWeight: '600',
                            color: '#475569',
                            background: '#f1f5f9',
                            padding: '3px 8px',
                            borderRadius: '6px'
                          }}
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Action */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '14px',
                  borderTop: '1px solid #f1f5f9'
                }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#7c3aed' }}>
                    View All {brand.count} Products
                  </span>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#f5f3ff',
                    color: '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'transform 0.2s'
                  }}>
                    <ArrowRight size={15} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #cbd5e1' }}>
            <p style={{ fontSize: '16px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
              No brands found matching "{brandSearch}"
            </p>
            <button
              onClick={() => setBrandSearch('')}
              style={{
                padding: '8px 18px',
                borderRadius: '8px',
                background: '#7c3aed',
                color: '#fff',
                border: 'none',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Clear Search Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
