import React from 'react';

export function Card({ children, className = '', ...props }) {
  const baseClass = 'bg-glass-bg backdrop-blur-[20px] border border-glass-border rounded-md p-6 relative transition-all duration-300';
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
}
