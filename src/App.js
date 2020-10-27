import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '@pages';
import { fetchSearchId } from '@core';
import { ErrorNotifications } from '@features';
import './App.scss';

fetchSearchId();

export function App() {
    return (
        <>
            <ErrorNotifications />
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
            </Switch>
        </>
    );
}
