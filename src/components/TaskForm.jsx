import { useState } from 'react'

function TaskForm({ onAddTask, categories }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('без категории')
  const [newCategory, setNewCategory] = useState('')
  const [showNewCategory, setShowNewCategory] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      const selectedCategory = showNewCategory && newCategory.trim()
        ? newCategory.trim()
        : category

      onAddTask(text.trim(), selectedCategory)
      setText('')
      setNewCategory('')
      setShowNewCategory(false)
      setCategory('без категории')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="task-input"
          placeholder="Введите задачу..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      <div className="form-group">
        <select
          className="category-select"
          value={category}
          onChange={(e) => {
            if (e.target.value === 'new') {
              setShowNewCategory(true)
            } else {
              setCategory(e.target.value)
              setShowNewCategory(false)
            }
          }}
        >
          <option value="без категории">Без категории</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
          <option value="new">+ Создать новую категорию</option>
        </select>

        {showNewCategory && (
          <input
            type="text"
            className="new-category-input"
            placeholder="Название категории..."
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        )}
      </div>

      <button type="submit" className="add-button">
        ➕ Добавить задачу
      </button>
    </form>
  )
}

export default TaskForm
