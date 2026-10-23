import { createSlice, nanoid } from '@reduxjs/toolkit'

const initialState = {
  items: []
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks(state, action) {
      state.items = action.payload
    },
    addTask: {
      reducer(state, action) {
        state.items.push(action.payload)
      },
      prepare(text, category) {
        return {
          payload: {
            id: nanoid(),
            text,
            completed: false,
            createdAt: new Date().toISOString(),
            category: category || 'без категории'
          }
        }
      }
    },
    toggleTask(state, action) {
      const id = action.payload
      const task = state.items.find(task => task.id === id)
      if (task) {
        task.completed = !task.completed
      }
    },
    deleteTask(state, action) {
      const id = action.payload
      state.items = state.items.filter(task => task.id !== id)
    },
    clearCompleted(state) {
      state.items = state.items.filter(task => !task.completed)
    }
  }
})

export const { setTasks, addTask, toggleTask, deleteTask, clearCompleted } = tasksSlice.actions

export default tasksSlice.reducer

