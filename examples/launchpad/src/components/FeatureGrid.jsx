export default function FeatureGrid({ features }) {
  return (
    <section className="panel feature-panel">
      <div className="panel-header">
        <h2>Core Features</h2>
        <p>Everything you need to ship with confidence</p>
      </div>
      <div className="feature-grid">
        {features.map((feature) => (
          <article key={feature.title} className="feature-card">
            <span className="feature-icon">{feature.icon}</span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
