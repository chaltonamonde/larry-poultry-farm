import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { FARM_CONFIG } from '../../data/farmData';
import { useToast } from '../../context/ToastContext';
import { X, CheckCircle2, Phone, ShieldCheck, ArrowRight, ArrowLeft, Loader2, MessageCircle, AlertCircle, Copy } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutModalOpen,
    setIsCheckoutModalOpen,
    cartItems,
    clearCart,
    subtotalKes,
    effectiveDeliveryFeeKes,
    grandTotalKes,
    selectedTown,
    depositTotalKes
  } = useCart();

  const { addToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [estateAddress, setEstateAddress] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  // Payment State
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'cod'>('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [isSimulatingSTK, setIsSimulatingSTK] = useState(false);
  const [stkStatus, setStkStatus] = useState<'idle' | 'prompted' | 'success'>('idle');
  const [generatedOrderId, setGeneratedOrderId] = useState('');
  const [mpesaReceiptCode, setMpesaReceiptCode] = useState('');

  if (!isCheckoutModalOpen) return null;

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !estateAddress.trim()) {
      addToast({
        type: 'warning',
        title: 'Missing Required Fields',
        message: 'Please provide your name, phone number, and delivery location.'
      });
      return;
    }
    if (!mpesaNumber) {
      setMpesaNumber(phone);
    }
    setStep(2);
  };

  const handleTriggerMpesaSTK = () => {
    setIsSimulatingSTK(true);
    setStkStatus('prompted');

    // Simulate Daraja STK Push delay
    setTimeout(() => {
      const randomReceipt = 'QKL' + Math.floor(10000000 + Math.random() * 90000000);
      const randomOrderId = 'LPF-' + Math.floor(1000 + Math.random() * 9000);
      setMpesaReceiptCode(randomReceipt);
      setGeneratedOrderId(randomOrderId);
      setIsSimulatingSTK(false);
      setStkStatus('success');
      setStep(3);
      clearCart();
    }, 3800);
  };

  const handleConfirmPayOnDelivery = () => {
    const randomOrderId = 'LPF-COD-' + Math.floor(1000 + Math.random() * 9000);
    setGeneratedOrderId(randomOrderId);
    setMpesaReceiptCode('PAY-ON-DELIVERY');
    setStep(3);
    clearCart();
  };

  const handleShareConfirmationToWhatsApp = () => {
    const text = `*LARRY POULTRY FARM CONFIRMED ORDER*\n` +
      `*Order ID:* ${generatedOrderId}\n` +
      `*Customer:* ${fullName} (${phone})\n` +
      `*Delivery Location:* ${selectedTown.name} - ${estateAddress}\n` +
      `*Payment:* ${paymentMethod === 'mpesa' ? `M-Pesa STK Verified (${mpesaReceiptCode})` : 'Pay On Delivery / COD'}\n` +
      `*Total Value:* KES ${grandTotalKes.toLocaleString()}\n\n` +
      `Please schedule dispatch to my location.`;

    window.open(`https://wa.me/${FARM_CONFIG.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(6px)',
        zIndex: 1200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px'
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div
        style={{
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          width: 'min(calc(100vw - 16px), 560px)',
          maxHeight: 'min(94dvh, 850px)',
          overflowY: 'auto',
          boxShadow: 'var(--shadow-lg)',
          position: 'relative',
          padding: 'clamp(16px, 3vw, 24px)'
        }}
      >
        {/* Header & Steps Indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--accent-sky)', fontWeight: 700, textTransform: 'uppercase' }}>
              Step {step} of 3
            </span>
            <h2 id="checkout-modal-title" style={{ fontSize: '1.3rem', margin: '2px 0 0 0' }}>
              {step === 1 && 'Delivery & Contact Details'}
              {step === 2 && 'M-Pesa Payment Simulation'}
              {step === 3 && 'Order Confirmed!'}
            </h2>
          </div>
          {step !== 3 && (
            <button
              onClick={() => setIsCheckoutModalOpen(false)}
              style={{ padding: '6px', color: 'var(--text-muted)' }}
              aria-label="Close checkout"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Step Progress Bar */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {[1, 2, 3].map(s => (
            <div
              key={s}
              style={{
                flex: 1,
                height: '4px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: s <= step ? 'var(--primary-green)' : 'var(--bg-input)'
              }}
            />
          ))}
        </div>

        {/* STEP 1: CONTACT & DELIVERY */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Full Name / Contact Person *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="e.g. John Mwangi or Sarah Kipkorir"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Phone Number (M-Pesa / WhatsApp) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="0712 345 678"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                  Destination Town
                </label>
                <input
                  type="text"
                  disabled
                  value={`${selectedTown.name} (KES ${effectiveDeliveryFeeKes})`}
                  style={{ backgroundColor: 'var(--bg-input)', opacity: 0.85, cursor: 'not-allowed' }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Delivery Estate / Landmark / Specific Street *
              </label>
              <input
                type="text"
                required
                value={estateAddress}
                onChange={e => setEstateAddress(e.target.value)}
                placeholder="e.g. Ruiru Kimbo near Total Petrol Station, Gate 2"
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                Special Instructions (Optional)
              </label>
              <input
                type="text"
                value={deliveryNotes}
                onChange={e => setDeliveryNotes(e.target.value)}
                placeholder="e.g. Morning delivery preferred, live bird crates"
              />
            </div>

            {/* Order Total Preview Box */}
            <div
              style={{
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Items in Cart: {cartItems.length}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  Delivery: {selectedTown.name}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Payable Amount:</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary-green)' }}>
                  KES {grandTotalKes.toLocaleString()}
                </div>
              </div>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
              <span>Continue to Payment Selection</span>
              <ArrowRight size={18} />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD & M-PESA STK SIMULATION */}
        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Payment Method Selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: paymentMethod === 'mpesa' ? 'rgba(34, 197, 94, 0.1)' : 'var(--bg-input)',
                  border: `1px solid ${paymentMethod === 'mpesa' ? 'var(--primary-green)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'mpesa'}
                  onChange={() => setPaymentMethod('mpesa')}
                  style={{ width: 'auto' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>M-Pesa Daraja STK Push</span>
                    <span style={{ fontSize: '0.72rem', backgroundColor: '#22c55e', color: '#07130e', padding: '1px 6px', borderRadius: '4px', fontWeight: 800 }}>
                      INSTANT
                    </span>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Prompt sent directly to your Safaricom phone to enter M-Pesa PIN.
                  </div>
                </div>
              </label>

              <label
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  backgroundColor: paymentMethod === 'cod' ? 'rgba(56, 189, 248, 0.1)' : 'var(--bg-input)',
                  border: `1px solid ${paymentMethod === 'cod' ? 'var(--accent-sky)' : 'var(--border-card)'}`,
                  borderRadius: 'var(--radius-md)',
                  padding: '14px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  style={{ width: 'auto' }}
                />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    Pay on Delivery / Cash on Arrival
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Pay cash or M-Pesa to delivery driver after inspecting eggs or birds.
                  </div>
                </div>
              </label>
            </div>

            {/* M-Pesa Input & Simulation Box */}
            {paymentMethod === 'mpesa' ? (
              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShieldCheck size={18} color="var(--primary-green)" />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>
                    Safaricom Daraja STK Push Simulation (Phase 1 UI)
                  </span>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '0.82rem', marginBottom: '6px', color: 'var(--text-muted)' }}>
                    M-Pesa Registered Number:
                  </label>
                  <input
                    type="tel"
                    value={mpesaNumber}
                    onChange={e => setMpesaNumber(e.target.value)}
                    placeholder="07XX XXX XXX"
                  />
                </div>

                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
                  Business Till/Paybill: <strong>{FARM_CONFIG.mpesa.tillNumber}</strong>
                  <br />
                  Amount to be prompted: <strong style={{ color: 'var(--primary-green)' }}>KES {grandTotalKes.toLocaleString()}</strong>
                </div>

                {isSimulatingSTK ? (
                  <div
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      backgroundColor: 'rgba(34, 197, 94, 0.1)',
                      border: '1px solid var(--primary-green)',
                      textAlign: 'center'
                    }}
                  >
                    <Loader2 size={24} color="var(--primary-green)" className="animate-spin" style={{ margin: '0 auto 8px auto' }} />
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      STK Push Sent to {mpesaNumber || phone}!
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                      Please check your phone screen and enter your M-Pesa PIN...
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={handleTriggerMpesaSTK}
                    className="btn-primary"
                    style={{ width: '100%' }}
                  >
                    <span>Simulate M-Pesa STK Push Payment</span>
                  </button>
                )}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--accent-sky)' }}>
                  <AlertCircle size={18} />
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>Pay-on-Delivery Policy</span>
                </div>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4, margin: 0 }}>
                  For day-old chick pre-orders or custom bulk slaughter batches, an initial 30% deposit is mandatory to lock incubation slots. For table eggs, drivers carry an M-Pesa Till number upon delivery.
                </p>

                <button
                  type="button"
                  onClick={handleConfirmPayOnDelivery}
                  className="btn-primary"
                  style={{ width: '100%', marginTop: '16px' }}
                >
                  <span>Confirm Pay-on-Delivery Order</span>
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary"
              style={{ width: '100%' }}
            >
              <ArrowLeft size={16} />
              <span>Back to Delivery Details</span>
            </button>
          </div>
        )}

        {/* STEP 3: ORDER CONFIRMATION & RECEIPT */}
        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '16px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'rgba(34, 197, 94, 0.15)',
                border: '2px solid var(--primary-green)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CheckCircle2 size={36} color="var(--primary-green)" />
            </div>

            <div>
              <h3 style={{ fontSize: '1.35rem', marginBottom: '4px' }}>Order Successfully Placed!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
                Thank you, {fullName}. Our farm dispatch team is preparing your poultry order.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div
              style={{
                width: '100%',
                backgroundColor: 'var(--bg-input)',
                border: '1px solid var(--border-card)',
                borderRadius: 'var(--radius-md)',
                padding: '16px',
                textAlign: 'left'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-card)', paddingBottom: '8px', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Order Reference:</span>
                <strong style={{ color: 'var(--accent-sky)', fontSize: '0.9rem' }}>{generatedOrderId}</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>M-Pesa Transaction ID:</span>
                <span style={{ fontWeight: 700 }}>{mpesaReceiptCode}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Delivery Location:</span>
                <span>{selectedTown.name}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Estimated Transit:</span>
                <span style={{ color: 'var(--primary-green)' }}>{selectedTown.estimatedTransit}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-card)', paddingTop: '8px', marginTop: '8px', fontWeight: 800 }}>
                <span>Total Amount:</span>
                <span style={{ color: 'var(--primary-green)', fontSize: '1.1rem' }}>
                  KES {grandTotalKes.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="btn-group-responsive" style={{ width: '100%', gap: '10px' }}>
              <button
                type="button"
                onClick={handleShareConfirmationToWhatsApp}
                className="btn-whatsapp"
                style={{ width: '100%' }}
              >
                <MessageCircle size={18} />
                <span>Send Order Copy to Farm WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsCheckoutModalOpen(false);
                  setStep(1);
                }}
                className="btn-secondary"
                style={{ width: '100%' }}
              >
                <span>Return to Farm Store</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
