import React, { useState } from 'react';
import { ActivePage } from '../../types';
import { FARM_CONFIG, DELIVERY_TOWNS } from '../../data/farmData';
import { useToast } from '../../context/ToastContext';
import { ShieldCheck, Phone, Mail, MapPin, MessageCircle, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface FooterProps {
  setActivePage: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage }) => {
  const { addToast } = useToast();
  const [newsletterInput, setNewsletterInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterInput.trim()) return;
    setIsSubscribed(true);
    addToast({
      type: 'success',
      title: 'Discount Code Unlocked!',
      message: 'Use code POULTRY10 on WhatsApp or checkout for KES 100 off your first egg crate!'
    });
  };

  const navigateTo = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        backgroundColor: 'var(--bg-section-alt)',
        borderTop: '1px solid var(--border-card)',
        paddingTop: '64px',
        paddingBottom: 'calc(48px + var(--safe-bottom))',
        marginTop: 'auto',
        width: '100%'
      }}
    >
      <div className="container">
        {/* Customer List Signup Strip (Fixes Business Weakness #7) */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(20px, 4vw, 32px)',
            marginBottom: '48px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                fontWeight: 700,
                color: 'var(--accent-sky)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              Exclusive Kenyan Farmer VIP List
            </span>
            <h3 style={{ fontSize: 'clamp(1.2rem, 3vw, 1.6rem)', margin: 0 }}>
              Get Early Hatch Date Alerts & KES 100 Off Your First Order
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '640px', margin: 0 }}>
              Join 500+ farmers across Nairobi, Kiambu, and Nakuru who get chick batch notifications 48 hours before public booking opens.
            </p>
          </div>

          {isSubscribed ? (
            <div
              style={{
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid var(--primary-green)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              <CheckCircle2 color="var(--primary-green)" size={20} />
              <div style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                <strong>You are in!</strong> Your coupon code is <code style={{ color: 'var(--primary-green)', fontWeight: 800 }}>POULTRY10</code>. Quote this on WhatsApp or checkout!
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', maxWidth: '540px' }}>
              <input
                type="text"
                required
                value={newsletterInput}
                onChange={e => setNewsletterInput(e.target.value)}
                placeholder="Enter WhatsApp Number or Email"
                style={{ flex: 1, minWidth: '220px' }}
              />
              <button type="submit" className="btn-primary" style={{ minWidth: '150px' }}>
                <span>Claim KES 100 Voucher</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>

        {/* 4-Column Footer Navigation */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
            gap: '36px',
            marginBottom: '48px'
          }}
        >
          {/* Column 1: Farm Identity & Bio */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--brand-gradient)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ShieldCheck size={20} color="#ffffff" />
              </div>
              <h4 style={{ fontSize: '1.1rem', margin: 0 }}>Larry Poultry Farm</h4>
            </div>

            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px' }}>
              Specialist breeders of high-survivability improved Kienyeji and broiler chicks, daily table eggs, and nutrient-dense poultry feeds in Kenya.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              <div>{FARM_CONFIG.locationText}</div>
              <div>Operating: {FARM_CONFIG.operatingHours.weekdays}</div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Farm Products
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: 'auto' }}
              >
                Fresh Table & Kienyeji Eggs
              </button>
              <button
                type="button"
                onClick={() => navigateTo('chicks')}
                style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: 'auto' }}
              >
                Day-Old Chicks (Hatch Calendar)
              </button>
              <button
                type="button"
                onClick={() => navigateTo('shop')}
                style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: 'auto' }}
              >
                Live & Dressed Broilers
              </button>
              <button
                type="button"
                onClick={() => navigateTo('wholesale')}
                style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: 'auto' }}
              >
                Hotels & Supermarket Wholesale
              </button>
              <button
                type="button"
                onClick={() => navigateTo('advice')}
                style={{ justifyContent: 'flex-start', padding: 0, color: 'var(--text-secondary)', fontSize: '0.88rem', minHeight: 'auto' }}
              >
                Vaccination & Feeding Advice
              </button>
            </div>
          </div>

          {/* Column 3: Counties Served */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Delivery Hubs
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {DELIVERY_TOWNS.slice(0, 6).map(town => (
                <div key={town.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{town.name.split('(')[0]}</span>
                  <span style={{ color: town.feeKes === 0 ? 'var(--primary-green)' : 'var(--text-muted)' }}>
                    {town.feeKes === 0 ? 'FREE' : `KES ${town.feeKes}`}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Verification */}
          <div>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '14px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Direct Farm Desk
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=Hello%20Larry%20Poultry%20Farm`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#25d366', fontSize: '0.88rem', fontWeight: 600 }}
              >
                <MessageCircle size={16} />
                <span>WhatsApp: {FARM_CONFIG.whatsappDisplay}</span>
              </a>

              <a
                href={`tel:${FARM_CONFIG.phoneRaw}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)', fontSize: '0.88rem' }}
              >
                <Phone size={16} />
                <span>Phone: {FARM_CONFIG.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${FARM_CONFIG.email}`}
                style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.88rem' }}
              >
                <Mail size={16} />
                <span>{FARM_CONFIG.email}</span>
              </a>

              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '8px 10px',
                  fontSize: '0.78rem',
                  color: 'var(--accent-sky)',
                  marginTop: '4px'
                }}
              >
                Reply Promise: {FARM_CONFIG.replyTimePromise}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal, Policies, and Architecture Notice */}
        <div
          style={{
            borderTop: '1px solid var(--border-card)',
            paddingTop: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Larry Poultry Farm Kenya. Phase 1 Architecture (Phase 2 Node/Express + Daraja Ready).
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigateTo('policies')}
              style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minHeight: 'auto', padding: 0 }}
            >
              Delivery & Mortality Guarantee
            </button>
            <button
              onClick={() => navigateTo('policies')}
              style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minHeight: 'auto', padding: 0 }}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => navigateTo('policies')}
              style={{ color: 'var(--text-muted)', fontSize: '0.8rem', minHeight: 'auto', padding: 0 }}
            >
              Terms of Supply
            </button>
            <button
              onClick={() => navigateTo('admin')}
              style={{
                color: 'var(--primary-green)',
                fontWeight: 700,
                fontSize: '0.8rem',
                minHeight: 'auto',
                padding: '2px 8px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.3)'
              }}
              title="Access Larry Poultry Farm Manager ERP (Finances, Orders, Messages)"
            >
              🔒 Farm Manager ERP (PIN: 1234)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
