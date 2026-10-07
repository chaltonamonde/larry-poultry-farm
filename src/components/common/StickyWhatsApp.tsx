import React, { useState } from 'react';
import { FARM_CONFIG } from '../../data/farmData';
import { MessageCircle, X, Send } from 'lucide-react';

export const StickyWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quickMsg, setQuickMsg] = useState('');

  const quickPrompts = [
    'Are day-old Kienyeji chicks available?',
    'What is your price for 10 crates of table eggs?',
    'Do you deliver to my location today?',
    'I want to inquire about wholesale broilers.'
  ];

  const handleSend = (textToSend?: string) => {
    const message = textToSend || quickMsg || 'Hello Larry Poultry Farm, I would like to inquire about your poultry products.';
    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
    setQuickMsg('');
  };

  return (
    <>
      {/* Floating Dialog Popover */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(80px + var(--safe-bottom))',
            right: '16px',
            width: 'min(calc(100vw - 32px), 320px)',
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: 990,
            overflow: 'hidden',
            animation: 'fadeIn 200ms ease'
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: '#1f2937',
              borderBottom: '1px solid var(--border-card)',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: '#22c55e'
                }}
              />
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#f8fafc' }}>
                  Larry Poultry Farm WhatsApp
                </div>
                <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                  {FARM_CONFIG.replyTimePromise}
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ padding: '2px', color: '#94a3b8', minHeight: '28px' }}
              aria-label="Close WhatsApp chat popup"
            >
              <X size={16} />
            </button>
          </div>

          {/* Quick Prompts */}
          <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              Quick Questions:
            </div>
            {quickPrompts.map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(q)}
                style={{
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  color: 'var(--text-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '6px 10px',
                  fontSize: '0.78rem',
                  textAlign: 'left',
                  justifyContent: 'flex-start',
                  minHeight: '34px',
                  lineHeight: 1.3
                }}
              >
                {q}
              </button>
            ))}

            {/* Custom Input */}
            <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
              <input
                type="text"
                value={quickMsg}
                onChange={e => setQuickMsg(e.target.value)}
                placeholder="Type your message..."
                style={{ fontSize: '0.82rem', padding: '8px 10px' }}
                onKeyDown={e => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button
                type="button"
                onClick={() => handleSend()}
                className="btn-whatsapp"
                style={{ minHeight: '36px', padding: '0 12px' }}
                aria-label="Send WhatsApp message"
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          bottom: 'calc(20px + var(--safe-bottom))',
          right: '16px',
          width: '56px',
          height: '56px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: '#25d366',
          color: '#ffffff',
          boxShadow: '0 6px 20px rgba(37, 211, 102, 0.45)',
          zIndex: 980,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform var(--transition-normal), box-shadow var(--transition-normal)'
        }}
        aria-label="Chat on WhatsApp with Larry Poultry Farm"
        title="Chat on WhatsApp"
      >
        <MessageCircle size={28} />
      </button>
    </>
  );
};
