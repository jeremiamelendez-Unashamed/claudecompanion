import { useState } from 'react'
import PlantCard from './components/PlantCard'
import TaskList from './components/TaskList'
import WeekStrip from './components/WeekStrip'
import TipsPanel from './components/TipsPanel'
import EnvironmentBar from './components/EnvironmentBar'
import {
  careTips,
  environment,
  plants,
  todayTasks,
  weekSchedule,
} from './data'

const tabs = ['Garden', 'Schedule', 'Tips', 'Journal']

export default function App() {
  const [activeTab, setActiveTab] = useState('Garden')

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Houseplant Care Companion</p>
          <h1>Keep every leaf happy</h1>
          <p className="hero-sub">
            Track watering, light, and health for your indoor garden — so your plants thrive, not just survive.
          </p>
        </div>
        <div className="hero-actions">
          <button type="button" className="btn btn-primary">+ Add plant</button>
          <button type="button" className="btn btn-ghost">Log care</button>
        </div>
      </header>

      <nav className="tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            className={activeTab === tab ? 'tab active' : 'tab'}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </nav>

      <EnvironmentBar stats={environment} />
      <WeekStrip days={weekSchedule} />

      <section className="plants-section">
        <div className="section-header">
          <h2>My Garden</h2>
          <p>{plants.length} plants across 4 rooms</p>
        </div>
        <div className="plants-grid">
          {plants.map((plant) => (
            <PlantCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      <section className="bottom-grid">
        <TaskList tasks={todayTasks} />
        <TipsPanel tips={careTips} />
      </section>
    </div>
  )
}
