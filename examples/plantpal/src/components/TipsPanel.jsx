export default function TipsPanel({ tips }) {
  return (
    <section className="panel tips-panel">
      <div className="panel-header">
        <h2>Care Tips</h2>
        <p>Personalized for your collection</p>
      </div>
      <div className="tips-list">
        {tips.map((tip) => (
          <article key={tip.title} className="tip-card">
            <h3>{tip.title}</h3>
            <p>{tip.body}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
