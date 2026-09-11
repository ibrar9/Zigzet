import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
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
import { initialInfluencers } from '../data/initialInfluencers';
import { categories as initialCategories } from '../data/categories';

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
  THEME: 'zigzet_theme_v1',
  INFLUENCERS: 'zigzet_influencers_v1',
  CURRENT_INFLUENCER: 'zigzet_current_influencer_v1',
  CATEGORIES: 'zigzet_categories_v2'
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

export const DEFAULT_EXCHANGE_RATES = {
  AED: 1.0,
  USD: 0.272294, // 1 USD = 3.6725 AED (exact peg)
  SAR: 1.021103, // 1 SAR = 0.9793 AED (exact peg)
  EUR: 0.234052, // 1 EUR = ~4.27 AED
  GBP: 0.200960, // 1 GBP = ~4.98 AED
  CAD: 0.375000  // 1 CAD = ~2.67 AED
};

export const CURRENCY_SYMBOLS = {
  AED: 'AED ',
  USD: '$',
  EUR: '€',
  GBP: '£',
  SAR: 'SAR ',
  CAD: 'CA$'
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
  bannerSubtext: 'Get your authentic skincare orders delivered quickly with real-time tracking.',
  promoBannersAutoPlay: true,
  promoBannersInterval: 4500,
  promoBanners: [
    {
      id: 'promo-1',
      title: 'Advanced UV Shield SPF50+',
      subtitle: 'Airy Korean sunscreens for 100% daily invisible protection',
      buttonText: 'Shop Sun Care →',
      linkType: 'category',
      linkValue: 'sun-care',
      buttonPosition: 'bottom-left',
      badge: 'Summer Essential',
      image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1400&auto=format&fit=crop&q=85',
      active: true
    },
    {
      id: 'promo-2',
      title: 'Glass Skin Barrier Boost',
      subtitle: 'Triple PDRN & Hyaluronic Micro-Essence for deep hydration',
      buttonText: 'Explore Serums →',
      linkType: 'category',
      linkValue: 'serums-essences',
      buttonPosition: 'bottom-left',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1608248597359-009949989823?w=1400&auto=format&fit=crop&q=85',
      active: true
    },
    {
      id: 'promo-3',
      title: 'Flash Savings & Luxury Bundles',
      subtitle: 'Save up to 35% on dermatologically proven beauty sets',
      buttonText: 'Shop Flash Deals →',
      linkType: 'page',
      linkValue: 'deals',
      buttonPosition: 'bottom-left',
      badge: 'Limited Offer',
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1400&auto=format&fit=crop&q=85',
      active: true
    }
  ]
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

  // Admin Authentication State (Requires explicit true from sessionStorage)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      const auth = sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH);
      return auth === 'true';
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

  // Live / Cached Exchange Rates (Base: 1 AED)
  const [currencyRates, setCurrencyRates] = useState(() => {
    try {
      const saved = localStorage.getItem('zigzet_forex_rates_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.USD === 'number') {
          return { ...DEFAULT_EXCHANGE_RATES, ...parsed };
        }
      }
    } catch (e) {
      console.warn('Could not read saved exchange rates:', e);
    }
    return DEFAULT_EXCHANGE_RATES;
  });

  // Background fetch of real live forex rates from open exchange API
  useEffect(() => {
    let isMounted = true;
    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/AED');
        if (!res.ok) return;
        const data = await res.json();
        if (data && data.result === 'success' && data.rates && isMounted) {
          const freshRates = {
            AED: 1.0,
            USD: Number(data.rates.USD) || DEFAULT_EXCHANGE_RATES.USD,
            SAR: Number(data.rates.SAR) || DEFAULT_EXCHANGE_RATES.SAR,
            EUR: Number(data.rates.EUR) || DEFAULT_EXCHANGE_RATES.EUR,
            GBP: Number(data.rates.GBP) || DEFAULT_EXCHANGE_RATES.GBP,
            CAD: Number(data.rates.CAD) || DEFAULT_EXCHANGE_RATES.CAD
          };
          setCurrencyRates((prev) => ({ ...prev, ...freshRates }));
          try {
            localStorage.setItem('zigzet_forex_rates_v1', JSON.stringify(freshRates));
          } catch {}
        }
      } catch (err) {
        // Fallback silently to exact pegged rates
        console.log('Using baseline pegged forex rates:', err?.message);
      }
    };
    fetchRates();
    return () => { isMounted = false; };
  }, []);

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

  // 1b. Dynamic Categories State (Fully managed via Admin Panel)
  const [categories, setCategories] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error('Error saving categories:', e);
    }
  }, [categories]);

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
          heroSlides: (parsed.heroSlides && parsed.heroSlides.length > 0) ? parsed.heroSlides : defaultCms.heroSlides,
          promoBanners: (parsed.promoBanners && parsed.promoBanners.length > 0) ? parsed.promoBanners : defaultCms.promoBanners
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

  // Influencers & Creators State
  const [influencers, setInfluencers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INFLUENCERS);
      return saved ? JSON.parse(saved) : initialInfluencers;
    } catch {
      return initialInfluencers;
    }
  });

  const [currentInfluencer, setCurrentInfluencer] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_INFLUENCER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INFLUENCERS, JSON.stringify(influencers));
    } catch (e) {
      console.error(e);
    }
  }, [influencers]);

  useEffect(() => {
    try {
      if (currentInfluencer) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_INFLUENCER, JSON.stringify(currentInfluencer));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_INFLUENCER);
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentInfluencer]);

  // Auto-sync influencer coupons into store coupons list so checkout works seamlessly
  useEffect(() => {
    setCoupons((prevCoupons) => {
      let updated = [...prevCoupons];
      let hasChanges = false;
      influencers.forEach((inf) => {
        if (inf.couponCode && inf.status === 'Active') {
          const codeUpper = inf.couponCode.toUpperCase();
          const existingIdx = updated.findIndex((c) => c.code.toUpperCase() === codeUpper);
          if (existingIdx === -1) {
            updated.push({
              id: 'coup-inf-' + inf.id,
              code: codeUpper,
              description: `Creator ${inf.name} exclusive discount`,
              type: 'percentage',
              value: inf.discountPercent || 15,
              minSpend: 0,
              maxDiscount: 200,
              expiryDate: '2027-12-31',
              usageLimit: 10000,
              usageCount: inf.totalOrders || 0,
              isActive: true,
              isInfluencer: true,
              influencerId: inf.id,
              influencerName: inf.name
            });
            hasChanges = true;
          }
        }
      });
      return hasChanges ? updated : prevCoupons;
    });
  }, [influencers]);

  // Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem('shopnest_settings_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (!parsed.storeName || parsed.storeName === 'ShopNest') {
          parsed.storeName = 'Zigzet';
        }
        if (!parsed.announcement || parsed.announcement.includes('USA') || parsed.announcement.includes('$50')) {
          parsed.announcement = defaultSettings.announcement;
        }
        if (!parsed.freeShippingThreshold || Number(parsed.freeShippingThreshold) !== 150) {
          parsed.freeShippingThreshold = 150;
        }
        return { ...defaultSettings, ...parsed };
      }
      return defaultSettings;
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

  // Theme State locked to pure light mode
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.THEME);
      document.documentElement.removeAttribute('data-theme');
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleTheme = () => {
    // Kept as no-op for backward compatibility
  };

  const changeCurrency = (currCode) => {
    const symbol = CURRENCY_SYMBOLS[currCode] || `${currCode} `;
    setSettings((prev) => ({
      ...prev,
      currency: currCode,
      currencySymbol: symbol
    }));
  };

  const convertPrice = useCallback((amountInAED, targetCurrency) => {
    const num = Number(amountInAED) || 0;
    const curr = targetCurrency || settings?.currency || 'AED';
    const rate = currencyRates[curr] || DEFAULT_EXCHANGE_RATES[curr] || 1;
    return Number((num * rate).toFixed(2));
  }, [currencyRates, settings?.currency]);

  const formatPrice = useCallback((amountInAED, options = {}) => {
    const curr = options.currency || settings?.currency || 'AED';
    const converted = convertPrice(amountInAED, curr);
    if (options.rawNumber) return converted;

    if (curr === 'USD') return `$${converted.toFixed(2)}`;
    if (curr === 'EUR') return `€${converted.toFixed(2)}`;
    if (curr === 'GBP') return `£${converted.toFixed(2)}`;
    if (curr === 'CAD') return `CA$${converted.toFixed(2)}`;
    if (curr === 'SAR') return `SAR ${converted.toFixed(2)}`;
    return `AED ${converted.toFixed(2)}`;
  }, [convertPrice, settings?.currency]);

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

      // Automatically capture affiliate referral code or coupon from URL (?ref=... or #shop?ref=...)
      try {
        const searchParams = new URLSearchParams(window.location.search);
        let refCode = searchParams.get('ref') || searchParams.get('affiliate') || searchParams.get('coupon');

        if (!refCode && window.location.hash && window.location.hash.includes('?')) {
          const hashQuery = window.location.hash.split('?')[1];
          if (hashQuery) {
            const hashParams = new URLSearchParams(hashQuery);
            refCode = hashParams.get('ref') || hashParams.get('affiliate') || hashParams.get('coupon');
            const prodId = hashParams.get('product');
            if (prodId && products.length > 0) {
              const matchedP = products.find(p => p.id === prodId);
              if (matchedP) setQuickViewProduct(matchedP);
            }
          }
        }

        if (refCode) {
          const cleanRef = refCode.trim().toUpperCase();
          sessionStorage.setItem('zigzet_active_referral_code', cleanRef);
          // Auto-apply promo coupon if found and not already applied
          const foundCoupon = coupons.find(c => c.code.toUpperCase() === cleanRef && c.isActive);
          if (foundCoupon && (!appliedCoupon || appliedCoupon.code !== cleanRef)) {
            setAppliedCoupon(foundCoupon);
            showToast('Creator Promo Applied!', `Exclusive coupon "${cleanRef}" (${foundCoupon.value}% Off) has been activated!`);
          }
        }
      } catch (e) {
        console.warn('Could not parse referral parameters:', e);
      }
    };

    handleRouteChange();
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('popstate', handleRouteChange);
    return () => {
      window.removeEventListener('hashchange', handleRouteChange);
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [coupons, appliedCoupon, products]);

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

  // Cart Operations with Strict Stock Boundary Enforcement
  const addToCart = (product, quantity = 1) => {
    const availableStock = product.stock !== undefined ? product.stock : 25;
    if (availableStock <= 0) {
      showToast('Out of Stock', `Sorry, "${product.name}" is currently out of stock.`, 'error');
      return false;
    }

    let actualAdded = quantity;
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      const currentQty = existing ? existing.quantity : 0;
      if (currentQty + quantity > availableStock) {
        actualAdded = Math.max(0, availableStock - currentQty);
      }
      if (actualAdded <= 0) {
        return prev;
      }
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + actualAdded } : item
        );
      }
      return [...prev, { ...product, quantity: actualAdded }];
    });

    if (actualAdded <= 0) {
      showToast('Maximum in Bag', `All ${availableStock} available units are already in your shopping bag.`, 'warning');
      return false;
    } else if (actualAdded < quantity) {
      showToast('Stock Limit Reached', `Only ${actualAdded} unit(s) added due to remaining inventory limit (${availableStock} max).`, 'warning');
      return true;
    } else {
      showToast('Added to Bag', `${product.name} (x${actualAdded}) added to your shopping bag.`);
      return true;
    }
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const matchedP = products.find(p => p.id === productId);
    const availableStock = matchedP?.stock !== undefined ? matchedP.stock : 25;
    const finalQty = Math.min(quantity, availableStock);
    if (quantity > availableStock) {
      showToast('Stock Limit', `Only ${availableStock} units available in inventory.`, 'warning');
    }
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity: finalQty } : item))
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

    const orderCurrency = orderData.currency || settings?.currency || 'AED';
    const exchangeRate = currencyRates[orderCurrency] || DEFAULT_EXCHANGE_RATES[orderCurrency] || 1;
    const convertedTotal = convertPrice(orderTotal, orderCurrency);

    const newOrder = {
      id: orderId,
      customerName: orderData.customerName || 'Demo Customer',
      email: orderData.email || 'customer@example.com',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      total: orderTotal,
      subtotal: cartSubtotal,
      currency: orderCurrency,
      currencySymbol: CURRENCY_SYMBOLS[orderCurrency] || `${orderCurrency} `,
      exchangeRate: exchangeRate,
      convertedTotal: convertedTotal,
      discount: couponDiscountAmount,
      couponCode: appliedCoupon ? appliedCoupon.code : null,
      status: 'Processing',
      paymentMethod: orderData.paymentMethod || 'Credit Card (Visa)',
      shippingAddress: orderData.shippingAddress || 'Downtown Dubai, Boulevard Plaza Tower 1',
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

    // Influencer Attribution & Points Hook
    const usedCouponCode = appliedCoupon ? appliedCoupon.code : orderData.couponCode;
    if (usedCouponCode) {
      const codeUpper = usedCouponCode.toUpperCase();
      setInfluencers((prevInf) =>
        prevInf.map((inf) => {
          if (inf.couponCode && inf.couponCode.toUpperCase() === codeUpper) {
            const commission = (orderTotal * (inf.commissionRate || 10)) / 100;
            const pointsEarned = Math.round(commission);
            const referredOrder = {
              id: orderId,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              customerName: orderData.customerName || 'Customer',
              total: orderTotal,
              discount: couponDiscountAmount,
              pointsEarned: pointsEarned,
              status: 'Completed'
            };
            return {
              ...inf,
              totalSales: Number(((inf.totalSales || 0) + orderTotal).toFixed(2)),
              totalOrders: (inf.totalOrders || 0) + 1,
              pointsEarned: (inf.pointsEarned || 0) + pointsEarned,
              pointsBalance: (inf.pointsBalance || 0) + pointsEarned,
              referredOrders: [referredOrder, ...(inf.referredOrders || [])]
            };
          }
          return inf;
        })
      );

      setCurrentInfluencer((curr) => {
        if (curr && curr.couponCode && curr.couponCode.toUpperCase() === codeUpper) {
          const commission = (orderTotal * (curr.commissionRate || 10)) / 100;
          const pointsEarned = Math.round(commission);
          const referredOrder = {
            id: orderId,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            customerName: orderData.customerName || 'Customer',
            total: orderTotal,
            discount: couponDiscountAmount,
            pointsEarned: pointsEarned,
            status: 'Completed'
          };
          return {
            ...curr,
            totalSales: Number(((curr.totalSales || 0) + orderTotal).toFixed(2)),
            totalOrders: (curr.totalOrders || 0) + 1,
            pointsEarned: (curr.pointsEarned || 0) + pointsEarned,
            pointsBalance: (curr.pointsBalance || 0) + pointsEarned,
            referredOrders: [referredOrder, ...(curr.referredOrders || [])]
          };
        }
        return curr;
      });

      const matchingInf = influencers.find(
        (i) => i.couponCode && i.couponCode.toUpperCase() === codeUpper
      );
      if (matchingInf) {
        setNotifications((prevN) => [
          {
            id: 'notif-inf-' + Date.now(),
            title: 'Influencer Sale Referred!',
            description: `Order #${orderId} ($${orderTotal.toFixed(2)}) used ${matchingInf.name}'s code "${matchingInf.couponCode}".`,
            time: 'Just now',
            type: 'sale',
            unread: true
          },
          ...prevN
        ]);
      }
    }

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

  const updateCoupon = (couponId, updatedData) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { 
        ...c, 
        ...updatedData, 
        code: updatedData.code ? updatedData.code.trim().toUpperCase() : c.code 
      } : c))
    );
    showToast('Coupon Updated', 'Discount coupon details have been updated.');
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

  // 12. Influencer Program Methods
  const registerInfluencer = (infData) => {
    const existing = influencers.find(
      (i) => i.email.toLowerCase() === (infData.email || '').toLowerCase()
    );
    if (existing) {
      showToast('Account Exists', 'An influencer account with this email already exists.', 'error');
      return false;
    }

    let code = (infData.couponCode || infData.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 8) + '15').toUpperCase();
    const existingCode = influencers.some((i) => i.couponCode && i.couponCode.toUpperCase() === code);
    if (existingCode) {
      code = `${code}${Math.floor(10 + Math.random() * 90)}`;
    }

    const newInfluencer = {
      id: 'inf-' + Date.now(),
      name: infData.name,
      email: infData.email,
      password: infData.password || 'password123',
      avatar: infData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80`,
      platform: infData.platform || 'Instagram',
      handle: infData.handle ? (infData.handle.startsWith('@') ? infData.handle : `@${infData.handle}`) : `@${infData.name.toLowerCase().replace(/\s+/g, '')}`,
      profileUrl: infData.profileUrl || `https://${(infData.platform || 'instagram').toLowerCase()}.com`,
      followers: infData.followers || '10K-50K',
      niche: infData.niche || 'Lifestyle & Beauty',
      couponCode: code,
      discountPercent: 15,
      commissionRate: 10,
      pointsEarned: 100,
      pointsBalance: 100,
      totalSales: 0,
      totalOrders: 0,
      status: 'Active',
      tier: 'Rising Creator',
      joinedDate: new Date().toISOString().split('T')[0],
      referredOrders: [],
      payouts: []
    };

    setInfluencers((prev) => [newInfluencer, ...prev]);
    setCurrentInfluencer(newInfluencer);

    setNotifications((prevN) => [
      {
        id: 'notif-new-inf-' + Date.now(),
        title: 'New Creator Joined!',
        description: `${newInfluencer.name} (${newInfluencer.handle}) joined the Creator Program with code "${newInfluencer.couponCode}".`,
        time: 'Just now',
        type: 'info',
        unread: true
      },
      ...prevN
    ]);

    showToast('Welcome Creator!', `Your application is approved! Use your exclusive coupon ${code}.`);
    return true;
  };

  const loginInfluencer = (email, password) => {
    const found = influencers.find(
      (i) => i.email.toLowerCase() === email.toLowerCase() && i.password === password
    );
    if (!found) {
      showToast('Login Failed', 'Invalid creator email or password.', 'error');
      return false;
    }
    if (found.status === 'Suspended') {
      showToast('Account Suspended', 'Your influencer partner account is suspended. Please contact support.', 'error');
      return false;
    }

    setCurrentInfluencer(found);
    showToast('Welcome Back!', `Logged in as ${found.name} (${found.handle}).`);
    return true;
  };

  const logoutInfluencer = () => {
    setCurrentInfluencer(null);
    showToast('Signed Out', 'Creator account logged out.', 'info');
  };

  const updateInfluencer = (id, updates) => {
    setInfluencers((prev) =>
      prev.map((i) => (i.id === id ? { ...i, ...updates } : i))
    );
    setCurrentInfluencer((curr) => (curr && curr.id === id ? { ...curr, ...updates } : curr));
    showToast('Influencer Updated', 'Partner profile saved successfully.');
  };

  const toggleInfluencerStatus = (id) => {
    setInfluencers((prev) =>
      prev.map((i) => {
        if (i.id === id) {
          const nextStatus = i.status === 'Active' ? 'Suspended' : 'Active';
          showToast('Status Changed', `${i.name}'s account is now ${nextStatus}.`);
          return { ...i, status: nextStatus };
        }
        return i;
      })
    );
  };

  const deleteInfluencer = (id) => {
    setInfluencers((prev) => prev.filter((i) => i.id !== id));
    setCurrentInfluencer((curr) => (curr && curr.id === id ? null : curr));
    showToast('Influencer Removed', 'Creator removed from partner registry.', 'info');
  };

  const requestInfluencerPayout = (influencerId, pointsToRedeem, method, details) => {
    const inf = influencers.find((i) => i.id === influencerId);
    if (!inf) return false;
    if ((inf.pointsBalance || 0) < pointsToRedeem) {
      showToast('Insufficient Points', 'You do not have enough points for this payout.', 'error');
      return false;
    }

    const cashAmount = pointsToRedeem / 10;
    const newPayout = {
      id: 'PAY-' + Math.floor(100 + Math.random() * 900),
      date: new Date().toISOString().split('T')[0],
      points: pointsToRedeem,
      amount: cashAmount,
      method: method || 'PayPal',
      details: details || '',
      status: 'Processing'
    };

    const updatedInf = {
      ...inf,
      pointsBalance: (inf.pointsBalance || 0) - pointsToRedeem,
      payouts: [newPayout, ...(inf.payouts || [])]
    };

    setInfluencers((prev) => prev.map((i) => (i.id === influencerId ? updatedInf : i)));
    if (currentInfluencer && currentInfluencer.id === influencerId) {
      setCurrentInfluencer(updatedInf);
    }

    setNotifications((prevN) => [
      {
        id: 'notif-payout-' + Date.now(),
        title: 'Influencer Payout Request',
        description: `${inf.name} requested payout of $${cashAmount.toFixed(2)} (${pointsToRedeem} pts) via ${method}.`,
        time: 'Just now',
        type: 'alert',
        unread: true
      },
      ...prevN
    ]);

    showToast('Payout Requested!', `Redeemed ${pointsToRedeem} points for $${cashAmount.toFixed(2)} via ${method}.`);
    return true;
  };

  const approveInfluencerPayout = (influencerId, payoutId) => {
    setInfluencers((prev) =>
      prev.map((inf) => {
        if (inf.id === influencerId) {
          const updatedPayouts = (inf.payouts || []).map((p) =>
            p.id === payoutId ? { ...p, status: 'Completed', completedAt: new Date().toISOString().split('T')[0] } : p
          );
          return { ...inf, payouts: updatedPayouts };
        }
        return inf;
      })
    );
    setCurrentInfluencer((curr) => {
      if (curr && curr.id === influencerId) {
        const updatedPayouts = (curr.payouts || []).map((p) =>
          p.id === payoutId ? { ...p, status: 'Completed', completedAt: new Date().toISOString().split('T')[0] } : p
        );
        return { ...curr, payouts: updatedPayouts };
      }
      return curr;
    });
    showToast('Payout Approved', `Payout #${payoutId} has been marked as Completed / Dispatched.`);
  };

  const rejectInfluencerPayout = (influencerId, payoutId, reason = 'Verification failed') => {
    let refundPoints = 0;
    setInfluencers((prev) =>
      prev.map((inf) => {
        if (inf.id === influencerId) {
          const targetPayout = (inf.payouts || []).find((p) => p.id === payoutId);
          refundPoints = targetPayout ? targetPayout.points : 0;
          const updatedPayouts = (inf.payouts || []).map((p) =>
            p.id === payoutId ? { ...p, status: 'Rejected', rejectionReason: reason } : p
          );
          return {
            ...inf,
            pointsBalance: (inf.pointsBalance || 0) + refundPoints,
            payouts: updatedPayouts
          };
        }
        return inf;
      })
    );
    setCurrentInfluencer((curr) => {
      if (curr && curr.id === influencerId) {
        const targetPayout = (curr.payouts || []).find((p) => p.id === payoutId);
        const refund = targetPayout ? targetPayout.points : 0;
        const updatedPayouts = (curr.payouts || []).map((p) =>
          p.id === payoutId ? { ...p, status: 'Rejected', rejectionReason: reason } : p
        );
        return {
          ...curr,
          pointsBalance: (curr.pointsBalance || 0) + refund,
          payouts: updatedPayouts
        };
      }
      return curr;
    });
    showToast('Payout Rejected', `Payout #${payoutId} rejected. ${refundPoints} points refunded to creator.`);
  };

  // 13. Dynamic Categories Management
  const addCategory = (catData) => {
    const newCat = {
      ...catData,
      id: catData.id || catData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      itemCount: catData.itemCount || '0 products'
    };
    setCategories((prev) => [...prev, newCat]);
    showToast('Category Created', `"${newCat.name}" added to store departments.`);
    return newCat;
  };

  const updateCategory = (catId, updatedData) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === catId ? { ...c, ...updatedData } : c))
    );
    showToast('Category Updated', 'Department details saved successfully.');
  };

  const deleteCategory = (catId) => {
    setCategories((prev) => prev.filter((c) => c.id !== catId));
    showToast('Category Removed', 'Department removed from catalog.', 'info');
  };

  // 14. Customer CRM Management
  const addCustomer = (customerData) => {
    const newCust = {
      ...customerData,
      id: 'cust-' + Date.now(),
      orders: parseInt(customerData.orders) || 0,
      spent: customerData.spent || '$0.00',
      avatar: customerData.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      status: customerData.status || 'Active Customer',
      lastActive: 'Just now',
      registeredAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
    setCustomers((prev) => [newCust, ...prev]);
    showToast('Customer Created', `${newCust.name} added to CRM.`);
    return newCust;
  };

  const updateCustomer = (customerId, updatedData) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === customerId ? { ...c, ...updatedData } : c))
    );
    showToast('Customer Updated', 'Customer profile updated successfully.');
  };

  const deleteCustomer = (customerId) => {
    setCustomers((prev) => prev.filter((c) => c.id !== customerId));
    showToast('Customer Removed', 'Customer record deleted from CRM.', 'info');
  };

  // 15. User Password Reset
  const resetUserPassword = (email, newPassword) => {
    const cleanEmail = email.trim().toLowerCase();
    const accountIndex = userAccounts.findIndex(a => a.email.toLowerCase() === cleanEmail);
    if (accountIndex === -1) {
      return { success: false, message: 'No registered account found with this email address.' };
    }
    setUserAccounts(prev => prev.map(a => a.email.toLowerCase() === cleanEmail ? { ...a, password: newPassword } : a));
    showToast('Password Reset', 'Your password has been successfully updated! You can now sign in.');
    return { success: true };
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
        changeCurrency,
        convertPrice,
        formatPrice,
        currencyRates,
        convertedCartTotal: convertPrice(cartTotal),
        convertedCartSubtotal: convertPrice(cartSubtotal),
        influencers,
        currentInfluencer,
        registerInfluencer,
        loginInfluencer,
        logoutInfluencer,
        updateInfluencer,
        toggleInfluencerStatus,
        deleteInfluencer,
        requestInfluencerPayout,
        approveInfluencerPayout,
        rejectInfluencerPayout,
        categories,
        addCategory,
        updateCategory,
        deleteCategory,
        updateCoupon,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        resetUserPassword
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
