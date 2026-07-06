import React from 'react';
import ReactDOM from 'react-dom/client';
import TaskKanbanComponent from './TaskKanbanComponent';
import 'shared-ui/src/index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1.5rem', color: 'var(--text-secondary)' }}>
        Task Kanban Remote App (Standalone mode)
      </h2>
      <TaskKanbanComponent />
    </div>
  </React.StrictMode>
);
