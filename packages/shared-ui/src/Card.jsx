import React from 'react';

export function Card({ children, className = '', ...props }) {
  return (
    <div className={`tf-card ${className}`} {...props}>
      {children}
    </div>
  );
}
