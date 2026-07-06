export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export const STATUS_CONSTANTS = {
  PROJECTS: {
    ACTIVE: 'Active',
    COMPLETED: 'Completed',
    ON_HOLD: 'On Hold'
  },
  TASKS: {
    TODO: 'Todo',
    IN_PROGRESS: 'In Progress',
    REVIEW: 'Review',
    DONE: 'Done'
  },
  PRIORITIES: {
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
  }
};

export const INITIAL_MEMBERS = [
  { name: 'Sarah Connor', role: 'Product Manager', initials: 'SC', color: '#ff5722' },
  { name: 'John Doe', role: 'Frontend Engineer', initials: 'JD', color: '#2196f3' },
  { name: 'Alex Mercer', role: 'UX Designer', initials: 'AM', color: '#4caf50' },
  { name: 'Elena Rostova', role: 'QA Engineer', initials: 'ER', color: '#9c27b0' }
];

export const INITIAL_PROJECTS = [
  {
    id: 'p1',
    name: 'SaaS Dashboard Redesign',
    description: 'Modernizing the user interface and improving core workflows.',
    status: STATUS_CONSTANTS.PROJECTS.ACTIVE,
    progress: 68,
    owner: INITIAL_MEMBERS[0],
    taskCount: 12,
    dueDate: '2026-08-15'
  },
  {
    id: 'p2',
    name: 'Mobile App Beta Launch',
    description: 'Preparing the React Native application for public testing.',
    status: STATUS_CONSTANTS.PROJECTS.ON_HOLD,
    progress: 45,
    owner: INITIAL_MEMBERS[1],
    taskCount: 8,
    dueDate: '2026-09-01'
  },
  {
    id: 'p3',
    name: 'Security Audit & Compliance',
    description: 'Enforcing SOC2 security controls and data encryption guidelines.',
    status: STATUS_CONSTANTS.PROJECTS.COMPLETED,
    progress: 100,
    owner: INITIAL_MEMBERS[2],
    taskCount: 6,
    dueDate: '2026-06-30'
  },
  {
    id: 'p4',
    name: 'Billing Integration',
    description: 'Integrating Stripe subscription flows and customer portal.',
    status: STATUS_CONSTANTS.PROJECTS.ACTIVE,
    progress: 15,
    owner: INITIAL_MEMBERS[3],
    taskCount: 10,
    dueDate: '2026-10-10'
  }
];

export const INITIAL_TASKS = [
  {
    id: 't1',
    projectId: 'p1',
    title: 'Design high-fidelity wireframes',
    description: 'Create Figma designs for the new dashboard home page layout.',
    column: STATUS_CONSTANTS.TASKS.DONE,
    priority: STATUS_CONSTANTS.PRIORITIES.HIGH,
    assignee: INITIAL_MEMBERS[2],
    dueDate: '2026-07-01'
  },
  {
    id: 't2',
    projectId: 'p1',
    title: 'Configure Vite & Module Federation',
    description: 'Set up the monorepo structure and shared dependencies.',
    column: STATUS_CONSTANTS.TASKS.IN_PROGRESS,
    priority: STATUS_CONSTANTS.PRIORITIES.HIGH,
    assignee: INITIAL_MEMBERS[1],
    dueDate: '2026-07-10'
  },
  {
    id: 't3',
    projectId: 'p1',
    title: 'Build KPI metric cards',
    description: 'Create the reusable UI component for showing quick stats.',
    column: STATUS_CONSTANTS.TASKS.TODO,
    priority: STATUS_CONSTANTS.PRIORITIES.MEDIUM,
    assignee: INITIAL_MEMBERS[1],
    dueDate: '2026-07-18'
  },
  {
    id: 't4',
    projectId: 'p2',
    title: 'Implement Push Notifications',
    description: 'Set up Firebase Cloud Messaging for mobile alerts.',
    column: STATUS_CONSTANTS.TASKS.REVIEW,
    priority: STATUS_CONSTANTS.PRIORITIES.HIGH,
    assignee: INITIAL_MEMBERS[3],
    dueDate: '2026-08-05'
  },
  {
    id: 't5',
    projectId: 'p3',
    title: 'Perform penetration testing',
    description: 'Run automated vulnerability scans on host endpoints.',
    column: STATUS_CONSTANTS.TASKS.DONE,
    priority: STATUS_CONSTANTS.PRIORITIES.HIGH,
    assignee: INITIAL_MEMBERS[3],
    dueDate: '2026-06-25'
  },
  {
    id: 't6',
    projectId: 'p4',
    title: 'Map Stripe webhook events',
    description: 'Create webhook handlers for checkout.session.completed.',
    column: STATUS_CONSTANTS.TASKS.TODO,
    priority: STATUS_CONSTANTS.PRIORITIES.LOW,
    assignee: INITIAL_MEMBERS[0],
    dueDate: '2026-09-15'
  }
];

export const RECENT_ACTIVITIES = [
  {
    id: 'a1',
    user: INITIAL_MEMBERS[1],
    action: 'moved task',
    target: 'Configure Vite & Module Federation',
    time: '2 hours ago'
  },
  {
    id: 'a2',
    user: INITIAL_MEMBERS[2],
    action: 'completed task',
    target: 'Design high-fidelity wireframes',
    time: '4 hours ago'
  },
  {
    id: 'a3',
    user: INITIAL_MEMBERS[0],
    action: 'created project',
    target: 'Billing Integration',
    time: 'Yesterday'
  },
  {
    id: 'a4',
    user: INITIAL_MEMBERS[3],
    action: 'updated status of',
    target: 'Mobile App Launch to On Hold',
    time: '2 days ago'
  }
];
