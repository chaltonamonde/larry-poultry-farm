import React from 'react';
import { useToast } from '../../context/ToastContext';
import { CheckCircle2, Info, AlertTriangle, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        maxWidth: 'calc(100vw - 32px)',
        width: '360px',
        pointerEvents: 'none'
      }}
      aria-live="polite"
    >
      {toasts.map(toast => {
        const getIcon = () => {
          switch (toast.type) {
            case 'success':
              return <CheckCircle2 size={18} color="var(--primary-green)" />;
            case 'warning':
              return <AlertTriangle size={18} color="var(--status-warning)" />;
            case 'error':
              return <XCircle size={18} color="var(--status-error)" />;
            default:
              return <Info size={18} color="var(--accent-sky)" />;
          }
        };

        return (
          <div
            key={toast.id}
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderLeft: `4px solid ${
                toast.type === 'success'
                  ? 'var(--primary-green)'
                  : toast.type === 'error'
                  ? 'var(--status-error)'
                  : toast.type === 'warning'
                  ? 'var(--status-warning)'
                  : 'var(--accent-sky)'
              }`,
              borderRadius: 'var(--radius-md)',
              padding: '12px 14px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '10px',
              pointerEvents: 'auto',
              backdropFilter: 'blur(8px)'
            }}
          >
            <div style={{ flexShrink: 0, marginTop: '2px' }}>{getIcon()}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                {toast.title}
              </div>
              {toast.message && (
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  {toast.message}
                </div>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              style={{
                minHeight: '28px',
                padding: '4px',
                color: 'var(--text-muted)',
                background: 'transparent'
              }}
              aria-label="Dismiss notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
