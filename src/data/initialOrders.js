export const initialOrders = [
  {
    id: 'ORD-9842',
    customerName: 'Sarah Jenkins',
    email: 'sarah.j@example.com',
    date: '2026-08-20',
    total: 299.99,
    status: 'Delivered',
    paymentMethod: 'Credit Card (Visa •••• 4242)',
    items: [
      {
        id: 'prod-2',
        name: 'Smart Watch (Series 9)',
        price: 299.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=80'
      }
    ],
    shippingAddress: '742 Evergreen Terrace, Springfield, OR 97477'
  },
  {
    id: 'ORD-9841',
    customerName: 'Michael Chen',
    email: 'm.chen@example.com',
    date: '2026-08-20',
    total: 199.98,
    status: 'Shipped',
    paymentMethod: 'Apple Pay',
    items: [
      {
        id: 'prod-1',
        name: 'Wireless Noise Cancelling Headphones',
        price: 149.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-4',
        name: 'Unisex Hoodie',
        price: 49.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=300&auto=format&fit=crop&q=80'
      }
    ],
    shippingAddress: '120 Broadway St, New York, NY 10005'
  },
  {
    id: 'ORD-9840',
    customerName: 'Emma Watson',
    email: 'emma.w@example.com',
    date: '2026-08-19',
    total: 89.99,
    status: 'Processing',
    paymentMethod: 'PayPal',
    items: [
      {
        id: 'prod-3',
        name: "Men's Running Shoes",
        price: 89.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&auto=format&fit=crop&q=80'
      }
    ],
    shippingAddress: '450 California St, San Francisco, CA 94104'
  },
  {
    id: 'ORD-9839',
    customerName: 'David Miller',
    email: 'david.m@example.com',
    date: '2026-08-19',
    total: 379.98,
    status: 'Pending',
    paymentMethod: 'Credit Card (Mastercard •••• 8812)',
    items: [
      {
        id: 'prod-5',
        name: 'Modern Ergonomic Office Chair',
        price: 219.99,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1580481077198-c807542612f8?w=300&auto=format&fit=crop&q=80'
      },
      {
        id: 'prod-8',
        name: 'Modern Minimalist Coffee Table',
        price: 159.00,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=300&auto=format&fit=crop&q=80'
      }
    ],
    shippingAddress: '88 King Street, Seattle, WA 98104'
  }
];
