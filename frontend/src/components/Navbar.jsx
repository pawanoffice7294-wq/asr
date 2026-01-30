import React from 'react';
import { Shirt, Cpu, QrCode, ShoppingBag, User, LogOut } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onOpenAuth, onOpenCart, cartCount, user, onLogout }) => {
  const tabs = [
    { id: 'home', icon: Shirt, label: 'Collection' },
    { id: 'customize', icon: Cpu, label: 'Customize' },
    { id: 'scanner', icon: QrCode, label: 'Scanner' },
  ];

  return (
    <nav className="glass" style={{
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
        <span className="gradient-text" style={{ fontWeight: 'bold', fontSize: '1.2rem', display: 'none', md: 'block' }}>ASR Enterprises</span>
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
  );
};

export default Navbar;
