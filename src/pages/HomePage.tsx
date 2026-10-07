import React, { useState } from 'react';
import { ActivePage } from '../types';
import { PRODUCTS } from '../data/products';
import { FARM_CONFIG } from '../data/farmData';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/shop/ProductCard';
import { HatchCalendar } from '../components/chicks/HatchCalendar';
import {
  ShieldCheck,
  Truck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  ChevronDown,
  Award,
  Users,
  Feather,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';

interface HomePageProps {
  setActivePage: (page: ActivePage) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage }) => {
  const [isPlayingVideo, setIsPlayingVideo] = useState(true);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  // Featured 4 products
  const featuredProducts = PRODUCTS.slice(0, 4);

  const faqs = [
    {
      q: 'How do I pre-order day-old chicks and secure my hatch date?',
      a: 'Browse our upcoming hatch batches in the Hatch Calendar. You can reserve your slots with a 30% deposit via M-Pesa. The remaining balance is payable upon farm-gate pickup or delivery transit dispatch.'
    },
    {
      q: 'Which towns in Kenya do you deliver eggs and live birds to?',
      a: 'We operate scheduled delivery routes across Nairobi (CBD, Westlands, Karen, Kasarani), Kiambu County (Ruiru, Thika, Juja), Machakos, Naivasha, and Nakuru. For upcountry farmers in Western Kenya and the Rift Valley, day-old chicks are dispatched via specialized courier buses.'
    },
    {
      q: 'Are your day-old chicks vaccinated before dispatch?',
      a: 'Yes. All chicks hatched at Larry Poultry Farm receive Marek’s Disease and Newcastle Disease (Lasota) vaccinations on Day 1 in our hatchery before boxing.'
    },
    {
      q: 'Can I set up a weekly recurring egg or chicken standing order for my restaurant or school?',
      a: 'Absolutely. Visit our Wholesale section to build a standing order. We offer discounted contract pricing, guaranteed weekly morning deliveries, and credit invoice terms for vetted institutions.'
    },
    {
      q: 'What is your egg breakage or chick mortality replacement policy?',
      a: 'We offer a 100% credit or replacement for any eggs damaged in transit on our delivery vehicles, and a 48-hour mortality replacement guarantee on day-old chicks subject to following standard brooding temperature protocols.'
    }
  ];

  const galleryImages = [
    { src: './images/hero-poultry.jpg', title: 'Biosecure Poultry Run', tag: 'Farm Facilities' },
    { src: './images/fresh-eggs.jpg', title: 'Farm Fresh Egg Crates', tag: 'Daily Egg Harvest' },
    { src: './images/day-old-chicks.jpg', title: 'Hygienic Heated Brooder', tag: 'Chicks Nursery' },
    { src: './images/kienyeji-flock.jpg', title: 'Pasture Improved Kienyeji', tag: 'Breeding Stock' }
  ];

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      {/* =====================================================================
          1. HERO SECTION
          - Looping video / high-resolution poster with dark green-to-sky-blue overlay
          - Two CTAs: "Order Now" and "Chat on WhatsApp"
          - Respects prefers-reduced-motion
          ===================================================================== */}
      <section
        style={{
          position: 'relative',
          minHeight: 'clamp(540px, 85vh, 760px)',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#07130e',
          overflow: 'hidden'
        }}
      >
        {/* Background Visual Layer */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1
          }}
        >
          <img
            src="./images/hero-poultry.jpg"
            alt="Larry Poultry Farm flock and modern biosecure housing in Kenya"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.75)'
            }}
          />

          {/* Dark Green to Sky Blue Agribusiness Overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, rgba(7, 19, 14, 0.92) 0%, rgba(20, 83, 45, 0.8) 55%, rgba(56, 189, 248, 0.45) 100%)'
            }}
          />

          {/* Ambient Texture Grid */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              opacity: 0.6
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '40px', paddingBottom: '40px' }}>
          <div style={{ maxWidth: '780px' }}>
            {/* Pill Badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '1px solid rgba(34, 197, 94, 0.4)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                marginBottom: '18px',
                backdropFilter: 'blur(8px)'
              }}
            >
              <ShieldCheck size={16} color="var(--primary-green)" />
              <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#4ade80', letterSpacing: '0.02em' }}>
                KENYA'S TRUSTED BIOSECURE POULTRY BREEDER
              </span>
            </div>

            {/* Main Headline */}
            <h1
              style={{
                color: '#ffffff',
                marginBottom: '16px',
                lineHeight: 1.15,
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)'
              }}
            >
              Healthy Chicks, Fresh Eggs & Quality Poultry, Delivered To Your Doorstep.
            </h1>

            {/* Sub-copy */}
            <p
              style={{
                fontSize: 'clamp(1rem, 2.2vw, 1.25rem)',
                color: '#e2e8f0',
                lineHeight: 1.5,
                marginBottom: '28px',
                maxWidth: '680px'
              }}
            >
              Direct from our biosecure farm: Marek's-vaccinated day-old chicks, daily farm-fresh table eggs, live and dressed broilers, improved Kienyeji, and high-nutrition feeds.
            </p>

            {/* Key Micro Trust Points */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(10px, 2vw, 20px)',
                marginBottom: '32px',
                fontSize: '0.88rem',
                color: '#cbd5e1'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--primary-green)" />
                <span>Next Day Town Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--primary-green)" />
                <span>M-Pesa & Cash on Delivery</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="var(--primary-green)" />
                <span>30% Deposit Pre-Orders</span>
              </div>
            </div>

            {/* Two Primary CTAs (Mobile Responsive Stacking) */}
            <div className="btn-group-responsive" style={{ gap: '14px' }}>
              <button
                type="button"
                onClick={() => {
                  setActivePage('shop');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary"
                style={{ fontSize: '1.05rem', padding: '14px 28px' }}
              >
                <span>Order Farm Fresh Now</span>
                <ArrowRight size={18} />
              </button>

              <a
                href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=Hello%20Larry%20Poultry%20Farm,%20I%20would%20like%20to%20order%20poultry%20products.`}
                target="_blank"
                rel="noreferrer"
                className="btn-whatsapp"
                style={{ fontSize: '1.05rem', padding: '14px 28px' }}
              >
                <MessageCircle size={20} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. TRUST STRIP (Solves Weakness #6: No proof or trust)
          ===================================================================== */}
      <section style={{ backgroundColor: 'var(--bg-section-alt)', borderBottom: '1px solid var(--border-card)', padding: '28px 0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))',
              gap: '20px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <Award size={24} color="var(--primary-green)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>100% Vaccinated Chicks</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Marek's & Newcastle at hatch</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <Truck size={24} color="var(--accent-sky)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Safe Live Bird Transit</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ventilated crates to 7+ counties</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <Feather size={24} color="var(--primary-green)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Daily Farm Harvest</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Eggs sorted within 24 hours</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ backgroundColor: 'rgba(56, 189, 248, 0.15)', padding: '12px', borderRadius: 'var(--radius-md)' }}>
                <ShieldCheck size={24} color="var(--accent-sky)" />
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Biosecurity Enforced</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Sanitized vehicle & footbaths</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FEATURED PRODUCTS (Fixes Weakness #3: 24/7 Catalogue with KES prices)
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '32px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
                Top Farm Sellers
              </span>
              <h2 style={{ margin: '4px 0 0 0' }}>Featured Poultry & Egg Products</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', margin: '4px 0 0 0' }}>
                Transparent KES prices, live stock status, and instant delivery to your estate.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
              style={{ fontSize: '0.9rem' }}
            >
              <span>View Full Price List</span>
              <ChevronRight size={16} />
            </button>
          </div>

          <div className="product-grid">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. DAY-OLD CHICKS AVAILABILITY CALENDAR (Fixes Weakness #3 & #4)
          ===================================================================== */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ maxWidth: '680px', marginBottom: '32px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
              Live Hatch Schedule
            </span>
            <h2 style={{ margin: '4px 0 8px 0' }}>Upcoming Chick Hatch Batches & Pre-Orders</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Book your day-old chicks in advance. Secure with a 30% deposit via M-Pesa to avoid missing batch allocations.
            </p>
          </div>

          <HatchCalendar />

          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <button
              type="button"
              onClick={() => {
                setActivePage('chicks');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary"
            >
              <span>View Full Hatch Calendar & Brooding Guides</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. HOW IT WORKS (Fixes Weakness #2 & #4: Simple 3-step ordering)
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
              Straightforward Agribusiness
            </span>
            <h2 style={{ margin: '4px 0 8px 0' }}>How To Order From Larry Poultry Farm</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Designed for Kenyan farmers, households, and hospitality businesses.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
              gap: '24px'
            }}
          >
            <div className="farm-card">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  color: 'var(--primary-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '16px'
                }}
              >
                1
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Select Stock & Pack Sizes</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Choose table eggs by the crate, day-old chicks by batch, or live broilers. Check live availability badges and transparent KES prices.
              </p>
            </div>

            <div className="farm-card">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(56, 189, 248, 0.15)',
                  color: 'var(--accent-sky)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '16px'
                }}
              >
                2
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Pick Farm Pickup or Town Delivery</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Pick up for free at our Kiambu/Thika farm gate or select your town. Our delivery vehicle delivers fresh stock directly to your address.
              </p>
            </div>

            <div className="farm-card">
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(34, 197, 94, 0.15)',
                  color: 'var(--primary-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '1.2rem',
                  marginBottom: '16px'
                }}
              >
                3
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '8px' }}>Pay via M-Pesa or Cash on Delivery</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Use Safaricom Daraja STK Push for instant receipting, place a 30% deposit on chicks, or opt for pay-on-delivery for fresh table eggs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. FARM STORY & PHOTO GALLERY (Fixes Weakness #6: Proof and Trust)
          ===================================================================== */}
      <section className="section section-alt">
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
              gap: '40px',
              alignItems: 'center',
              marginBottom: '48px'
            }}
          >
            <div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
                Behind the Scenes
              </span>
              <h2 style={{ margin: '6px 0 16px 0' }}>Biosecurity & Quality Are Not Words — They Are Daily Farm Routines</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>
                At Larry Poultry Farm, we combine traditional East African poultry resilience with rigorous veterinary disease prevention. Our improved Kienyeji and broiler flocks thrive in spacious, well-ventilated housing with dedicated bio-security boundaries.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--primary-green)" />
                  <span>Strict cold chain vaccine storage (+2°C to +8°C)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--primary-green)" />
                  <span>Balanced, hormone-free feeds with verified crude protein</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                  <CheckCircle2 size={18} color="var(--primary-green)" />
                  <span>Zero-tolerance for sick bird mixing (All-In, All-Out management)</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  setActivePage('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary"
              >
                <span>Read Full Farm Story & Practices</span>
                <ArrowRight size={16} />
              </button>
            </div>

            {/* Farm Story Image Card */}
            <div
              style={{
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                border: '1px solid var(--border-card)',
                boxShadow: 'var(--shadow-lg)',
                position: 'relative'
              }}
            >
              <img
                src="./images/kienyeji-flock.jpg"
                alt="Kenyan improved Kienyeji chickens foraging at Larry Poultry Farm"
                style={{ width: '100%', height: '360px', objectFit: 'cover' }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  insetInline: 0,
                  padding: '16px 20px',
                  background: 'linear-gradient(transparent, rgba(7, 19, 14, 0.95))',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#ffffff' }}>Free-Range Breeding Pasture</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-sky)' }}>Central Kenya Highland Location</div>
                </div>
                <span
                  style={{
                    backgroundColor: 'rgba(34, 197, 94, 0.2)',
                    color: 'var(--primary-green)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    border: '1px solid rgba(34, 197, 94, 0.4)'
                  }}
                >
                  Verified Stock
                </span>
              </div>
            </div>
          </div>

          {/* Photo Gallery Grid */}
          <div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '20px' }}>Real Farm Photo Gallery</h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
                gap: '16px'
              }}
            >
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    position: 'relative',
                    height: '180px',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    border: '1px solid var(--border-card)'
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(transparent 50%, rgba(7, 19, 14, 0.9))',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '12px'
                    }}
                  >
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-sky)', fontWeight: 700, textTransform: 'uppercase' }}>
                      {img.tag}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#ffffff' }}>
                      {img.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. CUSTOMER REVIEWS (Marked placeholders as strictly required)
          ===================================================================== */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 40px auto' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
              Buyer Experiences
            </span>
            <h2 style={{ margin: '4px 0 8px 0' }}>What Kenyan Farmers & Caterers Say</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Real feedback from farmers, hotels, and retailers who trust Larry Poultry Farm for daily eggs, chicks, and feeds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
              gap: '20px'
            }}
          >
            {REVIEWS.map(rev => (
              <div key={rev.id} className="farm-card" style={{ height: '100%', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '12px', color: '#f59e0b' }}>
                    {'★'.repeat(rev.rating)}
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '16px', fontStyle: 'italic' }}>
                    "{rev.comment}"
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-card)', paddingTop: '12px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {rev.authorName}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--accent-sky)' }}>
                    {rev.roleOrBusiness} • {rev.location}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Verified Supply: {rev.verifiedOrder}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          8. FREQUENTLY ASKED QUESTIONS (FAQ)
          ===================================================================== */}
      <section className="section section-alt">
        <div className="container">
          <div style={{ maxWidth: '680px', margin: '0 auto 36px auto', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
              Got Questions?
            </span>
            <h2 style={{ margin: '4px 0 8px 0' }}>Frequently Asked Questions</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem' }}>
              Everything you need to know about placing poultry orders, vaccine schedules, and town deliveries in Kenya.
            </p>
          </div>

          <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    style={{
                      width: '100%',
                      padding: '16px 20px',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      color: isOpen ? 'var(--primary-green)' : 'var(--text-primary)',
                      fontWeight: 700,
                      fontSize: '0.98rem'
                    }}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      size={18}
                      style={{
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform var(--transition-fast)',
                        flexShrink: 0
                      }}
                    />
                  </button>
                  {isOpen && (
                    <div
                      style={{
                        padding: '0 20px 16px 20px',
                        fontSize: '0.88rem',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.5,
                        borderTop: '1px solid var(--border-subtle)',
                        paddingTop: '12px'
                      }}
                    >
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          9. FINAL CALL TO ACTION (CTA)
          ===================================================================== */}
      <section className="section" style={{ background: 'var(--brand-gradient-subtle)', borderTop: '1px solid var(--border-card)' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '680px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', marginBottom: '12px' }}>
            Ready To Stock Your Poultry Farm or Order Farm-Fresh Eggs?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.5, marginBottom: '28px' }}>
            Orders placed today are prepared for fast dispatch across Nairobi, Kiambu, Thika, and regional transit hubs.
          </p>

          <div className="btn-group-responsive" style={{ justifyContent: 'center', gap: '14px' }}>
            <button
              type="button"
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-primary"
              style={{ fontSize: '1.05rem', padding: '14px 28px' }}
            >
              <ArrowRight size={18} />
              <span>Browse 24/7 Store & Prices</span>
            </button>

            <a
              href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=Hello%20Larry%20Poultry%20Farm,%20I%20am%20ready%20to%20order.`}
              target="_blank"
              rel="noreferrer"
              className="btn-whatsapp"
              style={{ fontSize: '1.05rem', padding: '14px 28px' }}
            >
              <MessageCircle size={20} />
              <span>Talk to Farm Manager</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
