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
        <div className="flex min-h-screen bg-bg-primary relative z-1">
          
          {/* Sidebar (SSR Rendered Frame) */}
          <aside className="w-[260px] bg-glass-bg backdrop-blur-[20px] border-r border-glass-border flex flex-col p-6">
            {/* Logo Area */}
            <div className="flex items-center gap-3 mb-10">
              <div className="w-9 h-9 rounded bg-gradient-to-br from-primary to-[#818cf8] flex items-center justify-center font-bold text-lg text-white shadow-[0_4px_14px_rgba(99,102,241,0.4)]">
                TF
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                TeamFlow <span className="text-[10px] px-1.5 py-0.5 bg-white/8 rounded align-middle ml-1 font-normal">SaaS</span>
              </span>
            </div>

            {/* Client-side navigation */}
            <Navigation />

            {/* User Profile Card inside Sidebar */}
            <div className="flex items-center gap-3 p-1.5 mt-auto mb-4 border-t border-border-color pt-5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary text-white flex items-center justify-center font-semibold text-sm border border-white/10">
                SD
              </div>
              <div className="flex-1 overflow-hidden">
                <span className="text-sm font-semibold block text-white truncate">
                  Swann Dev
                </span>
                <span className="text-[11px] text-text-muted block">
                  swann@teamflow.io
                </span>
              </div>
            </div>

            {/* Footer Info */}
            <div className="text-[11px] text-text-muted text-center opacity-70">
              TeamFlow Workspace v1.1
            </div>
          </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            
            {/* Top Navbar (SSR Rendered Frame) */}
            <header className="h-[70px] bg-glass-bg backdrop-blur-[20px] border-b border-glass-border flex items-center justify-between px-8 sticky top-0 z-10">
              <div>
                <span className="text-[10px] text-text-muted block font-bold tracking-wider">
                  WORKSPACE
                </span>
                <span className="text-white text-sm font-semibold">
                  Enterprise Microfrontend Demo
                </span>
              </div>
              
              {/* User Profile */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-sm font-medium block text-white">
                    Swann Dev
                  </span>
                  <span className="text-[11px] text-text-muted">
                    Developer Workspace
                  </span>
                </div>
                <div className="w-[38px] h-[38px] rounded-full bg-primary text-white flex items-center justify-center font-semibold text-sm border-2 border-white/10">
                  SD
                </div>
              </div>
            </header>

            {/* Dynamic Pages */}
            <main className="p-8 flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
