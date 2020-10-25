import React from 'react';
import { useStore } from 'effector-react';
import { $cheapestTickets, $fastestTickets, $mode } from '@core';
import { Ticket } from './components/Ticket';
import styles from './Tickets.module.scss';
export function Tickets() {
    const mode = useStore($mode);
    const fastestTickets = useStore($fastestTickets);
    const cheapestTickets = useStore($cheapestTickets);
    const shownTickets = mode === 'cheapest' ? cheapestTickets : fastestTickets;
    return (
        <div className={styles.container}>
            {shownTickets &&
                shownTickets.map((ticket, index) => <Ticket key={`${index}+${ticket.carrier}`} {...ticket} />)}
        </div>
    );
}
