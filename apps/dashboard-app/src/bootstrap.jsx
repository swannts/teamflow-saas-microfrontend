import React from 'react';
import ReactDOM from 'react-dom/client';
import DashboardComponent from './DashboardComponent';
import 'shared-ui/src/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        Dashboard Remote App (Standalone mode)
      </h2>
      <DashboardComponent />
    </div>
  </React.StrictMode>
);
