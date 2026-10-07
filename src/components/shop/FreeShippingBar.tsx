import React from 'react';
import { useCart } from '../../context/CartContext';
import { Truck, CheckCircle2 } from 'lucide-react';
import { FARM_CONFIG } from '../../data/farmData';

export const FreeShippingBar: React.FC = () => {
  const {
    subtotalKes,
    amountToFreeDelivery,
    freeDeliveryProgressPercent,
    isFreeDeliveryEligible
  } = useCart();

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-md)',
        padding: '12px 16px',
        width: '100%',
        marginBottom: '16px'
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '8px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
          {isFreeDeliveryEligible ? (
            <>
              <CheckCircle2 size={18} color="var(--primary-green)" />
              <span style={{ color: 'var(--primary-green)' }}>
                Congratulations! You qualified for Free Town Delivery!
              </span>
            </>
          ) : (
            <>
              <Truck size={18} color="var(--accent-sky)" />
              <span style={{ color: 'var(--text-primary)' }}>
                Add <strong style={{ color: 'var(--accent-sky)' }}>KES {amountToFreeDelivery.toLocaleString()}</strong> more for Free Delivery
              </span>
            </>
          )}
        </div>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Threshold: KES {FARM_CONFIG.freeDeliveryThresholdKes.toLocaleString()}
        </span>
      </div>

      {/* Progress Track */}
      <div
        style={{
          width: '100%',
          height: '8px',
          backgroundColor: 'var(--bg-input)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden'
        }}
        role="progressbar"
        aria-valuenow={subtotalKes}
        aria-valuemin={0}
        aria-valuemax={FARM_CONFIG.freeDeliveryThresholdKes}
      >
        <div
          style={{
            height: '100%',
            width: `${freeDeliveryProgressPercent}%`,
            background: isFreeDeliveryEligible
              ? 'var(--primary-green)'
              : 'var(--brand-gradient)',
            borderRadius: 'var(--radius-full)',
            transition: 'width 300ms ease'
          }}
        />
      </div>
    </div>
  );
};
