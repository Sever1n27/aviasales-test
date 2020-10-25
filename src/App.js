import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Home } from '@pages';
import { fetchSearchId } from '@core';

fetchSearchId();

export function App() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
        </Switch>
    );
}
