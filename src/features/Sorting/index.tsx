import React from 'react';
import { useStore } from 'effector-react';
import { changeShownTickets, $mode } from '@core';
import { Button } from '@ui';
import styles from './TopFilter.module.scss';
const modes = [
    { label: 'Самый дешевый', value: 'cheapest' },
    { label: 'Самый быстрый', value: 'fastest' },
];

export function Sorting() {
    const mode = useStore($mode);
    return (
        <div className={styles.ButtonsGroup}>
            {modes.map((item) => (
                <Button active={mode === item.value} key={item.value} onClick={() => changeShownTickets(item.value)}>
                    {item.label}
                </Button>
            ))}
        </div>
    );
}
