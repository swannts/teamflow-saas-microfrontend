import React from 'react';
import Navigation from '../components/Navigation';
import ReactExposer from '../components/ReactExposer';
import 'shared-ui/src/index.css';

export const metadata = {
  title: 'TeamFlow SaaS Workspace',
  description: 'Enterprise Microfrontend Project management dashboard built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ReactExposer />
        <div className="tf-bg-glow-container">
          <div className="tf-bg-glow-1"></div>
          <div className="tf-bg-glow-2"></div>
        </div>
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', zIndex: 1 }}>
          
          {/* Sidebar (SSR Rendered Frame) */}
          <aside style={{
            width: '260px',
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-blur)',
            borderRight: '1px solid var(--glass-border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '1.5rem'
          }}>
            {/* Logo Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2.5rem' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, var(--primary), #818cf8)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '1.2rem',
                color: '#fff',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)'
              }}>
                TF
              </div>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.02em', color: '#fff' }}>
                TeamFlow <span style={{ fontSize: '0.65rem', padding: '2px 6px', background: 'rgba(255,255,255,0.08)', borderRadius: '4px', verticalAlign: 'middle', marginLeft: '4px' }}>SaaS</span>
              </span>
            </div>

            {/* Client-side navigation */}
            <Navigation />

            {/* User Profile Card inside Sidebar */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.85rem 0.5rem',
              marginTop: 'auto',
              marginBottom: '1rem',
              borderTop: '1px solid var(--border-color)',
              paddingTop: '1.25rem'
            }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--primary))',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '0.85rem',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                SD
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, display: 'block', color: '#fff', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                  Swann Dev
                </span>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', display: 'block' }}>
                  swann@teamflow.io
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <div style={{
              fontSize: '0.675rem',
              color: 'var(--text-muted)',
              textAlign: 'center',
              opacity: 0.7
            }}>
              TeamFlow Workspace v1.1
            </div>
          </aside>

          {/* Main Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            
            {/* Top Navbar (SSR Rendered Frame) */}
            <header style={{
              height: '70px',
              background: 'var(--glass-bg)',
              backdropFilter: 'var(--glass-blur)',
              borderBottom: '1px solid var(--glass-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 2rem',
              position: 'sticky',
              top: 0,
              zIndex: 10
            }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  WORKSPACE
                </span>
                <span style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600 }}>
                  Enterprise Microfrontend Demo
                </span>
              </div>
              
              {/* User Profile */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, display: 'block', color: '#fff' }}>
                    Swann Dev
                  </span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    Developer Workspace
                  </span>
                </div>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  border: '2px solid rgba(255, 255, 255, 0.1)'
                }}>
                  SD
                </div>
              </div>
            </header>

            {/* Dynamic Pages */}
            <main style={{ padding: '2rem', flex: 1 }}>
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
