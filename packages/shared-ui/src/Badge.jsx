import React from 'react';

export function Badge({ children, variant = 'info', className = '', ...props }) {
  const variants = {
    success: 'bg-success/10 text-success border-success/20 shadow-[0_0_10px_rgba(16,185,129,0.1)]',
    warning: 'bg-warning/10 text-warning border-warning/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]',
    danger: 'bg-danger/10 text-danger border-danger/20 shadow-[0_0_10px_rgba(239,68,68,0.1)]',
    info: 'bg-info/10 text-info border-info/20 shadow-[0_0_10px_rgba(6,182,212,0.1)]',
    secondary: 'bg-white/5 text-text-secondary border-white/10'
  };

  const variantClass = variants[variant] || variants.info;
  const baseClass = 'text-[0.7rem] font-bold px-3 py-1 rounded-full uppercase tracking-wider border inline-flex items-center gap-1.5 transition-all';

  return (
    <span className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
