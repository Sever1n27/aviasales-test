import { App } from './App';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'preact';
import React from 'react';

render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'),
);

if (module.hot) {
    module.hot.accept();
}
