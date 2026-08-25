export const initialAbandonedCarts = [
  {
    id: 'cart-ab-101',
    customerName: 'Lucas Vance',
    customerEmail: 'lucas.vance@gmail.com',
    items: [
      {
        id: 'prod-1',
        name: 'Wireless Noise Cancelling Headphones',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-3',
        name: "Men's Running Shoes",
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80'
      }
    ],
    cartTotal: 239.98,
    abandonedAt: '2 hours ago',
    recoveryStatus: 'Pending', // 'Pending' | 'Recovered' | 'Email Sent'
    recoveryDiscount: 'RECOVER10'
  },
  {
    id: 'cart-ab-102',
    customerName: 'Hannah Abbott',
    customerEmail: 'hannah.abbott@outlook.com',
    items: [
      {
        id: 'prod-2',
        name: 'Smart Watch (Series 9)',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80'
      }
    ],
    cartTotal: 299.99,
    abandonedAt: '5 hours ago',
    recoveryStatus: 'Email Sent',
    recoveryDiscount: 'RECOVER10'
  },
  {
    id: 'cart-ab-103',
    customerName: 'Derrick Miller',
    customerEmail: 'derrick.m@yahoo.com',
    items: [
      {
        id: 'prod-5',
        name: 'Modern Ergonomic Office Chair',
        price: 219.99,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1589384267710-7a170981ca78?w=600&auto=format&fit=crop&q=80'
      }
    ],
    cartTotal: 439.98,
    abandonedAt: 'Yesterday',
    recoveryStatus: 'Pending',
    recoveryDiscount: 'RECOVER10'
  }
];
