import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

render(
    <App />,
    document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    // If you use Webpack 2 in ES modules mode, you can
    // use <App /> here rather than require() a <NextApp />.
    const NextApp = require('./containers/App').default;
    render(
        <NextApp />,
        document.getElementById('root')
    );
  });
}