import React from 'react';
import { Product } from '../../types';
import { Badge } from '../common/Badge';
import { useCart } from '../../context/CartContext';
import { ShoppingCart, MessageCircle, Info } from 'lucide-react';
import { FARM_CONFIG } from '../../data/farmData';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setSelectedProductForDetail } = useCart();

  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    const message = encodeURIComponent(
      `Hello Larry Poultry Farm! I would like to order: *${product.name}* (Price: KES ${product.priceKes.toLocaleString()} per ${product.packSize}). Please confirm availability and delivery to my location.`
    );
    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, product.minOrder || 1, product.availability === 'pre-order');
  };

  return (
    <article
      className="farm-card"
      onClick={() => setSelectedProductForDetail(product)}
      style={{ cursor: 'pointer', height: '100%', justifyContent: 'space-between' }}
    >
      <div>
        {/* Image Container with Badges */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '180px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            backgroundColor: 'var(--bg-input)',
            marginBottom: '14px'
          }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform var(--transition-normal)'
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: '8px',
              left: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              zIndex: 2
            }}
          >
            <Badge type={product.availability} />
            {product.isPopular && (
              <span
                style={{
                  backgroundColor: 'var(--primary-green)',
                  color: '#07130e',
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-full)',
                  width: 'fit-content'
                }}
              >
                Top Seller
              </span>
            )}
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
              backgroundColor: 'rgba(13, 17, 23, 0.85)',
              backdropFilter: 'blur(4px)',
              padding: '3px 8px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-card)',
              maxWidth: 'calc(100% - 24px)',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {product.packSize}
          </div>
        </div>

        {/* Product Title & Category */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
          <span
            style={{
              fontSize: '0.75rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: 'var(--accent-sky)',
              fontWeight: 700
            }}
          >
            {product.category}
          </span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedProductForDetail(product);
            }}
            style={{
              minHeight: '24px',
              padding: '2px 6px',
              color: 'var(--text-muted)',
              fontSize: '0.75rem'
            }}
            title="View full specs"
          >
            <Info size={14} /> Specs
          </button>
        </div>

        <h3
          style={{
            fontSize: '1.08rem',
            margin: '6px 0 8px 0',
            lineHeight: 1.3,
            color: 'var(--text-primary)'
          }}
        >
          {product.name}
        </h3>

        <p
          style={{
            fontSize: '0.85rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.4,
            marginBottom: '12px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}
        >
          {product.description}
        </p>

        {/* Price & Deposit Tag */}
        <div style={{ marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              KES {product.priceKes.toLocaleString()}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              / {product.unit}
            </span>
          </div>

          <div
            style={{
              fontSize: '0.72rem',
              color: 'var(--accent-sky)',
              marginTop: '2px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <span>[Verified Farm Price]</span>
            {product.minOrder > 1 && (
              <span style={{ color: 'var(--text-muted)' }}>• Min order: {product.minOrder} {product.unit}s</span>
            )}
          </div>

          {product.depositRequiredPercent && (
            <div
              style={{
                marginTop: '4px',
                fontSize: '0.75rem',
                color: 'var(--accent-sky)',
                fontWeight: 600
              }}
            >
              Deposit required: {product.depositRequiredPercent}% (KES{' '}
              {Math.round((product.priceKes * product.depositRequiredPercent) / 100).toLocaleString()})
            </div>
          )}
        </div>
      </div>

      {/* Button Actions - Responsive Stacking */}
      <div className="btn-group-responsive" style={{ marginTop: 'auto', gap: '8px' }}>
        <button
          type="button"
          onClick={handleAddToCart}
          className="btn-primary"
          style={{ width: '100%', fontSize: '0.9rem', padding: '10px 14px', minHeight: '44px', whiteSpace: 'normal' }}
        >
          <ShoppingCart size={16} />
          <span>{product.availability === 'pre-order' ? 'Pre-Order Now' : 'Add to Cart'}</span>
        </button>

        <button
          type="button"
          onClick={handleWhatsAppOrder}
          className="btn-whatsapp"
          style={{ width: '100%', fontSize: '0.9rem', padding: '10px 14px', minHeight: '44px', whiteSpace: 'normal' }}
        >
          <MessageCircle size={16} />
          <span>Order on WhatsApp</span>
        </button>
      </div>
    </article>
  );
};
