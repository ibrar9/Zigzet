export const initialReviews = [
  {
    id: 'rev-1',
    productId: 'prod-1',
    productName: 'Wireless Noise Cancelling Headphones',
    customerName: 'Marcus Sterling',
    customerEmail: 'marcus.s@example.com',
    rating: 5,
    title: 'Mind-blowing noise cancellation and deep bass',
    comment: 'I use these daily in my office and during flights. The battery easily lasts multiple days on a single charge. Super comfortable memory foam earcups.',
    date: '2026-08-23',
    status: 'Approved', // 'Approved' | 'Pending' | 'Rejected'
    verifiedPurchase: true,
    adminReply: 'Thank you Marcus! We engineered these specifically for commuters and audiophiles.'
  },
  {
    id: 'rev-2',
    productId: 'prod-2',
    productName: 'Smart Watch (Series 9)',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@example.com',
    rating: 5,
    title: 'Flawless OLED display and accurate workout tracking',
    comment: 'The heart rate accuracy is on par with medical devices. Very lightweight on the wrist and sleep tracking insights are super useful.',
    date: '2026-08-22',
    status: 'Approved',
    verifiedPurchase: true,
    adminReply: null
  },
  {
    id: 'rev-3',
    productId: 'prod-3',
    productName: "Men's Running Shoes",
    customerName: 'Devon Vance',
    customerEmail: 'devon.vance@example.com',
    rating: 4,
    title: 'Great arch support, ran a 10k with zero blisters',
    comment: 'Comfortable shoe overall. Fits true to size, although the laces are slightly longer than needed. Would still recommend 100%.',
    date: '2026-08-24',
    status: 'Pending',
    verifiedPurchase: true,
    adminReply: null
  },
  {
    id: 'rev-4',
    productId: 'prod-5',
    productName: 'Modern Ergonomic Office Chair',
    customerName: 'Anonymous Buyer',
    customerEmail: 'spambot99@fakemail.com',
    rating: 1,
    title: 'Check out cheap crypto deals here',
    comment: 'Visit my website for huge discounts on unrelated items.',
    date: '2026-08-25',
    status: 'Rejected',
    verifiedPurchase: false,
    adminReply: null
  }
];
