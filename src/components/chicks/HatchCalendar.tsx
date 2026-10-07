import React, { useState } from 'react';
import { CHICK_BATCHES } from '../../data/chickBatches';
import { ChickBatch } from '../../types';
import { PRODUCTS } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { Calendar, ShieldAlert, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';

export const HatchCalendar: React.FC = () => {
  const { addToCart, setIsCartOpen } = useCart();
  const [selectedBatch, setSelectedBatch] = useState<ChickBatch | null>(null);
  const [orderQty, setOrderQty] = useState<number>(50);

  const handleReserveBatch = (batch: ChickBatch) => {
    // Find matching chick product
    const matchingProduct =
      PRODUCTS.find(p => p.category === 'chicks' && p.name.toLowerCase().includes(batch.breedName.toLowerCase().split(' ')[0])) ||
      PRODUCTS.find(p => p.category === 'chicks')!;

    addToCart(matchingProduct, Math.max(batch.minOrderQty, orderQty), true, batch.id);
    setIsCartOpen(true);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '20px',
          width: '100%'
        }}
      >
        {CHICK_BATCHES.map(batch => {
          const depositPerChick = (batch.pricePerChickKes * batch.depositPercent) / 100;
          const minDeposit = depositPerChick * batch.minOrderQty;

          return (
            <div
              key={batch.id}
              className="farm-card"
              style={{
                borderColor: batch.status === 'few-left' ? 'var(--status-warning)' : 'var(--border-card)',
                height: '100%',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      backgroundColor: 'rgba(56, 189, 248, 0.1)',
                      color: 'var(--accent-sky)',
                      padding: '2px 8px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid rgba(56, 189, 248, 0.25)'
                    }}
                  >
                    Batch: {batch.breedCode}
                  </span>
                  <Badge type={batch.status === 'few-left' ? 'limited' : 'pre-order'} text={batch.status === 'few-left' ? 'Slots Filling Fast' : 'Hatch Open'} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Calendar size={18} color="var(--primary-green)" />
                  <span style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                    {batch.hatchDateFormatted}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {batch.breedName}
                </h3>

                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '14px', lineHeight: 1.4 }}>
                  {batch.notes}
                </p>

                {/* Key Stats Pill Box */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px',
                    marginBottom: '16px',
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '10px'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PRICE PER CHICK</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      KES {batch.pricePerChickKes}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>30% DEPOSIT</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-sky)' }}>
                      KES {depositPerChick}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>MINIMUM ORDER</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
                      {batch.minOrderQty} chicks
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>AVAILABLE SLOTS</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-green)' }}>
                      ~{batch.availableQty} chicks
                    </div>
                  </div>
                </div>

                {/* Vaccines included */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '6px', textTransform: 'uppercase' }}>
                    Vaccinations Included at Hatch:
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {batch.vaccinationStatus.map((vax, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        <ShieldCheck size={14} color="var(--primary-green)" />
                        <span>{vax}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                type="button"
                onClick={() => handleReserveBatch(batch)}
                className="btn-primary"
                style={{ width: '100%', fontSize: '0.92rem' }}
              >
                <span>Reserve with KES {minDeposit.toLocaleString()} Deposit</span>
                <ArrowRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
