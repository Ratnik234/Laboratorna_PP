const express = require('express');
const path = require('path');
const Joi = require('joi');

const app = express();
const PORT = 3000;

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ---------- "База даних" у пам'яті ----------
let tasks = [
  { id: 1, title: 'Вивчити Joi', completed: false },
  { id: 2, title: 'Підключити Notyf', completed: false },
];
let nextId = 3;

// ---------- Joi-схема ----------
const taskSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': 'Поле title має бути рядком',
    'string.empty': 'Назва задачі не може бути порожньою',
    'string.min': 'Назва задачі має містити щонайменше 3 символи',
    'string.max': 'Назва задачі має містити не більше 100 символів',
    'any.required': 'Поле title є обов’язковим',
  }),
  completed: Joi.boolean(),
});

// ---------- Middleware валідації ----------
function validateTask(req, res, next) {
  const { error, value } = taskSchema.validate(req.body, { abortEarly: true });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  req.body = value;
  next();
}

// ---------- Сторінка ----------
app.get('/', (req, res) => {
  res.render('tasks', { title: 'Список справ', tasks });
});

// ---------- API ----------
app.get('/api/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/api/tasks', validateTask, (req, res) => {
  const task = {
    id: nextId++,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  tasks.push(task);
  res.status(201).json({ message: 'Задачу успішно створено', task });
});

app.put('/api/tasks/:id', validateTask, (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: `Задачу з id=${id} не знайдено` });
  }
  task.title = req.body.title;
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  res.status(200).json({ message: 'Задачу успішно оновлено', task });
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ message: `Задачу з id=${id} не знайдено` });
  }
  tasks.splice(index, 1);
  res.status(200).json({ message: 'Задачу успішно видалено' });
});

app.use('/api', (req, res) => {
  res.status(404).json({ message: 'Маршрут не знайдено' });
});

app.listen(PORT, () => {
  console.log(`Сервер запущено: http://localhost:${PORT}`);
});
