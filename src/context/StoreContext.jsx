import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { initialOrders } from '../data/initialOrders';
import { initialCoupons } from '../data/initialCoupons';
import { initialReviews } from '../data/initialReviews';
import { initialStaff } from '../data/initialStaff';
import { initialAbandonedCarts } from '../data/initialAbandonedCarts';
import { 
  adminCustomersData, 
  adminInboxMessages, 
  adminNotificationsList, 
  walletOverview 
} from '../data/adminMockData';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  PRODUCTS: 'zigzet_products_v2',
  ORDERS: 'zigzet_orders_v2',
  CART: 'zigzet_cart_v2',
  WISHLIST: 'zigzet_wishlist_v2',
  SETTINGS: 'zigzet_settings_v2',
  CUSTOMERS: 'zigzet_customers_v2',
  INBOX: 'zigzet_inbox_v2',
  NOTIFICATIONS: 'zigzet_notifications_v2',
  TRANSACTIONS: 'zigzet_transactions_v2',
  ADMIN_AUTH: 'zigzet_admin_auth_v2',
  COUPONS: 'zigzet_coupons_v2',
  REVIEWS: 'zigzet_reviews_v2',
  STAFF: 'zigzet_staff_v2',
  ABANDONED: 'zigzet_abandoned_v2',
  CMS: 'zigzet_cms_v2',
  CAMPAIGNS: 'zigzet_campaigns_v2',
  LOYALTY: 'zigzet_loyalty_v2',
  RESTOCK: 'zigzet_restock_alerts_v2',
  USER_AUTH: 'zigzet_user_auth_v2',
  USER_ACCOUNTS: 'zigzet_user_accounts_v2'
};

const defaultSettings = {
  announcement: 'Free Shipping on Orders Over $50 (USA & Worldwide)',
  freeShippingThreshold: 50,
  currency: 'USD',
  currencySymbol: '$',
  storeName: 'Zigzet',
  contactEmail: 'support@zigzet.com',
  adminUsername: 'admin',
  adminPassword: 'admin123'
};

const defaultCms = {
  heroBadge: 'LATEST ARRIVALS 2026',
  heroTitle: 'Shop Smarter. Live Better.',
  heroSubtitle: 'Discover curated electronics, trending modern apparel, and functional home essentials with guaranteed fast USA delivery and 30-day returns.',
  heroImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
  ctaText: 'Explore Catalog',
  ctaLink: 'shop',
  bannerHeadline: 'Fast & Reliable USA Shipping',
  bannerSubtext: 'Get your favorite products delivered quickly across the United States.'
};

const defaultCampaign = {
  id: 'camp-1',
  name: 'Labor Day Mega Flash Sale',
  headline: 'Limited-Time Weekend Clearance: Up to 35% Off Everything',
  discountPercent: 20,
  isActive: true,
  endsAt: '2026-09-10T23:59:59',
  applicableCategories: 'all'
};

const defaultLoyalty = {
  pointsPerDollar: 10,
  redemptionRate: 100, // 100 points = $1.00
  customerPoints: {
    'cust-1': 1420,
    'cust-2': 3200,
    'cust-3': 850
  },
  tiers: [
    { name: 'Bronze Explorer', minSpend: 0, perks: 'Standard 1x Points' },
    { name: 'Silver Member', minSpend: 500, perks: '1.25x Points + Free Express Delivery' },
    { name: 'Gold VIP', minSpend: 1500, perks: '1.5x Points + Priority 24/7 Support' },
    { name: 'Platinum Elite', minSpend: 3000, perks: '2x Points + Birthday Gift + Early Access' }
  ]
};

