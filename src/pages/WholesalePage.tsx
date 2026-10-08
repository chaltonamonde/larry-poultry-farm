import React from 'react';
import { ActivePage } from '../types';
import { WholesaleQuoteForm } from '../components/wholesale/WholesaleQuoteForm';
import { FARM_CONFIG } from '../data/farmData';
import { Building2, Truck, ShieldCheck, Clock, CheckCircle2, FileText, Phone, Award, Users } from 'lucide-react';

interface WholesalePageProps {
  setActivePage: (page: ActivePage) => void;
}

export const WholesalePage: React.FC<WholesalePageProps> = () => {
  const wholesalePerks = [
    {
      icon: <Truck size={24} color="var(--primary-green)" />,
      title: 'Reliable Standing Order Schedules',
      description: 'Scheduled weekly or bi-weekly deliveries directly to your loading bay or kitchen every Tuesday and Friday morning.'
    },
    {
      icon: <Award size={24} color="var(--accent-sky)" />,
      title: 'Consistent Grading & Calibration',
      description: 'Uniform egg sizing (Large/Extra Large) and broiler weights (1.3kg - 1.6kg dressed) so your kitchen portions remain exact.'
    },
    {
      icon: <FileText size={24} color="var(--status-warning)" />,
      title: 'ETR Invoicing & Health Cleared',
      description: 'Formal delivery notes, tax compliance ETR receipts, and Public Health veterinary meat inspection documentation.'
    },
    {
      icon: <Clock size={24} color="var(--primary-green)" />,
      title: '30-Minute Quote Reply Promise',
      description: 'Submit your requirements online and receive a formal company quotation via PDF and WhatsApp within half an hour.'
    }
  ];

  const targetSectors = [
    {
      title: 'Hotels & Fine Dining',
      demand: 'Consistent egg crate delivery and whole/portioned dressed broilers.',
      benefit: 'Zero yolk breakage, golden yolks for morning breakfast buffets.'
    },
    {
      title: 'Schools & Boarding Colleges',
      demand: 'High-volume weekly egg deliveries and budget-efficient protein options.',
      benefit: 'Bulk crate supply with reliable term-long delivery contracts.'
    },
    {
      title: 'Supermarkets & Retail Stores',
      demand: 'Pre-packaged branded egg cartons (6-packs & 30-egg trays) ready for shelf placement.',
      benefit: 'Barcoded packaging with sell-by date stamps and barcode scan compatibility.'
    },
    {
      title: 'Event Caterers & Corporate Kitchens',
      demand: 'Bulk fresh dressed broilers and kienyeji capons on demand with 48h notice.',
      benefit: 'Clean, flash-chilled vacuum packs ready for immediate culinary prep.'
    }
  ];

  return (
    <div style={{ paddingBottom: '80px', width: '100%' }}>
      {/* Page Header */}
      <section
        style={{
          backgroundColor: 'var(--bg-section-alt)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: 'clamp(32px, 5vw, 56px) 0'
        }}
      >
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(245, 158, 11, 0.1)',
                border: '1px solid rgba(245, 158, 11, 0.25)',
                color: 'var(--status-warning)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <Building2 size={14} /> B2B Agribusiness Supply Program
            </span>
            <h1
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                lineHeight: 1.2,
                marginBottom: '12px'
              }}
            >
              Wholesale Eggs & Poultry for Commercial Clients
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Partner with Larry Poultry Farm for stable weekly deliveries of fresh eggs and dressed chicken.
              We take the stress out of poultry sourcing with contract pricing, certified hygiene, and cold-chain dispatches.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                fontSize: '0.85rem',
                color: 'var(--text-secondary)'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--primary-green)" /> Minimum 20 Egg Crates or 50 Broilers
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--accent-sky)" /> Weekly Standing Orders Available
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--status-warning)" /> Invoicing & Tax Compliance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form and Calculator Section */}
      <section className="container" style={{ marginTop: '40px' }}>
        <WholesaleQuoteForm />
      </section>

      {/* Why Choose Us for Wholesale */}
      <section className="container" style={{ marginTop: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Built for Serious Agribusiness Buyers
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            Never worry about kitchen stock-outs, price volatility, or unhygienic roadside supplies again.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '20px'
          }}
        >
          {wholesalePerks.map((perk, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(16px, 3vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-input)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {perk.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>{perk.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                {perk.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Industry Segments */}
      <section className="container" style={{ marginTop: '56px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 4vw, 40px)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.4rem', color: 'var(--text-primary)', marginBottom: '8px' }}>
              Commercial Sectors We Support
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Customized volume agreements tailored to your weekly consumption cadence.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
              gap: '16px'
            }}
          >
            {targetSectors.map((sector, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--bg-card)',
                  padding: 'clamp(14px, 3vw, 20px)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-card)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0 }}>{sector.title}</h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0, lineHeight: 1.5 }}>
                  {sector.demand}
                </p>
                <div
                  style={{
                    marginTop: 'auto',
                    paddingTop: '10px',
                    fontSize: '0.78rem',
                    color: 'var(--primary-green)',
                    fontWeight: 600
                  }}
                >
                  Key value: {sector.benefit}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Contact Banner */}
          <div
            style={{
              marginTop: '32px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Need urgent delivery for an upcoming catering event or school opening?
            </span>
            <a
              href={`tel:${FARM_CONFIG.phoneRaw}`}
              className="btn btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Phone size={16} /> Call Corporate Desk: {FARM_CONFIG.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
