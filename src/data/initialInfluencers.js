export const initialInfluencers = [
  {
    id: 'inf-1',
    name: 'Sophia Vance',
    email: 'sophia@glamvance.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    platform: 'Instagram',
    handle: '@sophia_glam',
    profileUrl: 'https://instagram.com/sophia_glam',
    followers: '125K',
    niche: 'Beauty & Skincare',
    couponCode: 'SOPHIA15',
    discountPercent: 15,
    commissionRate: 10, // 10% commission = 1 point per $1
    pointsEarned: 1840,
    pointsBalance: 1240, // after some redeemed
    totalSales: 18400.00,
    totalOrders: 68,
    status: 'Active',
    tier: 'Gold Ambassador',
    joinedDate: '2026-01-15',
    referredOrders: [
      {
        id: 'ORD-8921',
        date: '2026-03-09',
        customerName: 'Emma Watson',
        total: 249.00,
        discount: 37.35,
        pointsEarned: 25,
        status: 'Completed'
      },
      {
        id: 'ORD-8874',
        date: '2026-03-05',
        customerName: 'Jessica Alba',
        total: 180.00,
        discount: 27.00,
        pointsEarned: 18,
        status: 'Completed'
      },
      {
        id: 'ORD-8712',
        date: '2026-02-28',
        customerName: 'Chloe Bennett',
        total: 320.00,
        discount: 48.00,
        pointsEarned: 32,
        status: 'Completed'
      }
    ],
    payouts: [
      {
        id: 'PAY-101',
        date: '2026-02-15',
        points: 600,
        amount: 60.00,
        method: 'PayPal',
        status: 'Paid'
      }
    ]
  },
  {
    id: 'inf-2',
    name: 'Marcus Chen',
    email: 'marcus@techlifestyle.io',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    platform: 'YouTube',
    handle: '@marcus_tech',
    profileUrl: 'https://youtube.com/@marcus_tech',
    followers: '280K',
    niche: 'Tech & Modern Gadgets',
    couponCode: 'MARCUS10',
    discountPercent: 10,
    commissionRate: 12,
    pointsEarned: 2450,
    pointsBalance: 2450,
    totalSales: 20416.00,
    totalOrders: 92,
    status: 'Active',
    tier: 'Platinum Partner',
    joinedDate: '2026-01-20',
    referredOrders: [
      {
        id: 'ORD-9104',
        date: '2026-03-10',
        customerName: 'David Miller',
        total: 399.00,
        discount: 39.90,
        pointsEarned: 48,
        status: 'Completed'
      },
      {
        id: 'ORD-9022',
        date: '2026-03-08',
        customerName: 'Ryan Reynolds',
        total: 210.00,
        discount: 21.00,
        pointsEarned: 25,
        status: 'Completed'
      }
    ],
    payouts: []
  },
  {
    id: 'inf-3',
    name: 'Aria Montgomery',
    email: 'aria@styleaesthetic.com',
    password: 'password123',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    platform: 'TikTok',
    handle: '@ariastyle',
    profileUrl: 'https://tiktok.com/@ariastyle',
    followers: '85K',
    niche: 'Fashion & Apparel',
    couponCode: 'ARIA20',
    discountPercent: 20,
    commissionRate: 8,
    pointsEarned: 960,
    pointsBalance: 460,
    totalSales: 12000.00,
    totalOrders: 45,
    status: 'Active',
    tier: 'Silver Creator',
    joinedDate: '2026-02-01',
    referredOrders: [
      {
        id: 'ORD-8640',
        date: '2026-03-02',
        customerName: 'Rachel Green',
        total: 145.00,
        discount: 29.00,
        pointsEarned: 12,
        status: 'Completed'
      }
    ],
    payouts: [
      {
        id: 'PAY-102',
        date: '2026-02-28',
        points: 500,
        amount: 50.00,
        method: 'Bank Wire',
        status: 'Paid'
      }
    ]
  }
];
