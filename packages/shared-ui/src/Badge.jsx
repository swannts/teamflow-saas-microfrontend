import React from 'react';

export function Badge({ children, variant = 'info', className = '', ...props }) {
  const baseClass = `tf-badge tf-badge-${variant}`;
  return (
    <span className={`${baseClass} ${className}`} {...props}>
      {children}
    </span>
  );
}
