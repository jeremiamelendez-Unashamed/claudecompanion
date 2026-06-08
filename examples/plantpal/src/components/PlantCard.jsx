export default function PlantCard({ plant }) {
  const statusLabel = {
    thriving: 'Thriving',
    healthy: 'Healthy',
    'needs-attention': 'Needs care',
  }[plant.status]

  return (
    <article className={`plant-card plant-card--${plant.status}`}>
      <div className="plant-card-top">
        <span className="plant-emoji">{plant.emoji}</span>
        <span className={`plant-status plant-status--${plant.status}`}>{statusLabel}</span>
      </div>
      <h3>{plant.nickname}</h3>
      <p className="plant-species">{plant.name}</p>
      <div className="plant-meta">
        <span>{plant.room}</span>
        <span>{plant.light}</span>
      </div>
      <div className="plant-footer">
        <div>
          <span className="plant-footer-label">Health</span>
          <strong>{plant.health}%</strong>
        </div>
        <div>
          <span className="plant-footer-label">Water</span>
          <strong>{plant.nextWater}</strong>
        </div>
      </div>
    </article>
  )
}
