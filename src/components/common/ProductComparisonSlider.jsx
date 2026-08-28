import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, MoveHorizontal } from 'lucide-react';

export const ProductComparisonSlider = ({
  beforeImage = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
  afterImage = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80',
  beforeLabel = 'Standard Sound',
  afterLabel = 'Spatial Hi-Res Audio',
  title = 'Experience The Difference',
  subtitle = 'Drag the slider to compare real-world acoustic clarity and active noise suppression.'
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const isDragging = useRef(false);

  const handleMove = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percent);
  }, []);

  const handleMouseDown = () => { isDragging.current = true; };
  const handleMouseUp = () => { isDragging.current = false; };
  const handleMouseMove = (e) => {
    if (isDragging.current) handleMove(e.clientX);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) handleMove(e.touches[0].clientX);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl my-10 max-w-4xl mx-auto">
      <div className="text-center max-w-lg mx-auto mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>INTERACTIVE PRODUCT LAB</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">{title}</h3>
        <p className="text-slate-400 text-xs sm:text-sm">{subtitle}</p>
      </div>

      {/* Comparison Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden cursor-ew-resize select-none border border-slate-700/60 shadow-inner"
      >
        {/* After Image (Background) */}
        <img
          src={afterImage}
          alt={afterLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-slate-950/80 backdrop-blur-md border border-slate-700 text-white text-xs font-bold rounded-lg shadow-lg">
          {afterLabel}
        </div>

        {/* Before Image (Clipped Overlay) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden pointer-events-none"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={beforeImage}
            alt={beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none pointer-events-none"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
          <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-indigo-950/80 backdrop-blur-md border border-indigo-500/40 text-indigo-300 text-xs font-bold rounded-lg shadow-lg">
            {beforeLabel}
          </div>
        </div>

        {/* Draggable Divider Handle */}
        <div
          className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none flex items-center justify-center"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-10 h-10 rounded-full bg-white text-slate-900 shadow-2xl flex items-center justify-center pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
            <MoveHorizontal className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
