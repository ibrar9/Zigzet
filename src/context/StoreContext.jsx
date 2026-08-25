import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialProducts';
import { initialOrders } from '../data/initialOrders';
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
  ADMIN_AUTH: 'zigzet_admin_auth_v2'
};

const defaultSettings = {
  announcement: '⭐ Free Shipping on Orders Over $50 (USA & Worldwide)',
  freeShippingThreshold: 50,
  currency: 'USD',
  currencySymbol: '$',
  storeName: 'Zigzet',
  contactEmail: 'support@zigzet.com',
  adminUsername: 'admin',
  adminPassword: 'admin123'
};

export const StoreProvider = ({ children }) => {
  // Navigation & Page State
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'categories' | 'deals' | 'track' | 'about' | 'contact'

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });

  // 1. Products state (with active toggle & sales metric)
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

  // 4. Inbox Messages state
  const [inboxMessages, setInboxMessages] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INBOX);
      return saved ? JSON.parse(saved) : adminInboxMessages;
    } catch {
      return adminInboxMessages;
    }
  });

  // 5. Notifications state
  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
      return saved ? JSON.parse(saved) : adminNotificationsList;
    } catch {
      return adminNotificationsList;
    }
  });

  // 6. Wallet Transactions state
  const [walletTransactions, setWalletTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
      return saved ? JSON.parse(saved) : walletOverview.recentTransactions;
    } catch {
      return walletOverview.recentTransactions;
    }
  });

  // 7. Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART) || localStorage.getItem('shopnest_cart_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 8. Wishlist state
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST) || localStorage.getItem('shopnest_wishlist_v1');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 9. Store Settings
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS) || localStorage.getItem('shopnest_settings_v1');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  // UI state
  const [viewMode, setViewMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash === '#admin' || window.location.pathname === '/admin' ? 'admin' : 'store';
    }
    return 'store';
  });

  const [adminTab, setAdminTab] = useState('dashboard'); // 'dashboard' | 'products' | 'orders' | 'customers' | 'wallet' | 'transactions' | 'settings' | 'integrations' | 'user' | 'history'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [toasts, setToasts] = useState([]);

  // Listen to URL hash changes for #admin route
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setViewMode('admin');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INBOX, JSON.stringify(inboxMessages));
  }, [inboxMessages]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(walletTransactions));
  }, [walletTransactions]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  // Admin Auth functions
  const loginAdmin = (inputUser, inputPass) => {
    const validUser = settings.adminUsername || 'admin';
    const validPass = settings.adminPassword || 'admin123';

    if (inputUser.trim() === validUser && inputPass === validPass) {
      setIsAdminAuthenticated(true);
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {}
      showToast('Admin Logged In', 'Welcome back, Administrator!');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
    } catch {}
    window.location.hash = '';
    setViewMode('store');
    showToast('Logged Out', 'Admin session terminated safely.', 'info');
  };

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
    if (product.stock !== undefined && product.stock <= 0) {
      showToast('Out of Stock', `${product.name} is currently out of stock.`, 'warning');
      return;
    }

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
  const cartSubtotal = cart.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  const isFreeShipping = cartSubtotal >= settings.freeShippingThreshold;
  const shippingFee = cartSubtotal === 0 ? 0 : isFreeShipping ? 0 : 5.99;
  const estimatedTax = cartSubtotal * 0.08; // 8% sales tax
  const cartTotal = cartSubtotal + shippingFee + estimatedTax;
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ==========================================
  // REAL-TIME CONNECTED ADMIN & STORE ACTIONS
  // ==========================================

  // 1. Add Product (Admin -> Storefront)
  const addProduct = (newProductData) => {
    const id = 'prod-' + Date.now();
    const newProduct = {
      id,
      rating: 5.0,
      reviewsCount: 0,
      stock: parseInt(newProductData.stock) || 20,
      salesCount: 0,
      isActive: true,
      images: [newProductData.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'],
      specs: {},
      featured: false,
      sku: 'ZG-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
      ...newProductData,
      price: parseFloat(newProductData.price) || 0,
      originalPrice: newProductData.originalPrice ? parseFloat(newProductData.originalPrice) : null,
      isSale: Boolean(newProductData.originalPrice && parseFloat(newProductData.originalPrice) > parseFloat(newProductData.price))
    };

    setProducts((prev) => [newProduct, ...prev]);

    // Add alert notification
    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Product Added 📦',
        description: `"${newProduct.name}" added to catalog ($${newProduct.price.toFixed(2)}).`,
        time: 'Just now',
        type: 'alert',
        unread: true
      },
      ...prev
    ]);

    showToast('Product Created', `${newProduct.name} is now live in store and inventory.`);
    return newProduct;
  };

  // 2. Update Product
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

  // 3. Toggle Product Active Status (Admin Table Switch -> Storefront Visibility)
  const toggleProductActive = (productId) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = !p.isActive;
          showToast(
            newStatus ? 'Product Activated' : 'Product Deactivated',
            `"${p.name}" is now ${newStatus ? 'visible' : 'hidden'} on the storefront.`,
            newStatus ? 'success' : 'info'
          );
          return { ...p, isActive: newStatus };
        }
        return p;
      })
    );
  };

  // 4. Delete Product
  const deleteProduct = (productId) => {
    const prod = products.find((p) => p.id === productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    setCart((prev) => prev.filter((i) => i.id !== productId));
    setWishlist((prev) => prev.filter((id) => id !== productId));
    showToast('Product Deleted', `${prod ? prod.name : 'Product'} removed from store.`, 'info');
  };

  // 5. Create Order (Storefront Checkout -> Admin Orders, Inventory, CRM, Wallet & Notifications)
  const createOrder = (orderData) => {
    const orderId = 'ORD-' + Math.floor(1000 + Math.random() * 9000);
    const orderDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const orderTotal = cartTotal;
    const orderedItems = [...cart];

    const newOrder = {
      id: orderId,
      date: orderDate,
      status: 'Processing',
      items: orderedItems,
      total: orderTotal,
      subtotal: cartSubtotal,
      shipping: shippingFee,
      tax: estimatedTax,
      customerName: orderData.customerName || 'Customer',
      email: orderData.email || 'customer@example.com',
      shippingAddress: orderData.shippingAddress || '742 Evergreen Terrace, Springfield, OR 97477',
      paymentMethod: orderData.paymentMethod || 'Credit Card',
      ...orderData
    };

    // A. Decrement product stock & increment salesCount
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const matchingCartItem = orderedItems.find((item) => item.id === p.id);
        if (matchingCartItem) {
          const newStock = Math.max(0, (p.stock || 20) - matchingCartItem.quantity);
          const newSales = (p.salesCount || 0) + matchingCartItem.quantity;
          
          // Trigger Low Stock notification if <= 5
          if (newStock <= 5) {
            setNotifications((prevN) => [
              {
                id: 'notif-low-' + Date.now() + Math.random(),
                title: 'Low Stock Alert ⚠️',
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

    // B. Save Order
    setOrders((prev) => [newOrder, ...prev]);

    // C. Update / Create Customer in CRM
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

    // D. Add to Wallet Transaction Ledger
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

    // E. Add New Order Notification to Admin
    setNotifications((prevNotifs) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New High-Value Order 🛍️',
        description: `Order #${orderId} for $${orderTotal.toFixed(2)} by ${orderData.customerName}.`,
        time: 'Just now',
        type: 'order',
        unread: true
      },
      ...prevNotifs
    ]);

    // F. Clear Cart & Close Modal
    clearCart();
    setIsCheckoutOpen(false);
    showToast('Order Placed Successfully! 🎉', `Order #${orderId} has been confirmed.`);
    return newOrder;
  };

  // 6. Update Order Status (Admin -> TrackOrderPage live sync)
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'Order Status Changed',
        description: `Order #${orderId} updated to "${newStatus}".`,
        time: 'Just now',
        type: 'order',
        unread: true
      },
      ...prev
    ]);

    showToast('Order Status Updated', `Order #${orderId} marked as ${newStatus}.`);
  };

  // 7. Submit Contact Inquiry (Storefront Contact Page -> Admin Inbox & Notifications)
  const submitContactMessage = ({ name, email, subject, message }) => {
    const newMsg = {
      id: 'msg-' + Date.now(),
      sender: name,
      email: email,
      subject: subject || 'Store Inquiry',
      preview: message,
      time: 'Just now',
      unread: true,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      messages: [
        { sender: name, text: message, time: 'Just now', isCustomer: true }
      ]
    };

    setInboxMessages((prev) => [newMsg, ...prev]);

    setNotifications((prev) => [
      {
        id: 'notif-' + Date.now(),
        title: 'New Support Inquiry 💬',
        description: `${name}: "${subject}"`,
        time: 'Just now',
        type: 'alert',
        unread: true
      },
      ...prev
    ]);

    showToast('Message Sent! ✉️', 'Our support team has received your message and will respond promptly.');
    return newMsg;
  };

  // 8. Send Reply from Admin to Customer
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

  // 9. Mark all notifications as read
  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    showToast('Notifications Cleared', 'All alerts marked as read.', 'info');
  };

  // 10. Request Instant Payout from Wallet
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
        title: 'Payout Processed Successfully 💰',
        description: `Instant payout of $${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} transferred to primary bank.`,
        time: 'Just now',
        type: 'wallet',
        unread: true
      },
      ...prev
    ]);

    showToast('Payout Requested! 🏦', `$${amount.toFixed(2)} instant payout has been initiated.`);
  };

  // 11. Settings & Store Reset
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    showToast('Settings Saved', 'Store configuration updated.');
  };

  const resetToDefaults = () => {
    setProducts(initialProducts);
    setOrders(initialOrders);
    setCustomers(adminCustomersData);
    setInboxMessages(adminInboxMessages);
    setNotifications(adminNotificationsList);
    setWalletTransactions(walletOverview.recentTransactions);
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
        toggleProductActive,
        createOrder,
        updateOrderStatus,
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
