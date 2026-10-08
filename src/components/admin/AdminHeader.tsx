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
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Top Banner Row */}
      <div className="admin-header-top">
        <div className="admin-brand-group">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="admin-live-pulse" />
            <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem', letterSpacing: '-0.01em' }}>
              Larry Farm ERP
            </span>
            <span className="hide-on-mobile-admin" style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
              | Ruiru Facility
            </span>
          </div>

          <span
            style={{
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'rgba(34, 197, 94, 0.12)',
              border: '1px solid rgba(34, 197, 94, 0.25)',
              color: 'var(--primary-green)',
              fontSize: '0.72rem',
              fontWeight: 700,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <ShieldCheck size={12} /> <span className="hide-on-mobile-admin">Biosecure</span> Tier-1
          </span>
        </div>

        <div className="admin-header-actions">
          {timeStr && (
            <span
              className="hide-on-mobile-admin"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                color: 'var(--text-secondary)',
                fontSize: '0.78rem',
                fontFamily: 'monospace',
                marginRight: '4px'
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
              border: '1px solid var(--border-card)',
              color: 'var(--text-secondary)',
              fontSize: '0.78rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
              padding: '5px 8px',
              borderRadius: 'var(--radius-md)',
              minHeight: '36px'
            }}
            title="Download JSON Report Backup"
          >
            <Download size={14} />
            <span className="hide-on-mobile-admin">Backup</span>
          </button>

          <button
            type="button"
            onClick={() => setActivePage('home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
              padding: '5px 10px',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              minHeight: '36px'
            }}
            title="Switch to Customer Storefront"
          >
            <Store size={14} color="var(--primary-green)" />
            <span>Store</span>
          </button>

          <button
            type="button"
            onClick={logout}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '5px 10px',
              backgroundColor: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.28)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--accent-red)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              minHeight: '36px'
            }}
            title="Lock FarmOps Console"
          >
            <LogOut size={13} />
            <span>Lock</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <nav aria-label="Admin Navigation" className="admin-tabs-nav">
        {tabs.map((tab) => {
          const isActive = activeAdminTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveAdminTab(tab.id)}
              className={`admin-tab-btn ${isActive ? 'active' : ''}`}
            >
              <span style={{ display: 'flex', alignItems: 'center', color: isActive ? '#07130e' : tab.color || 'inherit' }}>
                {tab.icon}
              </span>
              <span className="tab-label-text">{tab.label}</span>
              {typeof tab.badge === 'number' && tab.badge > 0 && (
                <span
                  style={{
                    backgroundColor: isActive ? 'rgba(0, 0, 0, 0.35)' : 'var(--accent-amber)',
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
      </nav>
    </header>

  );
};
