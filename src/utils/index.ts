import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/ru');

dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale('ru');

export function formatDate(date: string) {
    return dayjs(date).format('HH:mm');
}

export function calculateDestinationTime(date: string, dur: number) {
    const duration = dayjs.duration(dur, 'minutes');
    return dayjs(date).add(duration).format('HH:mm');
}

export function humanDuration(time: number) {
    const duration = dayjs.duration(time, 'minutes');
    return dayjs('1999-01-01').to(dayjs('1999-01-01').add(duration), true);
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
