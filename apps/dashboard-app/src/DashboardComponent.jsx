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
        <svg className="w-6 h-6 stroke-info stroke-2 stroke-linecap-round stroke-linejoin-round fill-none" viewBox="0 0 24 24">
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
        <svg className="w-6 h-6 stroke-warning stroke-2 stroke-linecap-round stroke-linejoin-round fill-none" viewBox="0 0 24 24">
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
        <svg className="w-6 h-6 stroke-success stroke-2 stroke-linecap-round stroke-linejoin-round fill-none" viewBox="0 0 24 24">
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
        <svg className="w-6 h-6 stroke-primary stroke-2 stroke-linecap-round stroke-linejoin-round fill-none" viewBox="0 0 24 24">
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
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-primary/10 to-accent/5 border border-border-color rounded-md p-8 relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-extrabold mb-2 tracking-tight bg-gradient-to-r from-white to-white/70 bg-clip-text text-transparent">
            Workspace Insights
          </h1>
          <p className="text-text-secondary text-sm max-w-[600px] leading-relaxed">
            Monitor your microfrontend workflows, tracking sprint cycles, projects progress, and live developer contributions in real-time.
          </p>
        </div>
        <div className="absolute -right-[50px] -bottom-[50px] w-[200px] h-[200px] bg-accent-glow rounded-full blur-[30px] pointer-events-none" />
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, index) => (
          <Card key={index} className="flex flex-col gap-5 hover:border-primary/20 hover:scale-[1.01] transition-all">
            <div className="flex justify-between items-center">
              <div 
                className="w-[46px] h-[46px] rounded-[10px] flex items-center justify-center border border-white/3" 
                style={{ backgroundColor: s.glow }}
              >
                {s.icon}
              </div>
              <Badge variant={s.variant}>{s.badge}</Badge>
            </div>
            <div>
              <h3 className="text-[0.75rem] font-bold text-text-secondary mb-1 tracking-wider uppercase">
                {s.label}
              </h3>
              <p className="text-3xl font-extrabold text-white tracking-tight">
                {s.value}
              </p>
            </div>
          </Card>
        ))}
      </div>

      {/* Lower section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-border-color pb-4">
            <h2 className="text-lg font-bold text-white">Activity Log</h2>
            <span className="text-xs text-primary font-semibold cursor-pointer hover:underline">View All</span>
          </div>
          <div className="flex flex-col gap-5">
            {RECENT_ACTIVITIES.map((act) => (
              <div key={act.id} className="flex gap-4 items-start">
                <div 
                  className="w-[34px] h-[34px] rounded-full text-white flex items-center justify-center text-xs font-bold shadow-md border border-white/10"
                  style={{ backgroundColor: act.user.color || 'var(--color-primary)' }}
                >
                  {act.user.initials}
                </div>
                <div className="flex-1 text-sm leading-relaxed">
                  <p className="text-text-primary m-0">
                    <strong className="font-semibold text-white">{act.user.name}</strong> {act.action} <span className="text-primary font-semibold">{act.target}</span>
                  </p>
                  <span className="text-xs text-text-muted mt-1 block">{act.time}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Team Members List */}
        <Card className="flex flex-col gap-6">
          <div className="flex justify-between items-center border-b border-border-color pb-4">
            <h2 className="text-lg font-bold text-white">Team Directory</h2>
            <Badge variant="info">Collab</Badge>
          </div>
          <div className="flex flex-col gap-4">
            {INITIAL_MEMBERS.map((member, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-sm transition-colors duration-150 cursor-pointer hover:bg-white/2">
                <div className="flex items-center gap-3.5">
                  <div 
                    className="w-[38px] h-[38px] rounded-full text-white flex items-center justify-center font-bold text-sm border border-white/10"
                    style={{ backgroundColor: member.color }}
                  >
                    {member.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white m-0">{member.name}</h4>
                    <p className="text-xs text-text-muted m-0">{member.role}</p>
                  </div>
                </div>
                
                {/* Online Status Glowing Indicator */}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-success shadow-[0_0_8px_var(--color-success)]" />
                  <span className="text-xs text-text-muted">Online</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
