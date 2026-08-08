import React, { useState, useEffect } from 'react';
import type { PageRoute, User } from '../types';
import { Menu, X, ArrowRight, ShoppingCart, LogIn, LogOut, Package } from 'lucide-react';

interface NavbarProps {
  activePage: PageRoute;
  onNavigate: (page: PageRoute, targetId?: string) => void;
  cartCount?: number;
  user?: User | null;
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activePage,
  onNavigate,
  cartCount = 0,
  user,
  onLogout,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string; page: PageRoute }[] = [
    { name: 'Home', page: 'home' },
    { name: 'Products', page: 'products' },
    { name: 'Services', page: 'services' },
    { name: 'Portfolio', page: 'portfolio' },
    { name: 'Blog', page: 'blog' },
    { name: 'About Us', page: 'about' },
  ];

  const handleNavClick = (page: PageRoute) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        backgroundColor: isScrolled ? '#FFFFFF' : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        boxShadow: isScrolled ? '0 4px 20px rgba(33, 55, 47, 0.08)' : 'none',
        borderBottom: isScrolled ? '1px solid #DCE8D3' : '1px solid transparent',
        transition: 'all 0.35s ease',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '80px' }}>
        
        {/* Brand Logo with Infinity Symbol */}
        <button
          onClick={() => handleNavClick('home')}
          aria-label="Infinity Tech Homepage"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#899255" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 12c-2-2.5-4-4-6.5-4A4.5 4.5 0 0 0 1 12.5 4.5 4.5 0 0 0 5.5 17C8 17 10 14.5 12 12zm0 0c2 2.5 4 4 6.5 4a4.5 4.5 0 0 0 4.5-4.5 4.5 4.5 0 0 0-4.5-4.5C16 7 14 9.5 12 12z" />
          </svg>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: '#21372F', letterSpacing: '-0.02em', lineHeight: 1 }}>
              Infinity<span style={{ color: '#899255' }}>Tech</span>
            </span>
            <span style={{ fontSize: '0.65rem', fontWeight: 600, color: '#5F685F', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              Digital Solutions
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{ display: 'none', alignItems: 'center', gap: '2rem' }}>
          {navLinks.map((link) => {
            const isActive = activePage === link.page;
            return (
              <button
                key={link.page}
                onClick={() => handleNavClick(link.page)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.95rem',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#899255' : '#21372F',
                  cursor: 'pointer',
                  padding: '0.4rem 0',
                  position: 'relative',
                  transition: 'color 0.2s ease',
                }}
              >
                {link.name}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#899255',
                      borderRadius: '2px',
                    }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Desktop Right CTA */}
        <div className="desktop-cta" style={{ display: 'none', alignItems: 'center', gap: '0.85rem' }}>
          
          {/* User Auth Profile / Login Button */}
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.35rem 0.8rem 0.35rem 0.35rem',
                  borderRadius: '999px',
                  backgroundColor: '#F0F5ED',
                  border: '1px solid #DCE8D3',
                  cursor: 'pointer',
                }}
              >
                <img src={user.avatar} alt={user.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#21372F' }}>{user.name}</span>
              </button>

              {userDropdownOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '120%',
                    right: 0,
                    width: '210px',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    boxShadow: '0 12px 35px rgba(33,55,47,0.15)',
                    border: '1px solid #DCE8D3',
                    padding: '0.5rem',
                    zIndex: 110,
                  }}
                >
                  <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid #F0F5ED', marginBottom: '0.35rem' }}>
                    <div style={{ fontSize: '0.75rem', color: '#899255', fontWeight: 700, textTransform: 'uppercase' }}>MySQL Member</div>
                    <div style={{ fontSize: '0.85rem', color: '#21372F', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.email}</div>
                  </div>
                  <button
                    onClick={() => handleNavClick('my-products')}
                    style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'none', background: 'none', textAlign: 'left', fontSize: '0.88rem', fontWeight: 700, color: '#21372F', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                  >
                    <Package size={16} style={{ color: '#899255' }} /> My Purchased Products
                  </button>
                  {onLogout && (
                    <button
                      onClick={() => { onLogout(); setUserDropdownOpen(false); }}
                      style={{ width: '100%', padding: '0.6rem 0.75rem', border: 'none', background: 'none', textAlign: 'left', fontSize: '0.88rem', fontWeight: 600, color: '#E53935', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                    >
                      <LogOut size={16} /> Sign Out
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleNavClick('login')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.1rem',
                borderRadius: '10px',
                backgroundColor: '#F0F5ED',
                color: '#21372F',
                border: '1px solid #DCE8D3',
                fontSize: '0.88rem',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              <LogIn size={16} style={{ color: '#899255' }} /> Sign In / Register
            </button>
          )}

          <button
            onClick={() => handleNavClick('my-products')}
            aria-label="My Workspace & Cart"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '42px',
              height: '42px',
              borderRadius: '10px',
              backgroundColor: activePage === 'my-products' ? '#899255' : '#F0F5ED',
              color: activePage === 'my-products' ? '#FFFFFF' : '#21372F',
              border: '1px solid #DCE8D3',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
            title="My Cart & Downloads"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: '#899255',
                  color: '#FFFFFF',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #FFFFFF',
                }}
              >
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className="btn btn-primary"
            style={{ padding: '0.7rem 1.4rem', fontSize: '0.9rem' }}
          >
            Let's Talk <ArrowRight size={16} />
          </button>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="mobile-toggle"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '42px',
            height: '42px',
            borderRadius: '8px',
            background: '#F0F5ED',
            border: '1px solid #DCE8D3',
            color: '#21372F',
            cursor: 'pointer',
          }}
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </div>

      {/* Mobile Animated Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '80px',
            left: 0,
            right: 0,
            bottom: 0,
            height: 'calc(100vh - 80px)',
            backgroundColor: '#FFFFFF',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2rem 1.5rem',
            overflowY: 'auto',
            animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {navLinks.map((link) => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '1.35rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? '#899255' : '#21372F',
                    padding: '0.75rem 0',
                    borderBottom: '1px solid #F0F5ED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#899255' }} />}
                </button>
              );
            })}
          </div>

          <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button
              onClick={() => handleNavClick('contact')}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', fontSize: '1rem' }}
            >
              Let's Talk <ArrowRight size={18} />
            </button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#5F685F' }}>
              Endless Possibilities, Infinite Solutions
            </p>
          </div>
        </div>
      )}

      {/* Desktop Responsive Query Inline Styles */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>
    </header>
  );
};
