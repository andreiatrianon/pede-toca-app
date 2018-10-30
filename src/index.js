import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import TracksList from './TracksList';
import App from './App';
import ArtistForm from './ArtistForm.js';
import TrackForm from './TrackForm.js';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Row, Modal, Button} from 'react-materialize';

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
    <section id='artists-list' className='my-p-3'>  
      <App loginAPI={loginAPI} getArtistsFromAPI={getArtistsFromAPI} />
    </section>
  )
}
ReactDOM.render(
  <BrowserRouter>
    <div>
      <Row>
        <Link to='/'><Button className='border-radius my-btn-hover'>Músicas</Button></Link>
        <Link to='/artists'><Button className='border-radius my-btn-hover'>Artistas</Button></Link>
      </Row>
      {/* <Forms getArtistsFromAPI={getArtistsFromAPI} /> */}
      <Button floating fab='vertical' icon='add' faicon='fa fa-plus' className='red' large style={{bottom: '45px', right: '24px'}}>
        <Modal
          header='Adicionar nova música'
          trigger={<Button floating icon='music_note' className='green'/>}>
          <TrackForm getArtistsFromAPI={getArtistsFromAPI} />
        </Modal>
        <Modal
          header='Adicionar novo artista'
          trigger={<Button floating icon='keyboard_voice' className='blue'/>}>
          <ArtistForm getArtistsFromAPI={getArtistsFromAPI} />
        </Modal>
      </Button>
      <Route path='/' exact component={trackslist} />
      <Route path='/artists' exact component={artistsList} />
    </div>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
