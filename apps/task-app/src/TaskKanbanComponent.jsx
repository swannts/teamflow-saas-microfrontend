import React, { useState } from 'react';
import { Card, Badge, Button } from 'shared-ui';
import { INITIAL_TASKS, STATUS_CONSTANTS, formatDate } from 'shared-utils';

export default function TaskKanbanComponent() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const columns = [
    { key: STATUS_CONSTANTS.TASKS.TODO, title: 'Todo', color: '#ffb300' },
    { key: STATUS_CONSTANTS.TASKS.IN_PROGRESS, title: 'In Progress', color: '#1e88e5' },
    { key: STATUS_CONSTANTS.TASKS.REVIEW, title: 'Review', color: '#8e24aa' },
    { key: STATUS_CONSTANTS.TASKS.DONE, title: 'Done', color: '#43a047' }
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
          <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.25rem', color: '#fff' }}>
            Kanban Board
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Track progress, update task statuses, and collaborate on sprints.
          </p>
        </div>
        <Button variant="primary" onClick={() => alert('Static demo: Adding tasks is disabled.')}>
          + Create Task
        </Button>
      </div>

      {/* Board Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.25rem',
        alignItems: 'flex-start'
      }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col.key);
          return (
            <div key={col.key} style={{
              background: 'rgba(30, 41, 59, 0.4)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-color)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              minHeight: '400px'
            }}>
              {/* Column Title */}
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '0.5rem',
                borderBottom: `2px solid ${col.color}`
              }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: '#fff' }}>
                  {col.title}
                </h3>
                <Badge variant="secondary" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  {colTasks.length}
                </Badge>
              </div>

              {/* Task Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {colTasks.length === 0 ? (
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.85rem',
                    textAlign: 'center',
                    padding: '2rem 0'
                  }}>
                    No tasks here
                  </p>
                ) : (
                  colTasks.map(task => (
                    <Card key={task.id} style={{
                      padding: '1rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.75rem'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                          {formatDate(task.dueDate)}
                        </span>
                      </div>

                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#fff', margin: 0 }}>
                        {task.title}
                      </h4>

                      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineStyle: '1.4' }}>
                        {task.description}
                      </p>

                      {/* Card Footer */}
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        paddingTop: '0.5rem',
                        marginTop: '0.25rem'
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            backgroundColor: task.assignee.color,
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.6rem',
                            fontWeight: 600
                          }}>
                            {task.assignee.initials}
                          </div>
                          <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Movement controls */}
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          {col.key !== STATUS_CONSTANTS.TASKS.TODO && (
                            <button
                              onClick={() => moveTask(task.id, -1)}
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                color: 'var(--text-primary)',
                                borderRadius: '4px',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem'
                              }}
                              title="Move left"
                            >
                              ◀
                            </button>
                          )}
                          {col.key !== STATUS_CONSTANTS.TASKS.DONE && (
                            <button
                              onClick={() => moveTask(task.id, 1)}
                              style={{
                                background: 'rgba(255,255,255,0.05)',
                                border: 'none',
                                color: 'var(--text-primary)',
                                borderRadius: '4px',
                                width: '20px',
                                height: '20px',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.75rem'
                              }}
                              title="Move right"
                            >
                              ▶
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
