export default function WeekStrip({ days }) {
  return (
    <section className="week-strip">
      {days.map((day) => (
        <div key={day.day} className={day.active ? 'week-day active' : 'week-day'}>
          <span className="week-label">{day.day}</span>
          <span className="week-count">{day.tasks}</span>
          <span className="week-sub">tasks</span>
        </div>
      ))}
    </section>
  )
}
