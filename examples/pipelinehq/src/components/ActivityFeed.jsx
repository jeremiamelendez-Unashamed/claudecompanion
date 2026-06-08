export default function ActivityFeed({ activities }) {
  return (
    <section className="panel activity-panel">
      <div className="panel-header">
        <h2>Recent Activity</h2>
        <p>What your team did today</p>
      </div>
      <ul className="activity-list">
        {activities.map((item) => (
          <li key={item.id} className="activity-item">
            <span className="activity-dot" />
            <div>
              <p>{item.text}</p>
              <span>{item.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
