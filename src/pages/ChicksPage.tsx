import React from 'react';
import { ActivePage } from '../types';
import { HatchCalendar } from '../components/chicks/HatchCalendar';
import { FARM_CONFIG } from '../data/farmData';
import { ShieldCheck, Calendar, Thermometer, AlertCircle, HeartHandshake, CheckCircle2, MessageCircle } from 'lucide-react';

interface ChicksPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const ChicksPage: React.FC<ChicksPageProps> = ({ setActivePage }) => {
  const breeds = [
    {
      name: 'Improved Kienyeji (Kuroiler / KALRO)',
      purpose: 'Dual Purpose (Meat & Eggs)',
      growthPeriod: '4.5 - 5 Months to First Egg',
      feedEfficiency: 'Hardy scavengers, economical feed conversion',
      features: ['High disease tolerance', 'Rich yellow yolk eggs', 'Excellent market weight (2.5 - 3.5 kg)'],
      idealFor: 'Free-range farming & household egg production'
    },
    {
      name: 'Cobb 500 Commercial Broilers',
      purpose: 'Fast Meat Production',
      growthPeriod: '33 - 38 Days to Slaughter',
      feedEfficiency: 'Exceptional FCR (1.5 - 1.6 kg feed per kg live weight)',
      features: ['Uniform breast meat yield', 'Rapid daily weight gain', 'High vitality when brooded warmly'],
      idealFor: 'Commercial meat farmers supplying butcheries & hotels'
    },
    {
      name: 'ISA Brown Commercial Layers',
      purpose: 'High-Yield Table Eggs',
      growthPeriod: '18 - 20 Weeks to 90%+ Laying Peak',
      feedEfficiency: '300+ brown eggs per bird per year',
      features: ['Strong shell strength', 'Consistent laying persistence', 'Low feed intake per egg produced'],
      idealFor: 'Egg businesses & commercial layer houses'
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
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(34, 197, 94, 0.1)',
                border: '1px solid rgba(34, 197, 94, 0.25)',
                color: 'var(--primary-green)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <Calendar size={14} /> Certified Hatchery Batches & Pre-Orders
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
              Day-Old Chicks & Hatch Calendar
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Reserve healthy, Marek's-vaccinated day-old chicks ahead of hatch day. 
              Secure your batch with a transparent <strong>30% deposit</strong> and collect from farm gate or via supervised county bus dispatch.
            </p>

            {/* Guarantees Strip */}
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
                <ShieldCheck size={16} color="var(--primary-green)" /> Marek's & Newcastle Vaccinated
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--accent-sky)" /> 48-Hour Mortality Guarantee
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HeartHandshake size={16} color="var(--status-warning)" /> Free Brooding Consultation
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Hatch Calendar Component Section */}
      <section className="container" style={{ marginTop: '40px' }}>
        <HatchCalendar />
      </section>

      {/* Breed Comparison Guide */}
      <section className="container" style={{ marginTop: '56px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Which Poultry Breed Fits Your Farm?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            We breed pure genetics selected for disease resistance, fast growth, and consistent egg returns under Kenyan climatic conditions.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}
        >
          {breeds.map((b, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    fontWeight: 700,
                    color: 'var(--accent-sky)'
                  }}
                >
                  {b.purpose}
                </span>
                <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)', marginTop: '4px' }}>{b.name}</h3>
              </div>

              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  padding: '12px',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Maturity:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.growthPeriod}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Feed Conversion:</span>
                  <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{b.feedEfficiency}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Key Advantages:
                </span>
                {b.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    <CheckCircle2 size={14} color="var(--primary-green)" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-card)',
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)'
                }}
              >
                <strong>Best For:</strong> {b.idealFor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brooding Readiness Guide */}
      <section className="container" style={{ marginTop: '56px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}
        >
          <div>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--status-warning)',
                fontSize: '0.8rem',
                fontWeight: 700,
                marginBottom: '8px'
              }}
            >
              <Thermometer size={16} /> Brooder Management Protocol
            </span>
            <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', marginBottom: '12px' }}>
              Preparing Before Your Chicks Arrive
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
              Chick survival during the first 14 days depends on warmth, ventilation, and gentle hydration. Never place day-old chicks in a cold room.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <strong>Pre-heat the brooder 4-6 hours</strong> prior to chick arrival to reach 32°C - 35°C at chick level.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <strong>First 2 hours:</strong> Offer lukewarm water mixed with glucose or multivitamin stress packs before providing solid chick starter crumb.
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.85rem' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--primary-green)', marginTop: '8px' }} />
                <span style={{ color: 'var(--text-secondary)' }}>
                  <strong>Litter bedding:</strong> Spread dry wood shavings (not fine sawdust) 5-7cm deep on disinfected concrete or dry earth floors.
                </span>
              </div>
            </div>

            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setActivePage('advice')}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem' }}
              >
                Read Full 0-18 Week Vaccination Guide →
              </button>
            </div>
          </div>

          {/* Quick Pre-Order Help Box */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={22} color="var(--accent-sky)" />
              <h4 style={{ color: 'var(--text-primary)', fontSize: '1rem', margin: 0 }}>
                Need Help Selecting Quantities?
              </h4>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6 }}>
              Our hatchery manager guides first-time farmers on pen dimensions, feeder sizing, and brooding lamps for your specific flock size.
            </p>
            <a
              href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
                'Hello Larry Poultry Farm, I need advice on choosing chick breeds and brooding requirements for my farm.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <MessageCircle size={18} /> Chat with Hatchery Vet on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
