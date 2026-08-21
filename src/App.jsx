import React from 'react';
import { useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/layout/AnnouncementBar';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MobileNav } from './components/layout/MobileNav';

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

// Common Modals and Admin
import { CartDrawer } from './components/common/CartDrawer';
import { WishlistDrawer } from './components/common/WishlistDrawer';
import { ProductQuickView } from './components/common/ProductQuickView';
import { CheckoutModal } from './components/common/CheckoutModal';
import { LiveSearchModal } from './components/common/LiveSearchModal';
import { Toast } from './components/common/Toast';
import { AdminPanel } from './components/admin/AdminPanel';

function App() {
  const { viewMode, currentPage } = useStore();

  return (
    <div className="app-root">
      {viewMode === 'admin' ? (
        <AdminPanel />
      ) : (
        <>
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
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'contact' && <ContactPage />}
          </main>
          <Footer />
          <MobileNav />
        </>
      )}

      {/* Global Interactive Modals and Drawers */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductQuickView />
      <CheckoutModal />
      <LiveSearchModal />
      <Toast />
    </div>
  );
}

export default App;
