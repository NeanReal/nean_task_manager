import { useState, useEffect } from 'react'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'
import CategoryFilter from './components/CategoryFilter'
import Statistics from './components/Statistics'
import './styles/App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (text, category) => {
    const newTask = {
      id: Date.now(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
      category: category || 'без категории'
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const clearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed))
  }

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

        <TaskForm onAddTask={addTask} categories={categories.filter(c => c !== 'all')} />

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <TaskList
          tasks={filteredTasks}
          onToggleTask={toggleTask}
          onDeleteTask={deleteTask}
        />

        {tasks.some(task => task.completed) && (
          <button className="clear-button" onClick={clearCompleted}>
            🗑️ Удалить все выполненные
          </button>
        )}
      </div>
    </div>
  )
}

export default App
