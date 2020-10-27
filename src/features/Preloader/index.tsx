import React from 'react';
import { useStore } from 'effector-react';
import { Card } from '@ui';
import { $error } from '@core';
import sad from './sad.svg';
import styles from './Preloader.module.scss';

export function Preloader() {
    const isError = useStore($error);
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
                {isError && <img className={styles.sadface} src={sad} />}
            </div>
        </Card>
    );
}
