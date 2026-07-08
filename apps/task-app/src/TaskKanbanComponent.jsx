import React, { useState } from 'react';
import { Card, Badge, Button } from 'shared-ui';
import { INITIAL_TASKS, STATUS_CONSTANTS, formatDate } from 'shared-utils';

export default function TaskKanbanComponent() {
  const [tasks, setTasks] = useState(INITIAL_TASKS);

  const columns = [
    { key: STATUS_CONSTANTS.TASKS.TODO, title: 'Todo', color: '#f59e0b', borderClass: 'border-amber-500', glow: 'rgba(245, 158, 11, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.IN_PROGRESS, title: 'In Progress', color: '#3b82f6', borderClass: 'border-blue-500', glow: 'rgba(59, 130, 246, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.REVIEW, title: 'Review', color: '#a855f7', borderClass: 'border-purple-500', glow: 'rgba(168, 85, 247, 0.15)' },
    { key: STATUS_CONSTANTS.TASKS.DONE, title: 'Done', color: '#10b981', borderClass: 'border-emerald-500', glow: 'rgba(16, 185, 129, 0.15)' }
  ];

  const colHoverStyles = {
    [STATUS_CONSTANTS.TASKS.TODO]: 'hover:border-amber-500 hover:shadow-[0_10px_25px_-5px_rgba(245,158,11,0.15)]',
    [STATUS_CONSTANTS.TASKS.IN_PROGRESS]: 'hover:border-blue-500 hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.15)]',
    [STATUS_CONSTANTS.TASKS.REVIEW]: 'hover:border-purple-500 hover:shadow-[0_10px_25px_-5px_rgba(168,85,247,0.15)]',
    [STATUS_CONSTANTS.TASKS.DONE]: 'hover:border-emerald-500 hover:shadow-[0_10px_25px_-5px_rgba(16,185,129,0.15)]'
  };

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
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-extrabold mb-1 tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Sprint Board
          </h1>
          <p className="text-text-secondary text-sm">
            Track progress, update task statuses, and collaborate on sprints.
          </p>
        </div>
        <Button variant="primary" onClick={() => alert('Static demo: Adding tasks is disabled.')}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Create Task
        </Button>
      </div>

      {/* Board Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.column === col.key);
          return (
            <div key={col.key} className="bg-slate-900/45 rounded-md border border-border-color p-5 flex flex-col gap-5 min-h-[500px] shadow-[0_4px_30px_rgba(0,0,0,0.15)]">
              {/* Column Title */}
              <div 
                className={`flex justify-between items-center pb-3 border-b-2 ${col.borderClass}`}
              >
                <div className="flex items-center gap-2">
                  <span 
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: col.color,
                      boxShadow: `0 0 8px ${col.color}`
                    }}
                  />
                  <h3 className="text-sm font-bold text-white tracking-wider">
                    {col.title}
                  </h3>
                </div>
                <Badge variant="secondary" className="bg-white/4 text-text-secondary">
                  {colTasks.length}
                </Badge>
              </div>

              {/* Task Items */}
              <div className="flex flex-col gap-3.5">
                {colTasks.length === 0 ? (
                  <div className="text-text-muted text-xs text-center py-12 border border-dashed border-white/3 rounded-sm">
                    No tasks here
                  </div>
                ) : (
                  colTasks.map(task => (
                    <Card 
                      key={task.id} 
                      className={`flex flex-col gap-3.5 hover:scale-[1.01] hover:bg-white/1 border border-white/4 transition-all duration-200 ${colHoverStyles[col.key]}`}
                    >
                      <div className="flex justify-between items-center">
                        <Badge variant={getPriorityVariant(task.priority)}>
                          {task.priority}
                        </Badge>
                        <span className="text-xs text-text-muted font-medium">
                          {formatDate(task.dueDate)}
                        </span>
                      </div>

                      <h4 className="text-[0.95rem] font-bold text-white m-0 tracking-tight">
                        {task.title}
                      </h4>

                      <p className="text-xs text-text-secondary m-0 leading-relaxed">
                        {task.description}
                      </p>

                      {/* Card Footer */}
                      <div className="flex justify-between items-center border-t border-border-color pt-3 mt-1">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded-full text-white flex items-center justify-center text-[10px] font-bold border border-white/10"
                            style={{ backgroundColor: task.assignee.color }}
                          >
                            {task.assignee.initials}
                          </div>
                          <span className="text-xs text-text-secondary font-medium">
                            {task.assignee.name.split(' ')[0]}
                          </span>
                        </div>

                        {/* Movement controls */}
                        <div className="flex gap-1.5">
                          {col.key !== STATUS_CONSTANTS.TASKS.TODO && (
                            <button
                              onClick={() => moveTask(task.id, -1)}
                              className="bg-white/3 border border-white/6 text-text-secondary rounded-[4px] w-6 h-6 cursor-pointer flex items-center justify-center transition-all hover:bg-white/8 hover:text-white"
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
                              className="bg-white/3 border border-white/6 text-text-secondary rounded-[4px] w-6 h-6 cursor-pointer flex items-center justify-center transition-all hover:bg-white/8 hover:text-white"
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
