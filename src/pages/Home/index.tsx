import React from 'react';
import { StopsFilter, Tickets, Sorting } from '@features';
import styles from './Home.module.scss';

export function Home() {
    return (
        <div className={styles.container}>
            <div className={styles.filters}>
                <StopsFilter />
            </div>
            <div>
                <Sorting />
                <Tickets />
            </div>
        </div>
    );
}
