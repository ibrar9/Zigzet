import React from 'react';
import { ArrowRight } from 'lucide-react';
import { categories } from '../../data/categories';
import { useStore } from '../../context/StoreContext';

export const CategorySection = () => {
  const { activeCategory, setActiveCategory } = useStore();

  const handleCategoryClick = (categoryId) => {
    if (activeCategory === categoryId) {
      setActiveCategory('all');
    } else {
      setActiveCategory(categoryId);
    }

    const featuredElem = document.getElementById('featured-products');
    if (featuredElem) {
      featuredElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="categories-section" id="shop-by-category">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <h2 className="section-title">Shop by Category</h2>
          <span 
            className="view-all-link"
            onClick={() => setActiveCategory('all')}
          >
            <span>View All</span>
            <ArrowRight size={15} />
          </span>
        </div>

        {/* 8 Categories Grid */}
        <div className="categories-grid">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                className={`category-card ${isActive ? 'active-category' : ''}`}
                onClick={() => handleCategoryClick(cat.id)}
                title={`Filter by ${cat.name}`}
              >
                <div className="category-thumb">
                  <img src={cat.image} alt={cat.name} loading="lazy" />
                </div>
                <span className="category-name">{cat.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
