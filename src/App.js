import React, { Component } from 'react';
import './App.css';
import ArtistsCard from './ArtistsCard.js';
import {Link, Route} from "react-router-dom";
import {Col} from 'react-materialize';

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
      <div>               
        {this.state.artists.map((artist, index) =>
          <Col m={4} s={4}> 
            <ArtistsCard key={index} {...artist} />
          </Col>
        )}
      </div>
    )
  }
}

export default App;