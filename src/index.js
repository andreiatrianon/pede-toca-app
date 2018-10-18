import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Forms from './Forms.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link} from "react-router-dom";
import {Row, Navbar, NavItem} from 'react-materialize';

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Navbar className='teal lighten-2'>
        <NavItem><Link to="/">Home</Link></NavItem>
        <NavItem><Link to="/artists">Artistas</Link></NavItem>
        <NavItem><Link to="/about">Sobre nós</Link></NavItem>
        <NavItem><Link to="/contact">Entre em contato</Link></NavItem>
      </Navbar>
      <Forms />
      <Row>
        <App />
      </Row>
    </div>
  </BrowserRouter>,
document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
