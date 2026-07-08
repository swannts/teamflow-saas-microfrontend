import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-primary text-white border-primary/20 hover:bg-primary-hover hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(139,92,246,0.25)]',
    secondary: 'bg-white/5 text-text-primary border-white/10 hover:bg-white/10 hover:-translate-y-0.5',
    info: 'bg-info/10 text-info border-info/20 hover:bg-info/20 hover:-translate-y-0.5'
  };

  const variantClass = variants[variant] || variants.primary;
  const baseClass = 'px-5 py-2.5 rounded-sm text-sm font-semibold tracking-wide border transition-all duration-200 inline-flex items-center justify-center gap-2 cursor-pointer outline-none';

  return (
    <button className={`${baseClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
