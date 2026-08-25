export const initialCoupons = [
  {
    id: 'coup-1',
    code: 'WELCOME15',
    description: 'Welcome discount for new customers',
    type: 'percentage', // 'percentage' | 'fixed'
    value: 15,
    minSpend: 50,
    maxDiscount: 100,
    expiryDate: '2026-12-31',
    usageLimit: 500,
    usageCount: 142,
    isActive: true
  },
  {
    id: 'coup-2',
    code: 'ZIGZET25',
    description: 'Special seasonal VIP promotional discount',
    type: 'percentage',
    value: 25,
    minSpend: 100,
    maxDiscount: 200,
    expiryDate: '2026-10-15',
    usageLimit: 200,
    usageCount: 68,
    isActive: true
  },
  {
    id: 'coup-3',
    code: 'SAVE30',
    description: 'Flat $30 off on high-tier purchases',
    type: 'fixed',
    value: 30,
    minSpend: 150,
    maxDiscount: 30,
    expiryDate: '2026-11-30',
    usageLimit: 100,
    usageCount: 29,
    isActive: true
  },
  {
    id: 'coup-4',
    code: 'FLASH50',
    description: 'Midnight clearance voucher',
    type: 'fixed',
    value: 50,
    minSpend: 250,
    maxDiscount: 50,
    expiryDate: '2026-08-30',
    usageLimit: 50,
    usageCount: 44,
    isActive: false
  }
];
