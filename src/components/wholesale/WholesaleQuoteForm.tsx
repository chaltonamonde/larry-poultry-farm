import React, { useState } from 'react';
import { FARM_CONFIG } from '../../data/farmData';
import { useToast } from '../../context/ToastContext';
import { useAdmin } from '../../context/AdminContext';
import { ShieldCheck, Clock, CheckCircle2, Send, MessageCircle, Building2, Calendar } from 'lucide-react';

export const WholesaleQuoteForm: React.FC = () => {
  const { addToast } = useToast();
  const { addWholesaleLead } = useAdmin();
  const [businessName, setBusinessName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [businessType, setBusinessType] = useState('Hotel/Restaurant');
  const [town, setTown] = useState('Nairobi');
  const [weeklyEggs, setWeeklyEggs] = useState<number>(20);
  const [weeklyBroilers, setWeeklyBroilers] = useState<number>(50);
  const [frequency, setFrequency] = useState('Weekly Standing Order');
  const [specialReq, setSpecialReq] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Approximate wholesale discounted pricing calculation
  const eggRateWholesaleKes = 400; // Discounted from retail KES 420-550
  const broilerRateWholesaleKes = 480; // Discounted from retail KES 580
  const estimatedWeeklyValue = (weeklyEggs * eggRateWholesaleKes) + (weeklyBroilers * broilerRateWholesaleKes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    addWholesaleLead({
      businessName,
      contactPerson,
      businessType,
      phone,
      town,
      weeklyEggsCrates: weeklyEggs,
      weeklyBroilers,
      estimatedWeeklyValueKes: estimatedWeeklyValue,
      standingOrderFrequency: frequency,
      specialRequirements: specialReq
    });
    addToast({
      type: 'success',
      title: 'Wholesale Inquiry Received',
      message: 'Our corporate account manager will send a signed quote within 30 minutes.'
    });
  };

  const handleSendViaWhatsApp = () => {
    const text = `*LARRY POULTRY FARM WHOLESALE QUOTE INQUIRY*\n` +
      `*Business:* ${businessName} (${businessType})\n` +
      `*Contact:* ${contactPerson} (${phone})\n` +
      `*Location:* ${town}\n` +
      `*Frequency:* ${frequency}\n` +
      `*Weekly Demand:* ${weeklyEggs} Egg Crates & ${weeklyBroilers} Dressed Broilers\n` +
      `*Notes:* ${specialReq || 'Standard delivery'}\n\n` +
      `Please provide corporate contract pricing and credit term options.`;

    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-card)',
        border: '1px solid var(--border-card)',
        borderRadius: 'var(--radius-xl)',
        padding: 'clamp(20px, 4vw, 36px)',
        width: '100%',
        boxShadow: 'var(--shadow-md)'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
        <Building2 size={20} color="var(--primary-green)" />
        <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-sky)', textTransform: 'uppercase' }}>
          B2B Institutional Supply
        </span>
      </div>

      <h3 style={{ fontSize: 'clamp(1.25rem, 3vw, 1.6rem)', marginBottom: '8px' }}>
        Request a Wholesale Supply Quote & Standing Order
      </h3>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.82rem',
          color: 'var(--primary-green)',
          marginBottom: '24px'
        }}
      >
        <Clock size={15} />
        <span>Strict Reply-Time Promise: {FARM_CONFIG.replyTimePromise}</span>
      </div>

      {isSubmitted ? (
        <div
          style={{
            backgroundColor: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid var(--primary-green)',
            borderRadius: 'var(--radius-lg)',
            padding: '28px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <CheckCircle2 size={42} color="var(--primary-green)" />
          <h4 style={{ fontSize: '1.2rem', margin: 0 }}>Quote Request Submitted!</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '480px', margin: 0 }}>
            Thank you, {contactPerson}. We have recorded your requirement for <strong>{weeklyEggs} egg crates</strong> and <strong>{weeklyBroilers} broilers</strong>.
          </p>

          <button
            type="button"
            onClick={handleSendViaWhatsApp}
            className="btn-whatsapp"
            style={{ marginTop: '8px', width: '100%', maxWidth: '100%', minHeight: '44px', whiteSpace: 'normal', padding: '12px 14px' }}
          >
            <MessageCircle size={18} style={{ flexShrink: 0 }} />
            <span>Fast-Track on WhatsApp for Instant Contract Pricing</span>
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Business / Entity Name *
              </label>
              <input
                type="text"
                required
                value={businessName}
                onChange={e => setBusinessName(e.target.value)}
                placeholder="e.g. Sarova Woodlands / Apex Academy"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Business Category
              </label>
              <select value={businessType} onChange={e => setBusinessType(e.target.value)}>
                <option value="Hotel/Restaurant">Hotel / Restaurant / Grill</option>
                <option value="Supermarket">Supermarket / Retail Chain</option>
                <option value="School/Institution">School / University / Hospital</option>
                <option value="Caterer">Outside Event Caterer</option>
                <option value="Retail Shop">Butchery / Mini-Mart</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Contact Person Name *
              </label>
              <input
                type="text"
                required
                value={contactPerson}
                onChange={e => setContactPerson(e.target.value)}
                placeholder="e.g. Chef Otieno or Procurement Manager"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Direct Phone / WhatsApp *
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="07XX XXX XXX"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Delivery Town / County *
              </label>
              <input
                type="text"
                required
                value={town}
                onChange={e => setTown(e.target.value)}
                placeholder="e.g. Nairobi Industrial Area / Thika"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Standing Order Schedule
              </label>
              <select value={frequency} onChange={e => setFrequency(e.target.value)}>
                <option value="Weekly (Every Tuesday & Friday)">Weekly (Twice per week)</option>
                <option value="Weekly (Single Dispatch)">Weekly (Once per week)</option>
                <option value="Daily Fresh Supply">Daily Morning Supply</option>
                <option value="Bi-Weekly Bulk Batch">Bi-Weekly Bulk Batch</option>
                <option value="One-Off Event Supply">One-Off Event Supply</option>
              </select>
            </div>
          </div>

          {/* Volume Sliders & Wholesale Estimate */}
          <div
            style={{
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-lg)',
              padding: '18px'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '14px', color: 'var(--accent-sky)' }}>
              Estimated Weekly Volume Calculator:
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Table Egg Crates / Week:</span>
                  <strong style={{ color: 'var(--primary-green)' }}>{weeklyEggs} crates</strong>
                </div>
                <input
                  type="range"
                  min="5"
                  max="200"
                  step="5"
                  value={weeklyEggs}
                  onChange={e => setWeeklyEggs(Number(e.target.value))}
                  style={{ padding: '6px 0', accentColor: 'var(--primary-green)' }}
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                  <span>Dressed Broilers / Week:</span>
                  <strong style={{ color: 'var(--primary-green)' }}>{weeklyBroilers} birds</strong>
                </div>
                <input
                  type="range"
                  min="10"
                  max="500"
                  step="10"
                  value={weeklyBroilers}
                  onChange={e => setWeeklyBroilers(Number(e.target.value))}
                  style={{ padding: '6px 0', accentColor: 'var(--primary-green)' }}
                />
              </div>
            </div>

            <div
              style={{
                borderTop: '1px solid var(--border-card)',
                paddingTop: '12px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '8px'
              }}
            >
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Estimated Wholesale Value: <span style={{ color: 'var(--text-muted)' }}>(Includes Volume Tier Rebates)</span>
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                ~KES {estimatedWeeklyValue.toLocaleString()} / week
              </div>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
              Specific Packaging, Grading or Delivery Days
            </label>
            <textarea
              rows={3}
              value={specialReq}
              onChange={e => setSpecialReq(e.target.value)}
              placeholder="e.g. Specify halal slaughter, egg size grading preference, or delivery before 8:00 AM"
            />
          </div>

          <div className="btn-group-responsive" style={{ gap: '12px' }}>
            <button type="submit" className="btn-primary" style={{ flex: 1, minHeight: '44px', whiteSpace: 'normal', padding: '12px 14px' }}>
              <Send size={18} style={{ flexShrink: 0 }} />
              <span>Submit Formal Quote Request</span>
            </button>

            <button
              type="button"
              onClick={handleSendViaWhatsApp}
              className="btn-whatsapp"
              style={{ flex: 1, minHeight: '44px', whiteSpace: 'normal', padding: '12px 14px' }}
            >
              <MessageCircle size={18} style={{ flexShrink: 0 }} />
              <span>Direct WhatsApp B2B Desk</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
