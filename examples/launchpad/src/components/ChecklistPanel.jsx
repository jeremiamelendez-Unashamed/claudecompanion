export default function ChecklistPanel({ items }) {
  const completed = items.filter((item) => item.done).length

  return (
    <section className="panel checklist-panel">
      <div className="panel-header">
        <div>
          <h2>Launch Checklist</h2>
          <p>{completed} of {items.length} tasks complete</p>
        </div>
        <div className="progress-ring" style={{ '--progress': `${(completed / items.length) * 100}%` }}>
          <span>{Math.round((completed / items.length) * 100)}%</span>
        </div>
      </div>
      <ul className="checklist">
        {items.map((item) => (
          <li key={item.id} className={item.done ? 'checklist-item done' : 'checklist-item'}>
            <span className="checklist-box">{item.done ? '✓' : ''}</span>
            <div className="checklist-content">
              <span className="checklist-task">{item.task}</span>
              <span className="checklist-owner">{item.owner}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
