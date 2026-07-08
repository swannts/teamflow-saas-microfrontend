import React, { useState } from 'react';
import { Card, Badge, Button } from 'shared-ui';
import { INITIAL_TASKS, STATUS_CONSTANTS, formatDate } from 'shared-utils';

export default function TaskKanbanComponent() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const columns = [
    { key: STATUS_CONSTANTS.TASKS.TODO, title: 'Todo', color: '#f59e0b', glow: 'rgba(245, 158, 11, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.IN_PROGRESS, title: 'In Progress', color: '#3b82f6', glow: 'rgba(59, 130, 246, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.REVIEW, title: 'Review', color: '#a855f7', glow: 'rgba(168, 85, 247, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.DONE, title: 'Done', color: '#10b981', glow: 'rgba(16, 185, 129, 0.15)' }
  ];

  const getPriorityVariant = (priority) => {
    switch (priority) {
      case STATUS_CONSTANTS.PRIORITIES.HIGH: return 'danger';
      case STATUS_CONSTANTS.PRIORITIES.MEDIUM: return 'warning';
      default: return 'info';
    }
  };

  const moveTask = (taskId, direction) => {
    const colKeys = columns.map(c => c.key);
    setTasks(prev => prev.map(task => {
      if (task.id !== taskId) return task;
      const curIdx = colKeys.indexOf(task.column);
      let nextIdx = curIdx + direction;
      if (nextIdx >= 0 && nextIdx < colKeys.length) {
        return { ...task, column: colKeys[nextIdx] };
      }
      return task;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.25rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Sprint Board
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Track progress, update task statuses, and collaborate on sprints.
          </p>
        </div>
        <Button variant="primary" onClick={() => alert('Static demo: Adding tasks is disabled.')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Task
        </Button>
      </div>

      {/* Board Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1.5rem',
        alignItems: 'flex-start'
      }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col.key);
          return (
            <div key={col.key} style={{
              background: 'rgba(17, 24, 39, 0.45)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              minHeight: '500px',
              boxShadow: '0 4px 30px rgba(0,0,0,0.15)'
            }}>
              {/* Column Title */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.75rem',
                borderBottom: `2px solid ${col.color}`
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: col.color,
                    boxShadow: `0 0 8px ${col.color}`
                  }} />
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', letterSpacing: '0.01em' }}>
                    {col.title}
                  </h3>
                </div>
                <Badge variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.04)', color: 'var(--text-secondary)' }}>
                  {colTasks.length}
                </Badge>
              </div>

              {/* Task Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {colTasks.length === 0 ? (
                  <div style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    padding: '3rem 0',
                    border: '1px dashed rgba(255,255,255,0.03)',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    No tasks here
                  </div>
                ) : (
                  colTasks.map(task => (
                    <Card key={task.id} style={{
                      padding: '1.1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.85rem',
                      transition: 'all 0.2s ease',
                      border: '1px solid rgba(255,255,255,0.04)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = col.color;
                      e.currentTarget.style.boxShadow = `0 10px 25px -5px ${col.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: 0, letterSpacing: '-0.01em' }}>
                        {task.title}
                      </h4>

                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
                        {task.description}
                      </p>

                      {/* Card Footer */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid var(--border-color)',
                        paddingTop: '0.75rem',
                        marginTop: '0.25rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            backgroundColor: task.assignee.color,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                          }}>
                            {task.assignee.initials}
                          </div>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Movement controls */}
                        <div style={{ display: 'flex', gap: '0.35rem' }}>
                          {col.key !== STATUS_CONSTANTS.TASKS.TODO && (
                            <button
                              onClick={() => moveTask(task.id, -1)}
                              style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: 'var(--text-secondary)',
                                borderRadius: '4px',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                              title="Move left"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6"></polyline>
                              </svg>
                            </button>
                          )}
                          {col.key !== STATUS_CONSTANTS.TASKS.DONE && (
                            <button
                              onClick={() => moveTask(task.id, 1)}
                              style={{
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                color: 'var(--text-secondary)',
                                borderRadius: '4px',
                                width: '24px',
                                height: '24px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.15s ease'
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)';
                                e.currentTarget.style.color = '#fff';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                                e.currentTarget.style.color = 'var(--text-secondary)';
                              }}
                              title="Move right"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6"></polyline>
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
