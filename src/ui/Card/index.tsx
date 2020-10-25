import React from 'react';
import styles from './Card.module.scss';

type CardProps = {
    children: React.ReactNode;
};

export function Card(props: CardProps) {
    const { children } = props;
    return <div className={styles.card}>{children}</div>;
}
