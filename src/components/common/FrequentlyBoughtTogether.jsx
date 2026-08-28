import React, { useState } from 'react';
import { useStore } from '../../context/StoreContext';
import { ShoppingBag, Check, Plus, Sparkles } from 'lucide-react';

export const FrequentlyBoughtTogether = ({ mainProduct }) => {
  const { products, addToCart, showToast } = useStore();

  // Find 2 related complementary products
  const complementary = (products || [])
    .filter(p => p.id !== mainProduct?.id && (p.category === mainProduct?.category || p.price < 50))
    .slice(0, 2);

  const [selectedItems, setSelectedItems] = useState([mainProduct?.id, ...complementary.map(p => p.id)]);

  if (!mainProduct || complementary.length === 0) return null;

  const allBundleItems = [mainProduct, ...complementary];
  const activeItems = allBundleItems.filter(p => selectedItems.includes(p.id));

  const rawTotal = activeItems.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const bundleDiscount = activeItems.length >= 3 ? 0.15 : activeItems.length === 2 ? 0.10 : 0;
  const finalTotal = rawTotal * (1 - bundleDiscount);
  const savings = rawTotal - finalTotal;

  const toggleItem = (id) => {
    if (id === mainProduct.id) return; // Main product is always selected
    setSelectedItems(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleAddBundle = () => {
    activeItems.forEach(item => {
      addToCart(item, 1);
    });
    showToast(`🎉 Added ${activeItems.length} items to cart with $${savings.toFixed(2)} bundle savings!`);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md my-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">Frequently Bought Together</h3>
        </div>
        {bundleDiscount > 0 && (
          <span className="px-3 py-1 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold rounded-full">
            Save {(bundleDiscount * 100).toFixed(0)}% on this bundle
          </span>
        )}
      </div>

      {/* Product Thumbnails Row with Plus signs */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {allBundleItems.map((item, index) => {
          const isSelected = selectedItems.includes(item.id);
          return (
            <React.Fragment key={item.id}>
              {index > 0 && (
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                  <Plus className="w-4 h-4" />
                </div>
              )}
              <div 
                onClick={() => toggleItem(item.id)}
                className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 cursor-pointer transition-all ${
                  isSelected 
                    ? 'border-indigo-500 shadow-lg shadow-indigo-500/20 scale-105' 
                    : 'border-slate-800 opacity-40 hover:opacity-75'
                }`}
              >
                <img 
                  src={item.image || item.images?.[0]} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                {isSelected && (
                  <div className="absolute top-1 right-1 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Item Checkboxes */}
      <div className="space-y-2 mb-6 text-sm">
        {allBundleItems.map((item) => {
          const isSelected = selectedItems.includes(item.id);
          const isMain = item.id === mainProduct.id;
          return (
            <label 
              key={item.id} 
              className={`flex items-center gap-3 cursor-pointer select-none ${isMain ? 'cursor-default' : ''}`}
            >
              <input 
                type="checkbox"
                checked={isSelected}
                disabled={isMain}
                onChange={() => toggleItem(item.id)}
                className="w-4 h-4 rounded text-indigo-600 bg-slate-800 border-slate-700 focus:ring-indigo-500"
              />
              <span className={`flex-1 ${isSelected ? 'text-slate-200 font-medium' : 'text-slate-500'}`}>
                {isMain && <strong className="text-indigo-400 font-semibold mr-1.5">[This Item]</strong>}
                {item.name}
              </span>
              <span className="font-bold text-white">${Number(item.price).toFixed(2)}</span>
            </label>
          );
        })}
      </div>

      {/* Price Summary & Action */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-xs text-slate-400">Total Bundle Price:</span>
            <span className="text-2xl font-black text-white">${finalTotal.toFixed(2)}</span>
            {savings > 0 && (
              <span className="text-sm line-through text-slate-500">${rawTotal.toFixed(2)}</span>
            )}
          </div>
          {savings > 0 && (
            <p className="text-xs text-emerald-400 font-medium mt-0.5">
              You save ${savings.toFixed(2)} with collective bundle discount!
            </p>
          )}
        </div>

        <button
          onClick={handleAddBundle}
          disabled={activeItems.length === 0}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add Selected ({activeItems.length}) to Cart</span>
        </button>
      </div>
    </div>
  );
};
