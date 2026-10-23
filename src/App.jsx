import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import Statistics from './components/Statistics'
import './styles/App.css'
import { setTasks, clearCompleted } from './tasksSlice'

function App() {
  const dispatch = useDispatch()
  const tasks = useSelector(state => state.tasks.items)
  const [isHydrated, setIsHydrated] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      try {
        dispatch(setTasks(JSON.parse(savedTasks)))
      } catch {
        // ignore invalid localStorage payload
      }
    }
    setIsHydrated(true)
  }, [dispatch])

  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks, isHydrated])

  const categories = ['all', ...new Set(tasks.map(task => task.category))]

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.text.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📋 Менеджер задач</h1>
        </header>

        <Statistics tasks={tasks} />

        <TaskForm categories={categories.filter(c => c !== 'all')} />

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <TaskList tasks={filteredTasks} />

        {tasks.some(task => task.completed) && (
          <button className="clear-button" onClick={() => dispatch(clearCompleted())}>
            🗑️ Удалить все выполненные
          </button>
        )}
      </div>
    </div>
  )
}

export default App
