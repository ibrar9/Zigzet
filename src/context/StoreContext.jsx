import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { initialOrders } from '../data/initialOrders';
import { initialCoupons } from '../data/initialCoupons';
import { initialReviews } from '../data/initialReviews';
import { initialStaff } from '../data/initialStaff';
import { initialAbandonedCarts } from '../data/initialAbandonedCarts';
import { initialIntegrations } from '../data/initialIntegrations';
import { 
  adminCustomersData, 
  adminInboxMessages, 
  adminNotificationsList, 
  walletOverview 
} from '../data/adminMockData';
import {
  initialUserAddresses,
  initialUserReturns,
  initialUserNotifications,
  initialUserTickets,
  initialSavedCards,
  initialUserWallet
} from '../data/initialUserData';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

const STORAGE_KEYS = {
  PRODUCTS: 'zigzet_products_v4',
  ORDERS: 'zigzet_orders_v2',
  CART: 'zigzet_cart_v2',
  WISHLIST: 'zigzet_wishlist_v2',
  SETTINGS: 'zigzet_settings_v3',
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
  USER_ACCOUNTS: 'zigzet_user_accounts_v2',
  USER_ADDRESSES: 'zigzet_user_addresses_v1',
  USER_RETURNS: 'zigzet_user_returns_v1',
  USER_NOTIFICATIONS: 'zigzet_user_notifications_v1',
  USER_TICKETS: 'zigzet_user_tickets_v1',
  USER_SAVED_CARDS: 'zigzet_user_saved_cards_v1',
  USER_WALLET: 'zigzet_user_wallet_v1',
  SEO: 'zigzet_seo_v2',
  INTEGRATIONS: 'zigzet_integrations_v2',
  THEME: 'zigzet_theme_v1'
};

const defaultSeo = {
  siteTitle: 'Zigzet - Shop Smarter. Live Better.',
  titleFormat: '%page% | Zigzet',
  defaultDescription: 'Discover top-quality electronics, trending fashion, and home living essentials with fast USA shipping on Zigzet. 100% encrypted & secure shopping.',
  defaultKeywords: 'online shopping, electronics, fashion, home essentials, deals, discount store, fast shipping, zigzet',
  canonicalUrl: 'https://zigzet.com',
  ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80',
  googleSiteVerification: 'pWrOVdd1M2K-eGgalaSy6SBjoSIaXZVTeSc4W3fQc1I',
  ga4Id: 'G-ZIGZET2026',
  metaPixelId: '',
  allowIndexing: true,
  pageOverrides: {
    home: {
      title: 'Zigzet - Shop Smarter. Live Better.',
      description: 'Discover curated electronics, trending modern apparel, and functional home essentials with free USA shipping.',
      keywords: 'ecommerce, gadgets, trending clothes, home decor, shop online'
    },
    shop: {
      title: 'All Products & Catalog | Zigzet Store',
      description: 'Browse our complete catalog of electronics, smart wearables, lifestyle apparel, and home living products.',
      keywords: 'all products, catalog, online shop, gadgets, fashion'
    },
    categories: {
      title: 'Browse Departments & Categories | Zigzet',
      description: 'Explore popular departments including Electronics, Fashion, Beauty, Home & Living, Sports, and Automotive.',
      keywords: 'departments, shopping categories, tech, apparel'
    },
    deals: {
      title: 'Flash Deals & Promo Vouchers (Up to 40% Off) | Zigzet',
      description: 'Grab limited-time flash discounts, clearance savings, and verified checkout promo codes today.',
      keywords: 'flash sale, deals, discount coupons, clearance'
    },
    track: {
      title: 'Live Order Tracking & Courier Status | Zigzet',
      description: 'Track your package in real-time with your order ID or courier waybill tracking number.',
      keywords: 'track order, shipment status, delivery tracking'
    },
    about: {
      title: 'About Zigzet | Our Mission, Vision & Quality Promise',
      description: 'Learn how Zigzet delivers exceptional e-commerce experiences with authentic curated products.',
      keywords: 'about us, brand story, quality guarantee'
    },
    contact: {
      title: '24/7 Customer Support & Help Center | Zigzet',
      description: 'Contact Zigzet customer care specialists for inquiries, order updates, returns, and live chat assistance.',
      keywords: 'support, contact us, help desk, customer service'
    }
  }
};

