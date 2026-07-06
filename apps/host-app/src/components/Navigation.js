'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: '📊 Dashboard' },
    { href: '/projects', label: '📁 Projects (Vue Remote)' },
    { href: '/tasks', label: '📝 Tasks Kanban' }
  ];

  return (
    <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              color: isActive ? '#fff' : 'var(--text-secondary)',
              backgroundColor: isActive ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(99, 102, 241, 0.25)' : '1px solid transparent',
              transition: 'all var(--transition-fast)'
            }}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
