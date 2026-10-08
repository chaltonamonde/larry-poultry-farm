import React, { useState } from 'react';
import { ActivePage, Article } from '../types';
import { ARTICLES } from '../data/articles';
import { FARM_CONFIG } from '../data/farmData';
import { BookOpen, Clock, ShieldCheck, ChevronRight, X, MessageCircle, Sparkles, CheckCircle2, Bookmark } from 'lucide-react';

interface AdvicePageProps {
  setActivePage: (page: ActivePage) => void;
}

export const AdvicePage: React.FC<AdvicePageProps> = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);

  const categories = [
    { id: 'all', label: 'All Guides' },
    { id: 'Vaccination', label: 'Vaccination Schedules' },
    { id: 'Feeding', label: 'Feeding & Nutrition' },
    { id: 'Housing', label: 'Housing & Brooders' },
    { id: 'Biosecurity', label: 'Biosecurity & Health' }
  ];

  const filteredArticles = selectedCategory === 'all'
    ? ARTICLES
    : ARTICLES.filter((a) => a.category === selectedCategory);

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
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <BookOpen size={14} /> Kenyan Agribusiness Knowledge Hub
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
              Poultry Farming Advice & Field Guides
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '20px'
              }}
            >
              Practical, field-tested guides on vaccination calendars, feed optimization, brooder construction,
              and biosecurity calibrated specifically for Kenyan weather and disease pressures.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'center',
                gap: '16px',
                fontSize: '0.85rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>• Calibrated for Kiambu, Rift Valley & East Africa climates</span>
              <span>• Written by Certified Livestock Agronomists</span>
              <span>• Free Practical Downloads</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ marginTop: '36px' }}>
        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            paddingBottom: '8px',
            marginBottom: '32px'
          }}
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  whiteSpace: 'nowrap',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.84rem',
                  fontWeight: isSelected ? 600 : 500,
                  backgroundColor: isSelected ? 'var(--accent-sky)' : 'var(--bg-card)',
                  color: isSelected ? '#07130e' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-sky)' : '1px solid var(--border-card)',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Articles Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}
        >
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(16px, 3vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px',
                transition: 'transform 0.2s ease, border-color 0.2s ease'
              }}
            >
              <div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'rgba(56, 189, 248, 0.12)',
                      color: 'var(--accent-sky)'
                    }}
                  >
                    {article.category}
                  </span>
                  <span
                    style={{
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <Clock size={13} /> {article.readingTimeMinutes} min read
                  </span>
                </div>

                <h2
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: 1.35,
                    marginBottom: '12px'
                  }}
                >
                  {article.title}
                </h2>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {article.summary}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Published: {article.publishedDate}
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(article)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--primary-green)',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Read Full Guide <ChevronRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Free Agronomist Help Banner */}
        <div
          style={{
            marginTop: '56px',
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
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-green)'
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: 0 }}>
            Experiencing Flock Health Concerns or Mortality?
          </h3>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>
            Don't guess antibiotic dosages or let disease spread unchecked. Send high-resolution photos of your flock, symptoms, and droppings
            to our advisory desk for rapid first-aid direction.
          </p>
          <a
            href={`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(
              'Hello Larry Poultry Farm Vet Desk, I have a flock health question and would like advisory assistance.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
            style={{ marginTop: '8px' }}
          >
            <MessageCircle size={18} /> Chat with Farm Vet Desk on WhatsApp
          </a>
        </div>
      </div>

      {/* Article Detail Reading Modal */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(6px)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              width: 'min(calc(100vw - 32px), 760px)',
              maxHeight: 'min(90dvh, 850px)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Modal Header */}
            <div
              style={{
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-card)',
                borderBottom: '1px solid var(--border-card)',
                padding: 'clamp(14px, 3vw, 24px)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 10
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: 'var(--accent-sky)'
                  }}
                >
                  {activeArticle.category}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>•</span>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  {activeArticle.readingTimeMinutes} min read
                </span>
              </div>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Content */}
            <div style={{ padding: 'clamp(20px, 4vw, 32px)' }}>
              <h1
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  fontWeight: 800,
                  color: 'var(--text-primary)',
                  lineHeight: 1.3,
                  marginBottom: '16px'
                }}
              >
                {activeArticle.title}
              </h1>

              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  borderLeft: '4px solid var(--primary-green)',
                  padding: '14px 18px',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: '28px',
                  color: 'var(--text-secondary)',
                  fontSize: '0.9rem',
                  lineHeight: 1.6
                }}
              >
                {activeArticle.summary}
              </div>

              {/* Sections */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {activeArticle.sections.map((section, idx) => (
                  <div key={idx}>
                    <h3
                      style={{
                        fontSize: '1.15rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        marginBottom: '10px'
                      }}
                    >
                      {section.heading}
                    </h3>
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.65,
                        marginBottom: section.bulletPoints ? '12px' : '0'
                      }}
                    >
                      {section.content}
                    </p>

                    {section.bulletPoints && (
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          backgroundColor: 'var(--bg-section-alt)',
                          padding: '16px',
                          borderRadius: 'var(--radius-md)',
                          border: '1px solid var(--border-subtle)'
                        }}
                      >
                        {section.bulletPoints.map((bp, bidx) => (
                          <div
                            key={bidx}
                            style={{
                              display: 'flex',
                              alignItems: 'flex-start',
                              gap: '10px',
                              fontSize: '0.85rem',
                              color: 'var(--text-secondary)',
                              lineHeight: 1.5
                            }}
                          >
                            <CheckCircle2
                              size={15}
                              color="var(--primary-green)"
                              style={{ flexShrink: 0, marginTop: '2px' }}
                            />
                            <span>{bp}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Modal Footer */}
              <div
                style={{
                  marginTop: '36px',
                  paddingTop: '24px',
                  borderTop: '1px solid var(--border-card)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Larry Poultry Farm Advisory Series • Kiambu, Kenya
                </span>
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
