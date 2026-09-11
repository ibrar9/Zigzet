import React, { useState, useMemo } from 'react';
import { Search, Copy, Check, ExternalLink, Sparkles, Tag, DollarSign, Award, Share2 } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const InfluencerProducts = ({ influencer }) => {
  const { products, showToast, formatPrice, navigatePage } = useStore();
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [copiedId, setCopiedId] = useState(null);
  const [copiedBlurbId, setCopiedBlurbId] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category).filter(Boolean));
    return ['all', ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCat === 'all' || p.category === selectedCat;
      const matchSearch =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        (p.category && p.category.toLowerCase().includes(search.toLowerCase())) ||
        (p.brand && p.brand.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [products, selectedCat, search]);

  const commissionRate = influencer?.commissionRate || 10;
  const couponCode = influencer?.couponCode || 'CREATOR15';

  const handleCopyLink = (p) => {
    const origin = window.location.origin;
    const affiliateUrl = `${origin}/#shop?product=${p.id}&ref=${couponCode}`;
    navigator.clipboard.writeText(affiliateUrl);
    setCopiedId(p.id);
    showToast('Affiliate Link Copied!', `Link for "${p.name}" with code ${couponCode} copied to clipboard.`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleCopyBlurb = (p) => {
    const origin = window.location.origin;
    const affiliateUrl = `${origin}/#shop?product=${p.id}&ref=${couponCode}`;
    const blurb = `Obsessed with the ${p.name}! ✨ Get 15% OFF your order at Zigzet using my exclusive promo code "${couponCode}" at checkout! \nShop here: ${affiliateUrl}`;
    navigator.clipboard.writeText(blurb);
    setCopiedBlurbId(p.id);
    showToast('Social Caption Copied!', 'Ready-to-post caption with your discount code copied.');
    setTimeout(() => setCopiedBlurbId(null), 2500);
  };

  return (
    <div className="inf-products-wrapper">
      {/* Header Banner */}
      <div className="inf-catalog-header">
        <div className="inf-catalog-header-text">
          <div className="inf-pill-badge">
            <Sparkles size={14} />
            <span>Storefront Product Catalog ({products.length} Items)</span>
          </div>
          <h3>Select Products to Promote & Earn</h3>
          <p>
            Browse all Zigzet items. Generate your personal tracking link or 1-click social media caption for any product.
            Every sale made earns you <strong>{commissionRate}% commission in reward points</strong>!
          </p>
        </div>
      </div>

      {/* Filters & Search Row */}
      <div className="inf-catalog-toolbar">
        <div className="inf-search-box">
          <Search size={16} color="#64748b" />
          <input
            type="text"
            placeholder="Search products by title, category, or brand..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <button className="inf-clear-search" onClick={() => setSearch('')}>
              ×
            </button>
          )}
        </div>

        <div className="inf-cat-pills">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`inf-cat-pill ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => setSelectedCat(cat)}
            >
              {cat === 'all' ? 'All Departments' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Cards Grid */}
      <div className="inf-products-grid">
        {filteredProducts.map((p) => {
          const priceNum = Number(p.price) || 0;
          const commissionEarned = (priceNum * commissionRate) / 100;
          const pointsEarned = Math.round(commissionEarned);

          return (
            <div key={p.id} className="inf-product-card">
              <div className="inf-product-img-wrapper">
                <img src={p.image} alt={p.name} loading="lazy" />
                <span className="inf-category-tag">{p.category || 'Curated'}</span>
                <div className="inf-earnings-badge">
                  <Award size={13} />
                  <span>Earn ${commissionEarned.toFixed(2)} ({pointsEarned} pts)</span>
                </div>
              </div>

              <div className="inf-product-body">
                <div className="inf-product-brand">{p.brand || 'Zigzet Store'}</div>
                <h4 className="inf-product-title" title={p.name}>{p.name}</h4>

                <div className="inf-product-price-row">
                  <span className="inf-current-price">{formatPrice ? formatPrice(priceNum) : `$${priceNum.toFixed(2)}`}</span>
                  {p.oldPrice && (
                    <span className="inf-old-price">{formatPrice ? formatPrice(p.oldPrice) : `$${p.oldPrice.toFixed(2)}`}</span>
                  )}
                  <span className="inf-stock-status">In Stock</span>
                </div>

                <div className="inf-actions-stack">
                  <button
                    className={`inf-btn-affiliate ${copiedId === p.id ? 'copied' : ''}`}
                    onClick={() => handleCopyLink(p)}
                    title="Copy unique affiliate tracking link"
                  >
                    {copiedId === p.id ? (
                      <>
                        <Check size={14} />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy Affiliate Link</span>
                      </>
                    )}
                  </button>

                  <button
                    className={`inf-btn-blurb ${copiedBlurbId === p.id ? 'copied' : ''}`}
                    onClick={() => handleCopyBlurb(p)}
                    title="Copy pre-written social media post caption"
                  >
                    {copiedBlurbId === p.id ? (
                      <>
                        <Check size={14} />
                        <span>Caption Copied!</span>
                      </>
                    ) : (
                      <>
                        <Share2 size={14} />
                        <span>Social Caption</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProducts.length === 0 && (
        <div className="inf-empty-state">
          <div className="inf-empty-icon">🔍</div>
          <h4>No matching products found</h4>
          <p>Try searching for a different keyword or department category.</p>
          <button className="admin-btn-secondary" onClick={() => { setSearch(''); setSelectedCat('all'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
