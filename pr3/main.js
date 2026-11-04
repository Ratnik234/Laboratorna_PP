import { getUsers } from './api.js';
import { filterUsersByCity, sortUsersByName } from './utils.js';

async function init() {
    const list = document.getElementById('users');
    const status = document.getElementById('status');

    try {
        console.log('Завантаження користувачів з API...');
        const users = await getUsers();

        const sortedUsers = sortUsersByName(users);
        const filteredUsers = filterUsersByCity(sortedUsers, 'Gwenborough');

        console.log('Результат фільтрації та сортування:', filteredUsers);

        status.textContent = `Знайдено користувачів: ${filteredUsers.length}`;
        filteredUsers.forEach((user, index) => {
            const li = document.createElement('li');
            li.textContent = `${index + 1}. Ім'я: ${user.name}, Місто: ${user.address.city}, Email: ${user.email}`;
            list.appendChild(li);
        });
    } catch (error) {
        console.error('Помилка в роботі застосунку:', error.message);
        status.textContent = `Помилка: ${error.message}`;
    }
}

init();