import React from 'react';
import { ActivePage } from '../types';
import { FARM_CONFIG } from '../data/farmData';
import { ShieldCheck, Heart, Award, CheckCircle2, MapPin, Calendar, Users, Eye, Sparkles } from 'lucide-react';

interface AboutPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  const pillars = [
    {
      icon: <ShieldCheck size={26} color="var(--primary-green)" />,
      title: 'Biosecurity First',
      description: 'We run a strict closed-flock system with vehicle wheel-dips, disinfectant boot baths, and quarantine zones to keep wild bird pathogens out.'
    },
    {
      icon: <Award size={26} color="var(--accent-sky)" />,
      title: 'Certified Disease Resistance',
      description: 'Every flock receives standard veterinary-supervised immunization including Marek\'s, Newcastle Disease, Gumboro, and Fowl Typhoid vaccines.'
    },
    {
      icon: <Eye size={26} color="var(--status-warning)" />,
      title: 'Transparent Agribusiness',
      description: 'Fixed KES prices, transparent egg weight grades, and honest batch hatch tracking. No hidden middleman fees or surprise delivery charges.'
    },
    {
      icon: <Heart size={26} color="var(--primary-green)" />,
      title: 'Local Farmer Empowerment',
      description: 'We don\'t just sell day-old chicks; we provide free telephone and WhatsApp brooding support to ensure your birds survive to harvest.'
    }
  ];

  const galleryImages = [
    {
      src: './images/hero-poultry.jpg',
      title: 'Poultry Housing & Bio-Pens',
      caption: 'Well-ventilated deep litter pens engineered for optimal thermal regulation and respiratory flock health.'
    },
    {
      src: './images/fresh-eggs.jpg',
      title: 'Egg Grading & Quality Sorting',
      caption: 'Freshly gathered table eggs sorted for strong shell integrity, cleanliness, and rich golden yolk vitality.'
    },
    {
      src: './images/day-old-chicks.jpg',
      title: 'Heated Brooder Care',
      caption: 'Vigorous day-old chicks receiving Marek\'s vaccine and balanced electrolytes within hours of hatching.'
    },
    {
      src: './images/kienyeji-flock.jpg',
      title: 'Improved Kienyeji Flock',
      caption: 'Free-ranging Kuroiler and indigenous dual-purpose birds raised in natural sunlight with green forage.'
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
              <Sparkles size={14} /> Our Agribusiness Mission
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
              About Larry Poultry Farm
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}
            >
              Dedicated to delivering farm-fresh table eggs, robust day-old chicks, and healthy table poultry across Kenya
              with rigorous veterinary standards and zero middleman markups.
            </p>
          </div>
        </div>
      </section>

      {/* Farm Story & Values */}
      <section className="container" style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '40px',
            alignItems: 'center'
          }}
        >
          <div>
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--accent-sky)'
              }}
            >
              Agribusiness Philosophy
            </span>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginTop: '8px',
                marginBottom: '16px',
                lineHeight: 1.25
              }}
            >
              Modern Poultry Management with Traditional Care
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '16px' }}>
              Larry Poultry Farm was founded on a simple premise: Kenyan households and commercial kitchens deserve clean,
              farm-fresh poultry sourced directly from a transparent, biosecure facility.
            </p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.65, marginBottom: '20px' }}>
              We combine modern commercial brooding technologies with climate-friendly deep-litter housing. Every tray of eggs
              is gathered same-day, and every batch of chicks is hatched under strict veterinary supervision.
            </p>

            {/* Clear Real Placeholders Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                fontSize: '0.82rem'
              }}
            >
              <div style={{ color: 'var(--primary-green)', fontWeight: 600 }}>
                Farm Accreditation & Compliance:
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                • <strong>Location:</strong> {FARM_CONFIG.locationText}
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                • <strong>Veterinary Health:</strong> Kiambu County Directorate of Veterinary Services Certified
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                • <strong>Established:</strong> Operating continuously with modern biosecure housing since 2021
              </div>
            </div>
          </div>

          {/* Visual Showcase Card */}
          <div
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-2xl)',
              overflow: 'hidden',
              border: '1px solid var(--border-card)',
              boxShadow: 'var(--shadow-lg)'
            }}
          >
            <img
              src="./images/hero-poultry.jpg"
              alt="Larry Poultry Farm facility and housing"
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '420px', objectFit: 'cover' }}
              loading="lazy"
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(13, 17, 23, 0.9) 0%, transparent 60%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px'
              }}
            >
              <span style={{ color: 'var(--primary-green)', fontWeight: 700, fontSize: '0.82rem' }}>
                Eco-Friendly Facility
              </span>
              <h3 style={{ color: '#fff', fontSize: '1.25rem', margin: '4px 0' }}>
                Strict Bio-Secure Operations
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', margin: 0 }}>
                Zero contamination through controlled access gates and sanitary handling protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars Grid */}
      <section className="container" style={{ marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Our Four Production Standards
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
            Built around animal welfare, customer trust, and reliable Kenyan supply chains.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px'
          }}
        >
          {pillars.map((pillar, i) => (
            <div
              key={i}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--bg-input)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {pillar.icon}
              </div>
              <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', margin: 0 }}>{pillar.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Farm Gallery */}
      <section className="container" style={{ marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            Live Farm Photo Gallery
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Real glimpses into our brooding chambers, layer pens, and egg collection points.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '20px'
          }}
        >
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <img
                src={img.src}
                alt={img.title}
                style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block' }}
                loading="lazy"
              />
              <div style={{ padding: '16px' }}>
                <h4 style={{ color: 'var(--text-primary)', fontSize: '0.95rem', margin: '0 0 6px 0' }}>
                  {img.title}
                </h4>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', margin: 0, lineHeight: 1.5 }}>
                  {img.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Biosecurity Visit Notice & CTAs */}
      <section className="container" style={{ marginTop: '64px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(24px, 4vw, 36px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px'
          }}
        >
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: 'var(--status-warning)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Farm Gate Visits & Appointments
          </span>
          <h3 style={{ fontSize: '1.35rem', color: 'var(--text-primary)', margin: 0 }}>
            Planning to Visit or Collect at the Farm Gate?
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            To safeguard flock health against avian flu and Newcastle contamination, all farm visits and batch collections
            require a 24-hour prior booking. Disinfectant shoe baths and clean footwear are mandatory at entry.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={() => setActivePage('contact')}
              className="btn btn-primary"
            >
              Contact & Book Farm Collection
            </button>
            <button
              type="button"
              onClick={() => setActivePage('policies')}
              className="btn btn-secondary"
            >
              View Biosecurity Policies
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
