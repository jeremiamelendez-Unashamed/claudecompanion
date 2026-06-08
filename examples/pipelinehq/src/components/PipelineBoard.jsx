export default function PipelineBoard({ stages }) {
  return (
    <section className="panel pipeline-panel">
      <div className="panel-header">
        <div>
          <h2>Sales Pipeline</h2>
          <p>Drag deals between stages — always know what&apos;s moving</p>
        </div>
        <button type="button" className="btn btn-primary">+ New deal</button>
      </div>
      <div className="pipeline-board">
        {stages.map((stage) => (
          <div key={stage.id} className="pipeline-column">
            <div className="pipeline-column-header">
              <h3>{stage.name}</h3>
              <span>{stage.total}</span>
            </div>
            <div className="pipeline-deals">
              {stage.deals.map((deal) => (
                <article key={deal.id} className="deal-card">
                  <strong>{deal.company}</strong>
                  <span className="deal-value">{deal.value}</span>
                  <div className="deal-meta">
                    <span>{deal.owner}</span>
                    <span>{deal.days}d in stage</span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
