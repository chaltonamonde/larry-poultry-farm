import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  TrendingUp,
  DollarSign,
  Package,
  Egg,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building2,
  MessageSquare,
  Truck,
  Plus,
  Thermometer,
  Droplets,
  Wheat,
  MapPin,
  Sparkles,
  MessageCircle,
  Activity,
  ArrowUpRight
} from 'lucide-react';
import { FarmOrder } from '../../types';
import { FARM_CONFIG } from '../../data/farmData';

export const OverviewTab: React.FC = () => {
  const {
    orders,
    transactions,
    flockMetrics,
    messages,
    wholesaleLeads,
    setActiveAdminTab
  } = useAdmin();

  const totalIncomeKes = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amountKes, 0);

  const totalExpensesKes = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amountKes, 0);

  const netProfitKes = totalIncomeKes - totalExpensesKes;
  const profitMarginPercent = totalIncomeKes > 0 ? Math.round((netProfitKes / totalIncomeKes) * 100) : 0;

  const pendingOrders = orders.filter((o) => o.status === 'pending' || o.status === 'processing');
  const inTransitOrders = orders.filter((o) => o.status === 'in-transit');
  const unreadMessages = messages.filter((m) => m.status === 'unread');
  const newWholesaleLeads = wholesaleLeads.filter((w) => w.status === 'new');

  const handleWhatsAppWaybill = (order: FarmOrder) => {
    const itemsList = order.items.map((i) => `• ${i.quantity}x ${i.name} (${i.packSize})`).join('\n');
    const statusMsg =
      order.status === 'in-transit'
        ? '📦 *DISPATCH ALERT:* Your order is currently en route with our cold-chain delivery service.'
        : `📋 *ORDER UPDATE:* Your order is currently being processed at Ruiru Farm.`;

    const text =
      `*LARRY POULTRY FARM OFFICIAL DISPATCH WAYBILL*\n\n` +
      `Hello ${order.customerName},\n` +
      `${statusMsg}\n\n` +
      `*Waybill ID:* ${order.id}\n` +
      `*Destination:* ${order.deliveryTown} (${order.estateAddress})\n` +
      `*Items Ordered:*\n${itemsList}\n\n` +
      `*Total Amount:* KES ${order.grandTotalKes.toLocaleString()}\n` +
      `*Payment:* ${order.paymentStatus === 'paid-mpesa' ? `M-Pesa Verified (${order.mpesaReceiptCode})` : 'Pay on Delivery'}\n\n` +
      `Customer care: ${FARM_CONFIG.phoneDisplay}`;

    const phoneClean = order.customerPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const eggHarvestTargetCrates = 160;
  const eggHarvestPercent = Math.min(100, Math.round((flockMetrics.eggsCollectedTodayCrates / eggHarvestTargetCrates) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
      {/* 1. Executive Operations Greeting & Command Bar */}
      <div className="admin-welcome-banner">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <span className="admin-live-pulse" />
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary-green)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Live Agribusiness Telemetry
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>• Central Kenya Node</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)', fontWeight: 800, color: 'var(--text-primary)', margin: 0, letterSpacing: '-0.02em' }}>
              Farm Operations Command Center
            </h1>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '4px 0 0 0', lineHeight: 1.4 }}>
              Ruiru Main Breeding Facility • Automated order flow, flock biosecurity, and cold-chain dispatches
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(34, 197, 94, 0.12)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                color: 'var(--primary-green)',
                fontSize: '0.74rem',
                fontWeight: 700
              }}
            >
              <Activity size={12} /> 8 Barns Active
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '5px',
                padding: '4px 10px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                color: 'var(--accent-sky)',
                fontSize: '0.74rem',
                fontWeight: 700
              }}
            >
              <Truck size={12} /> {inTransitOrders.length} In Transit
            </span>
          </div>
        </div>

        {/* Quick Operations Action Bar */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '12px' }}>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Quick Department Shortcuts:
          </div>
          <div className="admin-quick-actions">
            <button
              type="button"
              onClick={() => setActiveAdminTab('orders')}
              className="admin-quick-btn"
            >
              <Package size={14} color="var(--primary-green)" />
              <span>Orders & Dispatch ({pendingOrders.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('finance')}
              className="admin-quick-btn"
            >
              <DollarSign size={14} color="var(--accent-sky)" />
              <span>Finance Ledger</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('hatchery')}
              className="admin-quick-btn"
            >
              <Egg size={14} color="#eab308" />
              <span>Log Egg Harvest</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('inventory')}
              className="admin-quick-btn"
            >
              <Sparkles size={14} color="#38bdf8" />
              <span>Price & Stock Editor</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('wholesale')}
              className="admin-quick-btn"
            >
              <Building2 size={14} color="#a78bfa" />
              <span>B2B Quotes ({wholesaleLeads.length})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveAdminTab('messages')}
              className="admin-quick-btn"
            >
              <MessageSquare size={14} color="#06b6d4" />
              <span>Customer Inbox ({unreadMessages.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Urgent Farm Operations & Biosecurity Alert */}
      <div
        style={{
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.04) 100%)',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          borderRadius: 'var(--radius-xl)',
          padding: 'clamp(14px, 2.5vw, 18px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px',
          boxShadow: '0 4px 14px rgba(245, 158, 11, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.22)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent-amber)',
              flexShrink: 0
            }}
          >
            <AlertTriangle size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
                Biosecurity Action: {flockMetrics.nextVaccineAlert.vaccineName}
              </span>
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  padding: '1px 7px',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'rgba(245, 158, 11, 0.25)',
                  color: 'var(--accent-amber)',
                  border: '1px solid rgba(245, 158, 11, 0.4)'
                }}
              >
                Due in {flockMetrics.nextVaccineAlert.daysRemaining} Day
              </span>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginTop: '2px' }}>
              Target: {flockMetrics.nextVaccineAlert.batchCode} on {flockMetrics.nextVaccineAlert.dueDate}.
              Resident Vet Dr. Omondi notified.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveAdminTab('hatchery')}
          className="btn btn-secondary"
          style={{
            fontSize: '0.8rem',
            padding: '7px 12px',
            borderColor: 'rgba(245, 158, 11, 0.4)',
            color: 'var(--accent-amber)',
            backgroundColor: 'rgba(245, 158, 11, 0.08)'
          }}
        >
          <span>Vaccine Schedule</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* 3. Primary Executive KPI Cards Grid */}
      <div className="admin-kpi-grid">
        {/* Gross Revenue Card */}
        <div className="admin-kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              GROSS INFLOW (KES)
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--primary-green)'
              }}
            >
              <TrendingUp size={18} />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--primary-green)', letterSpacing: '-0.02em' }}>
            KES {totalIncomeKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
              <ArrowUpRight size={13} /> +18.4%
            </span>
            <span>vs prior 30 days</span>
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
            M-Pesa STK 98.2% Auto-Settled
          </div>
        </div>

        {/* Net Operating Margin */}
        <div className="admin-kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              NET PROFIT MARGIN
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(56, 189, 248, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-sky)'
              }}
            >
              <DollarSign size={18} />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--accent-sky)', letterSpacing: '-0.02em' }}>
            KES {netProfitKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--accent-sky)' }}>{profitMarginPercent}%</strong> gross operating margin
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
            OPEX: KES {totalExpensesKes.toLocaleString()}
          </div>
        </div>

        {/* Dispatch Pipeline */}
        <div className="admin-kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              ACTIVE SHIPMENTS
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(245, 158, 11, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-amber)'
              }}
            >
              <Truck size={18} />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {inTransitOrders.length + pendingOrders.length} Orders
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{inTransitOrders.length} In Transit</span>, {pendingOrders.length} In Shed
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
            Cold-Chain Delivery: Nairobi & Kiambu
          </div>
        </div>

        {/* Live Flock & Egg Harvest */}
        <div className="admin-kpi-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: 700, letterSpacing: '0.04em' }}>
              LIVE FLOCK & EGGS
            </span>
            <div
              style={{
                width: '34px',
                height: '34px',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'rgba(234, 179, 8, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#eab308'
              }}
            >
              <Egg size={18} />
            </div>
          </div>
          <div style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {(flockMetrics.layersTotal + flockMetrics.broilersActiveCount).toLocaleString()} Birds
          </div>
          <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
            <strong>{flockMetrics.eggsCollectedTodayCrates}</strong> Crates Today • <strong>{flockMetrics.layingRatePercent}%</strong> Lay Rate
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px' }}>
            {flockMetrics.activeIncubatorEggs.toLocaleString()} Setter Eggs in Incubation
          </div>
        </div>
      </div>

      {/* 4. Telemetry & Production Progress Section (Brand New!) */}
      <div className="admin-telemetry-grid">
        {/* Daily Egg Quota & Grading Breakdown */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 2.5vw, 22px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Daily Egg Harvest Quota
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                {flockMetrics.eggsCollectedTodayCrates} of {eggHarvestTargetCrates} crates collected today ({eggHarvestPercent}% of daily capacity)
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAdminTab('hatchery')}
              style={{
                background: 'none',
                border: 'none',
                color: '#eab308',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '3px'
              }}
            >
              <span>Manage Flock</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Progress Bar Container */}
          <div style={{ width: '100%', height: '12px', backgroundColor: 'var(--bg-section-alt)', borderRadius: 'var(--radius-full)', overflow: 'hidden', display: 'flex' }}>
            <div style={{ width: `${Math.round(eggHarvestPercent * 0.65)}%`, backgroundColor: 'var(--primary-green)', transition: 'width 0.4s ease' }} title="Grade A Table Eggs (65%)" />
            <div style={{ width: `${Math.round(eggHarvestPercent * 0.27)}%`, backgroundColor: '#eab308', transition: 'width 0.4s ease' }} title="Improved Kienyeji Eggs (27%)" />
            <div style={{ width: `${Math.round(eggHarvestPercent * 0.08)}%`, backgroundColor: 'var(--accent-sky)', transition: 'width 0.4s ease' }} title="Fertile Hatching Eggs (8%)" />
          </div>

          {/* Legend Chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--primary-green)' }} />
              Grade A Large (65% / 92 Crates)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#eab308' }} />
              Improved Kienyeji (27% / 38 Crates)
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-sky)' }} />
              Hatching Fertile (8% / 12 Crates)
            </span>
          </div>
        </div>

        {/* Barn Environmental & IoT Sensor Telemetry */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 2.5vw, 22px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Barn & Brooder Telemetry
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                IoT sensor readings for pen temperatures, humidity, and food reserves
              </p>
            </div>
            <span style={{ fontSize: '0.72rem', color: 'var(--primary-green)', fontWeight: 700 }}>
              ● All Sensors Online
            </span>
          </div>

          <div className="admin-sensor-grid">
            <div className="admin-sensor-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-amber)', fontSize: '0.75rem', fontWeight: 600 }}>
                <Thermometer size={14} /> Brooder Pen Temp
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {flockMetrics.brooderTempCelsius}°C
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary-green)', fontWeight: 600 }}>
                ✓ Optimal (Target: 32-34°C)
              </div>
            </div>

            <div className="admin-sensor-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent-sky)', fontSize: '0.75rem', fontWeight: 600 }}>
                <Droplets size={14} /> Ambient Humidity
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                62% RH
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--primary-green)', fontWeight: 600 }}>
                ✓ Safe Range (55-65%)
              </div>
            </div>

            <div className="admin-sensor-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#eab308', fontSize: '0.75rem', fontWeight: 600 }}>
                <Wheat size={14} /> Feed Inventory
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {flockMetrics.feedStockBags} Bags
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                ~14 Days Buffer in Store
              </div>
            </div>

            <div className="admin-sensor-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#a78bfa', fontSize: '0.75rem', fontWeight: 600 }}>
                <Egg size={14} /> Incubator Setter
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {flockMetrics.activeIncubatorEggs.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 600 }}>
                Turning Cycle: Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Main Dual Feed: Orders Pipeline & Communications Desk */}
      <div className="admin-split-grid">
        {/* Recent Orders Pipeline */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 2.5vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Live Order Pipeline
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Latest verified orders ready for cold-chain dispatch
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAdminTab('orders')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-green)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>View All ({orders.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {orders.slice(0, 4).map((order) => {
              const statusColor =
                order.status === 'delivered'
                  ? 'var(--primary-green)'
                  : order.status === 'in-transit'
                  ? 'var(--accent-sky)'
                  : order.status === 'processing'
                  ? 'var(--accent-amber)'
                  : 'var(--text-muted)';

              return (
                <div
                  key={order.id}
                  style={{
                    backgroundColor: 'var(--bg-section-alt)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'border-color 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)', fontFamily: 'monospace' }}>
                        {order.id}
                      </span>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: `${statusColor}18`,
                          color: statusColor,
                          border: `1px solid ${statusColor}40`,
                          textTransform: 'capitalize'
                        }}
                      >
                        {order.status}
                      </span>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 600,
                          padding: '2px 7px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: order.paymentStatus === 'paid-mpesa' ? 'rgba(34, 197, 94, 0.12)' : 'rgba(245, 158, 11, 0.12)',
                          color: order.paymentStatus === 'paid-mpesa' ? 'var(--primary-green)' : 'var(--accent-amber)',
                          border: `1px solid ${order.paymentStatus === 'paid-mpesa' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`
                        }}
                      >
                        {order.paymentStatus === 'paid-mpesa' ? 'M-Pesa Verified' : 'Pay on Delivery'}
                      </span>
                    </div>

                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      KES {order.grandTotalKes.toLocaleString()}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '6px', fontSize: '0.8rem' }}>
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{order.customerName}</span>
                      <span>•</span>
                      <MapPin size={12} color="var(--accent-sky)" />
                      <span>{order.deliveryTown}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppWaybill(order)}
                      style={{
                        background: 'none',
                        border: '1px solid rgba(37, 211, 102, 0.35)',
                        color: '#25d366',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: 'var(--radius-sm)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        cursor: 'pointer'
                      }}
                      title="Send WhatsApp Waybill Notice"
                    >
                      <MessageCircle size={12} />
                      <span>Waybill WhatsApp</span>
                    </button>
                  </div>

                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Corporate Wholesale & Customer Inquiries Stream */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 2.5vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                Corporate B2B & Customer Desk
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Standing institutional orders & customer inquiries
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAdminTab('messages')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-sky)',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Inbox ({unreadMessages.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Wholesale Corporate Lead Banner */}
            {newWholesaleLeads.length > 0 && (
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.14) 0%, rgba(139, 92, 246, 0.04) 100%)',
                  border: '1px solid rgba(139, 92, 246, 0.35)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(139, 92, 246, 0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#a78bfa'
                    }}
                  >
                    <Building2 size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      New B2B Lead: {newWholesaleLeads[0].businessName}
                    </div>
                    <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      Est. Value: <strong style={{ color: '#a78bfa' }}>KES {newWholesaleLeads[0].estimatedWeeklyValueKes.toLocaleString()}/wk</strong> ({newWholesaleLeads[0].weeklyEggsCrates} crates, {newWholesaleLeads[0].weeklyBroilers} broilers)
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveAdminTab('wholesale')}
                  style={{
                    backgroundColor: '#8b5cf6',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: 'var(--radius-md)',
                    padding: '6px 12px',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <span>Review Quote</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            )}

            {/* Unread Customer Inquiries */}
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                style={{
                  backgroundColor: 'var(--bg-section-alt)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={13} color="var(--accent-sky)" />
                    <span style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-primary)' }}>
                      {msg.senderName}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({msg.senderPhone})</span>
                  </div>
                  {msg.status === 'unread' && (
                    <span
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        color: 'var(--accent-sky)',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      New
                    </span>
                  )}
                </div>

                <div style={{ fontWeight: 600, fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                  {msg.subject}
                </div>

                <p
                  style={{
                    fontSize: '0.76rem',
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
