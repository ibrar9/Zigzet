export const initialUserAddresses = [
  {
    id: 'addr-1',
    type: 'Home',
    isDefault: true,
    name: 'Sarah Jenkins',
    phone: '+1 (555) 123-4567',
    street: '742 Evergreen Terrace',
    city: 'Springfield',
    state: 'Oregon',
    zip: '97477',
    country: 'United States'
  },
  {
    id: 'addr-2',
    type: 'Office',
    isDefault: false,
    name: 'Sarah Jenkins (Work)',
    phone: '+1 (555) 987-6543',
    street: '404 Business Bay Tower, Suite 1402',
    city: 'Springfield',
    state: 'Oregon',
    zip: '97478',
    country: 'United States'
  }
];

export const initialUserReturns = [
  {
    id: 'RET-8291',
    orderId: 'ORD-9842',
    product: {
      id: 'prod-pdrn-cream',
      name: 'Triple PDRN Firming Barrier Cream',
      price: 185.00,
      image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=80',
      quantity: 1
    },
    reason: 'Defective outer seal during transit',
    resolution: 'Replacement Product',
    status: 'Pickup Scheduled', // 'Requested' | 'Approved' | 'Pickup Scheduled' | 'Refund Completed'
    trackingNumber: 'ZG-RET-49102',
    requestedAt: 'Aug 22, 2026',
    notes: 'Courier pickup scheduled for tomorrow between 10:00 AM - 2:00 PM.'
  }
];

export const initialUserNotifications = [
  {
    id: 'unotif-1',
    title: 'Order Shipped!',
    message: 'Your order #ORD-9842 is on its way via FedEx Express. Expected delivery in 2 business days.',
    time: '2 hours ago',
    type: 'order',
    unread: true,
    actionTab: 'orders'
  },
  {
    id: 'unotif-2',
    title: 'Flash Sale Alert',
    message: 'Exclusive 20% discount on Korean Glass Skin Serums for VIP members! Use code VIP20 at checkout.',
    time: 'Yesterday',
    type: 'promo',
    unread: true,
    actionTab: 'loyalty'
  },
  {
    id: 'unotif-3',
    title: 'Support Ticket Update',
    message: 'Agent Alexandre Mercer replied to your inquiry regarding delivery time.',
    time: '2 days ago',
    type: 'support',
    unread: false,
    actionTab: 'help'
  },
  {
    id: 'unotif-4',
    title: 'Points Credited',
    message: 'You earned 1,850 Zigzet loyalty points from your latest purchase.',
    time: '3 days ago',
    type: 'loyalty',
    unread: false,
    actionTab: 'loyalty'
  }
];

export const initialUserTickets = [
  {
    id: 'TCK-5012',
    subject: 'Inquiry regarding express delivery timing to Springfield',
    category: 'Delivery & Shipping',
    orderId: 'ORD-9842',
    priority: 'Normal',
    status: 'Open', // 'Open' | 'In Progress' | 'Resolved'
    createdAt: 'Aug 24, 2026',
    messages: [
      {
        id: 'tmsg-1',
        sender: 'Sarah Jenkins',
        isStaff: false,
        time: 'Aug 24, 2026 - 10:30 AM',
        text: 'Hello, could you please confirm if the courier requires a signature upon delivery?'
      },
      {
        id: 'tmsg-2',
        sender: 'Alexandre Mercer (Zigzet Support)',
        isStaff: true,
        time: 'Aug 24, 2026 - 11:15 AM',
        text: 'Hi Sarah! For standard residential delivery, safe contactless drop-off is enabled by default. However, you can add special gate or buzzer instructions anytime.'
      }
    ]
  }
];

export const initialSavedCards = [
  {
    id: 'card-1',
    holderName: 'SARAH JENKINS',
    cardNumber: '•••• •••• •••• 4242',
    brand: 'visa',
    expiry: '08/29',
    isDefault: true
  },
  {
    id: 'card-2',
    holderName: 'SARAH JENKINS',
    cardNumber: '•••• •••• •••• 8831',
    brand: 'mastercard',
    expiry: '11/28',
    isDefault: false
  }
];

export const initialUserWallet = {
  balance: 150.00,
  cashbackEarned: 45.00,
  currency: 'AED',
  history: [
    { id: 'wtx-1', type: 'Credit', desc: 'Cashback from Order #ORD-9842', amount: '+AED 45.00', date: 'Aug 22, 2026', status: 'Credited' },
    { id: 'wtx-2', type: 'Credit', desc: 'Gift Card Voucher Redemption (WELCOME100)', amount: '+AED 100.00', date: 'Aug 15, 2026', status: 'Credited' },
    { id: 'wtx-3', type: 'Credit', desc: 'Account Signup Welcome Gift', amount: '+AED 5.00', date: 'Aug 10, 2026', status: 'Credited' }
  ]
};
