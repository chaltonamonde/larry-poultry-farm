import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
  Plus,
  Search,
  Filter,
  Download,
  Calendar,
  CreditCard,
  Building,
  CheckCircle2,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { FarmTransaction, TransactionType } from '../../types';

export const FinanceTab: React.FC = () => {
  const { transactions, addTransaction } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const [filterChannel, setFilterChannel] = useState<string>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State for Recording New Transaction
  const [formType, setFormType] = useState<TransactionType>('expense');
  const [formCategory, setFormCategory] = useState('Feed Procurement');
  const [formDesc, setFormDesc] = useState('');
  const [formAmount, setFormAmount] = useState<string>('');
  const [formChannel, setFormChannel] = useState<'M-Pesa STK' | 'M-Pesa Paybill' | 'Bank Transfer' | 'Cash / Farm Gate'>('M-Pesa Paybill');
  const [formRef, setFormRef] = useState('');
  const [formStaff, setFormStaff] = useState('Farm Manager Chalton');

  // Calculations
  const totalIncomeKes = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((acc, t) => acc + t.amountKes, 0),
    [transactions]
  );

  const totalExpenseKes = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((acc, t) => acc + t.amountKes, 0),
    [transactions]
  );

  const netProfitKes = totalIncomeKes - totalExpenseKes;
  const marginPercent = totalIncomeKes > 0 ? Math.round((netProfitKes / totalIncomeKes) * 100) : 0;

  const mpesaTotalKes = useMemo(
    () =>
      transactions
        .filter((t) => t.paymentChannel.includes('M-Pesa'))
        .reduce((acc, t) => acc + t.amountKes, 0),
    [transactions]
  );

  // Filtered Ledger
  const filteredTransactions = useMemo(() => {
    return transactions.filter((t) => {
      const matchesType = filterType === 'all' || t.type === filterType;
      const matchesChannel = filterChannel === 'all' || t.paymentChannel === filterChannel;
      const matchesSearch =
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.referenceCode.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesChannel && matchesSearch;
    });
  }, [transactions, filterType, filterChannel, searchTerm]);

  // Product Revenue breakdown
  const revenueByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'income')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amountKes;
      });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  // Expense OPEX breakdown
  const expenseByCategory = useMemo(() => {
    const map: Record<string, number> = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amountKes;
      });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [transactions]);

  const handleCreateTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = parseFloat(formAmount);
    if (!parsedAmount || parsedAmount <= 0) return;

    addTransaction({
      type: formType,
      category: formCategory,
      description: formDesc || `${formCategory} transaction`,
      amountKes: parsedAmount,
      paymentChannel: formChannel,
      referenceCode: formRef || `REF-${Math.floor(100000 + Math.random() * 900000)}`,
      recordedBy: formStaff
    });

    setIsAddModalOpen(false);
    setFormAmount('');
    setFormDesc('');
    setFormRef('');
  };

  const handleExportCSV = () => {
    const headers = ['Transaction ID', 'Date', 'Type', 'Category', 'Description', 'Amount (KES)', 'Channel', 'Reference Code', 'Recorded By'];
    const rows = filteredTransactions.map(t => [
      t.id,
      t.date,
      t.type.toUpperCase(),
      `"${t.category}"`,
      `"${t.description.replace(/"/g, '""')}"`,
      t.amountKes,
      `"${t.paymentChannel}"`,
      t.referenceCode,
      `"${t.recordedBy}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `larry_poultry_cashflow_ledger_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Finance Executive Header Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))',
          gap: '16px'
        }}
      >
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL INFLOW (REVENUE)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--primary-green)', marginTop: '4px' }}>
            KES {totalIncomeKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Verified M-Pesa STK, Bank EFT & Farm Gate
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>TOTAL OUTFLOW (OPEX)</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-red)', marginTop: '4px' }}>
            KES {totalExpenseKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Feeds, Vaccines, Fuel, Heating & Payroll
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>NET OPERATING CASHFLOW</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-sky)', marginTop: '4px' }}>
            KES {netProfitKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Operating margin: <strong>{marginPercent}%</strong>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>M-PESA TRANSACTIONS VOLUME</div>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#34d399', marginTop: '4px' }}>
            KES {mpesaTotalKes.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Safaricom Daraja Buy Goods & Paybill
          </div>
        </div>
      </div>

      {/* Income & Expense Category Breakdown Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))',
          gap: '20px'
        }}
      >
        {/* Revenue Streams */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingUp size={18} color="var(--primary-green)" />
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Inflow by Agricultural Stream
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {revenueByCategory.map(([cat, amt]) => {
              const pct = totalIncomeKes > 0 ? Math.round((amt / totalIncomeKes) * 100) : 0;
              return (
                <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cat}</span>
                    <span style={{ color: 'var(--primary-green)', fontWeight: 700 }}>
                      KES {amt.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--primary-green)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* OPEX Streams */}
        <div
          style={{
            backgroundColor: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            padding: '20px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
            <TrendingDown size={18} color="var(--accent-red)" />
            <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Operating Farm Expenses (OPEX)
            </h4>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {expenseByCategory.map(([cat, amt]) => {
              const pct = totalExpenseKes > 0 ? Math.round((amt / totalExpenseKes) * 100) : 0;
              return (
                <div key={cat} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{cat}</span>
                    <span style={{ color: 'var(--accent-red)', fontWeight: 700 }}>
                      KES {amt.toLocaleString()} ({pct}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'var(--bg-input)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', backgroundColor: 'var(--accent-red)', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Transactions Ledger Container */}
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
        {/* Ledger Header & Action Controls */}
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
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              M-Pesa & Cashflow Audit Ledger
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
              Real-time records from Daraja STK push, farm gate sales, and verified supplier invoices
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleExportCSV}
              className="btn btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 12px' }}
            >
              <Download size={15} />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 14px' }}
            >
              <Plus size={16} />
              <span>Record Expense / Inflow</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            alignItems: 'center',
            backgroundColor: 'var(--bg-section-alt)',
            padding: '12px',
            borderRadius: 'var(--radius-lg)'
          }}
        >
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '160px' }}>
            <Search
              size={16}
              style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
            />
            <input
              type="text"
              placeholder="Search reference code, supplier, category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 34px',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none'
              }}
            />
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none'
            }}
          >
            <option value="all">All Flow Types</option>
            <option value="income">Income (+ Inflow)</option>
            <option value="expense">Expenses (- OPEX)</option>
          </select>

          {/* Channel Filter */}
          <select
            value={filterChannel}
            onChange={(e) => setFilterChannel(e.target.value)}
            style={{
              padding: '8px 12px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none'
            }}
          >
            <option value="all">All Payment Channels</option>
            <option value="M-Pesa STK">M-Pesa STK</option>
            <option value="M-Pesa Paybill">M-Pesa Paybill</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash / Farm Gate">Cash / Farm Gate</option>
          </select>
        </div>

        {/* Ledger Table (Desktop view: >= 640px) */}
        <div className="table-responsive hide-on-mobile-admin">
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
            <thead>
              <tr style={{ backgroundColor: 'var(--bg-section-alt)', borderBottom: '1px solid var(--border-card)' }}>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Date & Time</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Type</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Category & Description</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ref / Receipt</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>Channel</th>
                <th style={{ padding: '12px 14px', fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right' }}>Amount (KES)</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx, idx) => {
                const isIncome = tx.type === 'income';
                return (
                  <tr
                    key={tx.id}
                    style={{
                      borderBottom: '1px solid var(--border-subtle)',
                      backgroundColor: idx % 2 === 0 ? 'transparent' : 'rgba(255, 255, 255, 0.01)'
                    }}
                  >
                    <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {tx.date}
                    </td>
                    <td style={{ padding: '12px 14px', whiteSpace: 'nowrap' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-full)',
                          backgroundColor: isIncome ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                          color: isIncome ? 'var(--primary-green)' : 'var(--accent-red)',
                          border: `1px solid ${isIncome ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                          textTransform: 'uppercase'
                        }}
                      >
                        {tx.type}
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                        {tx.description}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {tx.category} • Recorded by {tx.recordedBy}
                      </div>
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '0.82rem', fontFamily: 'monospace', color: 'var(--accent-sky)' }}>
                      {tx.referenceCode}
                    </td>
                    <td style={{ padding: '12px 14px', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {tx.paymentChannel}
                    </td>
                    <td
                      style={{
                        padding: '12px 14px',
                        fontSize: '0.92rem',
                        fontWeight: 800,
                        textAlign: 'right',
                        color: isIncome ? 'var(--primary-green)' : 'var(--accent-red)'
                      }}
                    >
                      {isIncome ? '+' : '-'} KES {tx.amountKes.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Ledger Cards (Mobile Phone View: < 640px) */}
        <div className="show-on-mobile-admin" style={{ flexDirection: 'column', gap: '10px', width: '100%' }}>
          {filteredTransactions.map((tx) => {
            const isIncome = tx.type === 'income';
            return (
              <div
                key={tx.id}
                style={{
                  backgroundColor: 'var(--bg-section-alt)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: isIncome ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: isIncome ? 'var(--primary-green)' : 'var(--accent-red)',
                        border: `1px solid ${isIncome ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
                        textTransform: 'uppercase'
                      }}
                    >
                      {tx.type}
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {tx.date}
                    </span>
                  </div>

                  <span
                    style={{
                      fontSize: '1rem',
                      fontWeight: 800,
                      color: isIncome ? 'var(--primary-green)' : 'var(--accent-red)'
                    }}
                  >
                    {isIncome ? '+' : '-'} KES {tx.amountKes.toLocaleString()}
                  </span>
                </div>

                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--text-primary)' }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {tx.category} • {tx.recordedBy}
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '6px', fontSize: '0.72rem' }}>
                  <span style={{ fontFamily: 'monospace', color: 'var(--accent-sky)' }}>
                    {tx.referenceCode}
                  </span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {tx.paymentChannel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Record Transaction Modal */}
      {isAddModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(5px)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px'
          }}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              width: 'min(calc(100vw - 32px), 520px)',
              maxHeight: 'min(90dvh, 750px)',
              overflowY: 'auto',
              padding: 'clamp(20px, 4vw, 32px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              position: 'relative'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                Record Financial Entry
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateTransaction} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Flow Type Toggle */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Transaction Flow
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('expense');
                      setFormCategory('Feed Procurement');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      border: formType === 'expense' ? '1px solid var(--accent-red)' : '1px solid var(--border-card)',
                      backgroundColor: formType === 'expense' ? 'rgba(239, 68, 68, 0.15)' : 'var(--bg-input)',
                      color: formType === 'expense' ? 'var(--accent-red)' : 'var(--text-secondary)'
                    }}
                  >
                    Expense (- OPEX)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setFormType('income');
                      setFormCategory('Retail Eggs');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      cursor: 'pointer',
                      border: formType === 'income' ? '1px solid var(--primary-green)' : '1px solid var(--border-card)',
                      backgroundColor: formType === 'income' ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-input)',
                      color: formType === 'income' ? 'var(--primary-green)' : 'var(--text-secondary)'
                    }}
                  >
                    Income (+ Inflow)
                  </button>
                </div>
              </div>

              {/* Category */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '16px'
                  }}
                >
                  {formType === 'expense' ? (
                    <>
                      <option value="Feed Procurement">Feed Procurement (Commercial Mash/Crumbs)</option>
                      <option value="Vaccines & Vet">Vaccines & Veterinary Services</option>
                      <option value="Utilities & Generator">Utilities & Incubator Generator Diesel</option>
                      <option value="Gas & Heating">Gas & Eco-Briquettes for Brooders</option>
                      <option value="Logistics & Fuel">Motorbike / Van Logistics & Fuel</option>
                      <option value="Packaging & Crates">Egg Trays & Packaging Cartons</option>
                      <option value="Staff Payroll">Staff & Casual Labor Payroll</option>
                      <option value="Other OPEX">Other Operational Expense</option>
                    </>
                  ) : (
                    <>
                      <option value="Retail Eggs">Retail Farm Eggs</option>
                      <option value="Dressed Broilers">Dressed Whole Broilers</option>
                      <option value="Kienyeji Live">Kienyeji Live Birds</option>
                      <option value="Day-Old Chicks">Day-Old Chicks (Hatchery Deposits)</option>
                      <option value="Feeds & Nutrition">Farm Feeds & Supplements</option>
                      <option value="Organic Manure">Organic Poultry Manure</option>
                      <option value="Wholesale B2B">Corporate Wholesale Settlement</option>
                    </>
                  )}
                </select>
              </div>

              {/* Amount in KES */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Amount in KES *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  step="any"
                  placeholder="e.g. 15000"
                  value={formAmount}
                  onChange={(e) => setFormAmount(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '16px'
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Description / Vendor / Item Details *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Unga Farm Care 20 bags Broiler Finisher"
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    backgroundColor: 'var(--bg-input)',
                    border: '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '16px'
                  }}
                />
              </div>

              {/* Payment Channel & Ref */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 180px), 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Payment Channel
                  </label>
                  <select
                    value={formChannel}
                    onChange={(e) => setFormChannel(e.target.value as any)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '16px'
                    }}
                  >
                    <option value="M-Pesa Paybill">M-Pesa Paybill</option>
                    <option value="M-Pesa STK">M-Pesa STK</option>
                    <option value="Bank Transfer">Bank Transfer / EFT</option>
                    <option value="Cash / Farm Gate">Cash / Farm Gate</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Receipt / Reference Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. QKL910482B or INVOICE-442"
                    value={formRef}
                    onChange={(e) => setFormRef(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      backgroundColor: 'var(--bg-input)',
                      border: '1px solid var(--border-card)',
                      borderRadius: 'var(--radius-md)',
                      color: 'var(--text-primary)',
                      fontSize: '16px'
                    }}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
