import React from 'react';
import { useStore } from 'effector-react';
import { StopsFilter, Tickets, Sorting, Logo, Preloader, Error } from '@features';
import { $isLoading, $error } from '@core';
import styles from './Home.module.scss';

export function Home() {
    const isLoading = useStore($isLoading);
    const isError = useStore($error);
    return (
        <div className={styles.container}>
            <Logo />
            {isError && <Error />}
            {isLoading && <Preloader />}
            {!isError && !isLoading && (
                <div className={styles.content}>
                    <div className={styles.filters}>
                        <StopsFilter />
                    </div>
                    <div className={styles.tickets}>
                        <Sorting />
                        <Tickets />
                    </div>
                </div>
            )}
        </div>
    );
}
