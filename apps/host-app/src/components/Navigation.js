'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { 
      href: '/dashboard', 
      label: 'Dashboard',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="9" />
          <rect x="14" y="3" width="7" height="5" />
          <rect x="14" y="12" width="7" height="9" />
          <rect x="3" y="16" width="7" height="5" />
        </svg>
      )
    },
    { 
      href: '/projects', 
      label: 'Projects',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    { 
      href: '/tasks', 
      label: 'Tasks Kanban',
      icon: (color) => (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
        </svg>
      )
    }
  ];

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem', flexGrow: 1 }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const strokeColor = isActive ? 'var(--primary)' : 'var(--text-secondary)';
        return (
          <Link 
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.875rem',
              padding: '0.8rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? '#fff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'rgba(139, 92, 246, 0.08)' : 'transparent',
              border: '1px solid',
              borderColor: isActive ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
              transition: 'all var(--transition-fast)',
              position: 'relative'
            }}
          >
            {/* Active Left Border Indicator */}
            {isActive && (
              <span style={{
                position: 'absolute',
                left: 0,
                top: '25%',
                height: '50%',
                width: '3px',
                background: 'var(--primary)',
                borderRadius: '0 4px 4px 0',
                boxShadow: '0 0 8px var(--primary)'
              }} />
            )}
            
            {item.icon(strokeColor)}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
