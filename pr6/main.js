const notyf = new Notyf({
  duration: 3500,
  position: { x: 'right', y: 'top' },
  dismissible: true,
  types: [
    { type: 'success', background: '#2e9d4f' },
    { type: 'error', background: '#d9363e' },
  ],
});

const form = document.getElementById('task-form');
const input = document.getElementById('title');
const list = document.getElementById('task-list');

async function request(url, method, body) {
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await res.json();

    if (res.status === 200 || res.status === 201) {
      notyf.success(data.message);
    } else if (res.status === 400 || res.status === 404) {
      notyf.error(data.message);
    } else {
      notyf.error(data.message || 'Невідома помилка сервера');
    }
    return { ok: res.ok, data };
  } catch (err) {
    notyf.error('Не вдалося з’єднатися із сервером');
    return { ok: false, data: null };
  }
}

function addTaskToDom(task) {
  const li = document.createElement('li');
  li.dataset.id = task.id;
  if (task.completed) li.classList.add('done');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.className = 'toggle';
  checkbox.checked = task.completed;

  const span = document.createElement('span');
  span.textContent = task.title;

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'delete';
  btn.textContent = 'Видалити';

  li.append(checkbox, span, btn);
  list.appendChild(li);
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const { ok, data } = await request('/api/tasks', 'POST', { title: input.value });
  if (ok) {
    addTaskToDom(data.task);
    input.value = '';
  }
});

list.addEventListener('click', async (e) => {
  const li = e.target.closest('li');
  if (!li) return;
  const id = li.dataset.id;

  if (e.target.classList.contains('delete')) {
    const { ok } = await request(`/api/tasks/${id}`, 'DELETE');
    if (ok) li.remove();
  }

  if (e.target.classList.contains('toggle')) {
    const title = li.querySelector('span').textContent;
    const completed = e.target.checked;
    const { ok } = await request(`/api/tasks/${id}`, 'PUT', { title, completed });
    if (ok) li.classList.toggle('done', completed);
    else e.target.checked = !completed;
  }
});
