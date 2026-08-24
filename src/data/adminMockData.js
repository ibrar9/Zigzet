export const shopAnalysisData = {
  growth: '-3.5%',
  dateRange: 'Apr 25 - Apr 28',
  metrics: {
    profit: '$5,657',
    expense: '$68',
    highlightDay: 'Sun',
    highlightIndex: 1
  },
  days: [
    { name: 'Fri', profit: 42, expense: 18, enrolled: 45, left: 12 },
    { name: 'Sun', profit: 75, expense: 8, enrolled: 72, left: 15, isHighlight: true },
    { name: 'Mon', profit: 58, expense: 22, enrolled: 60, left: 18 },
    { name: 'Tue', profit: 32, expense: 30, enrolled: 35, left: 24 },
    { name: 'Wed', profit: 64, expense: 16, enrolled: 68, left: 14 },
    { name: 'Thu', profit: 52, expense: 20, enrolled: 55, left: 19 },
    { name: 'Fri', profit: 24, expense: 12, enrolled: 30, left: 10 }
  ]
};

export const geoLocationData = [
  {
    country: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    sales: '340 Sales',
    revenue: '$17,879',
    change: '+12%',
    isPositive: true,
    coords: { x: 48, y: 32 }
  },
  {
    country: 'Spain',
    code: 'ES',
    flag: '🇪🇸',
    sales: '100 Sales',
    revenue: '$5,500',
    change: '-5%',
    isPositive: false,
    coords: { x: 47, y: 42 }
  },
  {
    country: 'United States',
    code: 'US',
    flag: '🇺🇸',
    sales: '840 Sales',
    revenue: '$45,920',
    change: '+24%',
    isPositive: true,
    coords: { x: 24, y: 38 }
  },
  {
    country: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    sales: '210 Sales',
    revenue: '$12,400',
    change: '+8%',
    isPositive: true,
    coords: { x: 52, y: 33 }
  }
];

export const topProductsData = [
  {
    id: 'top-1',
    name: 'Suit jacket pants',
    price: 400.99,
    salesCount: '2.3k sales',
    progress: 75,
    barColor: '#10b981',
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'top-2',
    name: 'Holding cassette',
    price: 349.99,
    salesCount: '3.6k sales',
    progress: 88,
    barColor: '#7c3aed',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'top-3',
    name: 'leather coat hat',
    price: 149.99,
    salesCount: '512 sales',
    progress: 42,
    barColor: '#f97316',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'top-4',
    name: 'Holding cassette',
    price: 349.99,
    salesCount: '3.6k sales',
    progress: 88,
    barColor: '#06b6d4',
    image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'top-5',
    name: 'Blazer assorted',
    price: 249.99,
    salesCount: '900 sales',
    progress: 60,
    barColor: '#6366f1',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=500&auto=format&fit=crop&q=80'
  }
];

export const initialProductListTable = [
  {
    id: 'prod-001',
    sku: '00544158MP',
    name: 'Black Polo',
    category: 'Fashion',
    price: 205.00,
    stock: 204,
    startDate: 'Apr 24, 2023',
    statistics: 'Perfect',
    salesMetric: '1.2k sales',
    progressColor: '#7c3aed',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-002',
    sku: '00544159MP',
    name: 'Short Tef',
    category: 'Casual',
    price: 90.00,
    stock: 200,
    startDate: 'Apr 24, 2023',
    statistics: 'Good',
    salesMetric: '700 sales',
    progressColor: '#f97316',
    isActive: false,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-003',
    sku: '00544160MP',
    name: 'Spring Wardrobe',
    category: 'Apparel',
    price: 50.00,
    stock: 2004,
    startDate: 'Apr 24, 2023',
    statistics: 'Perfect',
    salesMetric: '5.4k sales',
    progressColor: '#7c3aed',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-004',
    sku: '00544161MP',
    name: 'Vintage Trench Coat',
    category: 'Outerwear',
    price: 320.00,
    stock: 85,
    startDate: 'May 02, 2023',
    statistics: 'Perfect',
    salesMetric: '2.1k sales',
    progressColor: '#10b981',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?w=200&auto=format&fit=crop&q=80'
  },
  {
    id: 'prod-005',
    sku: '00544162MP',
    name: 'Urban Denim Jeans',
    category: 'Pants',
    price: 110.00,
    stock: 140,
    startDate: 'May 10, 2023',
    statistics: 'Good',
    salesMetric: '890 sales',
    progressColor: '#3b82f6',
    isActive: true,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=200&auto=format&fit=crop&q=80'
  }
];

