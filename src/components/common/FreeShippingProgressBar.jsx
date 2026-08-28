import React from 'react';
import { useStore } from '../../context/StoreContext';
import { Truck, Check, Sparkles } from 'lucide-react';

export const FreeShippingProgressBar = ({ threshold = 50 }) => {
  const { cart } = useStore();

  const subtotal = (cart || []).reduce((sum, item) => {
    return sum + (Number(item.price) || 0) * (item.quantity || 1);
  }, 0);

  const remaining = Math.max(0, threshold - subtotal);
  const percentage = Math.min(100, Math.round((subtotal / threshold) * 100));
  const isUnlocked = subtotal >= threshold;

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 my-3">
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <div className="flex items-center gap-1.5 text-slate-200">
          <Truck className={`w-4 h-4 ${isUnlocked ? 'text-emerald-400' : 'text-indigo-400'}`} />
          {isUnlocked ? (
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              You unlocked FREE Express USA Shipping!
            </span>
          ) : (
            <span>
              Add <strong className="text-amber-300 font-bold">${remaining.toFixed(2)}</strong> more for <strong>FREE Shipping</strong>
            </span>
          )}
        </div>
        <span className="text-slate-400 font-mono">{percentage}%</span>
      </div>

      {/* Progress Track */}
      <div className="relative h-2.5 w-full bg-slate-800 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 rounded-full ${
            isUnlocked
              ? 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/50'
              : 'bg-gradient-to-r from-indigo-500 to-cyan-400 shadow-lg shadow-indigo-500/50'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
