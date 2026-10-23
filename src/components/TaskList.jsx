import TaskItem from './TaskItem'

function TaskList({ tasks }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>📝 Нет задач. Добавьте новую задачу!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
        />
      ))}
    </div>
  )
}

export default TaskList
