import React, { useState } from 'react';
import { ActivePage } from '../types';
import { FARM_CONFIG, DELIVERY_TOWNS } from '../data/farmData';
import { useToast } from '../context/ToastContext';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, Truck, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const { addToast } = useToast();
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'Order Inquiry',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name.trim() || !formState.phone.trim()) {
      addToast({
        type: 'error',
        title: 'Missing Details',
        message: 'Please provide at least your full name and phone number.'
      });
      return;
    }
    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Enquiry Received!',
      message: FARM_CONFIG.replyTimePromise
    });
  };

  const handleSendViaWhatsApp = () => {
    const text = `*LARRY POULTRY FARM CONTACT ENQUIRY*\n` +
      `*Name:* ${formState.name || 'Website Visitor'}\n` +
      `*Phone:* ${formState.phone || 'Not provided'}\n` +
      `*Subject:* ${formState.subject}\n` +
      `*Message:* ${formState.message || 'I would like to inquire about poultry availability.'}\n\n` +
      `Please get back to me.`;
    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

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
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <Clock size={14} /> {FARM_CONFIG.replyTimePromise}
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
              Contact Larry Poultry Farm & Delivery Zones
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}
            >
              Need to place an order, enquire about chick hatch dates, or schedule a farm gate collection?
              Reach out directly or review our standard delivery transit matrix across Kenya.
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Contact Details & Form */}
      <section className="container" style={{ marginTop: '48px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px'
          }}
        >
          {/* Left Column: Direct Contacts & Hours */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Quick Contact Cards */}
            <div
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                Direct Farm Desks
              </h2>

              {/* Phone */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(34, 197, 94, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--primary-green)',
                    flexShrink: 0
                  }}
                >
                  <Phone size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Farm Customer Line</div>
                  <a
                    href={`tel:${FARM_CONFIG.phoneRaw}`}
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    {FARM_CONFIG.phoneDisplay}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Available Mon-Sat 7am - 6pm
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(37, 211, 102, 0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#25D366',
                    flexShrink: 0
                  }}
                >
                  <MessageCircle size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Instant WhatsApp Orders</div>
                  <a
                    href={`https://wa.me/${FARM_CONFIG.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 600,
                      color: 'var(--primary-green)',
                      textDecoration: 'none'
                    }}
                  >
                    {FARM_CONFIG.whatsappDisplay}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Quickest response (15-30 min)
                  </div>
                </div>
              </div>

              {/* Email */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(56, 189, 248, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-sky)',
                    flexShrink: 0
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Official Email</div>
                  <a
                    href={`mailto:${FARM_CONFIG.email}`}
                    style={{
                      fontSize: '0.92rem',
                      fontWeight: 500,
                      color: 'var(--text-primary)',
                      textDecoration: 'none'
                    }}
                  >
                    {FARM_CONFIG.email}
                  </a>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Invoices & corporate contracts
                  </div>
                </div>
              </div>

              {/* Location */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'rgba(245, 158, 11, 0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--status-warning)',
                    flexShrink: 0
                  }}
                >
                  <MapPin size={20} />
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Farm Physical Address</div>
                  <div style={{ fontSize: '0.92rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {FARM_CONFIG.locationText}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    Prior appointment required for biosecurity compliance
                  </div>
                </div>
              </div>
            </div>

            {/* Operating Hours Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-section-alt)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--accent-sky)" />
                <h3 style={{ fontSize: '1rem', color: 'var(--text-primary)', margin: 0 }}>
                  Farm Operating Hours
                </h3>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Monday - Saturday:</span>
                <strong style={{ color: 'var(--text-primary)' }}>7:00 AM - 6:00 PM</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Sunday:</span>
                <span style={{ color: 'var(--status-warning)' }}>8:00 AM - 2:00 PM (Emergency Dispatches)</span>
              </div>
              <div
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--border-subtle)',
                  paddingTop: '8px'
                }}
              >
                Orders placed after 5:00 PM are processed for next-morning dispatch.
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(20px, 4vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px'
            }}
          >
            <div>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--text-primary)', margin: '0 0 6px 0' }}>
                Send Us an Enquiry
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Fill out this quick form. We guarantee a response within 15-30 minutes during operating hours.
              </p>
            </div>

            {isSubmitted ? (
              <div
                style={{
                  backgroundColor: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid var(--primary-green)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  textAlign: 'center'
                }}
              >
                <CheckCircle2 size={40} color="var(--primary-green)" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  Enquiry Successfully Sent!
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  Thank you, <strong>{formState.name}</strong>. Our dispatch and customer care officer has received your note and will contact you at <strong>{formState.phone}</strong> shortly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({ name: '', phone: '', email: '', subject: 'Order Inquiry', message: '' });
                  }}
                  className="btn btn-secondary"
                  style={{ fontSize: '0.85rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label htmlFor="contact-name" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Full Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. John Kamau"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
                  <div>
                    <label htmlFor="contact-phone" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Phone (Calls / WhatsApp) *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      required
                      placeholder="07XX XXX XXX"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="contact-email" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                      Email Address (Optional)
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      placeholder="farmer@gmail.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 14px',
                        backgroundColor: 'var(--bg-input)',
                        border: '1px solid var(--border-card)',
                        borderRadius: 'var(--radius-md)',
                        color: 'var(--text-primary)',
                        fontSize: '0.88rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-subject" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Enquiry Subject
                  </label>
                  <select
                    id="contact-subject"
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="Order Inquiry">Order Inquiry / Delivery Rate</option>
                    <option value="Chick Pre-Order">Day-Old Chick Hatch Reservation</option>
                    <option value="Wholesale Supply">Commercial Wholesale (Hotels/Schools)</option>
                    <option value="Farm Visit">Farm Gate Collection / Visit Booking</option>
                    <option value="General Question">Veterinary / Advice Question</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="contact-msg" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Message Details
                  </label>
                  <textarea
                    id="contact-msg"
                    rows={4}
                    placeholder="Tell us what you need (e.g. 5 crates of eggs to Westlands, or 200 kuroiler chicks on the next hatch)..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                  <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                    <Send size={16} /> Submit Message via Site
                  </button>
                  <button
                    type="button"
                    onClick={handleSendViaWhatsApp}
                    className="btn btn-whatsapp"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <MessageCircle size={16} /> Or Send Straight to WhatsApp
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Kenyan Delivery Coverage Matrix */}
      <section className="container" style={{ marginTop: '64px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              color: 'var(--primary-green)',
              fontSize: '0.8rem',
              fontWeight: 600,
              marginBottom: '8px'
            }}
          >
            <Truck size={14} /> Transparent Transit Pricing
          </span>
          <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 1.8rem)', color: 'var(--text-primary)', marginBottom: '8px' }}>
            County Delivery Schedule & Rates
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '640px', margin: '0 auto' }}>
            Orders above <strong>KES {FARM_CONFIG.freeDeliveryThresholdKes.toLocaleString()}</strong> qualify for FREE delivery in Nairobi & Kiambu.
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden'
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '580px' }}>
              <thead>
                <tr style={{ backgroundColor: 'var(--bg-section-alt)', borderBottom: '1px solid var(--border-card)' }}>
                  <th style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Destination Area</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>County</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Standard Fee</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>Transit Lead Time</th>
                </tr>
              </thead>
              <tbody>
                {DELIVERY_TOWNS.map((town, idx) => (
                  <tr
                    key={town.id}
                    style={{
                      borderBottom: idx === DELIVERY_TOWNS.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <td style={{ padding: '14px 20px', fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                      {town.name}
                      {town.isFarmPickup && (
                        <span
                          style={{
                            marginLeft: '8px',
                            fontSize: '0.7rem',
                            padding: '2px 8px',
                            backgroundColor: 'rgba(34, 197, 94, 0.15)',
                            color: 'var(--primary-green)',
                            borderRadius: 'var(--radius-sm)'
                          }}
                        >
                          Self-Collection
                        </span>
                      )}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {town.county}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.88rem', color: town.feeKes === 0 ? 'var(--primary-green)' : 'var(--text-primary)', fontWeight: 700 }}>
                      {town.feeKes === 0 ? 'FREE' : `KES ${town.feeKes}`}
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {town.estimatedTransit}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};
