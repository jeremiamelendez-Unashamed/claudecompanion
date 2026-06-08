export const launchDate = new Date('2026-06-15T09:00:00')

export const metrics = [
  { label: 'Beta Signups', value: '2,847', change: '+18%', trend: 'up' },
  { label: 'Docs Coverage', value: '94%', change: '+6%', trend: 'up' },
  { label: 'Open Issues', value: '12', change: '-8', trend: 'down' },
  { label: 'Launch Readiness', value: '87%', change: '+12%', trend: 'up' },
]

export const checklist = [
  { id: 1, task: 'Landing page copy finalized', done: true, owner: 'Marketing' },
  { id: 2, task: 'Product demo video recorded', done: true, owner: 'Growth' },
  { id: 3, task: 'API documentation published', done: true, owner: 'Engineering' },
  { id: 4, task: 'Pricing page live', done: false, owner: 'Product' },
  { id: 5, task: 'Press kit uploaded', done: false, owner: 'Marketing' },
  { id: 6, task: 'Launch day runbook reviewed', done: false, owner: 'Ops' },
]

export const features = [
  {
    title: 'Launch Checklist',
    description: 'Track every pre-launch task across teams with owners, deadlines, and status.',
    icon: '✓',
  },
  {
    title: 'Readiness Score',
    description: 'Real-time launch readiness based on docs, tests, marketing, and support prep.',
    icon: '◉',
  },
  {
    title: 'Changelog Studio',
    description: 'Draft release notes from git commits and polish them for users and press.',
    icon: '✎',
  },
  {
    title: 'Stakeholder Digest',
    description: 'Auto-generate weekly launch updates for investors, team leads, and advisors.',
    icon: '◎',
  },
]

export const changelog = [
  { version: 'v1.0.0-rc2', date: 'Jun 3', note: 'Added stakeholder digest export' },
  { version: 'v1.0.0-rc1', date: 'May 28', note: 'Launch readiness scoring engine' },
  { version: 'v0.9.0', date: 'May 15', note: 'Multi-team checklist with assignments' },
  { version: 'v0.8.0', date: 'Apr 30', note: 'Changelog studio from git history' },
]

export const navItems = ['Overview', 'Checklist', 'Changelog', 'Stakeholders', 'Settings']
