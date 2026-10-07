import React from 'react';
import { ProductAvailability } from '../../types';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck } from 'lucide-react';

interface BadgeProps {
  type: ProductAvailability | 'wholesale' | 'verified';
  text?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ type, text, className = '' }) => {
  if (type === 'in-stock') {
    return (
      <span className={`badge badge-in-stock ${className}`}>
        <CheckCircle2 size={13} aria-hidden="true" />
        {text || 'In Stock'}
      </span>
    );
  }

  if (type === 'limited') {
    return (
      <span className={`badge badge-limited ${className}`}>
        <AlertTriangle size={13} aria-hidden="true" />
        {text || 'Few Left'}
      </span>
    );
  }

  if (type === 'pre-order') {
    return (
      <span className={`badge badge-pre-order ${className}`}>
        <Clock size={13} aria-hidden="true" />
        {text || 'Pre-order'}
      </span>
    );
  }

  if (type === 'wholesale') {
    return (
      <span className={`badge badge-wholesale ${className}`}>
        <ShieldCheck size={13} aria-hidden="true" />
        {text || 'Bulk Available'}
      </span>
    );
  }

  return (
    <span className={`badge badge-in-stock ${className}`}>
      <CheckCircle2 size={13} aria-hidden="true" />
      {text || 'Verified'}
    </span>
  );
};
