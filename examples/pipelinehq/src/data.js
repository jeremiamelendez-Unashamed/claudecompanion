export const metrics = [
  { label: 'Pipeline Value', value: '$284K', change: '+12% vs last month', trend: 'up' },
  { label: 'Deals Won (Q2)', value: '$96K', change: '8 deals closed', trend: 'up' },
  { label: 'Win Rate', value: '34%', change: '+4 pts', trend: 'up' },
  { label: 'Avg. Deal Size', value: '$12K', change: 'Stable', trend: 'neutral' },
]

export const stages = [
  {
    id: 'lead',
    name: 'Lead',
    total: '$42K',
    deals: [
      { id: 1, company: 'Brightline Co.', value: '$18K', owner: 'Sarah', days: 2 },
      { id: 2, company: 'Northwind Labs', value: '$24K', owner: 'Marcus', days: 5 },
    ],
  },
  {
    id: 'qualified',
    name: 'Qualified',
    total: '$68K',
    deals: [
      { id: 3, company: 'Apex Retail', value: '$32K', owner: 'Sarah', days: 8 },
      { id: 4, company: 'Summit Health', value: '$36K', owner: 'Priya', days: 11 },
    ],
  },
  {
    id: 'proposal',
    name: 'Proposal',
    total: '$94K',
    deals: [
      { id: 5, company: 'Harbor Logistics', value: '$45K', owner: 'Marcus', days: 14 },
      { id: 6, company: 'Cedar Finance', value: '$49K', owner: 'Priya', days: 6 },
    ],
  },
  {
    id: 'negotiation',
    name: 'Negotiation',
    total: '$80K',
    deals: [
      { id: 7, company: 'Vantage Media', value: '$80K', owner: 'Sarah', days: 21 },
    ],
  },
]

export const followUps = [
  { id: 1, company: 'Harbor Logistics', action: 'Send revised proposal', due: 'Today', owner: 'Marcus' },
  { id: 2, company: 'Vantage Media', action: 'Contract review call', due: 'Tomorrow', owner: 'Sarah' },
  { id: 3, company: 'Brightline Co.', action: 'Discovery follow-up email', due: 'Thu', owner: 'Sarah' },
  { id: 4, company: 'Cedar Finance', action: 'Pricing walkthrough', due: 'Fri', owner: 'Priya' },
]

export const activities = [
  { id: 1, text: 'Sarah moved Vantage Media to Negotiation', time: '2h ago' },
  { id: 2, text: 'Marcus logged a call with Harbor Logistics', time: '4h ago' },
  { id: 3, text: 'Priya won Cedar Finance pilot — $12K', time: 'Yesterday' },
  { id: 4, text: 'New lead added: Brightline Co.', time: 'Yesterday' },
]

export const team = [
  { name: 'Sarah Kim', deals: 14, won: '$48K', rate: '38%' },
  { name: 'Marcus Cole', deals: 11, won: '$32K', rate: '31%' },
  { name: 'Priya Shah', deals: 9, won: '$16K', rate: '29%' },
]

export const navItems = ['Pipeline', 'Deals', 'Contacts', 'Reports', 'Settings']
