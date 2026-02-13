function TaskItem({ task, onToggle, onDelete }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <button
          className="toggle-button"
          onClick={() => onToggle(task.id)}
          aria-label={task.completed ? 'Отметить как невыполненную' : 'Отметить как выполненную'}
        >
          {task.completed ? '✓' : '⭕'}
        </button>
        <div className="task-text-wrapper">
          <p className="task-text">{task.text}</p>
          <div className="task-meta">
            <span className="task-category">🏷️ {task.category}</span>
            <span className="task-date">📅 {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>
      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label="Удалить задачу"
      >
        🗑️
      </button>
    </div>
  )
}

export default TaskItem
