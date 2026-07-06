import React from 'react';
import { Card, Badge } from 'shared-ui';
import { INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_MEMBERS, RECENT_ACTIVITIES, STATUS_CONSTANTS } from 'shared-utils';

export default function DashboardComponent() {
  const totalProjects = INITIAL_PROJECTS.length;
  const totalTasks = INITIAL_TASKS.length;
  const completedTasks = INITIAL_TASKS.filter(t => t.column === STATUS_CONSTANTS.TASKS.DONE).length;
  const totalMembers = INITIAL_MEMBERS.length;

  const stats = [
    { 
      label: 'Active Projects', 
      value: totalProjects, 
      badge: 'Tracking', 
      variant: 'info', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--info)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
        </svg>
      ),
      glow: 'rgba(6, 182, 212, 0.15)'
    },
    { 
      label: 'Total Sprint Tasks', 
      value: totalTasks, 
      badge: 'Sprint 1', 
      variant: 'warning', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--warning)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      ),
      glow: 'rgba(245, 158, 11, 0.15)'
    },
    { 
      label: 'Completed Tasks', 
      value: completedTasks, 
      badge: `${Math.round((completedTasks/totalTasks)*100)}% Done`, 
      variant: 'success', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
      glow: 'rgba(16, 185, 129, 0.15)'
    },
    { 
      label: 'Team Size', 
      value: totalMembers, 
      badge: 'Active Now', 
      variant: 'success', 
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      glow: 'var(--primary-glow)'
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(217, 70, 239, 0.05) 100%)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem', letterSpacing: '-0.02em', background: 'linear-gradient(135deg, #fff 60%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Workspace Insights
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '600px', lineHeight: 1.5 }}>
            Monitor your microfrontend workflows, tracking sprint cycles, projects progress, and live developer contributions in real-time.
          </p>
        </div>
        <div style={{
          position: 'absolute',
          right: '-50px',
          bottom: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          filter: 'blur(30px)'
        }} />
      </div>

      {/* Grid Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem'
      }}>
        {stats.map((s, index) => (
          <Card key={index} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{
                width: '46px',
                height: '46px',
                borderRadius: '10px',
                background: s.glow,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255,255,255,0.03)'
              }}>
                {s.icon}
              </div>
              <Badge variant={s.variant}>{s.badge}</Badge>
            </div>
            <div>
              <h3 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
                {s.label}
              </h3>
              <p style={{ fontSize: '2.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
                {s.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lower section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Recent Activities */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Activity Log</h2>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>View All</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}>
                <div style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: act.user.color || 'var(--primary)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}>
                  {act.user.initials}
                </div>
                <div style={{ flex: 1, fontSize: '0.875rem', lineHeight: 1.4 }}>
                  <p style={{ color: 'var(--text-primary)', margin: 0 }}>
                    <strong style={{ fontWeight: 600, color: '#fff' }}>{act.user.name}</strong> {act.action} <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{act.target}</span>
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem', display: 'block' }}>{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Members List */}
        <Card style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff' }}>Team Directory</h2>
            <Badge variant="info">Collab</Badge>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {INITIAL_MEMBERS.map((member, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.5rem',
                borderRadius: 'var(--radius-sm)',
                transition: 'background-color var(--transition-fast)',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.02)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: member.color,
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}>
                    {member.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#fff', margin: 0 }}>{member.name}</h4>
                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>{member.role}</p>
                  </div>
                </div>
                
                {/* Online Status Glowing Indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--success)',
                    boxShadow: '0 0 8px var(--success)'
                  }} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Online</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
