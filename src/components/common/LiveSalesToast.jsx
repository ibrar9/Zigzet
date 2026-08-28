import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle, X, ExternalLink, ShoppingCart } from 'lucide-react';

const buyers = [
  { name: 'Sarah M.', city: 'New York, NY', time: '2 mins ago' },
  { name: 'David L.', city: 'Los Angeles, CA', time: '4 mins ago' },
  { name: 'Emily R.', city: 'Austin, TX', time: '6 mins ago' },
  { name: 'Michael K.', city: 'Chicago, IL', time: '1 min ago' },
  { name: 'Jessica T.', city: 'Miami, FL', time: 'Just now' },
  { name: 'Alex H.', city: 'Seattle, WA', time: '3 mins ago' }
];

export const LiveSalesToast = () => {
  const { products, openProductQuickView } = useStore();
  const [currentSale, setCurrentSale] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (isDismissed || !products || products.length === 0) return;

    // Trigger initial toast after 5 seconds
    const initialTimer = setTimeout(() => {
      triggerRandomSale();
    }, 5000);

    // Recurring toast interval every 18-28 seconds
    const interval = setInterval(() => {
      triggerRandomSale();
    }, Math.floor(Math.random() * 10000) + 18000);

    function triggerRandomSale() {
      const randomProduct = products[Math.floor(Math.random() * products.length)];
      const randomBuyer = buyers[Math.floor(Math.random() * buyers.length)];
      
      setCurrentSale({
        buyer: randomBuyer,
        product: randomProduct
      });
      setIsVisible(true);

      // Auto-hide after 5.5 seconds
      setTimeout(() => {
        setIsVisible(false);
      }, 5500);
    }

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, [products, isDismissed]);

  if (!currentSale || !currentSale.product) return null;

  return (
    <div
      className={`fixed bottom-20 left-4 z-40 max-w-sm transition-all duration-500 ease-out transform ${
        isVisible
          ? 'translate-y-0 opacity-100 scale-100 pointer-events-auto'
          : 'translate-y-6 opacity-0 scale-95 pointer-events-none'
      }`}
    >
      <div className="bg-slate-900/95 border border-slate-700/80 shadow-2xl rounded-2xl p-3.5 backdrop-blur-xl flex items-center gap-3.5 group">
        {/* Product Thumbnail */}
        <div 
          onClick={() => openProductQuickView && openProductQuickView(currentSale.product)}
          className="relative w-14 h-14 rounded-xl overflow-hidden bg-slate-800 flex-shrink-0 cursor-pointer border border-slate-700/50 group-hover:border-indigo-500 transition-colors"
        >
          <img
            src={currentSale.product.image || currentSale.product.images?.[0]}
            alt={currentSale.product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
            <span className="text-xs font-medium text-slate-300 truncate">
              <strong className="text-white">{currentSale.buyer.name}</strong> from {currentSale.buyer.city}
            </span>
          </div>

          <p 
            onClick={() => openProductQuickView && openProductQuickView(currentSale.product)}
            className="text-xs font-bold text-white truncate cursor-pointer hover:text-indigo-400 transition-colors"
          >
            {currentSale.product.name}
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
            <span className="font-semibold text-emerald-400">${Number(currentSale.product.price).toFixed(2)}</span>
            <span className="text-slate-500">{currentSale.buyer.time}</span>
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          onClick={() => {
            setIsVisible(false);
            setIsDismissed(true);
          }}
          className="p-1 text-slate-500 hover:text-white rounded-lg hover:bg-slate-800 transition-colors self-start"
          title="Dismiss alerts"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
