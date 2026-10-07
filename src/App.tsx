import React, { useState } from 'react';
import { ActivePage } from './types';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { StickyWhatsApp } from './components/common/StickyWhatsApp';
import { QuickCartBar } from './components/common/QuickCartBar';
import { ToastContainer } from './components/common/Toast';
import { ProductModal } from './components/shop/ProductModal';
import { CartDrawer } from './components/checkout/CartDrawer';
import { CheckoutModal } from './components/checkout/CheckoutModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ChicksPage } from './pages/ChicksPage';
import { WholesalePage } from './pages/WholesalePage';
import { AdvicePage } from './pages/AdvicePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PoliciesPage } from './pages/PoliciesPage';

const MainAppContent: React.FC = () => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const { selectedProductForDetail, setSelectedProductForDetail } = useCart();

  const handlePageChange = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      <main style={{ flex: 1, width: '100%' }}>
        {activePage === 'home' && <HomePage setActivePage={handlePageChange} />}
        {activePage === 'shop' && <ShopPage setActivePage={handlePageChange} />}
        {activePage === 'chicks' && <ChicksPage setActivePage={handlePageChange} />}
        {activePage === 'wholesale' && <WholesalePage setActivePage={handlePageChange} />}
        {activePage === 'advice' && <AdvicePage setActivePage={handlePageChange} />}
        {activePage === 'about' && <AboutPage setActivePage={handlePageChange} />}
        {activePage === 'contact' && <ContactPage setActivePage={handlePageChange} />}
        {activePage === 'policies' && <PoliciesPage setActivePage={handlePageChange} />}
      </main>

      <Footer setActivePage={handlePageChange} />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      {selectedProductForDetail && (
        <ProductModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
        />
      )}

      {/* Sticky Action Elements */}
      <QuickCartBar />
      <StickyWhatsApp />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <ToastProvider>
      <ThemeProvider>
        <CartProvider>
          <MainAppContent />
        </CartProvider>
      </ThemeProvider>
    </ToastProvider>
  );
}

export default App;
