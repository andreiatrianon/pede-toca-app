import React from 'react';
import './index.css';
import TracksList from './TracksList';
import ArtistsList from './ArtistsList';
import ArtistForm from './ArtistForm.js';
import TrackForm from './TrackForm.js';
import {BrowserRouter, Link, Route} from "react-router-dom";
import {Row, Modal, Button} from 'react-materialize';

const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';

let playlist = [];
let favoriteArtists = [];
localStorage.setItem('playlist', playlist);
localStorage.setItem('favoriteArtists', favoriteArtists);

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {}
    this.loginAPI = this.loginAPI.bind(this);
    this.getTracksFromAPI = this.getTracksFromAPI.bind(this);
    this.getArtistsFromAPI = this.getArtistsFromAPI.bind(this);
    this.trackslist = this.trackslist.bind(this);
    this.artistsList = this.artistsList.bind(this);
  }

  loginAPI() {
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

  getTracksFromAPI() {
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

  getArtistsFromAPI = () => {
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

  trackslist() {
    return (
      <TracksList getTracksFromAPI={this.getTracksFromAPI} />
    )
  }

  artistsList() {
    return (
      <section id='artists-list' className='white my-p-2'>  
        <ArtistsList loginAPI={this.loginAPI} getArtistsFromAPI={this.getArtistsFromAPI} />
      </section>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Row>
            <Link to='/'><Button className='border-radius my-btn-hover'>Músicas</Button></Link>
            <Link to='/artists'><Button className='border-radius my-btn-hover'>Artistas</Button></Link>
            <Link to='/playlist'><Button className='border-radius my-btn-hover'>Minha Playlist</Button></Link>
            <Link to='/favorite'><Button className='border-radius my-btn-hover'>Artistas Favoritos</Button></Link>
          </Row>
          <Route path='/' exact component={this.trackslist} />
          <Route path='/artists' exact component={this.artistsList} />
          {/* <Route path='/playlist' exact component={} />
          <Route path='/favorite' exact component={} /> */}
          <Button floating fab='vertical' icon='add' faicon='fa fa-plus' className='red' large style={{bottom: '45px', right: '24px'}}>
            <Modal
              header='Adicionar nova música'
              trigger={<Button floating icon='music_note' className='green'/>}>
              <TrackForm getArtistsFromAPI={this.getArtistsFromAPI} />
            </Modal>
            <Modal
              header='Adicionar novo artista'
              trigger={<Button floating icon='keyboard_voice' className='blue'/>}>
              <ArtistForm getArtistsFromAPI={this.getArtistsFromAPI} />
            </Modal>
          </Button>
        </div>
      </BrowserRouter>
    )
  }

}

export default App;
