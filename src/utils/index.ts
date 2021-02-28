import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
require('dayjs/locale/ru');

const config = {
    thresholds: [
        { l: 'mm', r: 60, d: 'minute' },
        { l: 'hh', r: 24, d: 'hour' },
        { l: 'dd', r: 31, d: 'day' },
        { l: 'MM', r: 12, d: 'month' },
    ],
};

dayjs.extend(duration);
dayjs.extend(relativeTime, config);
dayjs.locale('ru');

export function formatDate(date: string) {
    return dayjs(date).format('HH:mm');
}

export function calculateDestinationTime(date: string, dur: number) {
    const duration = dayjs.duration(dur, 'minutes');
    return dayjs(date).add(duration).format('HH:mm');
}

export function humanDuration(time: number) {
    const duration = dayjs.duration(time, 'minutes').humanize();
    return duration;
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
