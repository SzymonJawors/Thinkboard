export function formatDate(date) {
    return date.toLocaleDateString('pl-PL', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });
}