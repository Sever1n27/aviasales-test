import React from 'react';
import { Card } from '@ui';
import sad from './sad.svg';
import styles from './Error.module.scss';

export function Error() {
    return (
        <Card>
            <div className={styles.wrapper}>
                <img className={styles.sadface} src={sad} />
            </div>
        </Card>
    );
}
