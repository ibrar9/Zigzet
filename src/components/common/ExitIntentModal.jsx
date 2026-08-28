import React, { useState, useEffect } from 'react';
import { useStore } from '../../context/StoreContext';
import { Sparkles, X, Copy, Check, Percent, ArrowRight } from 'lucide-react';

export const ExitIntentModal = () => {
  const { showToast, applyCoupon, openCart } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  const COUPON_CODE = 'SAVE15NOW';

  useEffect(() => {
    // Only trigger once per user session
    const sessionTriggered = sessionStorage.getItem('zigzet_exit_intent_shown');
    if (sessionTriggered) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e) => {
      // Trigger when mouse moves towards top browser bar (leaving tab/window)
      if (e.clientY <= 15 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        sessionStorage.setItem('zigzet_exit_intent_shown', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  if (!isOpen) return null;

  const handleCopyAndApply = () => {
    navigator.clipboard.writeText(COUPON_CODE);
    setCopied(true);
    if (applyCoupon) applyCoupon(COUPON_CODE);
    showToast(`🎉 Coupon ${COUPON_CODE} copied & applied to your cart!`);
    setTimeout(() => {
      setIsOpen(false);
      if (openCart) openCart();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-indigo-500/40 rounded-3xl p-8 shadow-2xl shadow-indigo-500/20 text-center overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-indigo-600/30 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/60 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs font-bold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>WAIT! DON'T LEAVE EMPTY HANDED</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl font-black text-white tracking-tight mb-2">
          Claim an Extra <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-300">15% OFF</span>
        </h2>

        <p className="text-slate-300 text-sm max-w-sm mx-auto mb-6">
          Complete your order today and unlock an instant 15% VIP discount code applicable on your entire shopping cart.
        </p>

        {/* Promo Voucher Box */}
        <div className="flex items-center justify-between bg-slate-950/80 border border-slate-700/80 rounded-2xl p-3 mb-6">
          <div className="flex items-center gap-3 pl-2">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 flex items-center justify-center text-indigo-400">
              <Percent className="w-5 h-5" />
            </div>
            <div className="text-left">
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-bold block">Coupon Code</span>
              <span className="text-lg font-black text-white tracking-widest">{COUPON_CODE}</span>
            </div>
          </div>

          <button
            onClick={handleCopyAndApply}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Code</span>
              </>
            )}
          </button>
        </div>

        {/* Action Button */}
        <button
          onClick={handleCopyAndApply}
          className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-black text-sm rounded-2xl shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <span>Claim Discount & Checkout</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsOpen(false)}
          className="text-xs text-slate-500 hover:text-slate-400 font-medium mt-4 underline underline-offset-4 transition-colors"
        >
          No thanks, I'll pay full price
        </button>
      </div>
    </div>
  );
};
