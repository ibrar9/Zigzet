import React from 'react';

// Single Product Card Skeleton
export const ProductCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-image-box skeleton-shimmer">
      <div className="skeleton-badge skeleton-shimmer" />
    </div>
    <div className="skeleton-info">
      <div className="skeleton-category skeleton-shimmer" />
      <div className="skeleton-title skeleton-shimmer" />
      <div className="skeleton-rating-row">
        <div className="skeleton-stars skeleton-shimmer" />
        <div className="skeleton-reviews skeleton-shimmer" />
      </div>
      <div className="skeleton-footer">
        <div className="skeleton-price skeleton-shimmer" />
        <div className="skeleton-btn skeleton-shimmer" />
      </div>
    </div>
  </div>
);

// Grid of Product Skeletons
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="products-grid">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

// Category Pill / Card Skeleton
export const CategoryCardSkeleton = () => (
  <div className="skeleton-category-card">
    <div className="skeleton-cat-thumb skeleton-shimmer" />
    <div className="skeleton-cat-name skeleton-shimmer" />
    <div className="skeleton-cat-count skeleton-shimmer" />
  </div>
);

// Top Page Loader for Lazy Loading Suspense
export const PageLoader = () => (
  <div className="page-loader-wrapper">
    <div className="page-loader-spinner">
      <div className="spinner-ring" />
      <div className="spinner-brand">Z</div>
    </div>
    <span className="page-loader-text">Loading Zigzet...</span>
  </div>
);
