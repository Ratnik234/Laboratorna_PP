const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function getUsers() {
    let response;


    try {
        response = await fetch(API_URL);
    } catch (error) {
        throw new Error(`Мережева помилка: ${error.message}`);
    }


    if (!response.ok) {
        throw new Error(`Помилка мережі: статус ${response.status}`);
    }


    const text = await response.text();
    let data;
    try {
        data = JSON.parse(text);
    } catch (error) {
        throw new Error('Отримано невалідний JSON');
    }

    if (!Array.isArray(data)) {
        throw new Error('Очікувався масив користувачів');
    }
    return data;
}