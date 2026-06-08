export default function FollowUpList({ items }) {
  return (
    <section className="panel followup-panel">
      <div className="panel-header">
        <h2>This Week&apos;s Follow-ups</h2>
        <p>Never let a warm lead go cold</p>
      </div>
      <ul className="followup-list">
        {items.map((item) => (
          <li key={item.id} className="followup-item">
            <div>
              <strong>{item.company}</strong>
              <span>{item.action}</span>
            </div>
            <div className="followup-right">
              <span className="followup-due">{item.due}</span>
              <span className="followup-owner">{item.owner}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
