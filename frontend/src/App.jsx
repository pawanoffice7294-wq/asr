import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Collection from './components/Collection';
import Customizer from './components/Customizer';
import Scanner from './components/Scanner';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';

function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Sync cart with local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('asr_cart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem('asr_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('asr_user');
  };

  const openCustomizer = (product) => {
    setSelectedProduct(product);
    setActiveTab('customize');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Collection onCustomize={openCustomizer} onAddToCart={addToCart} />;
      case 'customize':
        return <Customizer onAddToCart={addToCart} initialProduct={selectedProduct} onExit={() => setActiveTab('home')} />;
      case 'scanner':
        return <Scanner />;
      case 'admin':
        return user?.role === 'Admin' ? <AdminPanel /> : <Collection onCustomize={openCustomizer} onAddToCart={addToCart} />;
      case 'admin-login':
        return <AdminLogin onLogin={(u) => { setUser(u); setActiveTab('admin'); }} />;
      default:
        return <Collection onCustomize={openCustomizer} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="App">
      {activeTab !== 'customize' && activeTab !== 'admin-login' && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onOpenAuth={() => setIsAuthOpen(true)}
          onOpenCart={() => setIsCartOpen(true)}
          cartCount={cart.length}
          user={user}
          onLogout={handleLogout}
        />
      )}

      <main className="main-content" style={{ minHeight: '100vh' }}>
        {renderContent()}
      </main>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={(userData) => setUser(userData)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
      />

      <footer className="desktop-only" style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem', background: 'rgba(0,0,0,0.2)' }}>
        &copy; 2026 ASR Enterprises • Premium Customizable Clothing
        {!user && activeTab !== 'admin-login' && (
          <div style={{ marginTop: '1rem', fontSize: '0.7rem' }}>
            <span
              onClick={() => setActiveTab('admin-login')}
              style={{ cursor: 'pointer', opacity: 0.5 }}
            >
              Store Manager?
            </span>
          </div>
        )}
      </footer>
    </div>
  );
}

export default App;
