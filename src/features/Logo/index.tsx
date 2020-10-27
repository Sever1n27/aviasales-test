import React from 'react';
import styles from './Logo.module.scss';
import logo from './logo.svg';

export function Logo() {
    return (
        <div className={styles.wrapper}>
            <img src={logo} />
        </div>
    );
}
