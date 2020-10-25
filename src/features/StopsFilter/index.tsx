import React from 'react';
import { useStore } from 'effector-react';
import { changeStopFilter, $stopFilters, restoreStopFilter } from '@core';
import { Card, Checkbox } from '@ui';

export function StopsFilter() {
    const currentFilter = useStore($stopFilters);
    const checkboxes = [
        {
            value: 0,
            label: 'Без пересадок',
        },
        {
            value: 1,
            label: '1 пересадка',
        },
        {
            value: 2,
            label: '2 пересадки',
        },
        {
            value: 3,
            label: '3 пересадки',
        },
    ];

    return (
        <Card>
            <Checkbox label="Все" onChange={restoreStopFilter} value="all" checked={currentFilter.length === 4} />
            {checkboxes.map((item) => (
                <Checkbox
                    label={item.label}
                    onChange={changeStopFilter}
                    value={item.value}
                    checked={currentFilter.includes(item.value)}
                    key={item.value}
                />
            ))}
        </Card>
    );
}
