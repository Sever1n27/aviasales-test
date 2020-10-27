import React from 'react';
import { useStore } from 'effector-react';
import { StopsFilter, Tickets, Sorting, Logo, Preloader } from '@features';
import { $isLoading, $error } from '@core';
import styles from './Home.module.scss';

export function Home() {
    const isLoading = useStore($isLoading);
    const error = useStore($error);
    const loadingOrError = isLoading || error;
    return (
        <div className={styles.container}>
            <Logo />
            {!loadingOrError ? (
                <div className={styles.content}>
                    <div className={styles.filters}>
                        <StopsFilter />
                    </div>
                    <div>
                        <Sorting />
                        <Tickets />
                    </div>
                </div>
            ) : (
                <Preloader />
            )}
        </div>
    );
}
