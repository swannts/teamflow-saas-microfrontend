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
      icon: (isActive) => (
        <svg className={`w-[18px] h-[18px] fill-none stroke-2 stroke-[linecap:round] stroke-[linejoin:round] ${isActive ? 'stroke-primary' : 'stroke-text-secondary group-hover:stroke-white'}`} viewBox="0 0 24 24">
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
      icon: (isActive) => (
        <svg className={`w-[18px] h-[18px] fill-none stroke-2 stroke-[linecap:round] stroke-[linejoin:round] ${isActive ? 'stroke-primary' : 'stroke-text-secondary group-hover:stroke-white'}`} viewBox="0 0 24 24">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      )
    },
    { 
      href: '/tasks', 
      label: 'Tasks Kanban',
      icon: (isActive) => (
        <svg className={`w-[18px] h-[18px] fill-none stroke-2 stroke-[linecap:round] stroke-[linejoin:round] ${isActive ? 'stroke-primary' : 'stroke-text-secondary group-hover:stroke-white'}`} viewBox="0 0 24 24">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M9 3v18" />
          <path d="M15 3v18" />
        </svg>
      )
    }
  ];

  return (
    <nav className="flex flex-col gap-2.5 grow">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href}
            className={`group flex items-center gap-3.5 px-4.5 py-3.2 rounded-sm no-underline text-sm border transition-all relative ${
              isActive 
                ? 'bg-primary/8 border-primary/15 text-white font-semibold' 
                : 'text-text-secondary hover:text-white hover:bg-white/3 font-medium border-transparent'
            }`}
          >
            {/* Active Left Border Indicator */}
            {isActive && (
              <span className="absolute left-0 top-[25%] h-1/2 w-[3px] bg-primary rounded-r-sm shadow-[0_0_8px_var(--color-primary)]" />
            )}
            
            {item.icon(isActive)}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
