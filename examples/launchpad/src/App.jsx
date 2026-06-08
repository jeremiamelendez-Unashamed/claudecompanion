import { useEffect, useState } from 'react'
import MetricCard from './components/MetricCard'
import ChecklistPanel from './components/ChecklistPanel'
import FeatureGrid from './components/FeatureGrid'
import ChangelogTimeline from './components/ChangelogTimeline'
import {
  changelog,
  checklist,
  features,
  launchDate,
  metrics,
  navItems,
} from './data'

function daysUntilLaunch(target) {
  const now = new Date()
  const diff = target.getTime() - now.getTime()
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)))
}

export default function App() {
  const [activeNav, setActiveNav] = useState('Overview')
  const daysLeft = daysUntilLaunch(launchDate)

  useEffect(() => {
    document.title = 'LaunchPad — Product Launch Command Center'
  }, [])

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">LP</div>
          <div>
            <strong>LaunchPad</strong>
            <span>Command Center</span>
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
        <div className="sidebar-footer">
          <p>Launch in</p>
          <strong>{daysLeft} days</strong>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div>
            <p className="eyebrow">Product Launch Command Center</p>
            <h1>Ship v1.0 with confidence</h1>
          </div>
          <div className="topbar-actions">
            <button type="button" className="btn btn-ghost">Share digest</button>
            <button type="button" className="btn btn-primary">Export launch plan</button>
          </div>
        </header>

        <section className="metrics-row">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="content-grid">
          <ChecklistPanel items={checklist} />
          <ChangelogTimeline entries={changelog} />
        </section>

        <FeatureGrid features={features} />
      </main>
    </div>
  )
}
