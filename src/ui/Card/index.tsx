import React from 'react';
import clsx from 'clsx';
import { useTransition, animated } from 'react-spring';
import styles from './Card.module.scss';

type CardProps = {
    children: React.ReactNode;
    title?: string;
    noPadding?: boolean;
};

export function Card(props: CardProps) {
    const { children, title, noPadding } = props;
    const className = clsx(styles.card, noPadding && 'no-padding');
    const transitions = useTransition(true, null, {
        from: { opacity: 0 },
        enter: { opacity: 1 },
        leave: { opacity: 0 },
    });
    return (
        <>
            {transitions.map(
                ({ item, key, props }) =>
                    item && (
                        <animated.div className={className} key={key} style={props}>
                            {title && <div className={styles.title}>{title}</div>}
                            {children}
                        </animated.div>
                    ),
            )}
        </>
    );
}
