import React, { useState } from 'react';
import { ActivePage } from '../../types';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAdmin } from '../../context/AdminContext';
import { FARM_CONFIG } from '../../data/farmData';
import { ShoppingCart, Menu, X, Phone, MessageCircle, Moon, Sun, Sparkles, MapPin, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const { orders, messages } = useAdmin();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const pendingOrders = orders.filter(o => o.status === 'pending' || o.status === 'processing').length;
  const unreadMessages = messages.filter(m => m.status === 'unread').length;
  const adminNotificationCount = pendingOrders + unreadMessages;

  const navLinks: { page: ActivePage; label: string; badge?: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'shop', label: 'Shop & Prices', badge: 'Live Stock' },
    { page: 'chicks', label: 'Chicks & Hatch Dates', badge: 'Pre-Order' },
    { page: 'wholesale', label: 'Wholesale' },
    { page: 'advice', label: 'Poultry Advice' },
    { page: 'about', label: 'About Farm' },
    { page: 'contact', label: 'Contact & Delivery' }
  ];

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 1000, width: '100%' }}>
      {/* Top Banner Announcement Strip */}
      <div
        style={{
          backgroundColor: 'var(--bg-section-alt)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '6px 16px',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={13} color="var(--primary-green)" />
            <span>Farm Gate & Town Deliveries: Nairobi, Kiambu, Thika, Nakuru & Upcountry</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ color: 'var(--accent-sky)' }}>
              Promise: {FARM_CONFIG.replyTimePromise}
            </span>
            <a
              href={`tel:${FARM_CONFIG.phoneRaw}`}
              style={{ color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <Phone size={12} />
              <span>{FARM_CONFIG.phoneDisplay.split('[')[0].trim()}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        style={{
          backgroundColor: 'var(--bg-page)',
          borderBottom: '1px solid var(--border-card)',
          backdropFilter: 'blur(10px)',
          width: '100%'
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '68px',
            gap: '12px'
          }}
        >
          {/* Brand Logo */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              textAlign: 'left',
              padding: 0,
              minHeight: 'auto'
            }}
          >
            {/* Custom SVG Rooster / Egg Agribusiness Crest */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--brand-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'var(--shadow-green-glow)',
                flexShrink: 0
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 2C8.5 2 6 5 6 9C6 14.5 12 21 12 21C12 21 18 14.5 18 9C18 5 15.5 2 12 2Z"
                  fill="#ffffff"
                  fillOpacity="0.25"
                />
                <circle cx="12" cy="11" r="5" fill="#ffffff" />
                <path d="M12 6L14 10H10L12 6Z" fill="#22c55e" />
              </svg>
            </div>
            <div>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                  display: 'block',
                  lineHeight: 1.1,
                  whiteSpace: 'nowrap'
                }}
              >
                Larry Poultry Farm
              </span>
              <span
                className="hide-on-very-small"
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                  fontWeight: 600
                }}
              >
                Kenyan Agribusiness • Biosecure
              </span>
            </div>
          </button>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '6px'
            }}
            className="desktop-nav"
          >
            {navLinks.map(link => {
              const isActive = activePage === link.page;
              return (
                <button
                  key={link.page}
                  type="button"
                  onClick={() => handleNavClick(link.page)}
                  style={{
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-sm)',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'var(--primary-green)' : 'var(--text-secondary)',
                    backgroundColor: isActive ? 'rgba(34, 197, 94, 0.1)' : 'transparent',
                    border: isActive ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid transparent',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    minHeight: '38px'
                  }}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span
                      style={{
                        fontSize: '0.68rem',
                        padding: '1px 5px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: link.badge === 'Pre-Order' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                        color: link.badge === 'Pre-Order' ? 'var(--accent-sky)' : 'var(--primary-green)',
                        fontWeight: 700
                      }}
                    >
                      {link.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Action Icons & Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {/* Theme Toggle Button */}
            <button
              type="button"
              onClick={toggleTheme}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                color: 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 10px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '38px'
              }}
              title="Toggle Dark Grey / Dark Green theme"
              aria-label="Toggle Theme"
            >
              {theme === 'dark-grey' ? (
                <>
                  <Moon size={15} color="var(--accent-sky)" />
                  <span className="hide-on-very-small">Dark Grey</span>
                </>
              ) : (
                <>
                  <Sun size={15} color="var(--primary-green)" />
                  <span className="hide-on-very-small">Dark Green</span>
                </>
              )}
            </button>

            {/* Farm Manager Portal Button */}
            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              style={{
                backgroundColor: activePage === 'admin' ? 'rgba(34, 197, 94, 0.2)' : 'var(--bg-card)',
                border: activePage === 'admin' ? '1px solid var(--primary-green)' : '1px solid var(--border-card)',
                color: activePage === 'admin' ? 'var(--primary-green)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 10px',
                fontSize: '0.78rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '38px',
                position: 'relative'
              }}
              title="Farm Operations & Admin ERP"
              aria-label="Farm Manager Admin Portal"
            >
              <ShieldCheck size={16} color="var(--primary-green)" />
              <span className="hide-on-very-small" style={{ fontWeight: 600 }}>Manager</span>
              {adminNotificationCount > 0 && (
                <span
                  style={{
                    backgroundColor: '#ef4444',
                    color: '#ffffff',
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    minWidth: '18px',
                    height: '18px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px'
                  }}
                  title={`${adminNotificationCount} pending orders / unread messages`}
                >
                  {adminNotificationCount}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                minHeight: '38px',
                color: 'var(--text-primary)',
                position: 'relative'
              }}
              aria-label="View Shopping Cart"
            >
              <ShoppingCart size={18} color="var(--primary-green)" />
              <span className="hide-on-very-small" style={{ fontWeight: 700, fontSize: '0.88rem' }}>Cart</span>
              {totalItemsCount > 0 && (
                <span
                  style={{
                    backgroundColor: 'var(--primary-green)',
                    color: '#07130e',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    borderRadius: 'var(--radius-full)',
                    minWidth: '20px',
                    height: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0 4px'
                  }}
                >
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="mobile-menu-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                padding: '8px',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                minHeight: '38px',
                width: '38px'
              }}
              aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            borderBottom: '2px solid var(--primary-green)',
            padding: '16px 20px',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: 'calc(100vh - 120px)',
            overflowY: 'auto'
          }}
        >
          {navLinks.map(link => {
            const isActive = activePage === link.page;
            return (
              <button
                key={link.page}
                type="button"
                onClick={() => handleNavClick(link.page)}
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: isActive ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-input)',
                  border: `1px solid ${isActive ? 'var(--primary-green)' : 'var(--border-card)'}`,
                  color: isActive ? 'var(--primary-green)' : 'var(--text-primary)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.95rem'
                }}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: link.badge === 'Pre-Order' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(34, 197, 94, 0.2)',
                      color: link.badge === 'Pre-Order' ? 'var(--accent-sky)' : 'var(--primary-green)',
                      fontWeight: 700
                    }}
                  >
                    {link.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Mobile Admin ERP Portal Link */}
          <button
            type="button"
            onClick={() => handleNavClick('admin')}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: activePage === 'admin' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(34, 197, 94, 0.08)',
              border: '1px solid var(--primary-green)',
              color: 'var(--primary-green)',
              fontWeight: 700,
              fontSize: '0.95rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShieldCheck size={18} />
              <span>Farm Operations & Admin ERP</span>
            </div>
            {adminNotificationCount > 0 && (
              <span
                style={{
                  backgroundColor: '#ef4444',
                  color: '#ffffff',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 8px'
                }}
              >
                {adminNotificationCount}
              </span>
            )}
          </button>

          <div
            style={{
              borderTop: '1px solid var(--border-card)',
              paddingTop: '14px',
              marginTop: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Color Palette:</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="btn-secondary"
                style={{ minHeight: '34px', padding: '6px 12px', fontSize: '0.8rem' }}
              >
                Active: {theme === 'dark-grey' ? 'Dark Grey' : 'Dark Green'} (Tap to Switch)
              </button>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <a
                href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=Hello%20Larry%20Poultry%20Farm`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
                style={{ flex: 1, minHeight: '40px', fontSize: '0.85rem' }}
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href={`tel:${FARM_CONFIG.phoneRaw}`}
                className="btn-secondary"
                style={{ flex: 1, minHeight: '40px', fontSize: '0.85rem' }}
              >
                <Phone size={16} />
                Call Farm
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Media query helper styles */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .hide-on-very-small {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
};
