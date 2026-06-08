export default function TaskList({ tasks }) {
  const completed = tasks.filter((task) => task.done).length

  return (
    <section className="panel task-panel">
      <div className="panel-header">
        <div>
          <h2>Today&apos;s Care</h2>
          <p>{completed} of {tasks.length} tasks done</p>
        </div>
        <button type="button" className="btn btn-soft">Add task</button>
      </div>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.done ? 'task-item done' : 'task-item'}>
            <span className="task-check">{task.done ? '✓' : ''}</span>
            <div className="task-content">
              <strong>{task.plant}</strong>
              <span>{task.task}</span>
            </div>
            <span className="task-time">{task.time}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
