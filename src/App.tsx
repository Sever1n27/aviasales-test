import React from 'react';
import { Home } from '@pages';
import { fetchSearchId } from '@core';
import { ErrorNotifications } from '@features';
import './App.scss';

fetchSearchId();

export function App() {
    return (
        <>
            <ErrorNotifications />
            <Home />
        </>
    );
}
