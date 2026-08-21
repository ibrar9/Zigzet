export const initialProducts = [
  {
    id: 'prod-1',
    name: 'Wireless Noise Cancelling Headphones',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 149.99,
    originalPrice: 199.99,
    isSale: true,
    rating: 4.8,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Experience pure musical bliss with active noise cancellation, ultra-soft memory foam earcups, and up to 40 hours of battery life on a single charge.',
    specs: {
      'Battery Life': 'Up to 40 Hours',
      'Connectivity': 'Bluetooth 5.3 & 3.5mm Aux',
      'Noise Cancellation': 'Hybrid Active ANC',
      'Weight': '250g'
    },
    stock: 45,
    featured: true,
    sku: 'SN-TECH-001'
  },
  {
    id: 'prod-2',
    name: 'Smart Watch (Series 9)',
    category: 'electronics',
    categoryName: 'Electronics',
    price: 299.99,
    originalPrice: null,
    isSale: false,
    rating: 4.7,
    reviewsCount: 95,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Your ultimate companion for health tracking, notifications, ECG monitoring, always-on Retina OLED display, and water resistance up to 50 meters.',
    specs: {
      'Display': '1.9" Always-On OLED',
      'Sensors': 'Heart Rate, Blood Oxygen, ECG',
      'Water Resistance': '50m WR50',
      'Compatibility': 'iOS & Android'
    },
    stock: 28,
    featured: true,
    sku: 'SN-TECH-002'
  },
  {
    id: 'prod-3',
    name: "Men's Running Shoes",
    category: 'fashion',
    categoryName: 'Fashion',
    price: 89.99,
    originalPrice: null,
    isSale: false,
    rating: 4.6,
    reviewsCount: 84,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Engineered for lightweight comfort, responsive cushioning, breathable mesh upper, and high-traction rubber outsole designed for marathon miles or daily walks.',
    specs: {
      'Sole Material': 'CloudFoam + Grip Rubber',
      'Upper': 'Breathable Engineered Mesh',
      'Sizes': 'US 7 - 13',
      'Closure': 'Lace-up'
    },
    stock: 62,
    featured: true,
    sku: 'SN-FASH-003'
  },
  {
    id: 'prod-4',
    name: 'Unisex Hoodie',
    category: 'fashion',
    categoryName: 'Fashion',
    price: 49.99,
    originalPrice: null,
    isSale: false,
    rating: 4.7,
    reviewsCount: 142,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Premium heavyweight cotton blend fleece hoodie with kangaroo pocket, double-lined hood, and tailored relaxed fit for cozy all-day warmth.',
    specs: {
      'Material': '80% Organic Cotton, 20% Polyester',
      'Fit': 'Relaxed Modern Cut',
      'Care': 'Machine Wash Cold',
      'Colors': 'Oatmeal Beige, Charcoal, Olive'
    },
    stock: 90,
    featured: true,
    sku: 'SN-FASH-004'
  },
  {
    id: 'prod-5',
    name: 'Modern Ergonomic Office Chair',
    category: 'home-living',
    categoryName: 'Home & Living',
    price: 219.99,
    originalPrice: 279.99,
    isSale: true,
    rating: 4.9,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1580481077198-c807542612f8?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1580481077198-c807542612f8?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'High-back mesh ergonomic office chair with dynamic lumbar support, 3D adjustable armrests, and 135-degree recline for ultimate work productivity.',
    specs: {
      'Weight Capacity': '300 lbs',
      'Mechanism': 'Multi-function Synchro-tilt',
      'Warranty': '5 Years'
    },
    stock: 19,
    featured: false,
    sku: 'SN-HOME-005'
  },
  {
    id: 'prod-6',
    name: 'Organic Botanical Skincare Serum',
    category: 'beauty',
    categoryName: 'Beauty',
    price: 38.50,
    originalPrice: 48.00,
    isSale: true,
    rating: 4.8,
    reviewsCount: 110,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Nourishing hyaluronic acid and vitamin C serum that revitalizes skin barrier, boosts hydration, and imparts a glowing, youthful radiance.',
    specs: {
      'Volume': '50ml / 1.7 fl oz',
      'Skin Type': 'All skin types, sensitive safe',
      'Certification': '100% Cruelty-Free & Vegan'
    },
    stock: 75,
    featured: false,
    sku: 'SN-BEAUTY-006'
  },
  {
    id: 'prod-7',
    name: 'Professional Pro-Grip Basketball',
    category: 'sports',
    categoryName: 'Sports',
    price: 34.99,
    originalPrice: null,
    isSale: false,
    rating: 4.5,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Official size 7 composite leather basketball with deep pebbled channels for superior moisture-wicking grip on indoor wood and outdoor asphalt courts.',
    specs: {
      'Size': 'Official Size 7 (29.5")',
      'Material': 'Composite Microfiber Leather',
      'Court Type': 'Indoor / Outdoor'
    },
    stock: 36,
    featured: false,
    sku: 'SN-SPORT-007'
  },
  {
    id: 'prod-8',
    name: 'Modern Minimalist Coffee Table',
    category: 'home-living',
    categoryName: 'Home & Living',
    price: 159.00,
    originalPrice: null,
    isSale: false,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=600&auto=format&fit=crop&q=80'
    ],
    description: 'Solid oak coffee table featuring soft rounded pill geometry, water-resistant matte finish, and sturdy tapered legs for modern living rooms.',
    specs: {
      'Dimensions': '42" L x 22" W x 18" H',
      'Material': 'Solid White Oak Wood',
      'Assembly': 'Easy 10-minute setup'
    },
    stock: 14,
    featured: false,
    sku: 'SN-HOME-008'
  }
];
