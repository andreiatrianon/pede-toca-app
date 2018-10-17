import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Forms from './Forms.js';
import * as serviceWorker from './serviceWorker';
import {Row} from 'react-materialize';

ReactDOM.render(
  <div>
    <Forms />
    <Row>
      <App />
    </Row>
  </div>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
