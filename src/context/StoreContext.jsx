import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { initialOrders } from '../data/initialOrders';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  PRODUCTS: 'shopnest_products_v1',
  ORDERS: 'shopnest_orders_v1',
  CART: 'shopnest_cart_v1',
  WISHLIST: 'shopnest_wishlist_v1',
  SETTINGS: 'shopnest_settings_v1'
};

const defaultSettings = {
  announcement: '⭐ Free Shipping on Orders Over $50 (USA Only)',
  freeShippingThreshold: 50,
  currency: 'USD',
  currencySymbol: '$',
  storeName: 'ShopNest',
  contactEmail: 'support@shopnest.com'
};

export const StoreProvider = ({ children }) => {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'categories' | 'deals' | 'track' | 'about' | 'contact'

  // Products state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist state (set of IDs)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // UI state
  const [viewMode, setViewMode] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'settings'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // LocalStorage sync
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Navigate helper with smooth scroll
  const navigatePage = (pageName, categoryFilter = null) => {
    setCurrentPage(pageName);
    setViewMode('store');
    if (categoryFilter !== null) {
      setActiveCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toast helper
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const addToCart = (product, quantity = 1, options = {}) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
          ...options
        };
        return updated;
      } else {
        return [...prevCart, { ...product, quantity, ...options }];
      }
    });

    showToast('Added to Cart', `${product.name} (x${quantity}) was added to your bag.`);
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (productId) => {
    const item = cart.find((i) => i.id === productId);
    setCart((prev) => prev.filter((i) => i.id !== productId));
    if (item) {
      showToast('Removed from Cart', `${item.name} removed from your bag.`, 'info');
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  // Wishlist operations
  const toggleWishlist = (productId) => {
    const isSaved = wishlist.includes(productId);
    const product = products.find((p) => p.id === productId);
    const name = product ? product.name : 'Item';

    if (isSaved) {
      setWishlist((prev) => prev.filter((id) => id !== productId));
      showToast('Removed from Wishlist', `${name} was removed from your favorites.`, 'info');
    } else {
      setWishlist((prev) => [...prev, productId]);
      showToast('Saved to Wishlist', `${name} was saved to your favorites!`, 'success');
    }
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  // Cart calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= settings.freeShippingThreshold;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 5.99;
  const estimatedTax = cartSubtotal * 0.08; // 8% sales tax
  const cartTotal = cartSubtotal + shippingFee + estimatedTax;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Admin operations
  const addProduct = (newProductData) => {
    const id = 'prod-' + Date.now();
    const newProduct = {
      id,
      rating: 5.0,
      reviewsCount: 0,
      stock: 20,
      images: [newProductData.image],
      specs: {},
      featured: false,
      sku: 'SN-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      ...newProductData,
      price: parseFloat(newProductData.price) || 0,
      originalPrice: newProductData.originalPrice ? parseFloat(newProductData.originalPrice) : null,
      isSale: Boolean(newProductData.originalPrice && parseFloat(newProductData.originalPrice) > parseFloat(newProductData.price))
    };

    setProducts((prev) => [newProduct, ...prev]);
    showToast('Product Created', `${newProduct.name} has been added to inventory.`);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const price = updatedData.price !== undefined ? parseFloat(updatedData.price) : p.price;
          const originalPrice = updatedData.originalPrice !== undefined
            ? (updatedData.originalPrice ? parseFloat(updatedData.originalPrice) : null)
            : p.originalPrice;
          const isSale = Boolean(originalPrice && originalPrice > price);
          return {
            ...p,
            ...updatedData,
            price,
            originalPrice,
            isSale
          };
        }
        return p;
      })
    );
    showToast('Product Updated', 'Product changes saved successfully.');
  };

  const deleteProduct = (productId) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((i) => i.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Product Deleted', `${prod ? prod.name : 'Product'} removed from store.`, 'info');
  };

  const createOrder = (orderData) => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const newOrder = {
      id: orderId,
      date: new Date().toISOString().split('T')[0],
      status: 'Processing',
      items: [...cart],
      total: cartTotal,
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    clearCart();
    setIsCheckoutOpen(false);
    showToast('Order Placed Successfully! 🎉', `Order #${orderId} has been placed. Check Admin orders.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast('Order Status Updated', `Order #${orderId} marked as ${newStatus}.`);
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings Saved', 'Store configuration updated.');
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setCart([]);
    setWishlist([]);
    setSettings(defaultSettings);
    localStorage.clear();
    showToast('Store Reset', 'Reset all products and orders to initial demo state.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigatePage,
        products,
        orders,
        cart,
        wishlist,
        settings,
        viewMode,
        setViewMode,
        adminTab,
        setAdminTab,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        quickViewProduct,
        setQuickViewProduct,
        toasts,
        showToast,
        removeToast,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartSubtotal,
        isFreeShipping,
        shippingFee,
        estimatedTax,
        cartTotal,
        cartItemsCount,
        addProduct,
        updateProduct,
        deleteProduct,
        createOrder,
        updateOrderStatus,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
