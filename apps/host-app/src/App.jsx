import React, { Suspense, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink, Navigate } from 'react-router-dom';
import { Card } from 'shared-ui';

// Lazy load React remotes
const DashboardComponent = React.lazy(() => import('dashboard_app/DashboardComponent'));
const TaskKanbanComponent = React.lazy(() => import('task_app/TaskKanbanComponent'));

// Fallback Loading UI
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
    gap: '1rem'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid rgba(99, 102, 241, 0.1)',
      borderTop: '4px solid var(--primary)',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }} />
    <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Loading remote module...</span>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Error Boundary for Remotes
class RemoteErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('RemoteErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card style={{
          padding: '2.5rem 1.5rem',
          textAlign: 'center',
          borderColor: 'rgba(239, 68, 68, 0.2)',
          background: 'rgba(239, 68, 68, 0.05)'
        }}>
          <span style={{ fontSize: '2.5rem' }}>⚠️</span>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--danger)', marginTop: '1rem', fontWeight: 600 }}>
            Remote Application Offline
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', maxWidth: '400px', margin: '0.5rem auto 1.5rem' }}>
            We failed to load this microfrontend. The remote server might be down, or we might have run into a network configuration issue.
          </p>
          <button 
            className="tf-btn tf-btn-secondary" 
            onClick={() => window.location.reload()}
          >
            🔄 Retry Connection
          </button>
        </Card>
      );
    }
    return this.props.children;
  }
}

// Wrapper for Vue App remote
const VueRemoteLoader = ({ loadRemote }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let unmountFn = null;
    let isActive = true;

    loadRemote()
      .then((module) => {
        if (isActive && containerRef.current) {
          unmountFn = module.mount(containerRef.current);
        }
      })
      .catch((err) => {
        console.error('Error loading Vue remote:', err);
        if (isActive) {
          setError(err);
        }
      });

    return () => {
      isActive = false;
      if (unmountFn) {
        unmountFn();
      }
    };
  }, [loadRemote]);

  if (error) {
    throw error;
  }

  return <div ref={containerRef} />;
};

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
        
        {/* Sidebar */}
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

          {/* Nav List */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flexGrow: 1 }}>
            <NavLink 
              to="/dashboard" 
              style={({ isActive }) => ({
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
              })}
            >
              📊 Dashboard
            </NavLink>
            <NavLink 
              to="/projects" 
              style={({ isActive }) => ({
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
              })}
            >
              📁 Projects (Vue Remote)
            </NavLink>
            <NavLink 
              to="/tasks" 
              style={({ isActive }) => ({
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
              })}
            >
              📝 Tasks Kanban
            </NavLink>
          </nav>

          {/* Footer Info */}
          <div style={{
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(255,255,255,0.05)'
          }}>
            Module Federation Core v1.0
          </div>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          
          {/* Top Navbar */}
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

          {/* Route Content Container */}
          <main style={{ padding: '2rem', flex: 1 }}>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/dashboard" element={
                  <RemoteErrorBoundary>
                    <DashboardComponent />
                  </RemoteErrorBoundary>
                } />
                <Route path="/projects" element={
                  <RemoteErrorBoundary>
                    <VueRemoteLoader loadRemote={() => import('project_app/mount')} />
                  </RemoteErrorBoundary>
                } />
                <Route path="/tasks" element={
                  <RemoteErrorBoundary>
                    <TaskKanbanComponent />
                  </RemoteErrorBoundary>
                } />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
