export default function EnvironmentBar({ stats }) {
  return (
    <section className="environment-bar">
      {stats.map((stat) => (
        <div key={stat.label} className="environment-stat">
          <span className="environment-icon">{stat.icon}</span>
          <div>
            <span className="environment-label">{stat.label}</span>
            <strong>{stat.value}</strong>
          </div>
        </div>
      ))}
    </section>
  )
}
