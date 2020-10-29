import { formatDuration, intervalToDuration, format, parseISO, addMinutes } from 'date-fns';
import ru from 'date-fns/locale/ru';

export function formatDate(date: string) {
    return format(parseISO(date), 'HH:mm', { locale: ru });
}

export function calculateDestinationTime(date: string, duration: number) {
    return format(addMinutes(parseISO(date), duration), 'HH:mm', { locale: ru });
}

export function humanDuration(time: number) {
    return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }), {
        locale: ru,
        format: ['days', 'hours', 'minutes'],
    });
}

export function declOfNum(number: number) {
    switch (true) {
        case number === 1:
            return '1 пересадка';
        case number >= 2 && number < 5:
            return `${number} пересадки`;
        case number >= 5:
            return `${number} пересадок`;
        default:
            return 'Без пересадок';
    }
}
