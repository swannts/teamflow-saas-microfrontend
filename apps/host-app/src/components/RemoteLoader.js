'use client';

import React, { useEffect, useState, useRef } from 'react';

export function RemoteReactLoader({ url, scope, module }) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    
    const loadComponent = async () => {
      try {
        // Bypasses Next.js Webpack parser to execute native browser ESM import
        const remoteModule = await eval(`import("${url}")`);
        
        const factory = await remoteModule.get(module);
        const Module = factory();
        
        if (isActive) {
          setComponent(() => Module.default);
        }
      } catch (err) {
        console.error(`Error loading remote component ${module} from scope ${scope} at ${url}:`, err);
        if (isActive) {
          setError(err);
        }
      }
    };

    loadComponent();

    return () => {
      isActive = false;
    };
  }, [url, scope, module]);

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
          Remote `{scope}` at `{url}` is currently offline. Please check if the port is running.
        </p>
      </div>
    );
  }

  if (!Component) {
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
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isActive = true;
    let unmountFn = null;

    const loadAndMount = async () => {
      try {
        // Bypasses Next.js Webpack parser to execute native browser ESM import
        const remoteModule = await eval(`import("${url}")`);
        
        const factory = await remoteModule.get(module);
        const Module = factory();
        
        if (isActive && containerRef.current) {
          unmountFn = Module.mount(containerRef.current);
        }
      } catch (err) {
        console.error(`Error mounting Vue remote from ${scope} at ${url}:`, err);
        if (isActive) {
          setError(err);
        }
      }
    };

    loadAndMount();

    return () => {
      isActive = false;
      if (unmountFn) unmountFn();
    };
  }, [url, scope, module]);

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
        <h3>⚠️ Vue Remote Loading Failed</h3>
        <p style={{ fontSize: '0.9rem', marginTop: '0.5rem', color: 'var(--text-secondary)' }}>
          Remote `{scope}` at `{url}` is currently offline. Please check if the port is running.
        </p>
      </div>
    );
  }

  return <div ref={containerRef} />;
}
