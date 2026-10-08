import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Building2,
  Phone,
  MapPin,
  Calendar,
  MessageCircle,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { WholesaleLeadRecord } from '../../types';

export const WholesaleTab: React.FC = () => {
  const { wholesaleLeads, updateWholesaleLeadStatus } = useAdmin();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filteredLeads = wholesaleLeads.filter((lead) => {
    if (selectedFilter === 'all') return true;
    return lead.status === selectedFilter;
  });

  const totalContractPipelineKes = wholesaleLeads
    .filter((l) => l.status === 'contract-active' || l.status === 'quote-sent')
    .reduce((sum, l) => sum + l.estimatedWeeklyValueKes * 4, 0); // Monthly projection

  const handleSendCorporateWhatsApp = (lead: WholesaleLeadRecord) => {
    const text =
      `*LARRY POULTRY FARM B2B CORPORATE QUOTE OFFER*\n\n` +
      `Dear ${lead.contactPerson},\n` +
      `Thank you for your institutional inquiry on behalf of *${lead.businessName}*.\n\n` +
      `*Proposed Standing Supply:* ${lead.standingOrderFrequency}\n` +
      `• Fresh Farm Eggs: ${lead.weeklyEggsCrates} crates weekly @ Wholesale KES 400/crate (Save KES 80/crate)\n` +
      `• Dressed Broilers (1.5kg vacuum sealed): ${lead.weeklyBroilers} birds weekly @ Wholesale KES 480/bird (Save KES 100/bird)\n` +
      `*Estimated Monthly Commitment:* KES ${(lead.estimatedWeeklyValueKes * 4).toLocaleString()}\n\n` +
      `*Biosecure Guarantees Included:*\n` +
      `✓ Temperature-logged refrigerated van delivery to ${lead.town}\n` +
      `✓ Weekly delivery invoices with ETR compliance\n` +
      `✓ 14-day credit terms available upon credit vetting.\n\n` +
      `Shall we dispatch our corporate representative or schedule your first trial run?`;

    const phoneClean = lead.phone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Pipeline KPI */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            B2B Corporate Wholesale & Institutional Contracts
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            Standing order framework agreements for hotels, supermarket chains, and catering institutions
          </p>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            padding: '8px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <Building2 size={20} color="#8b5cf6" />
          <div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>MONTHLY CONTRACT PIPELINE</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#a78bfa' }}>
              KES {totalContractPipelineKes.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
        {[
          { id: 'all', label: 'All Inquiries' },
          { id: 'new', label: 'New Inquiries' },
          { id: 'quote-sent', label: 'Quote Sent' },
          { id: 'contract-active', label: 'Active Contracts' }
        ].map((tab) => {
          const isSelected = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setSelectedFilter(tab.id)}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: isSelected ? 700 : 500,
                backgroundColor: isSelected ? '#8b5cf6' : 'var(--bg-card)',
                color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                border: isSelected ? '1px solid #8b5cf6' : '1px solid var(--border-card)',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Leads Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredLeads.map((lead) => {
          const statusBadge =
            lead.status === 'contract-active'
              ? { text: 'Active Contract', color: 'var(--primary-green)' }
              : lead.status === 'quote-sent'
              ? { text: 'Quote Sent', color: 'var(--accent-sky)' }
              : { text: 'New Lead', color: '#a78bfa' };

          return (
            <div
              key={lead.id}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(16px, 3vw, 24px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {lead.businessName}
                    </h3>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: `${statusBadge.color}18`,
                        color: statusBadge.color,
                        border: `1px solid ${statusBadge.color}40`
                      }}
                    >
                      {statusBadge.text}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {lead.businessType} • Contact: {lead.contactPerson} ({lead.phone}) • {lead.town}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Estimated Weekly Value</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                    KES {lead.estimatedWeeklyValueKes.toLocaleString()} / week
                  </div>
                </div>
              </div>

              {/* Requirement Summary */}
              <div
                style={{
                  backgroundColor: 'var(--bg-section-alt)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 16px',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '10px',
                  fontSize: '0.84rem'
                }}
              >
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>WEEKLY DEMAND</span>
                  <strong style={{ color: 'var(--text-primary)' }}>
                    {lead.weeklyEggsCrates} Crates Eggs • {lead.weeklyBroilers} Broilers
                  </strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>FREQUENCY</span>
                  <strong style={{ color: 'var(--text-primary)' }}>{lead.standingOrderFrequency}</strong>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>SPECIAL NOTES</span>
                  <span style={{ color: 'var(--text-secondary)' }}>{lead.specialRequirements || 'Standard packaging'}</span>
                </div>
              </div>

              {lead.accountManagerNotes && (
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-sky)', fontStyle: 'italic' }}>
                  💬 Account Note: {lead.accountManagerNotes}
                </div>
              )}

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', borderTop: '1px solid var(--border-subtle)', paddingTop: '10px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    onClick={() => updateWholesaleLeadStatus(lead.id, 'quote-sent', 'Quote sent via WhatsApp')}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-card)',
                      backgroundColor: lead.status === 'quote-sent' ? 'var(--accent-sky)' : 'var(--bg-input)',
                      color: lead.status === 'quote-sent' ? '#07130e' : 'var(--text-secondary)'
                    }}
                  >
                    Mark Quote Sent
                  </button>
                  <button
                    type="button"
                    onClick={() => updateWholesaleLeadStatus(lead.id, 'contract-active', 'Contract agreed and activated')}
                    style={{
                      padding: '5px 10px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-sm)',
                      cursor: 'pointer',
                      border: '1px solid var(--border-card)',
                      backgroundColor: lead.status === 'contract-active' ? 'var(--primary-green)' : 'var(--bg-input)',
                      color: lead.status === 'contract-active' ? '#07130e' : 'var(--text-secondary)'
                    }}
                  >
                    Activate Contract
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleSendCorporateWhatsApp(lead)}
                  className="btn btn-whatsapp"
                  style={{ fontSize: '0.8rem', padding: '8px 12px' }}
                >
                  <MessageCircle size={15} />
                  <span>Send WhatsApp B2B Contract Proposal</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
