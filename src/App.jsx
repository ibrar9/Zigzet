import React, { Suspense, lazy } from 'react';
import { useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNavBar } from './components/layout/MobileNavBar';

// Core Home sections (Eager loaded for instant first paint)
import { HeroBanner } from './components/home/HeroBanner';
import { TrustBadges } from './components/home/TrustBadges';
import { CategorySection } from './components/home/CategorySection';
import { PromoBanners } from './components/home/PromoBanners';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { ShippingCallout } from './components/home/ShippingCallout';

// Lazy-Loaded Sub Pages (Code-split for maximum performance)
const ShopPage = lazy(() => import('./pages/ShopPage').then((m) => ({ default: m.ShopPage })));
const CategoriesPage = lazy(() => import('./pages/CategoriesPage').then((m) => ({ default: m.CategoriesPage })));
const BrandsPage = lazy(() => import('./pages/BrandsPage').then((m) => ({ default: m.BrandsPage })));
const DealsPage = lazy(() => import('./pages/DealsPage').then((m) => ({ default: m.DealsPage })));
const TrackOrderPage = lazy(() => import('./pages/TrackOrderPage').then((m) => ({ default: m.TrackOrderPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

// Lazy-Loaded Full-Screen Management & Auth Views
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then((m) => ({ default: m.AdminPanel })));
const UserDashboard = lazy(() => import('./components/user/UserDashboard').then((m) => ({ default: m.UserDashboard })));
const UserLoginPage = lazy(() => import('./components/user/UserLoginPage').then((m) => ({ default: m.UserLoginPage })));

// Interactive Common Modals and Drawers
import { CartDrawer } from './components/common/CartDrawer';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { ProductQuickView } from './components/common/ProductQuickView';
import { CheckoutModal } from './components/common/CheckoutModal';
import { LiveSearchModal } from './components/common/LiveSearchModal';
import { NotifyModal } from './components/common/NotifyModal';
import { StoreAiChat } from './components/common/StoreAiChat';
import { Toast } from './components/common/Toast';
import { PageLoader } from './components/common/Skeleton';
import { SEOHead } from './components/common/SEOHead';

function App() {
  const { viewMode, currentPage, currentUser } = useStore();

  // Full-screen admin view (lazy loaded)
  if (viewMode === 'admin') {
    return (
      <Suspense fallback={<PageLoader />}>
        <SEOHead />
        <AdminPanel />
        <Toast />
      </Suspense>
    );
  }

  // Full-screen user dashboard (logged in - lazy loaded)
  if ((currentPage === 'user-dashboard' || currentPage === 'user' || currentPage === 'dashboard') && currentUser) {
    return (
      <Suspense fallback={<PageLoader />}>
        <SEOHead />
        <UserDashboard />
        <Toast />
      </Suspense>
    );
  }

  // Full-screen user login (not logged in - lazy loaded)
  if (currentPage === 'user-login' || currentPage === 'login' || ((currentPage === 'user-dashboard' || currentPage === 'user' || currentPage === 'dashboard') && !currentUser)) {
    return (
      <Suspense fallback={<PageLoader />}>
        <SEOHead />
        <UserLoginPage />
        <Toast />
      </Suspense>
    );
  }

  return (
    <div className="app-root">
      <SEOHead />
      <AnnouncementBar />
      <Header />
      <main>
        {currentPage === 'home' && (
          <>
            <HeroBanner />
            <TrustBadges />
            <CategorySection />
            <PromoBanners />
            <FeaturedProducts />
            <ShippingCallout />
          </>
        )}

        <Suspense fallback={<PageLoader />}>
          {currentPage === 'shop' && <ShopPage />}
          {currentPage === 'categories' && <CategoriesPage />}
          {currentPage === 'brands' && <BrandsPage />}
          {currentPage === 'deals' && <DealsPage />}
          {currentPage === 'track' && <TrackOrderPage />}
          {currentPage === 'track-order' && <TrackOrderPage />}
          {currentPage === 'about' && <AboutPage />}
          {currentPage === 'contact' && <ContactPage />}
        </Suspense>
      </main>
      <Footer />
      <MobileNavBar />
      <StoreAiChat />

      {/* Global Interactive Modals, Drawers & E-Commerce Triggers */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView />
      <CheckoutModal />
      <LiveSearchModal />
      <NotifyModal />
      <Toast />
    </div>
  );
}

export default App;
