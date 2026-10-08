import React, { useState, useEffect } from 'react';
import { useAdmin, AdminTab } from '../../context/AdminContext';
import {
  LayoutDashboard,
  Wallet,
  PackageCheck,
  Egg,
  Boxes,
  Building2,
  MessageSquare,
  Settings,
  LogOut,
  Store,
  Download,
  ShieldCheck,
  Clock,
  Sparkles
} from 'lucide-react';
import { ActivePage } from '../../types';

interface AdminHeaderProps {
  setActivePage: (page: ActivePage) => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({ setActivePage }) => {
  const {
    activeAdminTab,
    setActiveAdminTab,
    logout,
    pendingOrdersCount,
    unreadMessagesCount,
    newWholesaleCount,
    exportReportJson
  } = useAdmin();

  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-KE', {
          timeZone: 'Africa/Nairobi',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        }) + ' EAT'
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode; badge?: number; color?: string }[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={17} /> },
    { id: 'finance', label: 'Finances', icon: <Wallet size={17} />, color: '#22c55e' },
    { id: 'orders', label: 'Orders & Dispatch', icon: <PackageCheck size={17} />, badge: pendingOrdersCount, color: '#f59e0b' },
    { id: 'hatchery', label: 'Hatchery & Flocks', icon: <Egg size={17} />, color: '#eab308' },
    { id: 'inventory', label: 'Inventory', icon: <Boxes size={17} />, color: '#38bdf8' },
    { id: 'wholesale', label: 'B2B Wholesale', icon: <Building2 size={17} />, badge: newWholesaleCount, color: '#8b5cf6' },
    { id: 'messages', label: 'Messages Desk', icon: <MessageSquare size={17} />, badge: unreadMessagesCount, color: '#06b6d4' },
    { id: 'settings', label: 'Settings', icon: <Settings size={17} /> }
  ];

  return (
    <header
      style={{
        backgroundColor: 'var(--bg-section-alt)',
        borderBottom: '1px solid var(--border-card)',
        width: '100%',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Top Banner Row */}
      <div
        style={{
          borderBottom: '1px solid var(--border-subtle)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
          fontSize: '0.8rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-green)',
                boxShadow: '0 0 8px rgba(34, 197, 94, 0.8)'
              }}
            />
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Larry Poultry Farm ERP</span>
            <span style={{ color: 'var(--text-muted)' }}>| Ruiru Main Facility</span>
          </div>

          <span
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              color: 'var(--primary-green)',
              fontSize: '0.72rem',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={12} /> Biosecure Tier-1
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {timeStr && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontFamily: 'monospace'
              }}
            >
              <Clock size={13} color="var(--accent-sky)" /> {timeStr}
            </span>
          )}

          <button
            type="button"
            onClick={exportReportJson}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              cursor: 'pointer',
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)'
            }}
            title="Download JSON Report Backup"
          >
            <Download size={13} />
            <span className="hide-on-very-small">Backup Data</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '4px 10px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            <Store size={13} color="var(--primary-green)" />
            <span>Storefront</span>
          </button>

          <button
            type="button"
            onClick={logout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 8px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.25)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-red)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
            title="Lock FarmOps Console"
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div
        style={{
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
          padding: '8px 16px',
          scrollbarWidth: 'thin'
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveAdminTab(tab.id)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? '#07130e' : 'var(--text-secondary)',
                backgroundColor: isActive ? 'var(--primary-green)' : 'transparent',
                border: isActive ? '1px solid var(--primary-green)' : '1px solid transparent',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.15s ease'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', color: isActive ? '#07130e' : tab.color || 'inherit' }}>
                {tab.icon}
              </span>
              <span>{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 0, 0, 0.3)' : 'var(--accent-amber)',
                    color: isActive ? '#ffffff' : '#07130e',
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    lineHeight: 1.2
                  }}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </header>
  );
};
