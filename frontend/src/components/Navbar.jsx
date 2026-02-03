import { Shirt, Cpu, QrCode, ShoppingBag, User, LogOut, Shield, Lock } from 'lucide-react';

const Navbar = ({ activeTab, setActiveTab, onOpenAuth, onOpenCart, cartCount, user, onLogout }) => {
  const tabs = [
    { id: 'home', icon: Shirt, label: 'Shop' },
    { id: 'customize', icon: Cpu, label: 'Create' },
    { id: 'scanner', icon: QrCode, label: 'QR' },
  ];

  if (user?.role === 'Admin') {
    tabs.push({ id: 'admin', icon: Shield, label: 'Admin' });
  }

  return (
    <>
      {/* Desktop Navbar */}
      {/* Desktop Navbar */}
      <nav className="glass desktop-only" style={{
        position: 'fixed',
        top: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        width: 'auto',
        minWidth: '600px',
        padding: '0.8rem 2rem',
        borderRadius: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '3rem',
        zIndex: 1000,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }} onClick={() => setActiveTab('home')}>
          <div style={{ width: '36px', height: '36px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.9rem', color: 'white' }}>
            A
          </div>
          <span className="gradient-text" style={{ fontWeight: '800', fontSize: '1.1rem', letterSpacing: '-0.5px' }}>ASR</span>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.6rem 1.2rem',
                borderRadius: '50px',
                background: activeTab === tab.id ? 'var(--glass-heavy)' : 'transparent',
                color: activeTab === tab.id ? 'var(--text)' : 'var(--text-muted)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <tab.icon size={18} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
              <span style={{ fontSize: '0.9rem', fontWeight: activeTab === tab.id ? '700' : '500' }}>{tab.label}</span>
              {activeTab === tab.id && (
                <div style={{ position: 'absolute', bottom: 0, left: '20%', right: '20%', height: '2px', background: 'var(--primary)', boxShadow: '0 0 10px var(--primary)' }}></div>
              )}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button
            onClick={onOpenCart}
            style={{ position: 'relative', color: 'var(--text-muted)', transition: 'var(--transition)' }}
            onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <ShoppingBag size={22} />
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--secondary)',
                color: 'white',
                fontSize: '0.65rem',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '900'
              }}>
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <button onClick={onLogout} className="glass" style={{ padding: '0.5rem', borderRadius: '50%' }}>
              <LogOut size={18} />
            </button>
          ) : (
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              <div
                style={{ position: 'relative' }}
                title="Admin Access"
              >
                <button
                  onClick={() => setActiveTab('admin-login')}
                  className="glass"
                  style={{
                    padding: '0.6rem 1.2rem',
                    borderRadius: '50px',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid var(--secondary)',
                    color: 'var(--secondary)',
                    fontWeight: '700',
                    boxShadow: '0 0 15px rgba(236, 72, 153, 0.15)'
                  }}
                >
                  <Lock size={16} /> Admin
                </button>
              </div>
              <button
                onClick={onOpenAuth}
                className="glass"
                style={{ padding: '0.6rem 1.5rem', borderRadius: '50px', fontSize: '0.85rem' }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </nav>

      <nav className="glass mobile-only" style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        padding: '0.6rem 1.2rem',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        borderBottom: '1px solid var(--glass-border)',
        borderRadius: 0,
        height: '60px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <div style={{ width: '30px', height: '30px', background: 'var(--primary)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '0.75rem', color: 'white' }}>A</div>
          <span className="gradient-text" style={{ fontWeight: '800', fontSize: '1.2rem' }}>ASR</span>
        </div>
        <button onClick={onOpenCart} style={{ position: 'relative', color: 'var(--text)' }}>
          <ShoppingBag size={22} />
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
              fontWeight: '900'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* Mobile Bottom Bar */}
      <nav className="glass-heavy mobile-only bottom-nav" style={{ overflow: 'hidden' }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              color: activeTab === tab.id ? 'var(--primary)' : 'var(--text-muted)',
              background: 'transparent',
              transition: 'var(--transition)'
            }}
          >
            <div style={{
              padding: '8px 16px',
              borderRadius: '20px',
              background: activeTab === tab.id ? 'var(--primary-glow)' : 'transparent',
              display: 'flex',
              alignItems: 'center'
            }}>
              <tab.icon size={22} strokeWidth={activeTab === tab.id ? 2.5 : 2} />
            </div>
          </button>
        ))}
        <button
          onClick={onOpenAuth}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-muted)',
            background: 'transparent'
          }}
        >
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={14} />
          </div>
        </button>
      </nav>
    </>
  );
};


export default Navbar;
