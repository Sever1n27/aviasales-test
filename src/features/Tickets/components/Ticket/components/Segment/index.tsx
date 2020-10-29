import React from 'react';
import styles from './Segment.module.scss';
import { formatDate, calculateDestinationTime, humanDuration, declOfNum } from '@utils';

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
                    {formatDate(date)} - {calculateDestinationTime(date, duration)}
                </span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>в пути</span>
                <span>{humanDuration(duration * 60)}</span>
            </div>
            <div className={styles.column}>
                <span className={styles.label}>{declOfNum(stops.length)}</span>
                <span>
                    {stops.length > 0
                        ? stops.map((stop, index) => (
                              <span className={styles.stop} key={`${index}-${stop}`}>
                                  {stop}
                              </span>
                          ))
                        : 'Прямой'}
                </span>
            </div>
        </div>
    );
}