export const StoreProvider = ({ children }) => {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('home');

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // User Authentication State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEYS.USER_AUTH);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Registered user accounts (persisted in localStorage)
  const [userAccounts, setUserAccounts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_ACCOUNTS);
      // Seed demo account
      const defaults = [{
        id: 'user-demo',
        name: 'Sarah Jenkins',
        email: 'sarah.j@example.com',
        password: 'demo123',
        phone: '+1 (555) 123-4567',
        address: '742 Evergreen Terrace',
        city: 'Springfield',
        zip: '97477',
        joinedAt: 'Aug 2026'
      }];
      return saved ? JSON.parse(saved) : defaults;
    } catch {
      return [];
    }
  });

  // Persist user accounts
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_ACCOUNTS, JSON.stringify(userAccounts)); }, [userAccounts]);

  // 1. Products state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS) || localStorage.getItem('shopnest_products_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((p) => ({
          ...p,
          isActive: p.isActive !== undefined ? p.isActive : true,
          salesCount: p.salesCount || Math.floor(Math.random() * 150 + 20),
          stock: p.stock !== undefined ? p.stock : 25
        }));
      }
      return initialProducts.map((p) => ({
        ...p,
        isActive: true,
        salesCount: Math.floor(Math.random() * 150 + 20),
        stock: p.stock !== undefined ? p.stock : 25
      }));
    } catch {
      return initialProducts;
    }
  });

  // 2. Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS) || localStorage.getItem('shopnest_orders_v1');
      return saved ? JSON.parse(saved) : initialOrders;
    } catch {
      return initialOrders;
    }
  });

  // 3. Customers CRM state
  const [customers, setCustomers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
      return saved ? JSON.parse(saved) : adminCustomersData;
    } catch {
      return adminCustomersData;
    }
  });

  // 4. Inbox Messages
  const [inboxMessages, setInboxMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INBOX);
      return saved ? JSON.parse(saved) : adminInboxMessages;
    } catch {
      return adminInboxMessages;
    }
  });

  // 5. Notifications
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : adminNotificationsList;
    } catch {
      return adminNotificationsList;
    }
  });

  // 6. Wallet Transactions
  const [walletTransactions, setWalletTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : walletOverview.recentTransactions;
    } catch {
      return walletOverview.recentTransactions;
    }
  });

  // 7. Coupons state
  const [coupons, setCoupons] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPONS);
      return saved ? JSON.parse(saved) : initialCoupons;
    } catch {
      return initialCoupons;
    }
  });

  // 8. Reviews state
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // 9. Staff Members state
  const [staffMembers, setStaffMembers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STAFF);
      return saved ? JSON.parse(saved) : initialStaff;
    } catch {
      return initialStaff;
    }
  });

  // 10. Abandoned Carts state
  const [abandonedCarts, setAbandonedCarts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ABANDONED);
      return saved ? JSON.parse(saved) : initialAbandonedCarts;
    } catch {
      return initialAbandonedCarts;
    }
  });

  // 11. CMS Visual Content
  const [cmsContent, setCmsContent] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CMS);
      return saved ? JSON.parse(saved) : defaultCms;
    } catch {
      return defaultCms;
    }
  });

  // 12. Flash Sale Campaign
  const [campaign, setCampaign] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CAMPAIGNS);
      return saved ? JSON.parse(saved) : defaultCampaign;
    } catch {
      return defaultCampaign;
    }
  });

  // 13. Loyalty Program
  const [loyaltyProgram, setLoyaltyProgram] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LOYALTY);
      return saved ? JSON.parse(saved) : defaultLoyalty;
    } catch {
      return defaultLoyalty;
    }
  });

  // 14. Active Applied Coupon in Checkout
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // 15. Restock Alerts Queue
  const [restockAlerts, setRestockAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESTOCK);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart & Wishlist
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART) || localStorage.getItem('shopnest_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST) || localStorage.getItem('shopnest_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem('shopnest_settings_v1');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // UI Navigation states
  const [viewMode, setViewMode] = useState(() => (window.location.hash === '#admin' ? 'admin' : 'store'));
  const [adminTab, setAdminTab] = useState('dashboard');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // New Frontend Feature Modals
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [isNotifyOpen, setIsNotifyOpen] = useState(false);
  const [notifyProduct, setNotifyProduct] = useState(null);

  // Persistence Effects
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products)); }, [products]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers)); }, [customers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INBOX, JSON.stringify(inboxMessages)); }, [inboxMessages]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications)); }, [notifications]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(walletTransactions)); }, [walletTransactions]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons)); }, [coupons]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(staffMembers)); }, [staffMembers]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.ABANDONED, JSON.stringify(abandonedCarts)); }, [abandonedCarts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CMS, JSON.stringify(cmsContent)); }, [cmsContent]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CAMPAIGNS, JSON.stringify(campaign)); }, [campaign]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.LOYALTY, JSON.stringify(loyaltyProgram)); }, [loyaltyProgram]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.RESTOCK, JSON.stringify(restockAlerts)); }, [restockAlerts]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist)); }, [wishlist]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings)); }, [settings]);

  useEffect(() => {
    const handleRouteChange = () => {
      const isHashAdmin = window.location.hash === '#admin';
      const isPathAdmin = window.location.pathname.startsWith('/admin');
      const isQueryAdmin = new URLSearchParams(window.location.search).get('view') === 'admin' || new URLSearchParams(window.location.search).get('page') === 'admin';

      if (isHashAdmin || isPathAdmin || isQueryAdmin) {
        setViewMode('admin');
      } else {
        setViewMode('store');
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  // Toast System
  const showToast = (title, message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation
  const navigatePage = (pageName, category = null) => {
    setCurrentPage(pageName);
    if (category) {
      setActiveCategory(category);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Authentication
  const loginAdmin = (username, password) => {
    if (
      username.trim() === settings.adminUsername &&
      password.trim() === settings.adminPassword
    ) {
      setIsAdminAuthenticated(true);
      sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      showToast('Admin Logged In', 'Welcome back, Alexandre Mercer (Store Administrator)');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    showToast('Logged Out', 'Signed out from admin session.');
  };

  // User Auth Functions
  const loginUser = (email, password) => {
    const account = userAccounts.find(
      a => a.email.toLowerCase() === email.toLowerCase() && a.password === password
    );
    if (account) {
      const { password: _pw, ...safeUser } = account;
      setCurrentUser(safeUser);
      sessionStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(safeUser));
      showToast('Welcome Back!', `Hello, ${safeUser.name}! You are now signed in.`);
      return true;
    }
    return false;
  };

  const registerUser = ({ name, email, password }) => {
    const exists = userAccounts.some(a => a.email.toLowerCase() === email.toLowerCase());
    if (exists) return false;
    const newAccount = {
      id: 'user-' + Date.now(),
      name,
      email,
      password,
      phone: '',
      address: '',
      city: '',
      zip: '',
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setUserAccounts(prev => [...prev, newAccount]);

    // Immediately sync with CRM customers list for the Admin Panel
    setCustomers(prev => {
      const existingIdx = prev.findIndex(c => c.email.toLowerCase() === email.toLowerCase());
      if (existingIdx === -1) {
        const newCust = {
          id: 'cust-' + Date.now(),
          name,
          email,
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
          orders: 0,
          spent: '$0.00',
          location: 'Registered Member',
          status: 'Registered Member',
          lastActive: 'Just now',
          isRegistered: true,
          registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        };
        return [newCust, ...prev];
      }
      return prev;
    });

    // Notify Admin Panel
    setNotifications(prev => [
      {
        id: 'notif-user-' + Date.now(),
        title: 'New Member Registered',
        description: `${name} (${email}) created an account on Zigzet.`,
        time: 'Just now',
        type: 'user',
        unread: true
      },
      ...prev
    ]);

    const { password: _pw, ...safeUser } = newAccount;
    setCurrentUser(safeUser);
    sessionStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(safeUser));
    showToast('Account Created!', `Welcome to Zigzet, ${name}! 🎉`);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(STORAGE_KEYS.USER_AUTH);
    showToast('Signed Out', 'You have been signed out successfully.', 'info');
  };

  const updateUserProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    sessionStorage.setItem(STORAGE_KEYS.USER_AUTH, JSON.stringify(updated));
    // Also update the accounts array
    setUserAccounts(prev => prev.map(a => a.id === updated.id ? { ...a, ...updates } : a));

    // Also update CRM customer record
    setCustomers(prev => prev.map(c => {
      if (c.email.toLowerCase() === updated.email.toLowerCase() || (currentUser && c.email.toLowerCase() === currentUser.email.toLowerCase())) {
        return {
          ...c,
          name: updated.name || c.name,
          email: updated.email || c.email,
          phone: updated.phone || c.phone,
          location: updated.city ? `${updated.city}, US` : (updated.address || c.location),
          address: updated.address || c.address
        };
      }
      return c;
    }));

    showToast('Profile Updated', 'Your profile information has been saved.');
  };

  // Cart Operations
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
    showToast('Added to Bag', `${product.name} (x${quantity}) added to your shopping bag.`);
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
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item Removed', 'Product removed from shopping bag.', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist Operations
  const toggleWishlist = (productOrId) => {
    if (!productOrId) return;
    const targetId = typeof productOrId === 'object' ? productOrId.id : productOrId;
    const targetProduct = typeof productOrId === 'object' && productOrId.name 
      ? productOrId 
      : products.find((p) => p.id === targetId) || { id: targetId, name: 'Item', price: 0 };

    const exists = wishlist.some((item) => (typeof item === 'object' ? item.id : item) === targetId);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => (typeof item === 'object' ? item.id : item) !== targetId));
      showToast('Removed from Wishlist', `${targetProduct.name} removed from your saved items.`, 'info');
    } else {
      setWishlist((prev) => [...prev, targetProduct]);
      showToast('Saved to Wishlist', `${targetProduct.name} added to your wishlist.`);
    }
  };

  const isInWishlist = (productId) => {
    if (!productId) return false;
    const targetId = typeof productId === 'object' ? productId.id : productId;
    return wishlist.some((item) => (typeof item === 'object' ? item.id : item) === targetId);
  };

  // Cart Computations
  const cartSubtotal = cart.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= (settings.freeShippingThreshold || 50);
  const shippingFee = cartSubtotal > 0 && !isFreeShipping ? 9.99 : 0;
  const estimatedTax = cartSubtotal * 0.08;

  // Coupon discount calculation
  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.type === 'percentage') {
      couponDiscountAmount = (cartSubtotal * appliedCoupon.value) / 100;
      if (appliedCoupon.maxDiscount) {
        couponDiscountAmount = Math.min(couponDiscountAmount, appliedCoupon.maxDiscount);
      }
    } else {
      couponDiscountAmount = Math.min(cartSubtotal, appliedCoupon.value);
    }
  }

  const cartTotal = Math.max(0, cartSubtotal - couponDiscountAmount + shippingFee + estimatedTax);
  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // 1. Products Management
  const addProduct = (newProductData) => {
    const newProduct = {
      ...newProductData,
      id: 'prod-' + Date.now(),
      sku: newProductData.sku || `ZG-${Math.floor(1000 + Math.random() * 9000)}`,
      rating: 5.0,
      reviewsCount: 0,
      salesCount: 0,
      isActive: true,
      price: parseFloat(newProductData.price) || 0,
      originalPrice: newProductData.originalPrice ? parseFloat(newProductData.originalPrice) : null,
      isSale: Boolean(newProductData.originalPrice && parseFloat(newProductData.originalPrice) > parseFloat(newProductData.price))
    };

    setProducts((prev) => [newProduct, ...prev]);
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Product Added',
        description: `"${newProduct.name}" added to catalog ($${newProduct.price.toFixed(2)}).`,
        time: 'Just now',
        type: 'alert',
        unread: true
      },
      ...prev
    ]);
    showToast('Product Created', `${newProduct.name} is now live in store.`);
    return newProduct;
  };

  const updateProduct = (productId, updatedData) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updatedData } : p))
    );
    showToast('Product Updated', 'Product details saved successfully.');
  };

  const deleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Product Deleted', 'Product removed from catalog.', 'info');
  };

  const toggleProductActive = (productId) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextActive = p.isActive !== false ? false : true;
          showToast(
            nextActive ? 'Product Activated' : 'Product Deactivated',
            `"${p.name}" is now ${nextActive ? 'visible on storefront' : 'hidden from customers'}.`,
            'info'
          );
          return { ...p, isActive: nextActive };
        }
        return p;
      })
    );
  };

  // 2. Orders & Checkout
  const createOrder = (orderData) => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const orderTotal = orderData.total || cartTotal;
    const orderedItems = orderData.items || [...cart];

    const newOrder = {
      id: orderId,
      customerName: orderData.customerName || 'Demo Customer',
      email: orderData.email || 'customer@example.com',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: orderTotal,
      subtotal: cartSubtotal,
      discount: couponDiscountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      status: 'Processing',
      paymentMethod: orderData.paymentMethod || 'Credit Card (Visa)',
      shippingAddress: orderData.shippingAddress || '742 Evergreen Terrace, Springfield, OR',
      items: orderedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      trackingNumber: `ZG-FEDEX-${Math.floor(100000 + Math.random() * 900000)}`
    };

    // Deduct stock
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const matchingCartItem = orderedItems.find((item) => item.id === p.id);
        if (matchingCartItem) {
          const newStock = Math.max(0, (p.stock || 20) - matchingCartItem.quantity);
          const newSales = (p.salesCount || 0) + matchingCartItem.quantity;
          if (newStock <= 5) {
            setNotifications((prevN) => [
              {
                id: 'notif-low-' + Date.now() + Math.random(),
                title: 'Low Stock Alert',
                description: `"${p.name}" has only ${newStock} units left in stock!`,
                time: 'Just now',
                type: 'alert',
                unread: true
              },
              ...prevN
            ]);
          }
          return { ...p, stock: newStock, salesCount: newSales };
        }
        return p;
      })
    );

    setOrders((prev) => [newOrder, ...prev]);

    // Update CRM Customers
    setCustomers((prevCusts) => {
      const emailMatch = prevCusts.findIndex(
        (c) => c.email.toLowerCase() === (orderData.email || '').toLowerCase()
      );
      if (emailMatch > -1) {
        const updated = [...prevCusts];
        const currentSpentNum = parseFloat((updated[emailMatch].spent || '$0').replace(/[^0-9.-]+/g, '')) || 0;
        const newTotalSpent = currentSpentNum + orderTotal;
        updated[emailMatch] = {
          ...updated[emailMatch],
          orders: (updated[emailMatch].orders || 0) + 1,
          spent: `$${newTotalSpent.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          lastActive: 'Just now',
          status: newTotalSpent > 2500 ? 'VIP Customer' : 'Active Customer'
        };
        return updated;
      } else {
        const newCust = {
          id: 'cust-' + Date.now(),
          name: orderData.customerName || 'New Customer',
          email: orderData.email || 'customer@example.com',
          avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
          orders: 1,
          spent: `$${orderTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          location: orderData.shippingAddress ? orderData.shippingAddress.split(',')[1]?.trim() || 'United States' : 'United States',
          status: 'Active Customer',
          lastActive: 'Just now'
        };
        return [newCust, ...prevCusts];
      }
    });

    // Ledger
    setWalletTransactions((prevTxns) => [
      {
        id: 'TXN-' + Math.floor(1000 + Math.random() * 9000),
        type: `Order #${orderId} (${orderData.customerName})`,
        amount: `+$${orderTotal.toFixed(2)}`,
        date: 'Today, Just now',
        status: 'Completed'
      },
      ...prevTxns
    ]);

    setNotifications((prevNotifs) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New High-Value Order',
        description: `Order #${orderId} for $${orderTotal.toFixed(2)} by ${orderData.customerName}.`,
        time: 'Just now',
        type: 'order',
        unread: true
      },
      ...prevNotifs
    ]);

    clearCart();
    setIsCheckoutOpen(false);
    showToast('Order Placed Successfully!', `Order #${orderId} has been confirmed.`);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    showToast('Status Updated', `Order #${orderId} status changed to ${newStatus}.`);
  };

  // 3. Coupons Module Methods
  const addCoupon = (couponData) => {
    const newCoupon = {
      ...couponData,
      id: 'coup-' + Date.now(),
      code: couponData.code.trim().toUpperCase(),
      usageCount: 0,
      isActive: true
    };
    setCoupons((prev) => [newCoupon, ...prev]);
    showToast('Coupon Created', `Promo code "${newCoupon.code}" is now active.`);
    return newCoupon;
  };

  const deleteCoupon = (couponId) => {
    setCoupons((prev) => prev.filter((c) => c.id !== couponId));
    showToast('Coupon Removed', 'Discount coupon deleted.', 'info');
  };

  const toggleCouponActive = (couponId) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const applyCouponCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code === cleanCode);

    if (!found) {
      showToast('Invalid Code', 'The promo code entered does not exist.', 'error');
      return false;
    }
    if (!found.isActive) {
      showToast('Code Inactive', 'This promo code is currently disabled.', 'error');
      return false;
    }
    if (cartSubtotal < (found.minSpend || 0)) {
      showToast('Minimum Not Met', `This coupon requires a minimum subtotal of $${found.minSpend}.`, 'error');
      return false;
    }

    setAppliedCoupon(found);
    showToast('Coupon Applied!', `You saved with promo code "${cleanCode}".`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon Removed', 'Promo discount cleared.', 'info');
  };

  // 4. Abandoned Carts Methods
  const sendCartRecoveryEmail = (cartId) => {
    setAbandonedCarts((prev) =>
      prev.map((c) => (c.id === cartId ? { ...c, recoveryStatus: 'Email Sent' } : c))
    );
    showToast('Recovery Email Sent!', 'Automated 10% discount recovery email delivered to customer.');
  };

  // 5. Reviews Moderation Methods
  const moderateReview = (reviewId, status, adminReply = null) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          return {
            ...r,
            status,
            adminReply: adminReply !== null ? adminReply : r.adminReply
          };
        }
        return r;
      })
    );
    showToast('Review Moderated', `Review status marked as ${status}.`);
  };

  const addCustomerReview = (reviewData) => {
    const newRev = {
      ...reviewData,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Pending',
      verifiedPurchase: true,
      adminReply: null
    };
    setReviews((prev) => [newRev, ...prev]);
    showToast('Review Submitted', 'Thank you! Your review is pending moderator approval.');
  };

  // 6. Staff Management Methods
  const addStaffMember = (staffData) => {
    const newStaff = {
      ...staffData,
      id: 'staff-' + Date.now(),
      status: 'Active',
      lastActive: 'Just created'
    };
    setStaffMembers((prev) => [...prev, newStaff]);
    showToast('Staff Member Added', `${newStaff.name} has been added with ${newStaff.role} access.`);
  };

  const deleteStaffMember = (staffId) => {
    setStaffMembers((prev) => prev.filter((s) => s.id !== staffId));
    showToast('Staff Removed', 'Team member access revoked.', 'info');
  };

  // 7. CMS Customizer Methods
  const updateCmsContent = (newCms) => {
    setCmsContent((prev) => ({ ...prev, ...newCms }));
    showToast('CMS Updated', 'Storefront homepage banners and headlines saved successfully.');
  };

  // 8. Flash Sale Campaign Methods
  const updateCampaign = (newCampaign) => {
    setCampaign((prev) => ({ ...prev, ...newCampaign }));
    showToast('Campaign Updated', 'Flash sale timer and promotional settings updated.');
  };

  // 9. Loyalty Program Methods
  const updateLoyaltyProgram = (newLoyalty) => {
    setLoyaltyProgram((prev) => ({ ...prev, ...newLoyalty }));
    showToast('Loyalty Settings Saved', 'VIP tiers and point rates updated.');
  };

  // Contact Inquiry
  const submitContactMessage = ({ name, email, subject, message }) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: name,
      email: email,
      preview: message.length > 60 ? message.substring(0, 60) + '...' : message,
      time: 'Just now',
      unread: true,
      subject: subject || 'General Inquiry',
      messages: [
        { sender: name, text: message, time: 'Just now', isCustomer: true }
      ]
    };
    setInboxMessages((prev) => [newMsg, ...prev]);
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Support Inquiry',
        description: `${name}: "${subject}"`,
        time: 'Just now',
        type: 'alert',
        unread: true
      },
      ...prev
    ]);
    showToast('Message Sent!', 'Our support team has received your message and will respond promptly.');
    return newMsg;
  };

  const sendInboxReply = (msgId, replyText) => {
    setInboxMessages((prev) =>
      prev.map((m) => {
        if (m.id === msgId) {
          const currentReplies = m.messages || [
            { sender: m.sender, text: m.preview, time: m.time, isCustomer: true }
          ];
          return {
            ...m,
            unread: false,
            messages: [
              ...currentReplies,
              { sender: 'Zigzet Support (Admin)', text: replyText, time: 'Just now', isCustomer: false }
            ]
          };
        }
        return m;
      })
    );
    showToast('Reply Delivered', 'Message sent to customer email & live chat.');
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  const requestPayout = (amount = 5000) => {
    const payoutId = 'TXN-' + Math.floor(1000 + Math.random() * 9000);
    setWalletTransactions((prev) => [
      {
        id: payoutId,
        type: 'Stripe Instant Payout (Bank Account •••• 4921)',
        amount: `-$${amount.toFixed(2)}`,
        date: 'Today, Just now',
        status: 'Completed'
      },
      ...prev
    ]);
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'Payout Processed Successfully',
        description: `Instant payout of $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} transferred to primary bank.`,
        time: 'Just now',
        type: 'wallet',
        unread: true
      },
      ...prev
    ]);
    showToast('Payout Requested!', `$${amount.toFixed(2)} instant payout has been initiated.`);
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings Saved', 'Store configuration updated.');
  };

  const openNotifyModal = (product) => {
    setNotifyProduct(product);
    setIsNotifyOpen(true);
  };

  const closeNotifyModal = () => {
    setIsNotifyOpen(false);
    setNotifyProduct(null);
  };

  const requestRestockAlert = (product, email) => {
    const newAlert = {
      id: 'alert-' + Date.now(),
      productId: product.id,
      productName: product.name,
      email: email,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Subscribed'
    };

    setRestockAlerts((prev) => [newAlert, ...prev]);
    showToast('Subscribed to Restock!', `We will email ${email} the second this item is back in stock.`);
    closeNotifyModal();
  };

  const resetToDefaults = () => {
    setProducts(initialProducts.map((p) => ({ ...p, isActive: true, salesCount: 40, stock: 25 })));
    setOrders(initialOrders);
    setCustomers(adminCustomersData);
    setInboxMessages(adminInboxMessages);
    setNotifications(adminNotificationsList);
    setWalletTransactions(walletOverview.recentTransactions);
    setCoupons(initialCoupons);
    setReviews(initialReviews);
    setStaffMembers(initialStaff);
    setAbandonedCarts(initialAbandonedCarts);
    setCmsContent(defaultCms);
    setCampaign(defaultCampaign);
    setLoyaltyProgram(defaultLoyalty);
    setRestockAlerts([]);
    setCart([]);
    setWishlist([]);
    setSettings(defaultSettings);
    localStorage.clear();
    showToast('Store Reset', 'Reset all store data to initial demo state.', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigatePage,
        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin,
        products,
        orders,
        customers,
        inboxMessages,
        notifications,
        walletTransactions,
        coupons,
        reviews,
        staffMembers,
        abandonedCarts,
        cmsContent,
        campaign,
        loyaltyProgram,
        appliedCoupon,
        restockAlerts,
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
        isAiChatOpen,
        setIsAiChatOpen,
        isNotifyOpen,
        notifyProduct,
        openNotifyModal,
        closeNotifyModal,
        requestRestockAlert,
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
        couponDiscountAmount,
        cartTotal,
        cartItemsCount,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductActive,
        createOrder,
        updateOrderStatus,
        addCoupon,
        deleteCoupon,
        toggleCouponActive,
        applyCouponCode,
        removeCoupon,
        sendCartRecoveryEmail,
        moderateReview,
        addCustomerReview,
        addStaffMember,
        deleteStaffMember,
        updateCmsContent,
        updateCampaign,
        updateLoyaltyProgram,
        userAccounts,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        updateUserProfile,
        submitContactMessage,
        sendInboxReply,
        markAllNotificationsRead,
        requestPayout,
        updateSettings,
        resetToDefaults
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
