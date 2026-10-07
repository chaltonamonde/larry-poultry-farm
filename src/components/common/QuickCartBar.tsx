import React from 'react';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, ArrowRight } from 'lucide-react';

export const QuickCartBar: React.FC = () => {
  const { totalItemsCount, subtotalKes, isCartOpen, setIsCartOpen, isCheckoutModalOpen } = useCart();

  if (totalItemsCount === 0 || isCartOpen || isCheckoutModalOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 'calc(16px + var(--safe-bottom))',
        left: '16px',
        right: '84px', // Keeps space clear for StickyWhatsApp button on the right
        zIndex: 970,
        maxWidth: '480px'
      }}
    >
      <div
        onClick={() => setIsCartOpen(true)}
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--primary-green)',
          borderRadius: 'var(--radius-full)',
          padding: '8px 16px',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          animation: 'fadeIn 200ms ease'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              backgroundColor: 'var(--primary-green)',
              color: '#07130e',
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: '0.85rem'
            }}
          >
            {totalItemsCount}
          </div>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Cart Subtotal</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              KES {subtotalKes.toLocaleString()}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-sky)', fontSize: '0.85rem', fontWeight: 700 }}>
          <span>Checkout</span>
          <ArrowRight size={16} />
        </div>
      </div>
    </div>
  );
};
