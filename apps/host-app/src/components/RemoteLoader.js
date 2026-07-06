'use client';

import React, { useEffect, useState, useRef } from 'react';

// Reusable script loader
const useScript = (url) => {
  const [ready, setReady] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    let script = document.querySelector(`script[src="${url}"]`);

    if (!script) {
      script = document.createElement('script');
      script.src = url;
      script.type = 'text/javascript';
      script.async = true;
      script.onload = () => setReady(true);
      script.onerror = () => setError(true);
      document.head.appendChild(script);
    } else {
      setReady(true);
    }
  }, [url]);

  return { ready, error };
};

export function RemoteReactLoader({ url, scope, module }) {
  const { ready, error } = useScript(url);
  const [Component, setComponent] = useState(null);

  useEffect(() => {
    if (!ready || error) return;

    const loadComponent = async () => {
      try {
        const container = window[scope];
        if (!container) {
          throw new Error(`Global container ${scope} not found on window`);
        }
        const factory = await container.get(module);
        const Module = factory();
        setComponent(() => Module.default);
      } catch (err) {
        console.error(`Error loading remote component ${module} from scope ${scope}:`, err);
      }
    };

    loadComponent();
  }, [ready, error, scope, module]);

  if (error) {
    return (
      <div style={{
        padding: '2rem',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        background: 'rgba(239, 68, 68, 0.05)',
        color: '#ef4444',
        textAlign: 'center'
      }}>
        <h3>⚠️ Microfrontend Loading Failed</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Remote `{scope}` is currently offline. Please check if the port is running.
        </p>
      </div>
    );
  }

  if (!ready || !Component) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', gap: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(99, 102, 241, 0.1)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Connecting to remote {scope}...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <Component />;
}

export function RemoteVueLoader({ url, scope, module }) {
  const { ready, error } = useScript(url);
  const containerRef = useRef(null);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    if (!ready || error || !containerRef.current) return;

    let unmountFn = null;

    const loadAndMount = async () => {
      try {
        const container = window[scope];
        if (!container) {
          throw new Error(`Global container ${scope} not found on window`);
        }
        const factory = await container.get(module);
        const Module = factory();
        unmountFn = Module.mount(containerRef.current);
      } catch (err) {
        console.error(`Error mounting Vue remote from ${scope}:`, err);
        setLoadError(true);
      }
    };

    loadAndMount();

    return () => {
      if (unmountFn) unmountFn();
    };
  }, [ready, error, scope, module]);

  if (error || loadError) {
    return (
      <div style={{
        padding: '2rem',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        background: 'rgba(239, 68, 68, 0.05)',
        color: '#ef4444',
        textAlign: 'center'
      }}>
        <h3>⚠️ Vue Remote Loading Failed</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Remote `{scope}` is currently offline. Please check if the port is running.
        </p>
      </div>
    );
  }

  if (!ready) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '200px', gap: '1rem' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '4px solid rgba(99, 102, 241, 0.1)',
          borderTop: '4px solid var(--primary)',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Connecting to remote {scope}...</span>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  return <div ref={containerRef} />;
}
