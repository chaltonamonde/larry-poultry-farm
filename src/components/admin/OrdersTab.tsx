import React, { useState, useMemo } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  PackageCheck,
  Search,
  Filter,
  Truck,
  Phone,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Plus,
  X,
  CreditCard,
  User,
  Send,
  FileText
} from 'lucide-react';
import { FarmOrder, OrderStatus, PaymentStatus } from '../../types';
import { FARM_CONFIG } from '../../data/farmData';

export const OrdersTab: React.FC = () => {
  const { orders, updateOrderStatus, addOrder, products } = useAdmin();

  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<FarmOrder | null>(null);
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);

  // Manual Order Form State
  const [manualCustomer, setManualCustomer] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualTown, setManualTown] = useState('Nairobi (Westlands / Parklands)');
  const [manualAddress, setManualAddress] = useState('Farm Gate Pickup Point');
  const [manualProductId, setManualProductId] = useState(products[0]?.id || 'eggs-grade-a');
  const [manualQty, setManualQty] = useState(1);
  const [manualPayment, setManualPayment] = useState<'mpesa' | 'cod'>('mpesa');

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchesStatus = selectedStatus === 'all' || ord.status === selectedStatus;
      const matchesSearch =
        ord.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.customerPhone.includes(searchTerm) ||
        ord.deliveryTown.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ord.estateAddress.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [orders, selectedStatus, searchTerm]);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const notes =
      newStatus === 'in-transit'
        ? 'Dispatched with temperature-controlled cold box. En route to customer.'
        : newStatus === 'delivered'
        ? 'Delivered to customer doorstep and verified.'
        : undefined;
    updateOrderStatus(orderId, newStatus, notes);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder({ ...selectedOrder, status: newStatus, trackingNotes: notes || selectedOrder.trackingNotes });
    }
  };

  const handleSendWhatsAppNotification = (order: FarmOrder) => {
    const itemsList = order.items.map((i) => `• ${i.quantity}x ${i.name} (${i.packSize})`).join('\n');
    const statusMsg =
      order.status === 'in-transit'
        ? '📦 *DISPATCH ALERT:* Your order is currently OUT FOR DELIVERY via our cold-chain delivery service.'
        : order.status === 'delivered'
        ? '✅ *DELIVERED:* Your order has been delivered and fulfilled. Thank you for choosing Larry Poultry Farm!'
        : `📋 *ORDER UPDATE:* Your order is currently marked as *${order.status.toUpperCase()}*.`;

    const text =
      `*LARRY POULTRY FARM OFFICIAL DISPATCH WAYBILL*\n\n` +
      `Hello ${order.customerName},\n` +
      `${statusMsg}\n\n` +
      `*Waybill ID:* ${order.id}\n` +
      `*Destination:* ${order.deliveryTown} (${order.estateAddress})\n` +
      `*Items Ordered:*\n${itemsList}\n\n` +
      `*Total Amount:* KES ${order.grandTotalKes.toLocaleString()}\n` +
      `*Payment Status:* ${order.paymentStatus === 'paid-mpesa' ? `M-Pesa Verified (${order.mpesaReceiptCode})` : 'Pay on Delivery'}\n\n` +
      `For any urgent delivery assistance, reach our logistics desk at ${FARM_CONFIG.phoneDisplay}.`;

    const phoneClean = order.customerPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  const handleCreateManualOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const prod = products.find((p) => p.id === manualProductId) || products[0];
    const total = prod.priceKes * manualQty;

    addOrder({
      customerName: manualCustomer || 'Farm Gate Customer',
      customerPhone: manualPhone || '+254 700 000 000',
      deliveryTown: manualTown,
      estateAddress: manualAddress,
      deliveryNotes: 'Manual order created by Farm Manager',
      items: [
        {
          productId: prod.id,
          name: prod.name,
          packSize: prod.packSize,
          quantity: manualQty,
          unitPriceKes: prod.priceKes,
          totalKes: total
        }
      ],
      subtotalKes: total,
      deliveryFeeKes: 0,
      grandTotalKes: total,
      status: 'processing',
      paymentMethod: manualPayment,
      paymentStatus: manualPayment === 'mpesa' ? 'paid-mpesa' : 'pending-cod',
      mpesaReceiptCode: manualPayment === 'mpesa' ? `FARM-${Math.floor(100000 + Math.random() * 900000)}` : undefined,
      driverName: 'Farm Gate Desk'
    });

    setIsManualModalOpen(false);
    setManualCustomer('');
    setManualPhone('');
    setManualQty(1);
  };

  const statusCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === 'pending').length,
    processing: orders.filter((o) => o.status === 'processing').length,
    'in-transit': orders.filter((o) => o.status === 'in-transit').length,
    delivered: orders.filter((o) => o.status === 'delivered').length
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Controls Bar */}
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
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Live Orders & Dispatch Pipeline
          </h2>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
            Real-time fulfillment tracking from Ruiru packing sheds to Nairobi doorsteps
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsManualModalOpen(true)}
          className="btn-primary"
          style={{ fontSize: '0.85rem', padding: '9px 16px' }}
        >
          <Plus size={16} />
          <span>Create Farm Order</span>
        </button>
      </div>

      {/* Filter Tabs and Search Bar */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '16px'
        }}
      >
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All Orders', count: statusCounts.all },
            { id: 'pending', label: 'Pending Confirmation', count: statusCounts.pending },
            { id: 'processing', label: 'Processing / Packing', count: statusCounts.processing },
            { id: 'in-transit', label: 'Out for Delivery', count: statusCounts['in-transit'] },
            { id: 'delivered', label: 'Delivered / Completed', count: statusCounts.delivered }
          ].map((tab) => {
            const isSelected = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedStatus(tab.id)}
                style={{
                  padding: '7px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--primary-green)' : 'var(--bg-input)',
                  color: isSelected ? '#07130e' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--primary-green)' : '1px solid var(--border-card)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.label}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 800,
                    padding: '1px 5px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: isSelected ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.06)'
                  }}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}
          />
          <input
            type="text"
            placeholder="Search by Order ID (e.g. LPF-9042), customer name, town or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 38px',
              backgroundColor: 'var(--bg-input)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '16px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Orders List Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {filteredOrders.length === 0 ? (
          <div
            style={{
              padding: '40px 20px',
              textAlign: 'center',
              backgroundColor: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              color: 'var(--text-muted)',
              fontSize: '0.9rem'
            }}
          >
            No orders match the selected filter.
          </div>
        ) : (
          filteredOrders.map((order) => {
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
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-xl)',
                  padding: 'clamp(16px, 3vw, 22px)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                }}
              >
                {/* Header Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    flexWrap: 'wrap',
                    gap: '10px',
                    borderBottom: '1px solid var(--border-subtle)',
                    paddingBottom: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {order.id}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '3px 10px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor: `${statusColor}18`,
                        color: statusColor,
                        border: `1px solid ${statusColor}35`,
                        textTransform: 'uppercase'
                      }}
                    >
                      {order.status}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: 600,
                        padding: '2px 8px',
                        borderRadius: 'var(--radius-sm)',
                        backgroundColor:
                          order.paymentStatus === 'paid-mpesa'
                            ? 'rgba(34, 197, 94, 0.12)'
                            : 'rgba(245, 158, 11, 0.12)',
                        color: order.paymentStatus === 'paid-mpesa' ? 'var(--primary-green)' : 'var(--accent-amber)',
                        border: `1px solid ${order.paymentStatus === 'paid-mpesa' ? 'rgba(34, 197, 94, 0.25)' : 'rgba(245, 158, 11, 0.25)'}`
                      }}
                    >
                      {order.paymentStatus === 'paid-mpesa' ? `M-Pesa Verified (${order.mpesaReceiptCode})` : 'Pay on Delivery (COD)'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} /> {order.createdAt}
                  </div>
                </div>

                {/* Customer Details & Location */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
                    gap: '14px',
                    fontSize: '0.84rem'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      <User size={15} color="var(--primary-green)" />
                      <span>{order.customerName}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                      <Phone size={14} color="var(--accent-sky)" />
                      <a href={`tel:${order.customerPhone}`} style={{ color: 'var(--accent-sky)', textDecoration: 'none' }}>
                        {order.customerPhone}
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)', fontWeight: 600 }}>
                      <MapPin size={15} color="var(--accent-amber)" />
                      <span>{order.deliveryTown}</span>
                    </div>
                    <div style={{ color: 'var(--text-secondary)', paddingLeft: '21px' }}>
                      {order.estateAddress}
                    </div>
                  </div>
                </div>

                {/* Items Ordered List */}
                <div
                  style={{
                    backgroundColor: 'var(--bg-section-alt)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '12px 14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Items Manifest ({order.items.length})
                  </div>
                  {order.items.map((item, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.84rem' }}>
                      <span style={{ color: 'var(--text-primary)' }}>
                        <strong>{item.quantity}x</strong> {item.name}{' '}
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>({item.packSize})</span>
                      </span>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        KES {item.totalKes.toLocaleString()}
                      </span>
                    </div>
                  ))}
                  <div
                    style={{
                      borderTop: '1px solid var(--border-subtle)',
                      paddingTop: '6px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontSize: '0.88rem'
                    }}
                  >
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Delivery Fee: KES {order.deliveryFeeKes.toLocaleString()}
                    </span>
                    <span style={{ fontWeight: 800, color: 'var(--primary-green)', fontSize: '1rem' }}>
                      Grand Total: KES {order.grandTotalKes.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Tracking Notes / Driver Info */}
                {order.trackingNotes && (
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontStyle: 'italic', paddingLeft: '4px' }}>
                    📌 Dispatch Log: {order.trackingNotes} {order.driverName && `(Courier: ${order.driverName})`}
                  </div>
                )}

                {/* Dispatch & Notification Actions */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '10px',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Status:</span>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(order.id, 'processing')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: order.status === 'processing' ? 'var(--accent-amber)' : 'var(--bg-input)',
                        color: order.status === 'processing' ? '#07130e' : 'var(--text-secondary)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      Processing
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(order.id, 'in-transit')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: order.status === 'in-transit' ? 'var(--accent-sky)' : 'var(--bg-input)',
                        color: order.status === 'in-transit' ? '#07130e' : 'var(--text-secondary)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      Out for Delivery
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusChange(order.id, 'delivered')}
                      style={{
                        padding: '5px 10px',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        backgroundColor: order.status === 'delivered' ? 'var(--primary-green)' : 'var(--bg-input)',
                        color: order.status === 'delivered' ? '#07130e' : 'var(--text-secondary)',
                        border: '1px solid var(--border-card)'
                      }}
                    >
                      Delivered
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSendWhatsAppNotification(order)}
                    className="btn btn-whatsapp"
                    style={{ fontSize: '0.82rem', padding: '8px 14px' }}
                  >
                    <MessageCircle size={16} />
                    <span>WhatsApp Waybill to Customer</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Manual Order Creation Modal */}
      {isManualModalOpen && (
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
              gap: '18px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                New Farm Gate / Phone Order
              </h3>
              <button
                type="button"
                onClick={() => setIsManualModalOpen(false)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateManualOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Customer Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Samuel Mutua"
                  value={manualCustomer}
                  onChange={(e) => setManualCustomer(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+254 7XX XXX XXX"
                  value={manualPhone}
                  onChange={(e) => setManualPhone(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '16px' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Product
                  </label>
                  <select
                    value={manualProductId}
                    onChange={(e) => setManualProductId(e.target.value)}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '16px' }}
                  >
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} (KES {p.priceKes})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                    Quantity
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={manualQty}
                    onChange={(e) => setManualQty(parseInt(e.target.value) || 1)}
                    style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '16px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Delivery Location / Pickup Point
                </label>
                <input
                  type="text"
                  value={manualAddress}
                  onChange={(e) => setManualAddress(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', backgroundColor: 'var(--bg-input)', border: '1px solid var(--border-card)', borderRadius: 'var(--radius-md)', color: 'var(--text-primary)', fontSize: '16px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '5px' }}>
                  Payment Method
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={() => setManualPayment('mpesa')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: manualPayment === 'mpesa' ? '1px solid var(--primary-green)' : '1px solid var(--border-card)',
                      backgroundColor: manualPayment === 'mpesa' ? 'rgba(34, 197, 94, 0.15)' : 'var(--bg-input)',
                      color: manualPayment === 'mpesa' ? 'var(--primary-green)' : 'var(--text-secondary)'
                    }}
                  >
                    Paid via M-Pesa
                  </button>
                  <button
                    type="button"
                    onClick={() => setManualPayment('cod')}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: 600,
                      cursor: 'pointer',
                      border: manualPayment === 'cod' ? '1px solid var(--accent-amber)' : '1px solid var(--border-card)',
                      backgroundColor: manualPayment === 'cod' ? 'rgba(245, 158, 11, 0.15)' : 'var(--bg-input)',
                      color: manualPayment === 'cod' ? 'var(--accent-amber)' : 'var(--text-secondary)'
                    }}
                  >
                    Pay on Delivery / Cash
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="btn btn-secondary"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
                  Create Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
