import { App } from './App';
import { render } from 'preact';
import React from 'react';

const rootElement = document.getElementById('root') as HTMLElement;

render(<App />, rootElement);

if (module.hot) {
    module.hot.accept();
}
