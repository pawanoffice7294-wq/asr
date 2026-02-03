import React from 'react';
import { Shirt, Cpu, QrCode, ShoppingBag, User, LogOut } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onOpenAuth, onOpenCart, cartCount, user, onLogout }) => {
  const tabs = [
    { id: 'home', icon: Shirt, label: 'Shop' },
    { id: 'customize', icon: Cpu, label: 'Create' },
    { id: 'scanner', icon: QrCode, label: 'QR' },
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="glass desktop-only" style={{
        position: 'fixed',
        top: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: '1200px',
        padding: '0.6rem 1.5rem',
        borderRadius: '50px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 1000
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            ASR
          </div>
          <span className="gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>ASR Enterprises</span>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1rem',
                borderRadius: '50px',
                background: activeTab === tab.id ? 'var(--primary)' : 'transparent',
                color: activeTab === tab.id ? 'white' : 'var(--text-muted)',
                boxShadow: activeTab === tab.id ? '0 0 15px var(--primary)' : 'none'
              }}
            >
              <tab.icon size={18} />
              <span style={{ fontSize: '0.9rem' }}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onOpenCart}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: 'var(--secondary)',
                color: 'white',
                fontSize: '0.7rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{user.name}</span>
              <button onClick={onLogout} style={{ color: '#ef4444' }}><LogOut size={20} /></button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.6rem 1.2rem',
                background: 'var(--surface-light)',
                borderRadius: '50px'
              }}
            >
              <User size={18} />
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <nav className="glass mobile-only" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '0.8rem 1.2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        borderTop: 'none',
        borderBottom: '1px solid var(--glass-border)',
        borderRadius: 0,
        height: '60px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '32px', height: '32px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.8rem' }}>ASR</div>
          <span className="gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'serif' }}>ASR Enterprises</span>
        </div>
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
          <button onClick={onOpenCart} style={{ position: 'relative', color: 'var(--text)' }}>
            <ShoppingBag size={24} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                background: 'var(--secondary)',
                color: 'white',
                fontSize: '0.6rem',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 'bold'
              }}>
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="glass mobile-only bottom-nav" style={{ borderRadius: 0 }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-item-insta ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon size={26} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            <span>{tab.label}</span>
          </button>
        ))}
        <button
          onClick={onOpenAuth}
          className="nav-item-insta"
        >
          <div style={{ width: '26px', height: '26px', borderRadius: '50%', border: '2px solid var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={16} />
          </div>
          <span>Profile</span>
        </button>
      </nav>
    </>
  );
};


export default Navbar;
