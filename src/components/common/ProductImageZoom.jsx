import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, Eye, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export const ProductImageZoom = ({
  images = [],
  mainImage,
  productName = 'Product',
  aspectRatio = '1 / 1'
}) => {
  // Normalize images array
  const allImages = images && images.length > 0 ? images : [mainImage];
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);
  const imageContainerRef = useRef(null);

  const currentImage = allImages[activeIdx] || mainImage;

  // Handle mouse move to track cursor position inside image
  const handleMouseMove = (e) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setZoomPos({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y))
    });
  };

  const handleMouseEnter = () => {
    setIsZooming(true);
  };

  const handleMouseLeave = () => {
    setIsZooming(false);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setActiveIdx((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="product-zoom-gallery-root">
      {/* Main Image Box with Zoom Lens */}
      <div
        ref={imageContainerRef}
        className={`product-zoom-viewport ${isZooming ? 'is-zoomed' : ''}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ aspectRatio }}
      >
        <img
          src={currentImage}
          alt={productName}
          className={`product-zoom-main-img ${isLoaded ? 'loaded' : 'loading'}`}
          onLoad={() => setIsLoaded(true)}
          style={{
            transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`,
            transform: isZooming ? 'scale(2.2)' : 'scale(1)'
          }}
        />

        {/* Hover Zoom Visual Helper Badge */}
        <div className={`zoom-instruction-pill ${isZooming ? 'hidden' : ''}`}>
          <ZoomIn size={13} />
          <span>Hover to Zoom</span>
        </div>

        {/* Arrows for multi-images on desktop / mobile */}
        {allImages.length > 1 && (
          <>
            <button
              className="gallery-nav-arrow prev"
              onClick={handlePrev}
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              className="gallery-nav-arrow next"
              onClick={handleNext}
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Row */}
      {allImages.length > 1 && (
        <div className="product-gallery-thumbnails-strip">
          {allImages.map((img, idx) => (
            <button
              key={idx}
              type="button"
              className={`product-gallery-thumb-btn ${activeIdx === idx ? 'active' : ''}`}
              onClick={() => setActiveIdx(idx)}
              aria-label={`View image ${idx + 1}`}
            >
              <img src={img} alt={`${productName} angle ${idx + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
