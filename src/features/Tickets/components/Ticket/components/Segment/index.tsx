import React from 'react';
import styles from './Segment.module.scss';
import { formatDuration, intervalToDuration, format, parseISO, addMinutes } from 'date-fns';
import ru from 'date-fns/locale/ru';

type SegmentProps = {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
};

function humanDuration(time: number) {
    return formatDuration(intervalToDuration({ start: 0, end: time * 1000 }));
}

export function Segment(props: SegmentProps) {
    const { origin, destination, date, stops, duration } = props;

    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <span className={styles.label}>
                    {origin} - {destination}
                </span>
                <span>
                    {format(parseISO(date), 'HH:mm', { locale: ru })} -{' '}
                    {format(addMinutes(parseISO(date), duration), 'HH:mm', { locale: ru })}
                </span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>в пути</span>
                <span>{humanDuration(duration * 60)}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>{stops.length} пересадок</span>
                <span>{stops.map((stop) => stop)}</span>
            </div>
        </div>
    );
}
