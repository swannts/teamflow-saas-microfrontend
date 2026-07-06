import React from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const baseClass = `tf-btn tf-btn-${variant}`;
  return (
    <button className={`${baseClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
