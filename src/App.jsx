import React from 'react';
import { useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNavBar } from './components/layout/MobileNavBar';

// Home sections
import { HeroBanner } from './components/home/HeroBanner';
import { TrustBadges } from './components/home/TrustBadges';
import { CategorySection } from './components/home/CategorySection';
import { PromoBanners } from './components/home/PromoBanners';
import { FeaturedProducts } from './components/home/FeaturedProducts';
import { ShippingCallout } from './components/home/ShippingCallout';

// Sub Pages
import { ShopPage } from './pages/ShopPage';
import { CategoriesPage } from './pages/CategoriesPage';
import { DealsPage } from './pages/DealsPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

// Common Modals, Assistant and Admin
import { CartDrawer } from './components/common/CartDrawer';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { ProductQuickView } from './components/common/ProductQuickView';
import { CheckoutModal } from './components/common/CheckoutModal';
import { LiveSearchModal } from './components/common/LiveSearchModal';
import { NotifyModal } from './components/common/NotifyModal';
import { StoreAiChat } from './components/common/StoreAiChat';
import { Toast } from './components/common/Toast';
import { AdminPanel } from './components/admin/AdminPanel';

// User Dashboard & Auth
import { UserDashboard } from './components/user/UserDashboard';
import { UserLoginPage } from './components/user/UserLoginPage';

function App() {
  const { viewMode, currentPage, currentUser } = useStore();

  // Full-screen admin view
  if (viewMode === 'admin') {
    return (
      <>
        <AdminPanel />
        <Toast />
      </>
    );
  }

  // Full-screen user dashboard (logged in)
  if (currentPage === 'user-dashboard' && currentUser) {
    return (
      <>
        <UserDashboard />
        <Toast />
      </>
    );
  }

  // Full-screen user login (not logged in)
  if (currentPage === 'user-login' || (currentPage === 'user-dashboard' && !currentUser)) {
    return (
      <>
        <UserLoginPage />
        <Toast />
      </>
    );
  }

  return (
    <div className="app-root">
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

        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'categories' && <CategoriesPage />}
        {currentPage === 'deals' && <DealsPage />}
        {currentPage === 'track' && <TrackOrderPage />}
        {currentPage === 'track-order' && <TrackOrderPage />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
      <MobileNavBar />
      <StoreAiChat />

      {/* Global Interactive Modals and Drawers */}
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
