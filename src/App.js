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

  async componentDidMount() {
    await this.props.loginAPI();
    let data = await this.props.getArtistsFromAPI();
    return this.setState({artists: data});
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