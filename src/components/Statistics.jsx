function Statistics({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const active = total - completed

  return (
    <div className="statistics">
      <div className="stat-item">
        <span className="stat-label">Всего:</span>
        <span className="stat-value">{total}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Активных:</span>
        <span className="stat-value active">{active}</span>
      </div>
      <div className="stat-item">
        <span className="stat-label">Выполнено:</span>
        <span className="stat-value completed">{completed}</span>
      </div>
    </div>
  )
}

export default Statistics
