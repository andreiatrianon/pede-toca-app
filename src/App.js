import React, { Component } from 'react';
import ArtistsCard from './ArtistsCard.js';
import './App.css';
import {Collapsible} from 'react-materialize';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artists: []
    }
  }

  componentDidMount() {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'

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

    fetch(`${BASE_URL}/login`, options)
      .then(res => {
        const options = {
          method: 'get',
          credentials: 'include'
        }
    
        fetch(`${BASE_URL}/artists`, options)
          .then(res => res.json())
          .then(data => this.setState({artists: data}))
      })
  }

  render() {
    return (
      <Collapsible className='my-text-center' popout defaultActiveKey={1}>              
        {this.state.artists.map((artist, index) =>
          <ArtistsCard key={index} {...artist} />
        )}
      </Collapsible>
    )
  }
}

export default App;