import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  TrendingUp,
  TrendingDown,
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
  Plus
} from 'lucide-react';

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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Urgent Farm Operations Alert Banner */}
      <div
        style={{
          backgroundColor: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-xl)',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'rgba(245, 158, 11, 0.2)',
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
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.92rem' }}>
              Action Required: {flockMetrics.nextVaccineAlert.vaccineName}
            </div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              Due on {flockMetrics.nextVaccineAlert.dueDate} for {flockMetrics.nextVaccineAlert.batchCode} ({flockMetrics.nextVaccineAlert.daysRemaining} day remaining).
              Vet Dr. Omondi notified.
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveAdminTab('hatchery')}
          className="btn btn-secondary"
          style={{ fontSize: '0.82rem', padding: '8px 14px' }}
        >
          <span>View Vaccine Protocol</span>
          <ArrowRight size={14} />
        </button>
      </div>

      {/* Primary KPI Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
          gap: '16px'
        }}
      >
        {/* Gross Revenue Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              TOTAL CASH INFLOW (KES)
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
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary-green)', letterSpacing: '-0.02em' }}>
            KES {totalIncomeKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--primary-green)', fontWeight: 700 }}>+18.4%</span> vs previous 30 days
          </div>
        </div>

        {/* Net Farm Profit Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              NET OPERATING MARGIN
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
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-sky)', letterSpacing: '-0.02em' }}>
            KES {netProfitKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <strong>{profitMarginPercent}%</strong> gross farm operating margin
          </div>
        </div>

        {/* Live Orders in Dispatch */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              ACTIVE DISPATCH RUNS
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
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {inTransitOrders.length + pendingOrders.length} Orders
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>{inTransitOrders.length} In Transit</span>, {pendingOrders.length} Packed/Processing
          </div>
        </div>

        {/* Hatchery & Flock Total */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>
              LIVE FLOCK & INCUBATORS
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
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
            {(flockMetrics.layersTotal + flockMetrics.broilersActiveCount).toLocaleString()} Birds
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {flockMetrics.activeIncubatorEggs.toLocaleString()} Setter Eggs | <strong>{flockMetrics.layingRatePercent}%</strong> Lay Rate
          </div>
        </div>
      </div>

      {/* Main Grid: Orders & Communications Stream */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          gap: '24px'
        }}
      >
        {/* Recent Orders Pipeline */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 3vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Live Order Pipeline
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Latest online and phone orders ready for dispatch
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAdminTab('orders')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary-green)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
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
                    padding: '12px 16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                        {order.id}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: `${statusColor}20`,
                          color: statusColor,
                          border: `1px solid ${statusColor}40`,
                          textTransform: 'capitalize'
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {order.customerName} • {order.deliveryTown}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {order.items.map((it) => `${it.quantity}x ${it.name}`).join(', ')}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                      KES {order.grandTotalKes.toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {order.paymentMethod === 'mpesa' ? 'M-Pesa STK' : 'Pay on Delivery'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Customer Inquiries & Wholesale Desk Snapshot */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: 'clamp(16px, 3vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Pending Messages & B2B Leads
              </h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Contact inquiries and corporate supply requests
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActiveAdminTab('messages')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-sky)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <span>Inbox ({unreadMessages.length})</span>
              <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {/* Wholesale Lead Preview */}
            {newWholesaleLeads.length > 0 && (
              <div
                style={{
                  backgroundColor: 'rgba(139, 92, 246, 0.08)',
                  border: '1px solid rgba(139, 92, 246, 0.25)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 16px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Building2 size={20} color="#a78bfa" />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                      New B2B Lead: {newWholesaleLeads[0].businessName}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      Est. Value: KES {newWholesaleLeads[0].estimatedWeeklyValueKes.toLocaleString()}/week ({newWholesaleLeads[0].weeklyEggsCrates} crates, {newWholesaleLeads[0].weeklyBroilers} broilers)
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
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px 10px',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Review Quote
                </button>
              </div>
            )}

            {/* Unread Message Cards */}
            {messages.slice(0, 3).map((msg) => (
              <div
                key={msg.id}
                style={{
                  backgroundColor: 'var(--bg-section-alt)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <MessageSquare size={14} color="var(--accent-sky)" />
                    <span style={{ fontWeight: 700, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                      {msg.senderName}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>({msg.senderPhone})</span>
                  </div>
                  {msg.status === 'unread' && (
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        backgroundColor: 'rgba(56, 189, 248, 0.2)',
                        color: 'var(--accent-sky)',
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)'
                      }}
                    >
                      Unread
                    </span>
                  )}
                </div>
                <div style={{ fontWeight: 600, fontSize: '0.82rem', color: 'var(--text-primary)' }}>
                  {msg.subject}
                </div>
                <p
                  style={{
                    fontSize: '0.78rem',
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
