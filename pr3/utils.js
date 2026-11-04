export function filterUsersByCity(users, cityName) {
    if (!Array.isArray(users)) return [];
    return users.filter(user =>
        user.address &&
        user.address.city &&
        user.address.city.toLowerCase() === cityName.toLowerCase()
    );
}

export function sortUsersByName(users) {
    if (!Array.isArray(users)) return [];
    return [...users].sort((a, b) => a.name.localeCompare(b.name));
}