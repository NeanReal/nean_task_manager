## Запуск проекта

```bash
# Установка
npm install

# Запуск
npm run dev

```


## Технологии

- React 18
- Vite
- CSS3 (адаптивный дизайн)
- LocalStorage (сохранение данных)

## Архитектура и Redux

После внедрения Redux:

- состояние задач вынесено из локального `useState` в глобальное хранилище Redux (`store.js`);
- используется Redux Toolkit (`tasksSlice.js`) и `Provider` из `react-redux` (обёртка в `main.jsx`);
- компоненты получают задачи через `useSelector` (в `App`) и передают их в дочерние компоненты, а изменения выполняются через `dispatch` экшенов.

### Редьюсеры

- `setTasks(tasks)` — загружает список задач (используется при инициализации из LocalStorage);
- `addTask(text, category)` — добавляет новую задачу с категорией, датой создания и флагом `completed: false`;
- `toggleTask(id)` — переключает статус задачи (выполнено/не выполнено);
- `deleteTask(id)` — удаляет задачу по идентификатору;
- `clearCompleted()` — удаляет все выполненные задачи.

### Селекторы

- `selectAllTasks(state)` — возвращает все задачи;
- `selectActiveTasks(state)` — возвращает только активные (невыполненные) задачи;
- `selectCompletedTasks(state)` — возвращает только выполненные задачи.