export const latestSalesData = [
  {
    id: 'sale-1',
    name: 'Rompi Berkancing',
    price: '$400.90',
    date: 'April 29, 2026',
    growth: '+324.75%',
    isPositive: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'sale-2',
    name: 'Blazer assorted pocket',
    price: '$580.75',
    date: 'April 28, 2026',
    growth: '-324.75%',
    isPositive: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'sale-3',
    name: 'Blazer assorted pocket',
    price: '$560.15',
    date: 'April 26, 2026',
    growth: '-324.75%',
    isPositive: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'sale-4',
    name: 'Pattern top with knot',
    price: '$210.80',
    date: 'April 23, 2026',
    growth: '+324.75%',
    isPositive: true,
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'sale-5',
    name: 'Blazer assorted pocket',
    price: '$550.75',
    date: 'April 20, 2026',
    growth: '-324.75%',
    isPositive: false,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'sale-6',
    name: 'Blazer assorted pocket',
    price: '$550.75',
    date: 'April 19, 2026',
    growth: '-324.75%',
    isPositive: false,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80'
  }
];

export const adminCustomersData = [
  {
    id: 'cust-1',
    name: 'Sarah Connor',
    email: 'sarah.connor@example.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    orders: 14,
    spent: '$3,420.00',
    location: 'London, UK',
    status: 'VIP Customer',
    lastActive: '12 mins ago'
  },
  {
    id: 'cust-2',
    name: 'Marcus Vance',
    email: 'marcus.v@example.com',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    orders: 8,
    spent: '$1,850.50',
    location: 'New York, USA',
    status: 'Active',
    lastActive: '1 hour ago'
  },
  {
    id: 'cust-3',
    name: 'Elena Rostova',
    email: 'elena.rostova@example.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    orders: 22,
    spent: '$6,120.00',
    location: 'Madrid, Spain',
    status: 'VIP Customer',
    lastActive: '3 hours ago'
  },
  {
    id: 'cust-4',
    name: 'David Kim',
    email: 'david.kim@example.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    orders: 5,
    spent: '$940.00',
    location: 'Toronto, Canada',
    status: 'Active',
    lastActive: 'Yesterday'
  }
];

export const walletOverview = {
  totalBalance: '$48,920.40',
  availablePayout: '$14,250.00',
  pendingSettlement: '$3,890.00',
  totalRevenueMonth: '$28,450.00',
  recentTransactions: [
    { id: 'TXN-9081', type: 'Stripe Payout', amount: '+$5,200.00', date: 'Today, 02:40 PM', status: 'Completed' },
    { id: 'TXN-9080', type: 'Order #ORD-7812', amount: '+$400.90', date: 'Today, 11:15 AM', status: 'Completed' },
    { id: 'TXN-9079', type: 'Order #ORD-7811', amount: '+$149.99', date: 'Yesterday', status: 'Completed' },
    { id: 'TXN-9078', type: 'Refund #ORD-7800', amount: '-$89.99', date: 'Apr 24, 2026', status: 'Refunded' }
  ]
};

export const adminInboxMessages = [
  {
    id: 'msg-1',
    sender: 'Sarah Connor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    subject: 'Size exchange question for Suit jacket',
    preview: 'Hi Zigzet team, I would like to exchange my suit jacket for size M...',
    time: '5m ago',
    unread: true
  },
  {
    id: 'msg-2',
    sender: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    subject: 'Delivery timeframe inquiry',
    preview: 'When is order ORD-9932 expected to arrive at New York?',
    time: '2h ago',
    unread: true
  },
  {
    id: 'msg-3',
    sender: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    subject: 'Feedback regarding Spring Wardrobe collection',
    preview: 'The quality of the fabric is exceptional! Will you be releasing more colors?',
    time: '1d ago',
    unread: false
  }
];

export const adminNotificationsList = [
  {
    id: 'notif-1',
    title: 'New High-Value Order Placed',
    description: 'Order #ORD-8821 for $400.99 by Sarah Connor.',
    time: '10m ago',
    type: 'order',
    unread: true
  },
  {
    id: 'notif-2',
    title: 'Low Stock Alert',
    description: 'Black Polo (SKU: 00544158MP) has reached safety stock limit.',
    time: '45m ago',
    type: 'alert',
    unread: true
  },
  {
    id: 'notif-3',
    title: 'Payout Deposited Successfully',
    description: 'Weekly payout of $5,200.00 sent to Bank Account ****4921.',
    time: '3h ago',
    type: 'wallet',
    unread: false
  }
];
