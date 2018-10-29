import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TracksList from './TracksList';
import App from './App';
import Forms from './Forms.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Row, Button} from 'react-materialize';

const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';

const loginAPI = () => {
  const options = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(
      {email: 'rafael@laboratoria.la',
      password: 'banana'}
    )
  }
  return fetch(`${BASE_URL}/login`, options);
}

const getTracksFromAPI = () => {
  const options = {
    method: 'get',
    credentials: 'include'
  }

  return fetch(`${BASE_URL}/tracks`, options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
}

const getArtistsFromAPI = () => {
  const options = {
    method: 'get',
    credentials: 'include'
  }

  return fetch(`${BASE_URL}/artists`, options)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      return data
    })
}

const trackslist = () => {
  return (
    <TracksList getTracksFromAPI={getTracksFromAPI} />
  )
}

const artistsList = () => {
  return (
    <section id='artists-list'>  
      <App loginAPI={loginAPI} getArtistsFromAPI={getArtistsFromAPI} />
    </section>
  )
}

const about = () => {
  return (
    <div>
      <h1>Sobre nós</h1>
      <Link to='/about/yes'>Clica aqui</Link>
    </div>
  )
}

const contact = () => {
  return (
    <h1>Contato</h1>
  )
}

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Row>
        <Link to='/'><Button className='border-radius my-btn-hover'>Home</Button></Link>
        <Link to='/artists'><Button className='border-radius my-btn-hover'>Artistas</Button></Link>
        <Link to='/about'><Button className='border-radius my-btn-hover'>Sobre nós</Button></Link>
        <Link to='/contact'><Button className='border-radius my-btn-hover'>Entre em contato</Button></Link>
      </Row>
      <Forms getArtistsFromAPI={getArtistsFromAPI} />
      <Route path='/' exact component={trackslist} />
      <Route path='/artists' exact component={artistsList} />
      <Route path='/about' exact component={about} />
      <Route path='/contact' component={contact} />
      <Route path='/about/yes' render={() => <p>isso mesmo</p>}/>
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
