import React from 'react';
import { Card } from '@ui';
import styles from './Preloader.module.scss';

export function Preloader() {
    return (
        <Card>
            <div className={styles.wrapper}>
                <div className={styles.loading}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
            </div>
        </Card>
    );
}
