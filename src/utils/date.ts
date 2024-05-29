export function formatDate(date: Date | string) {
    const d = typeof (date) === "string" ? new Date(date) : date

    const options: Intl.DateTimeFormatOptions = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    };

    const formattedDate = new Intl.DateTimeFormat('fr-FR', options).format(d);

    return formattedDate;

}

export function formatTime(date: Date | string) {
    const d = typeof (date) === "string" ? new Date(date) : date

    const hours = d.getUTCHours().toString().padStart(2, '0');
    const minutes = d.getUTCMinutes().toString().padStart(2, '0');

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
}

export function formatDateTime(date: Date | string) {
    const formattedDate = formatDate(date)
    const formattedTime = formatTime(date);

    const formattedDateTime = `${formattedDate} - ${formattedTime}`;

    return formattedDateTime;
}