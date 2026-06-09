export default function MetricCard({ label, value, change, trend }) {
  const trendClass = trend === 'up' ? 'metric-change--up' : 'metric-change--down'

  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <span className="metric-value">{value}</span>
      <span className={`metric-change ${trendClass}`}>{change}</span>
    </div>
  )
}
