import React from 'react';
import clsx from 'clsx';
import { easeExpInOut } from 'd3-ease';
import { Animate } from 'react-move';
import styles from './Card.module.scss';

type CardProps = {
    children: React.ReactNode;
    title?: string;
    noPadding?: boolean;
};

export function Card(props: CardProps) {
    const { children, title, noPadding } = props;
    const className = clsx(styles.card, noPadding && 'no-padding');
    return (
        <Animate
            show={true}
            start={{
                opacity: 0,
            }}
            enter={{
                opacity: [1],
                timing: { duration: 600, ease: easeExpInOut },
            }}
            update={{
                opacity: [1],
                timing: { duration: 600, ease: easeExpInOut },
            }}
            leave={[
                {
                    timing: { duration: 600, ease: easeExpInOut },
                },
                {
                    opacity: [0],
                    timing: { delay: 600, duration: 500, ease: easeExpInOut },
                },
            ]}
        >
            {({ opacity }) => {
                return (
                    <div
                        className={className}
                        style={{
                            opacity,
                        }}
                    >
                        {title && <div className={styles.title}>{title}</div>}
                        {children}
                    </div>
                );
            }}
        </Animate>
    );
}
