import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ShieldCheck, Lock, ArrowRight, Eye, EyeOff, Store, KeyRound, CheckCircle2 } from 'lucide-react';
import { ActivePage } from '../../types';

interface AdminAuthModalProps {
  setActivePage: (page: ActivePage) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({ setActivePage }) => {
  const { login } = useAdmin();
  const [pin, setPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(pin)) {
      setErrorMsg('');
    } else {
      setErrorMsg('Incorrect PIN or password. Try 1234 or click One-Click Login.');
    }
  };

  const handleQuickLogin = () => {
    login('1234');
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(24px, 5vw, 40px)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Subtle decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: '-60px',
            right: '-60px',
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            backgroundColor: 'rgba(34, 197, 94, 0.15)',
            filter: 'blur(50px)',
            pointerEvents: 'none'
          }}
        />

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--radius-xl)',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-green)',
              marginBottom: '16px'
            }}
          >
            <Lock size={32} />
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 12px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(56, 189, 248, 0.1)',
              border: '1px solid rgba(56, 189, 248, 0.25)',
              color: 'var(--accent-sky)',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            <ShieldCheck size={14} /> Biosecure Tier-1 ERP Portal
          </div>

          <h1
            style={{
              fontSize: '1.5rem',
              fontWeight: 800,
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '8px'
            }}
          >
            Farm Operations & Management
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5 }}>
            Restricted access for farm managers, accounts officers, and dispatch controllers.
          </p>
        </div>

        {/* PIN Form */}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label
              htmlFor="admin-pin"
              style={{
                display: 'block',
                fontSize: '0.82rem',
                fontWeight: 600,
                color: 'var(--text-secondary)',
                marginBottom: '6px'
              }}
            >
              Manager Passcode / PIN
            </label>
            <div style={{ position: 'relative' }}>
              <input
                id="admin-pin"
                type={showPassword ? 'text' : 'password'}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="Enter 4-digit PIN (Default: 1234)"
                autoFocus
                maxLength={8}
                inputMode="numeric"
                style={{
                  width: '100%',
                  padding: '12px 44px 12px 14px',
                  backgroundColor: 'var(--bg-input)',
                  border: errorMsg ? '1px solid var(--accent-red)' : '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '18px',
                  textAlign: 'center',
                  letterSpacing: showPassword ? 'normal' : '0.3em',
                  outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                aria-label={showPassword ? 'Hide passcode' : 'Show passcode'}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errorMsg && (
              <span style={{ display: 'block', color: 'var(--accent-red)', fontSize: '0.78rem', marginTop: '6px', textAlign: 'center' }}>
                {errorMsg}
              </span>
            )}
          </div>

          {/* Quick On-Screen Keypad for Mobile Phones */}
          <div className="admin-pin-grid">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <button
                key={digit}
                type="button"
                onClick={() => {
                  if (pin.length < 6) {
                    const nextPin = pin + digit;
                    setPin(nextPin);
                    if (errorMsg) setErrorMsg('');
                  }
                }}
                className="admin-pin-key"
              >
                {digit}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="admin-pin-key"
              style={{ fontSize: '0.85rem', color: 'var(--accent-red)' }}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => {
                if (pin.length < 6) {
                  const nextPin = pin + '0';
                  setPin(nextPin);
                  if (errorMsg) setErrorMsg('');
                }
              }}
              className="admin-pin-key"
            >
              0
            </button>
            <button
              type="button"
              onClick={() => setPin(pin.slice(0, -1))}
              className="admin-pin-key"
              style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}
            >
              ⌫
            </button>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              justifyContent: 'center',
              padding: '12px 16px',
              fontSize: '0.95rem',
              fontWeight: 700,
              marginTop: '4px'
            }}
          >
            <span>Unlock FarmOps Console</span>
            <ArrowRight size={18} />
          </button>
        </form>

        {/* Quick Demo Login Option */}
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
          <button
            type="button"
            onClick={handleQuickLogin}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '11px 14px',
              backgroundColor: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.35)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--primary-green)',
              fontSize: '0.86rem',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minHeight: '44px'
            }}
          >
            <KeyRound size={16} />
            <span>One-Click Manager Login (PIN: 1234)</span>
          </button>
        </div>

        {/* Back to Store Link */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            type="button"
            onClick={() => setActivePage('home')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.84rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              transition: 'color 0.2s ease'
            }}
          >
            <Store size={15} /> Back to Larry Farm Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
