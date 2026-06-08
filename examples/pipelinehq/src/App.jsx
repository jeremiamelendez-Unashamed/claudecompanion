import { useState } from 'react'
import MetricCard from './components/MetricCard'
import PipelineBoard from './components/PipelineBoard'
import FollowUpList from './components/FollowUpList'
import ActivityFeed from './components/ActivityFeed'
import TeamTable from './components/TeamTable'
import {
  activities,
  followUps,
  metrics,
  navItems,
  stages,
  team,
} from './data'

export default function App() {
  const [activeNav, setActiveNav] = useState('Pipeline')

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">PH</div>
          <div>
            <strong>PipelineHQ</strong>
            <span>Sales CRM</span>
          </div>
        </div>
        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <button
              key={item}
              type="button"
              className={activeNav === item ? 'nav-item active' : 'nav-item'}
              onClick={() => setActiveNav(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Small Team Sales CRM</p>
            <h1>Close more deals, miss fewer follow-ups</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="btn btn-ghost">Export report</button>
            <button type="button" className="btn btn-primary">Schedule review</button>
          </div>
        </header>

        <section className="metrics-row">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <PipelineBoard stages={stages} />

        <section className="bottom-grid">
          <FollowUpList items={followUps} />
          <ActivityFeed activities={activities} />
          <TeamTable members={team} />
        </section>
      </main>
    </div>
  )
}
