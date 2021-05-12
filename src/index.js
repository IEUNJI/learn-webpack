import React from 'react';
import ReactDOM from 'react-dom';

console.log(1, module.hot);

const App = require('./App').default;
    console.log(App);
    ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept(['./App'], () => {
    const App = require('./App').default;
    console.log(App);
    ReactDOM.render(<App />, document.getElementById('root'));
  })
}
