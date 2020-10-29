import React from 'react';
import { useStore } from 'effector-react';
import { changeStopFilter, $stopFilters, restoreStopFilter, $availableStopsFilters } from '@core';
import { Card, Checkbox } from '@ui';
import { declOfNum } from '@utils';

export function StopsFilter() {
    const currentFilter = useStore($stopFilters);
    const stops = useStore($availableStopsFilters);
    return (
        <Card title="Количество пересадок" noPadding>
            <Checkbox
                label="Все"
                onChange={restoreStopFilter}
                value="all"
                checked={currentFilter.length === stops.length}
            />
            {stops.map((value) => (
                <Checkbox
                    label={declOfNum(value)}
                    onChange={changeStopFilter}
                    value={value}
                    checked={currentFilter.includes(value)}
                    key={value}
                />
            ))}
        </Card>
    );
}
