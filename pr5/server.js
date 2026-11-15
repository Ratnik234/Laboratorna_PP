const express = require('express');

const app = express();
const PORT = 3000;

// Налаштування шаблонізатора Pug
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

// Парсинг JSON-тіла POST/PUT-запитів
app.use(express.json());

// Імітація бази даних
let tasks = [
  { id: 1, title: 'Вивчити Express.js', completed: true },
  { id: 2, title: 'Освоїти шаблонізатор Pug', completed: false },
  { id: 3, title: 'Протестувати API у Postman', completed: false }
];
let nextId = 4;

// ---------- API-маршрути ----------

// GET /api/tasks - повернути всі задачі
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

// POST /api/tasks - створити задачу
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string' || !title.trim()) {
    return res.status(400).json({ error: 'Поле title є обов\'язковим' });
  }
  const newTask = { id: nextId++, title: title.trim(), completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT /api/tasks/:id - змінити статус completed на протилежний
app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return res.status(404).json({ error: 'Задачу не знайдено' });
  }
  task.completed = !task.completed;
  res.status(200).json(task);
});

// DELETE /api/tasks/:id - видалити задачу
app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  tasks = tasks.filter(t => t.id !== id);
  res.status(204).send();
});

// ---------- UI ----------

// GET /tasks - сторінка зі списком задач
app.get('/tasks', (req, res) => {
  res.render('tasks', { title: 'Список справ', tasks });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
