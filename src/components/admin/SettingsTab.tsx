import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Settings,
  ShieldCheck,
  Download,
  RotateCcw,
  KeyRound,
  CheckCircle2,
  Building,
  CreditCard,
  Truck
} from 'lucide-react';
import { FARM_CONFIG, DELIVERY_TOWNS } from '../../data/farmData';
import { useToast } from '../../context/ToastContext';

export const SettingsTab: React.FC = () => {
  const { resetAllToDemoData, exportReportJson } = useAdmin();
  const { addToast } = useToast();
  const [resetConfirm, setResetConfirm] = useState(false);

  const handleReset = () => {
    resetAllToDemoData();
    setResetConfirm(false);
    addToast({
      type: 'info',
      title: 'Farm Data Restored',
      message: 'All orders, finances, messages, and stock levels have been restored to initial demo parameters.'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Farm Configuration & ERP Settings
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
          Biosecurity protocols, M-Pesa gateway credentials, and data management
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '20px'
        }}
      >
        {/* Farm Facility Profile */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Building size={18} color="var(--primary-green)" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Facility Profile
            </h4>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Registered Entity:</strong> {FARM_CONFIG.farmName} Kenya</div>
            <div><strong>Physical Farm Gate:</strong> {FARM_CONFIG.locationText}</div>
            <div><strong>Sub-County:</strong> Ruiru / Kiambu County</div>
            <div><strong>Biosecurity Rating:</strong> Tier-1 (Vaccination Logged & Disinfection Arches)</div>
            <div><strong>Emergency Contact:</strong> {FARM_CONFIG.phoneDisplay}</div>
          </div>
        </div>

        {/* Payment Gateway Settings */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CreditCard size={18} color="var(--accent-sky)" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              M-Pesa Daraja Integration
            </h4>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Buy Goods Till Number:</strong> {FARM_CONFIG.mpesa.tillNumber}</div>
            <div><strong>Registered Business:</strong> {FARM_CONFIG.mpesa.businessName}</div>
            <div><strong>Account Reference Prefix:</strong> {FARM_CONFIG.mpesa.accountReferencePrefix}</div>
            <div><strong>Free Delivery Threshold:</strong> KES {FARM_CONFIG.freeDeliveryThresholdKes.toLocaleString()}</div>
            <div><strong>STK Push Mode:</strong> Automated Sandbox / Production Ready</div>
          </div>
        </div>

        {/* Security & Access */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <KeyRound size={18} color="var(--accent-amber)" />
            <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Manager Portal Security
            </h4>
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div><strong>Authorized Passcodes:</strong> <code>1234</code>, <code>larry2026</code></div>
            <div><strong>Session Timeout:</strong> Persistent Local Token</div>
            <div><strong>Access Scope:</strong> Full FarmOps, Financial Ledger, Orders & Customer Desk</div>
            <div><strong>Encryption:</strong> Client-Side LocalStorage + Daraja End-to-End</div>
          </div>
        </div>
      </div>

      {/* Data Export & Reset Actions */}
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Enterprise Data Management & Backup
          </h4>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
            Download a full operational audit snapshot or reset demo numbers to factory defaults.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={exportReportJson}
            className="btn btn-secondary"
            style={{ fontSize: '0.85rem' }}
          >
            <Download size={16} />
            <span>Export Farm JSON Backup</span>
          </button>

          {resetConfirm ? (
            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                type="button"
                onClick={handleReset}
                style={{
                  backgroundColor: 'var(--accent-red)',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: 'var(--radius-md)',
                  padding: '8px 14px',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Confirm Factory Reset
              </button>
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="btn btn-secondary"
                style={{ fontSize: '0.85rem', padding: '8px 12px' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setResetConfirm(true)}
              style={{
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: 'var(--accent-red)',
                borderRadius: 'var(--radius-md)',
                padding: '8px 14px',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <RotateCcw size={15} />
              <span>Reset Demo Data</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
