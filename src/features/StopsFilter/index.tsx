import React from 'react';
import { useStore } from 'effector-react';
import { stops, changeStopFilter, $stopFilters } from '@core';
import { Card } from '@ui';

export function StopsFilter() {
    const currentFilter = useStore($stopFilters);
    return (
        <Card>
            {stops.map((item) => (
                <button onClick={() => changeStopFilter(item)} key={item}>
                    {item}
                </button>
            ))}
            <span>{currentFilter.map((item) => item)}</span>
        </Card>
    );
}
