import React from 'react';
import { Card, Badge } from 'shared-ui';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_MEMBERS, RECENT_ACTIVITIES, STATUS_CONSTANTS } from 'shared-utils';

export default function DashboardComponent() {
  const totalProjects = INITIAL_PROJECTS.length;
  const totalTasks = INITIAL_TASKS.length;
  const completedTasks = INITIAL_TASKS.filter(t => t.column === STATUS_CONSTANTS.TASKS.DONE).length;
  const totalMembers = INITIAL_MEMBERS.length;

  const stats = [
    { label: 'Total Projects', value: totalProjects, badge: 'Active', variant: 'info', icon: '📁' },
    { label: 'Total Tasks', value: totalTasks, badge: 'Sprint 1', variant: 'warning', icon: '📝' },
    { label: 'Completed Tasks', value: completedTasks, badge: `${Math.round((completedTasks/totalTasks)*100)}% Done`, variant: 'success', icon: '✅' },
    { label: 'Team Members', value: totalMembers, badge: 'Collab', variant: 'success', icon: '👥' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginBottom: '0.25rem', color: '#fff' }}>
          Workspace Dashboard
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Welcome back! Here is a summary of TeamFlow projects and activities.
        </p>
      </div>

      {/* Grid Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.5rem'
      }}>
        {stats.map((s, index) => (
          <Card key={index} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '1.75rem' }}>{s.icon}</span>
              <Badge variant={s.variant}>{s.badge}</Badge>
            </div>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.25rem' }}>
              {s.label}
            </h3>
            <p style={{ fontSize: '2rem', fontWeight: 700, color: '#fff' }}>
              {s.value}
            </p>
          </Card>
        ))}
      </div>

      {/* Lower section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Recent Activities */}
        <Card>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem', color: '#fff' }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} style={{
                display: 'flex',
                gap: '0.75rem',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  backgroundColor: act.user.color || '#6366f1',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}>
                  {act.user.initials}
                </div>
                <div style={{ flex: 1, fontSize: '0.875rem' }}>
                  <p style={{ color: 'var(--text-primary)', margin: 0 }}>
                    <strong style={{ fontWeight: 500 }}>{act.user.name}</strong> {act.action} <span style={{ color: 'var(--primary)', fontWeight: 500 }}>{act.target}</span>
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Members List */}
        <Card>
          <h2 style={{ fontSize: '1.125rem', marginBottom: '1.25rem', color: '#fff' }}>Team Members</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {INITIAL_MEMBERS.map((member, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '0.75rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: member.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.875rem'
                  }}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)' }}>{member.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{member.role}</p>
                  </div>
                </div>
                <Badge variant="success">Active</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
