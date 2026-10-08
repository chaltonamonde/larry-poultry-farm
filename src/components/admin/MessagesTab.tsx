import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  MessageSquare,
  Search,
  Filter,
  Star,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  MessageCircle,
  Archive,
  CornerDownRight,
  Send,
  User
} from 'lucide-react';
import { CustomerInquiryMessage } from '../../types';
import { FARM_CONFIG } from '../../data/farmData';

export const MessagesTab: React.FC = () => {
  const { messages, markMessageStatus, toggleMessageStar } = useAdmin();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'starred' | 'replied'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<CustomerInquiryMessage | null>(null);
  const [staffNoteInput, setStaffNoteInput] = useState('');

  const filteredMessages = messages.filter((m) => {
    const matchesFilter =
      activeFilter === 'all'
        ? true
        : activeFilter === 'unread'
        ? m.status === 'unread'
        : activeFilter === 'starred'
        ? m.isStarred
        : m.status === 'replied';

    const matchesSearch =
      m.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.senderPhone.includes(searchQuery) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleOpenMessage = (msg: CustomerInquiryMessage) => {
    setSelectedMessage(msg);
    setStaffNoteInput(msg.replyNotes || '');
    if (msg.status === 'unread') {
      markMessageStatus(msg.id, 'read');
    }
  };

  const handleSaveStaffNote = (msgId: string) => {
    markMessageStatus(msgId, 'replied', staffNoteInput);
    if (selectedMessage) {
      setSelectedMessage({ ...selectedMessage, status: 'replied', replyNotes: staffNoteInput });
    }
  };

  const handleDirectWhatsAppReply = (msg: CustomerInquiryMessage) => {
    const text =
      `*LARRY POULTRY FARM CUSTOMER CARE*\n\n` +
      `Hello ${msg.senderName},\n` +
      `Thank you for reaching out to Larry Poultry Farm regarding *"${msg.subject}"*.\n\n` +
      `We received your note: _"${msg.message}"_\n\n` +
      `How can we best assist you with your poultry farming requirements today?`;

    const phoneClean = msg.senderPhone.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneClean}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    markMessageStatus(msg.id, 'replied', 'Replied directly via official WhatsApp link');
    if (selectedMessage && selectedMessage.id === msg.id) {
      setSelectedMessage({ ...selectedMessage, status: 'replied', replyNotes: 'Replied directly via official WhatsApp link' });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Customer Inquiries & Communications Desk
        </h2>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
          All customer messages from the contact form, website WhatsApp triggers, and farm inquiries
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          alignItems: 'center',
          backgroundColor: 'var(--bg-card)',
          border: '1px solid var(--border-card)',
          borderRadius: 'var(--radius-xl)',
          padding: '14px'
        }}
      >
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {[
            { id: 'all', label: 'All Inquiries' },
            { id: 'unread', label: 'Unread' },
            { id: 'starred', label: 'Starred / Priority' },
            { id: 'replied', label: 'Replied' }
          ].map((tab) => {
            const isSelected = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveFilter(tab.id as any)}
                style={{
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 500,
                  backgroundColor: isSelected ? 'var(--accent-sky)' : 'var(--bg-input)',
                  color: isSelected ? '#07130e' : 'var(--text-secondary)',
                  border: isSelected ? '1px solid var(--accent-sky)' : '1px solid var(--border-card)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div style={{ position: 'relative', flex: '1 1 200px', minWidth: '160px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search inquiries by name, phone, or question..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '8px 12px 8px 36px',
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

      {/* Main Messages Layout: List & Detail Drawer */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: selectedMessage ? 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))' : '1fr',
          gap: '20px'
        }}
      >
        {/* Messages List Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredMessages.length === 0 ? (
            <div
              style={{
                padding: '40px 20px',
                textAlign: 'center',
                backgroundColor: 'var(--bg-card)',
                borderRadius: 'var(--radius-xl)',
                color: 'var(--text-muted)',
                fontSize: '0.88rem'
              }}
            >
              No customer inquiries found for this filter.
            </div>
          ) : (
            filteredMessages.map((msg) => {
              const isSelected = selectedMessage?.id === msg.id;
              const isUnread = msg.status === 'unread';

              return (
                <div
                  key={msg.id}
                  onClick={() => handleOpenMessage(msg)}
                  style={{
                    backgroundColor: isSelected ? 'rgba(56, 189, 248, 0.08)' : 'var(--bg-card)',
                    border: isSelected ? '1px solid var(--accent-sky)' : '1px solid var(--border-card)',
                    borderRadius: 'var(--radius-xl)',
                    padding: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleMessageStar(msg.id);
                        }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                        title="Star message"
                      >
                        <Star size={16} color={msg.isStarred ? 'var(--accent-amber)' : 'var(--text-muted)'} fill={msg.isStarred ? 'var(--accent-amber)' : 'none'} />
                      </button>
                      <span style={{ fontWeight: isUnread ? 800 : 600, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                        {msg.senderName}
                      </span>
                      {isUnread && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--accent-sky)',
                            boxShadow: '0 0 6px rgba(56, 189, 248, 0.8)'
                          }}
                        />
                      )}
                    </div>
                    <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{msg.date}</span>
                  </div>

                  <div style={{ fontWeight: isUnread ? 700 : 600, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                    {msg.subject}
                  </div>

                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.8rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.45,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {msg.message}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    <span>{msg.senderPhone}</span>
                    <span
                      style={{
                        padding: '1px 6px',
                        borderRadius: 'var(--radius-full)',
                        backgroundColor:
                          msg.status === 'replied'
                            ? 'rgba(34, 197, 94, 0.15)'
                            : isUnread
                            ? 'rgba(56, 189, 248, 0.15)'
                            : 'var(--bg-input)',
                        color:
                          msg.status === 'replied'
                            ? 'var(--primary-green)'
                            : isUnread
                            ? 'var(--accent-sky)'
                            : 'var(--text-secondary)'
                      }}
                    >
                      {msg.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Message Reader & Reply Desk */}
        {selectedMessage && (
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'clamp(18px, 3vw, 26px)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              position: 'sticky',
              top: '90px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'rgba(56, 189, 248, 0.15)',
                    color: 'var(--accent-sky)'
                  }}
                >
                  {selectedMessage.source.toUpperCase()}
                </span>
                <h3 style={{ margin: '8px 0 4px 0', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {selectedMessage.subject}
                </h3>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  From: <strong>{selectedMessage.senderName}</strong> • {selectedMessage.senderPhone}
                  {selectedMessage.senderEmail && ` • ${selectedMessage.senderEmail}`}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedMessage(null)}
                style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            {/* Message Body */}
            <div
              style={{
                backgroundColor: 'var(--bg-section-alt)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-lg)',
                padding: '16px',
                fontSize: '0.9rem',
                lineHeight: 1.6,
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap'
              }}
            >
              {selectedMessage.message}
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleDirectWhatsAppReply(selectedMessage)}
                className="btn btn-whatsapp"
                style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '10px 14px' }}
              >
                <MessageCircle size={16} />
                <span>Reply on WhatsApp</span>
              </button>

              <a
                href={`tel:${selectedMessage.senderPhone}`}
                className="btn btn-secondary"
                style={{ textDecoration: 'none', fontSize: '0.85rem', padding: '10px 14px' }}
              >
                <Phone size={15} />
                <span>Direct Call</span>
              </a>
            </div>

            {/* Staff Internal Reply Log */}
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                Staff Action & Follow-up Notes:
              </label>
              <textarea
                rows={3}
                placeholder="Record notes on what was agreed with customer or dispatch plan..."
                value={staffNoteInput}
                onChange={(e) => setStaffNoteInput(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  backgroundColor: 'var(--bg-input)',
                  border: '1px solid var(--border-card)',
                  borderRadius: 'var(--radius-md)',
                  color: 'var(--text-primary)',
                  fontSize: '16px',
                  outline: 'none',
                  resize: 'vertical'
                }}
              />
              <button
                type="button"
                onClick={() => handleSaveStaffNote(selectedMessage.id)}
                className="btn-primary"
                style={{ alignSelf: 'flex-start', fontSize: '0.8rem', padding: '8px 14px' }}
              >
                <CheckCircle2 size={15} />
                <span>Mark as Resolved & Save Note</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
