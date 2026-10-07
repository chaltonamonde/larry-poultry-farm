import React, { useState } from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Badge } from '../common/Badge';
import { PRODUCTS } from '../../data/products';
import { FARM_CONFIG } from '../../data/farmData';
import { X, ShoppingCart, MessageCircle, Check, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(product.minOrder || 1);

  // Cross-sell item
  const crossSellProduct = product.frequentlyBoughtTogetherId
    ? PRODUCTS.find(p => p.id === product.frequentlyBoughtTogetherId)
    : PRODUCTS.find(p => p.id !== product.id && p.category === 'feeds');

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello Larry Poultry Farm! I want to order ${quantity}x *${product.name}* (Total: KES ${(product.priceKes * quantity).toLocaleString()}). What is your next dispatch schedule?`
    );
    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddWithCrossSell = () => {
    addToCart(product, quantity, product.availability === 'pre-order');
    if (crossSellProduct) {
      addToCart(crossSellProduct, 1);
    }
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          width: 'min(100vw - 32px, 680px)',
          maxHeight: 'min(92vh, 880px)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 10,
            backgroundColor: 'var(--bg-input)',
            border: '1px solid var(--border-card)',
            color: 'var(--text-primary)',
            borderRadius: 'var(--radius-full)',
            width: '36px',
            height: '36px',
            minHeight: '36px',
            padding: 0
          }}
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Modal Header Image */}
        <div style={{ position: 'relative', width: '100%', height: '240px', backgroundColor: 'var(--bg-input)' }}>
          <img
            src={product.imageUrl}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', bottom: '12px', left: '16px', display: 'flex', gap: '8px' }}>
            <Badge type={product.availability} />
            <span
              style={{
                backgroundColor: 'rgba(13, 17, 23, 0.85)',
                color: 'var(--text-primary)',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                border: '1px solid var(--border-card)'
              }}
            >
              {product.packSize}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '24px' }}>
          <h2 id="product-modal-title" style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
            {product.name}
          </h2>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-green)' }}>
              KES {product.priceKes.toLocaleString()}
            </span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              per {product.unit} • {product.packSize}
            </span>
          </div>

          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px' }}>
            {product.description}
          </p>

          {/* Key Features */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '10px', color: 'var(--text-primary)' }}>
              Guaranteed Specifications:
            </h4>
            <div style={{ display: 'grid', gap: '8px' }}>
              {product.keyFeatures.map((feat, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.88rem' }}>
                  <Check size={16} color="var(--primary-green)" style={{ flexShrink: 0, marginTop: '3px' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pre-order Deposit Calculation Note if applicable */}
          {product.depositRequiredPercent && (
            <div
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                marginBottom: '20px'
              }}
            >
              <div style={{ fontWeight: 700, color: 'var(--accent-sky)', fontSize: '0.9rem', marginBottom: '4px' }}>
                Pre-order Deposit Terms ({product.depositRequiredPercent}%)
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                A {product.depositRequiredPercent}% deposit of <strong>KES {Math.round((product.priceKes * quantity * product.depositRequiredPercent) / 100).toLocaleString()}</strong> secures your hatch slot. The remaining balance is payable upon farm pickup or dispatch.
              </p>
            </div>
          )}

          {/* Frequently Bought Together Box */}
          {crossSellProduct && (
            <div
              style={{
                backgroundColor: 'rgba(56, 189, 248, 0.05)',
                border: '1px dashed var(--accent-sky)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                marginBottom: '24px'
              }}
            >
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--accent-sky)', marginBottom: '8px' }}>
                Frequently Bought Together:
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    + {crossSellProduct.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    KES {crossSellProduct.priceKes.toLocaleString()} ({crossSellProduct.packSize})
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleAddWithCrossSell}
                  className="btn-secondary"
                  style={{ fontSize: '0.82rem', padding: '6px 12px', minHeight: '36px' }}
                >
                  Bundle Both
                </button>
              </div>
            </div>
          )}

          {/* Quantity Selector & Main Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Select Quantity:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => Math.max(product.minOrder || 1, prev - (product.category === 'chicks' ? 25 : 1)))}
                  className="btn-secondary"
                  style={{ width: '40px', height: '40px', minHeight: '40px', padding: 0 }}
                  aria-label="Decrease quantity"
                >
                  <Minus size={16} />
                </button>
                <span
                  style={{
                    minWidth: '50px',
                    textAlign: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem'
                  }}
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(prev => prev + (product.category === 'chicks' ? 25 : 1))}
                  className="btn-secondary"
                  style={{ width: '40px', height: '40px', minHeight: '40px', padding: 0 }}
                  aria-label="Increase quantity"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600, fontSize: '0.95rem', borderTop: '1px solid var(--border-card)', paddingTop: '10px' }}>
              <span>Total Value:</span>
              <span style={{ color: 'var(--primary-green)', fontWeight: 800, fontSize: '1.2rem' }}>
                KES {(product.priceKes * quantity).toLocaleString()}
              </span>
            </div>

            <div className="btn-group-responsive" style={{ gap: '10px', marginTop: '6px' }}>
              <button
                type="button"
                onClick={() => {
                  addToCart(product, quantity, product.availability === 'pre-order');
                  onClose();
                }}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                <ShoppingCart size={18} />
                Add {quantity} to Cart
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="btn-whatsapp"
                style={{ flex: 1 }}
              >
                <MessageCircle size={18} />
                Order via WhatsApp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
