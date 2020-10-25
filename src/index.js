import App from './App';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';

React.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
