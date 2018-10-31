import React, { Component } from 'react';
import ArtistsCard from './ArtistsCard.js';
import './App.css';
import {Collapsible} from 'react-materialize';

class App extends Component {
  render() {
    return (
      <Collapsible className='my-text-center' popout defaultActiveKey={1}>              
        {this.props.artistsDB.map((artist, index) =>
          <ArtistsCard key={index} {...artist} />
        )}
      </Collapsible>
    )
  }
}

export default App;