const defaultSettings = {
  announcement: 'Free Express Delivery Across UAE on Orders Over 150 AED',
  freeShippingThreshold: 150,
  currency: 'AED',
  currencySymbol: 'AED ',
  storeName: 'Zigzet',
  contactEmail: 'support@zigzet.com',
  adminUsername: 'admin',
  adminPassword: 'admin123'
};

const defaultCms = {
  heroBadge: 'LATEST ARRIVALS 2026',
  heroTitle: 'Shop Smarter. Live Better.',
  heroSubtitle: 'Discover curated Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas with fast UAE delivery.',
  ctaText: 'Explore Catalog',
  ctaLink: 'shop',
  autoPlay: true,
  autoPlayInterval: 5000,
  heroSlides: [
    {
      id: 'slide-1',
      badge: 'LATEST ARRIVALS 2026',
      title: 'Shop Smarter. Live Better.',
      subtitle: 'Discover premium Korean skincare, advanced SPF50 sunscreens, and Triple PDRN barrier repair formulas with guaranteed fast delivery.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&auto=format&fit=crop&q=80',
      ctaText: 'Explore Catalog',
      ctaLink: 'shop',
      bgTheme: 'slate'
    },
    {
      id: 'slide-2',
      badge: 'EXCLUSIVE VALUE DEALS',
      title: 'Save Up to 45% on Luxury Sets',
      subtitle: 'Award-winning cleansing balms, cooling peptide ampoules, and complete daily glass skin routines at limited-time promotional prices.',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80',
      ctaText: 'Explore Deals',
      ctaLink: 'deals',
      bgTheme: 'rose'
    },
    {
      id: 'slide-3',
      badge: '100% AUTHENTIC FORMULAS',
      title: 'Dermatologist Tested. Proven Results.',
      subtitle: 'High-potency Niacinamide, Micro Hyaluronic Acid, Cica, and NAD+ lifting creams for radiant, healthy skin.',
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=1200&auto=format&fit=crop&q=80',
      ctaText: 'Shop Best Sellers',
      ctaLink: 'shop',
      bgTheme: 'amber'
    }
  ],
  bannerHeadline: 'Fast & Reliable UAE Express Delivery',
  bannerSubtext: 'Get your authentic skincare orders delivered quickly with real-time tracking.'
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
      const auth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      if (auth === 'false') return false;
      return true;
    } catch {
      return true;
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
        joinedAt: 'Aug 2026',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      }];
      return saved ? JSON.parse(saved) : defaults;
    } catch {
      return [];
    }
  });

  // User Addresses
  const [userAddresses, setUserAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_ADDRESSES);
      return saved ? JSON.parse(saved) : initialUserAddresses;
    } catch {
      return initialUserAddresses;
    }
  });

  // User Returns
  const [userReturns, setUserReturns] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_RETURNS);
      return saved ? JSON.parse(saved) : initialUserReturns;
    } catch {
      return initialUserReturns;
    }
  });

  // User Notifications
  const [userNotifications, setUserNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_NOTIFICATIONS);
      return saved ? JSON.parse(saved) : initialUserNotifications;
    } catch {
      return initialUserNotifications;
    }
  });

  // User Support Tickets
  const [userTickets, setUserTickets] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_TICKETS);
      return saved ? JSON.parse(saved) : initialUserTickets;
    } catch {
      return initialUserTickets;
    }
  });

  // User Saved Cards & Wallet
  const [savedCards, setSavedCards] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_SAVED_CARDS);
      return saved ? JSON.parse(saved) : initialSavedCards;
    } catch {
      return initialSavedCards;
    }
  });

  const [userWallet, setUserWallet] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_WALLET);
      return saved ? JSON.parse(saved) : initialUserWallet;
    } catch {
      return initialUserWallet;
    }
  });

  // Persist user accounts
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_ACCOUNTS, JSON.stringify(userAccounts)); }, [userAccounts]);

  // 1. Products state
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS) || localStorage.getItem('zigzet_products_v3');
      if (saved) {
        const parsed = JSON.parse(saved);
        const initialMap = new Map(initialProducts.map(p => [p.id, p]));
        return parsed.map((p) => {
          const base = initialMap.get(p.id);
          return {
            ...(base || {}),
            ...p,
            description: (base && base.description) ? base.description : (p.description || ''),
            metaDescription: (base && base.metaDescription) ? base.metaDescription : (p.metaDescription || ''),
            metaTitle: (base && base.metaTitle) ? base.metaTitle : (p.metaTitle || ''),
            isActive: p.isActive !== undefined ? p.isActive : true,
            salesCount: p.salesCount || Math.floor(Math.random() * 150 + 20),
            stock: p.stock !== undefined ? p.stock : (base?.stock ?? 25)
          };
        });
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
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...defaultCms,
          ...parsed,
          heroSlides: (parsed.heroSlides && parsed.heroSlides.length > 0) ? parsed.heroSlides : defaultCms.heroSlides
        };
      }
      return defaultCms;
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

  // SEO Configuration
  const [seoSettings, setSeoSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SEO);
      return saved ? { ...defaultSeo, ...JSON.parse(saved) } : defaultSeo;
    } catch {
      return defaultSeo;
    }
  });

  // Integrations state (Payment gateways, Couriers, Pixels, Webhooks, WhatsApp)
  const [integrations, setIntegrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATIONS);
      return saved ? { ...initialIntegrations, ...JSON.parse(saved) } : initialIntegrations;
    } catch {
      return initialIntegrations;
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
  const [activeBrand, setActiveBrand] = useState('all');
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

  // Theme State ('light' | 'dark')
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.THEME, theme);
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {
      console.error(e);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const changeCurrency = (currCode) => {
    setSettings((prev) => ({
      ...prev,
      currency: currCode,
      currencySymbol: currCode === 'USD' ? '$' : currCode === 'EUR' ? '€' : currCode === 'GBP' ? '£' : `${currCode} `
    }));
  };

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
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seoSettings)); }, [seoSettings]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.INTEGRATIONS, JSON.stringify(integrations)); }, [integrations]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_ADDRESSES, JSON.stringify(userAddresses)); }, [userAddresses]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_RETURNS, JSON.stringify(userReturns)); }, [userReturns]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_NOTIFICATIONS, JSON.stringify(userNotifications)); }, [userNotifications]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_TICKETS, JSON.stringify(userTickets)); }, [userTickets]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_SAVED_CARDS, JSON.stringify(savedCards)); }, [savedCards]);
  useEffect(() => { localStorage.setItem(STORAGE_KEYS.USER_WALLET, JSON.stringify(userWallet)); }, [userWallet]);

  useEffect(() => {
    const handleRouteChange = () => {
      const hash = window.location.hash.toLowerCase();
      const isHashAdmin = hash === '#admin' || hash === '#/admin' || hash.startsWith('#admin');
      const isPathAdmin = window.location.pathname.toLowerCase().startsWith('/admin');
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
  const navigatePage = (pageName, category = null, brand = null) => {
    setCurrentPage(pageName);
    if (category) {
      setActiveCategory(category);
    }
    if (brand !== null && brand !== undefined) {
      setActiveBrand(brand);
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
      setCurrentPage('user-dashboard');
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
      joinedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
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
    setCurrentPage('user-dashboard');
    showToast('Account Created!', `Welcome to Zigzet, ${name}!`);
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    sessionStorage.removeItem(STORAGE_KEYS.USER_AUTH);
    setCurrentPage('home');
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
          avatar: updated.avatar || c.avatar,
          location: updated.city ? `${updated.city}, US` : (updated.address || c.location),
          address: updated.address || c.address
        };
      }
      return c;
    }));

    showToast('Profile Updated', 'Your profile information has been saved.');
  };

  // --- User Address Operations ---
  const addUserAddress = (addrData) => {
    const newAddr = {
      ...addrData,
      id: 'addr-' + Date.now(),
      isDefault: addrData.isDefault || userAddresses.length === 0
    };
    setUserAddresses(prev => {
      let list = prev;
      if (newAddr.isDefault) {
        list = list.map(a => ({ ...a, isDefault: false }));
      }
      return [newAddr, ...list];
    });
    showToast('Address Added', 'New delivery address saved successfully.');
    return newAddr;
  };

  const updateUserAddress = (id, updatedData) => {
    setUserAddresses(prev => {
      return prev.map(a => {
        if (a.id === id) {
          return { ...a, ...updatedData };
        }
        if (updatedData.isDefault) {
          return { ...a, isDefault: false };
        }
        return a;
      });
    });
    showToast('Address Updated', 'Address details updated successfully.');
  };

  const deleteUserAddress = (id) => {
    setUserAddresses(prev => prev.filter(a => a.id !== id));
    showToast('Address Deleted', 'Delivery address removed.', 'info');
  };

  const setDefaultAddress = (id) => {
    setUserAddresses(prev => prev.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
    showToast('Default Updated', 'Primary shipping address set.');
  };

  // --- User Returns & Refunds Operations ---
  const createReturnRequest = ({ orderId, product, reason, resolution, notes }) => {
    const returnId = 'RET-' + Math.floor(1000 + Math.random() * 9000);
    const newReturn = {
      id: returnId,
      orderId,
      product,
      reason,
      resolution: resolution || 'Replacement Product',
      status: 'Requested',
      trackingNumber: `ZG-RET-${Math.floor(10000 + Math.random() * 90000)}`,
      requestedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      notes: notes || 'Return request received. Verification in progress.'
    };
    setUserReturns(prev => [newReturn, ...prev]);

    addUserNotification({
      title: 'Return Request Submitted',
      message: `Return request #${returnId} for ${product.name} has been initiated.`,
      type: 'order',
      actionTab: 'returns'
    });

    showToast('Return Requested', `Return #${returnId} created. We will arrange pickup.`);
    return newReturn;
  };

  const cancelReturnRequest = (returnId) => {
    setUserReturns(prev => prev.filter(r => r.id !== returnId));
    showToast('Return Cancelled', `Return #${returnId} has been cancelled.`, 'info');
  };

  // --- User Notifications Operations ---
  const addUserNotification = ({ title, message, type = 'order', actionTab = 'overview' }) => {
    const newNotif = {
      id: 'unotif-' + Date.now() + Math.random(),
      title,
      message,
      time: 'Just now',
      type,
      unread: true,
      actionTab
    };
    setUserNotifications(prev => [newNotif, ...prev]);
  };

  const markUserNotificationRead = (id) => {
    setUserNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  const markAllUserNotificationsRead = () => {
    setUserNotifications(prev => prev.map(n => ({ ...n, unread: false })));
    showToast('All Read', 'All notifications marked as read.', 'info');
  };

  const deleteUserNotification = (id) => {
    setUserNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAllUserNotifications = () => {
    setUserNotifications([]);
    showToast('Cleared', 'All notifications have been removed.', 'info');
  };

  // --- In-Dashboard User Support Tickets ---
  const createUserTicket = ({ subject, category, orderId, priority = 'Normal', message }) => {
    const ticketId = 'TCK-' + Math.floor(1000 + Math.random() * 9000);
    const newTicket = {
      id: ticketId,
      subject,
      category: category || 'General Inquiry',
      orderId: orderId || 'General Inquiry',
      priority,
      status: 'Open',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      messages: [
        {
          id: 'tmsg-' + Date.now(),
          sender: currentUser?.name || 'Customer',
          isStaff: false,
          time: 'Just now',
          text: message
        }
      ]
    };
    setUserTickets(prev => [newTicket, ...prev]);

    // Also sync to store admin inbox
    submitContactMessage({
      name: currentUser?.name || 'Customer',
      email: currentUser?.email || 'customer@zigzet.com',
      subject: `[${ticketId}] ${subject}`,
      message
    });

    addUserNotification({
      title: 'Support Ticket Created',
      message: `Ticket #${ticketId} opened. An agent will respond shortly.`,
      type: 'support',
      actionTab: 'help'
    });

    showToast('Ticket Created!', `Support ticket #${ticketId} opened.`);
    return newTicket;
  };

  const replyUserTicket = (ticketId, text) => {
    setUserTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'In Progress',
          messages: [
            ...t.messages,
            {
              id: 'tmsg-' + Date.now(),
              sender: currentUser?.name || 'Customer',
              isStaff: false,
              time: 'Just now',
              text
            }
          ]
        };
      }
      return t;
    }));
    showToast('Reply Sent', 'Your response has been sent to customer support.');
  };

  const closeUserTicket = (ticketId) => {
    setUserTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: 'Resolved' } : t));
    showToast('Ticket Resolved', `Ticket #${ticketId} marked as resolved.`, 'info');
  };

  // --- Saved Cards & Wallet Operations ---
  const addSavedCard = (cardData) => {
    const newCard = {
      ...cardData,
      id: 'card-' + Date.now(),
      isDefault: cardData.isDefault || savedCards.length === 0
    };
    setSavedCards(prev => {
      let list = prev;
      if (newCard.isDefault) {
        list = list.map(c => ({ ...c, isDefault: false }));
      }
      return [newCard, ...list];
    });
    showToast('Card Saved', 'Payment card added securely.');
    return newCard;
  };

  const removeSavedCard = (id) => {
    setSavedCards(prev => prev.filter(c => c.id !== id));
    showToast('Card Removed', 'Payment method removed.', 'info');
  };

  const setDefaultCard = (id) => {
    setSavedCards(prev => prev.map(c => ({ ...c, isDefault: c.id === id })));
    showToast('Default Card Set', 'Primary payment card updated.');
  };

  const redeemGiftCard = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'WELCOME100' || clean === 'ZIGZET50' || clean === 'GIFT25' || clean === 'VIP100') {
      const amount = clean === 'WELCOME100' || clean === 'VIP100' ? 100 : clean === 'ZIGZET50' ? 50 : 25;
      setUserWallet(prev => ({
        ...prev,
        balance: prev.balance + amount,
        history: [
          {
            id: 'wtx-' + Date.now(),
            type: 'Credit',
            desc: `Gift Voucher Redeemed (${clean})`,
            amount: `+AED ${amount.toFixed(2)}`,
            date: 'Just now',
            status: 'Credited'
          },
          ...prev.history
        ]
      }));
      addUserNotification({
        title: 'Wallet Balance Added',
        message: `AED ${amount.toFixed(2)} credited from voucher ${clean}.`,
        type: 'promo',
        actionTab: 'payment'
      });
      showToast('Voucher Redeemed!', `AED ${amount.toFixed(2)} added to your Zigzet Wallet.`);
      return true;
    } else {
      showToast('Invalid Voucher', 'Code not recognized or expired.', 'error');
      return false;
    }
  };

  const addWalletFunds = (amount) => {
    const addAmt = parseFloat(amount) || 0;
    if (addAmt <= 0) return;
    setUserWallet(prev => ({
      ...prev,
      balance: prev.balance + addAmt,
      history: [
        {
          id: 'wtx-' + Date.now(),
          type: 'Top-up',
          desc: `Instant Wallet Top-up (Online Payment)`,
          amount: `+AED ${addAmt.toFixed(2)}`,
          date: 'Just now',
          status: 'Credited'
        },
        ...prev.history
      ]
    }));
    showToast('Funds Added', `AED ${addAmt.toFixed(2)} added to your Zigzet Wallet.`);
  };

  // --- 1-Click Buy Again Reorder ---
  const reorderItems = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return;
    orderItems.forEach(item => {
      addToCart({
        id: item.id || 'prod-' + Math.random(),
        name: item.name,
        price: item.price,
        image: item.image,
        category: item.category || 'Skincare'
      }, item.quantity || 1);
    });
    setIsCartOpen(true);
    showToast('Order Items Added', `${orderItems.length} item(s) added to your shopping bag!`);
  };

  // --- Customer Review Deletion / Editing ---
  const deleteCustomerReview = (reviewId) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    showToast('Review Deleted', 'Your review has been removed.', 'info');
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

  // Cart Computations (AED)
  const cartSubtotal = cart.reduce((acc, item) => acc + (Number(item.price) || 0) * item.quantity, 0);
  const isFreeShipping = cartSubtotal >= (settings.freeShippingThreshold || 150);
  const shippingFee = cartSubtotal > 0 && !isFreeShipping ? 20 : 0;
  const estimatedTax = cartSubtotal * 0.05;

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

  const updateSeoSettings = (newSeo) => {
    setSeoSettings((prev) => ({ ...prev, ...newSeo }));
    showToast('SEO & Metadata Saved', 'Search engine tags, social previews and schema updated.');
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

  const updateIntegration = (id, newConfig) => {
    setIntegrations((prev) => {
      const now = new Date();
      const timeStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
      const existing = prev[id] || {};
      const updated = {
        ...existing,
        ...newConfig,
        lastSynced: timeStr
      };
      return {
        ...prev,
        [id]: updated
      };
    });
    showToast('Integration Updated', `${newConfig.name || id} configuration has been saved.`);
  };

  const toggleIntegration = (id) => {
    setIntegrations((prev) => {
      const target = prev[id];
      if (!target) return prev;
      const isNowConnected = target.status !== 'Connected';
      const updated = {
        ...target,
        status: isNowConnected ? 'Connected' : 'Ready to connect'
      };
      showToast(
        isNowConnected ? `${target.name} Connected` : `${target.name} Disconnected`,
        isNowConnected ? 'Channel is live and handling store traffic.' : 'Channel connection disabled.',
        isNowConnected ? 'success' : 'info'
      );
      return {
        ...prev,
        [id]: updated
      };
    });
  };

  const testIntegrationConnection = async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          status: 200,
          latency: Math.floor(Math.random() * 45 + 45),
          message: 'All API endpoints healthy and responding with 200 OK.'
        });
      }, 750);
    });
  };

  const sendTestWebhook = async (endpointUrl, eventName = 'order.created') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          status: 200,
          event: eventName,
          timestamp: new Date().toISOString(),
          payloadId: 'evt_' + Math.random().toString(36).substring(2, 10),
          responseBody: { received: true, processedInMs: 38 }
        });
      }, 600);
    });
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
    setIntegrations(initialIntegrations);
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
        activeBrand,
        setActiveBrand,
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
        seoSettings,
        updateSeoSettings,
        integrations,
        updateIntegration,
        toggleIntegration,
        testIntegrationConnection,
        sendTestWebhook,
        resetToDefaults,
        userAddresses,
        addUserAddress,
        updateUserAddress,
        deleteUserAddress,
        setDefaultAddress,
        userReturns,
        createReturnRequest,
        cancelReturnRequest,
        userNotifications,
        addUserNotification,
        markUserNotificationRead,
        markAllUserNotificationsRead,
        deleteUserNotification,
        clearAllUserNotifications,
        userTickets,
        createUserTicket,
        replyUserTicket,
        closeUserTicket,
        savedCards,
        addSavedCard,
        removeSavedCard,
        setDefaultCard,
        userWallet,
        redeemGiftCard,
        addWalletFunds,
        reorderItems,
        deleteCustomerReview,
        theme,
        setTheme,
        toggleTheme,
        changeCurrency
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
