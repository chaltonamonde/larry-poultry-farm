import React from 'react';
import { ActivePage } from '../types';
import { FARM_CONFIG } from '../data/farmData';
import { ShieldCheck, Truck, RefreshCw, AlertTriangle, FileCheck, CheckCircle2 } from 'lucide-react';

interface PoliciesPageProps {
  setActivePage: (page: ActivePage) => void;
}

export const PoliciesPage: React.FC<PoliciesPageProps> = ({ setActivePage }) => {
  const policies = [
    {
      icon: <FileCheck size={24} color="var(--primary-green)" />,
      title: 'Chick Pre-Order & 30% Deposit Policy',
      content: [
        'A 30% advance deposit is mandatory to lock in reservations for upcoming hatch batches, allowing our hatchery to calibrate egg incubator settings accurately.',
        'Deposit is 100% refundable if cancellation is requested at least 72 hours prior to scheduled hatch day.',
        'Customers receive automated WhatsApp/SMS notifications 24 hours before hatch day with collection windows (typically 7:00 AM - 1:00 PM on hatch day).',
        'Remaining 70% balance is payable via M-Pesa prior to parcel bus release or at the farm gate upon physical inspection.'
      ]
    },
    {
      icon: <RefreshCw size={24} color="var(--accent-sky)" />,
      title: '48-Hour Live Chick Mortality Guarantee',
      content: [
        'We guarantee healthy, vigorous, Marek\'s-vaccinated day-old chicks upon dispatch.',
        'In the unlikely event of chick mortality within 48 hours of receipt, Larry Poultry Farm replaces the lost chicks in the subsequent hatch or issues a store credit.',
        'To file a guarantee claim, provide clear photos of the affected chicks and your brooder temperature thermometer reading within 48 hours of delivery.',
        'Claims do not cover losses resulting from cold brooders (sub-30°C), lack of fresh drinking water, or animal predator attacks.'
      ]
    },
    {
      icon: <Truck size={24} color="var(--status-warning)" />,
      title: 'Egg Transit, Cold-Chain & Breakage Replacement',
      content: [
        'Table eggs are delivered in reinforced plastic or pulp egg crates to minimize vibration breakage along rough rural or estate roads.',
        'If any eggs arrive cracked or broken during farm-handled delivery, our driver notes the count on the delivery slip and the cost is instantly deducted or credited.',
        'Fresh dressed broilers are packed in food-grade plastic and dispatched with ice packs or insulated cooler boxes to maintain the cold chain.',
        'Orders above KES ' + FARM_CONFIG.freeDeliveryThresholdKes.toLocaleString() + ' qualify for free doorstep delivery within Kiambu and Nairobi.'
      ]
    },
    {
      icon: <ShieldCheck size={24} color="var(--primary-green)" />,
      title: 'Farm Biosecurity & Visitor Protocol',
      content: [
        'Larry Poultry Farm operates under strict Ministry of Agriculture biosecurity and disease exclusion guidelines.',
        'All physical visits and farm gate collections require a confirmed appointment made at least 24 hours in advance.',
        'Vehicles entering the farm gate must drive through our disinfectant tyre-bath dip.',
        'Visitors must sanitize hands and step into iodine/chlorine boot baths prior to accessing brooding or collection pavilions.',
        'Visitors who have handled sick birds on other farms within the previous 7 days are strictly prohibited from visiting the flock zones.'
      ]
    },
    {
      icon: <CheckCircle2 size={24} color="var(--accent-sky)" />,
      title: 'Payment Terms & M-Pesa Verification',
      content: [
        'All electronic payments should be made strictly to the official Larry Poultry Farm M-Pesa Till or Paybill: Till ' + FARM_CONFIG.mpesa.tillNumber + '.',
        'Never send funds to personal phone numbers not listed on our official website or corporate letterhead.',
        'Pay on Delivery is available for residential estates within Kiambu and Nairobi for orders under KES 8,000.',
        'Corporate clients (Hotels, Schools) on approved credit terms receive 14-day or 30-day invoice payment cycles upon credit vetting.'
      ]
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
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 600,
                marginBottom: '12px'
              }}
            >
              <ShieldCheck size={14} /> Clear Guarantees & Terms
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
              Customer Policies & Farm Guarantees
            </h1>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(0.92rem, 2vw, 1.05rem)',
                lineHeight: 1.6,
                marginBottom: '16px'
              }}
            >
              Clear, honest guidelines on chick pre-orders, deposit refunds, transit mortality replacements,
              and our closed-flock biosecurity standards.
            </p>
          </div>
        </div>
      </section>

      {/* Policies List */}
      <section className="container" style={{ marginTop: '48px', maxWidth: '880px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {policies.map((policy, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-xl)',
                padding: 'clamp(20px, 4vw, 32px)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--bg-input)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  {policy.icon}
                </div>
                <h2 style={{ fontSize: '1.25rem', color: 'var(--text-primary)', margin: 0 }}>
                  {policy.title}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {policy.content.map((point, pidx) => (
                  <div
                    key={pidx}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.88rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.6
                    }}
                  >
                    <CheckCircle2
                      size={16}
                      color="var(--primary-green)"
                      style={{ flexShrink: 0, marginTop: '3px' }}
                    />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Help Box */}
        <div
          style={{
            marginTop: '48px',
            backgroundColor: 'var(--bg-section-alt)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '24px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1rem' }}>
            Have a Specific Question About an Order or Policy?
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', margin: 0, maxWidth: '520px' }}>
            Our customer relations team is on standby to assist with custom terms, batch adjustments, or cancellation requests.
          </p>
          <button
            type="button"
            onClick={() => setActivePage('contact')}
            className="btn btn-primary"
            style={{ marginTop: '6px' }}
          >
            Contact Customer Support Desk
          </button>
        </div>
      </section>
    </div>
  );
};
