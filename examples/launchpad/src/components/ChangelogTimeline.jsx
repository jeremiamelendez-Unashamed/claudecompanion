export default function ChangelogTimeline({ entries }) {
  return (
    <section className="panel changelog-panel">
      <div className="panel-header">
        <h2>Release Timeline</h2>
        <p>Recent milestones on the path to launch</p>
      </div>
      <ol className="changelog-timeline">
        {entries.map((entry) => (
          <li key={entry.version} className="changelog-entry">
            <div className="changelog-dot" />
            <div className="changelog-content">
              <div className="changelog-meta">
                <span className="changelog-version">{entry.version}</span>
                <span className="changelog-date">{entry.date}</span>
              </div>
              <p>{entry.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
