import React from 'react';
import { Ticket } from '@types';
import { Card } from '@ui';
import styles from './Ticket.module.scss';
import { Segment } from './components/Segment';

export function Ticket(props: Ticket) {
    const { price, carrier, segments } = props;
    return (
        <Card>
            <div className={styles.container}>
                <div className={styles.top}>
                    <span className={styles.price}>{price} Р</span>
                    <img src={`//pics.avs.io/99/36/${carrier}.png`} />
                </div>
                <div>
                    {segments.map((segment, index) => (
                        <Segment key={`${segment.duration}-${index}`} {...segment} />
                    ))}
                </div>
            </div>
        </Card>
    );
}
