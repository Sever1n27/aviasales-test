import React from 'react';
import styles from './Segment.module.scss';

type SegmentProps = {
    origin: string;
    destination: string;
    date: string;
    stops: string[];
    duration: number;
};

export function Segment(props: SegmentProps) {
    const { origin, destination, date, stops, duration } = props;
    return (
        <div className={styles.container}>
            <div className={styles.column}>
                <span className={styles.label}>
                    {origin} - {destination}
                </span>
                <span>
                    {date} - {duration}
                </span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>в пути</span>
                <span>{duration}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>{stops.length} пересадок</span>
                <span>{stops.map((stop) => stop)}</span>
            </div>
        </div>
    );
}
