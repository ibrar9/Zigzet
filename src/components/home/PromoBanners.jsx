import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useStore } from '../../context/StoreContext';

export const PromoBanners = () => {
  const { setActiveCategory } = useStore();

  const handleTechClick = () => {
    setActiveCategory('electronics');
    const elem = document.getElementById('featured-products');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  const handleHomeClick = () => {
    setActiveCategory('home-living');
    const elem = document.getElementById('featured-products');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="promo-banners-section">
      <div className="container">
        <div className="promo-banners-grid">
          {/* Card 1: Tech Deals */}
          <div className="promo-card promo-card-tech">
            <div className="promo-info">
              <h3>Tech Deals</h3>
              <p>Latest Gadgets<br />at Best Prices</p>
              <button className="promo-btn" onClick={handleTechClick}>
                <span>Shop Now</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="promo-image-box">
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500&auto=format&fit=crop&q=80"
                alt="Tech Deals Smartwatch and Earbuds"
              />
            </div>
          </div>

          {/* Card 2: Home Essentials */}
          <div className="promo-card promo-card-home">
            <div className="promo-info">
              <h3>Home Essentials</h3>
              <p>Make Your Home<br />More Comfortable</p>
              <button className="promo-btn" onClick={handleHomeClick}>
                <span>Shop Now</span>
                <ArrowRight size={14} />
              </button>
            </div>

            <div className="promo-image-box">
              <img
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&auto=format&fit=crop&q=80"
                alt="Home Essentials Cozy Sofa & Decor"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
