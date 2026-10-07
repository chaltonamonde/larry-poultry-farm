import React from 'react';
import { useCart } from '../../context/CartContext';
import { DELIVERY_TOWNS, FARM_CONFIG } from '../../data/farmData';
import { FreeShippingBar } from '../shop/FreeShippingBar';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, MessageCircle, MapPin } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    selectedTown,
    setSelectedTown,
    subtotalKes,
    effectiveDeliveryFeeKes,
    grandTotalKes,
    depositTotalKes,
    setIsCheckoutModalOpen
  } = useCart();

  if (!isCartOpen) return null;

  const handleWhatsAppOrderSummary = () => {
    let orderText = `*LARRY POULTRY FARM ORDER INQUIRY*\n\n`;
    orderText += `*Delivery Destination:* ${selectedTown.name} (Fee: KES ${effectiveDeliveryFeeKes})\n\n`;
    orderText += `*Items Ordered:*\n`;
    cartItems.forEach((item, index) => {
      orderText += `${index + 1}. ${item.product.name} x ${item.quantity} ${item.product.unit}s = KES ${(item.product.priceKes * item.quantity).toLocaleString()}\n`;
    });
    orderText += `\n*Subtotal:* KES ${subtotalKes.toLocaleString()}`;
    orderText += `\n*Delivery Fee:* KES ${effectiveDeliveryFeeKes.toLocaleString()}`;
    orderText += `\n*Grand Total:* KES ${grandTotalKes.toLocaleString()}`;
    if (depositTotalKes > 0) {
      orderText += `\n*(Chick Reservation Deposit Required: KES ${depositTotalKes.toLocaleString()})*`;
    }
    orderText += `\n\nPlease confirm availability and delivery slot.`;

    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(orderText)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(5px)',
        zIndex: 1100,
        display: 'flex',
        justifyContent: 'flex-end',
        transition: 'opacity var(--transition-normal)'
      }}
      onClick={() => setIsCartOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-drawer-title"
    >
      <div
        style={{
          width: 'min(100vw, 420px)',
          height: '100dvh',
          backgroundColor: 'var(--bg-card)',
          borderLeft: '1px solid var(--border-card)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto'
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-card)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            backgroundColor: 'var(--bg-card)',
            zIndex: 10
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="var(--primary-green)" />
            <h2 id="cart-drawer-title" style={{ fontSize: '1.2rem', margin: 0 }}>
              Your Poultry Cart ({cartItems.length})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{
              padding: '6px',
              color: 'var(--text-muted)',
              minHeight: '36px',
              borderRadius: 'var(--radius-sm)'
            }}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        {cartItems.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '32px',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--bg-input)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
                border: '1px solid var(--border-card)'
              }}
            >
              <ShoppingBag size={32} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Your Cart is Empty</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '24px' }}>
              Add farm-fresh eggs, live or dressed broilers, day-old chicks, or feeds to your basket.
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="btn-primary"
              style={{ width: '100%', maxWidth: '240px' }}
            >
              Browse Catalogue
            </button>
          </div>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px' }}>
            {/* Free Shipping Bar */}
            <FreeShippingBar />

            {/* Cart Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
              {cartItems.map(item => (
                <div
                  key={item.product.id}
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    display: 'flex',
                    gap: '12px'
                  }}
                >
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: 'var(--radius-sm)',
                      objectFit: 'cover',
                      flexShrink: 0
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4
                        style={{
                          fontSize: '0.9rem',
                          color: 'var(--text-primary)',
                          margin: 0,
                          lineHeight: 1.2
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        style={{
                          color: 'var(--text-muted)',
                          padding: '2px',
                          minHeight: '28px',
                          marginLeft: '6px'
                        }}
                        aria-label="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0' }}>
                      {item.product.packSize}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: '8px'
                      }}
                    >
                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          backgroundColor: 'var(--bg-card)',
                          borderRadius: 'var(--radius-sm)',
                          border: '1px solid var(--border-card)',
                          padding: '2px 4px'
                        }}
                      >
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - (item.product.category === 'chicks' ? 25 : 1)
                            )
                          }
                          style={{ minHeight: '26px', padding: '2px 6px' }}
                          aria-label="Decrease"
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, minWidth: '24px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + (item.product.category === 'chicks' ? 25 : 1)
                            )
                          }
                          style={{ minHeight: '26px', padding: '2px 6px' }}
                          aria-label="Increase"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Price */}
                      <span style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '0.95rem' }}>
                        KES {(item.product.priceKes * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Delivery Destination Selector */}
            <div
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '12px',
                marginBottom: '16px'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: 'var(--accent-sky)',
                  marginBottom: '8px'
                }}
              >
                <MapPin size={15} />
                <span>Select Delivery Town / County</span>
              </div>
              <select
                value={selectedTown.id}
                onChange={e => {
                  const town = DELIVERY_TOWNS.find(t => t.id === e.target.value);
                  if (town) setSelectedTown(town);
                }}
                style={{ fontSize: '0.88rem', padding: '10px' }}
              >
                {DELIVERY_TOWNS.map(town => (
                  <option key={town.id} value={town.id}>
                    {town.name} — {town.feeKes === 0 ? 'FREE' : `KES ${town.feeKes}`}
                  </option>
                ))}
              </select>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '6px' }}>
                Estimated transit: {selectedTown.estimatedTransit}
              </div>
            </div>

            {/* Order Totals Summary */}
            <div
              style={{
                marginTop: 'auto',
                borderTop: '1px solid var(--border-card)',
                paddingTop: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Items Subtotal:</span>
                <span>KES {subtotalKes.toLocaleString()}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>
                  Delivery Fee ({selectedTown.county}):
                </span>
                <span>
                  {effectiveDeliveryFeeKes === 0 ? (
                    <strong style={{ color: 'var(--primary-green)' }}>FREE</strong>
                  ) : (
                    `KES ${effectiveDeliveryFeeKes.toLocaleString()}`
                  )}
                </span>
              </div>

              {depositTotalKes > 0 && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.88rem',
                    color: 'var(--accent-sky)',
                    fontWeight: 600,
                    backgroundColor: 'rgba(56, 189, 248, 0.08)',
                    padding: '6px 10px',
                    borderRadius: 'var(--radius-sm)'
                  }}
                >
                  <span>Chicks Pre-Order Deposit:</span>
                  <span>KES {depositTotalKes.toLocaleString()}</span>
                </div>
              )}

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  borderTop: '1px solid var(--border-card)',
                  paddingTop: '8px',
                  color: 'var(--text-primary)'
                }}
              >
                <span>Grand Total:</span>
                <span style={{ color: 'var(--primary-green)' }}>KES {grandTotalKes.toLocaleString()}</span>
              </div>

              {/* CTAs */}
              <div className="btn-group-responsive" style={{ gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutModalOpen(true);
                  }}
                  className="btn-primary"
                  style={{ width: '100%', fontSize: '0.95rem' }}
                >
                  <span>Proceed to M-Pesa Checkout</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrderSummary}
                  className="btn-whatsapp"
                  style={{ width: '100%', fontSize: '0.95rem' }}
                >
                  <MessageCircle size={18} />
                  <span>Send Order to WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
