export const plants = [
  {
    id: 1,
    name: 'Monstera Deliciosa',
    nickname: 'Monty',
    room: 'Living Room',
    health: 92,
    nextWater: 'Today',
    light: 'Bright indirect',
    emoji: '🌿',
    status: 'thriving',
  },
  {
    id: 2,
    name: 'Snake Plant',
    nickname: 'Severus',
    room: 'Bedroom',
    health: 88,
    nextWater: 'In 3 days',
    light: 'Low to medium',
    emoji: '🪴',
    status: 'healthy',
  },
  {
    id: 3,
    name: 'Fiddle Leaf Fig',
    nickname: 'Fiddles',
    room: 'Office',
    health: 71,
    nextWater: 'Tomorrow',
    light: 'Bright indirect',
    emoji: '🍃',
    status: 'needs-attention',
  },
  {
    id: 4,
    name: 'Pothos Golden',
    nickname: 'Goldie',
    room: 'Kitchen',
    health: 95,
    nextWater: 'In 2 days',
    light: 'Medium indirect',
    emoji: '🌱',
    status: 'thriving',
  },
]

export const todayTasks = [
  { id: 1, plant: 'Monty', task: 'Water — 1 cup', time: '9:00 AM', done: true },
  { id: 2, plant: 'Fiddles', task: 'Mist leaves', time: '12:00 PM', done: false },
  { id: 3, plant: 'Goldie', task: 'Rotate pot 90°', time: '3:00 PM', done: false },
  { id: 4, plant: 'Monty', task: 'Wipe leaves', time: '6:00 PM', done: false },
]

export const careTips = [
  {
    title: 'Check soil before watering',
    body: 'Stick your finger 2 inches in — water only when the top layer feels dry.',
  },
  {
    title: 'Group humidity lovers',
    body: 'Cluster tropical plants together to create a microclimate with higher humidity.',
  },
  {
    title: 'Rotate weekly',
    body: 'Turn pots a quarter turn each week so every side gets even light.',
  },
]

export const environment = [
  { label: 'Avg. Room Temp', value: '72°F', icon: '🌡️' },
  { label: 'Humidity', value: '48%', icon: '💧' },
  { label: 'Plants Thriving', value: '3 of 4', icon: '✨' },
  { label: 'Tasks This Week', value: '12', icon: '📋' },
]

export const weekSchedule = [
  { day: 'Mon', tasks: 2, active: false },
  { day: 'Tue', tasks: 1, active: false },
  { day: 'Wed', tasks: 4, active: true },
  { day: 'Thu', tasks: 2, active: false },
  { day: 'Fri', tasks: 1, active: false },
  { day: 'Sat', tasks: 1, active: false },
  { day: 'Sun', tasks: 1, active: false },
]
