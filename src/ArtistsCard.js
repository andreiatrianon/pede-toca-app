import React from 'react';
import Card from './Card.js';
import './ArtistsCard.css';
import ArtistTrack from './ArtistTrack.js'

class ArtistsCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
    this.getArtistTracks = this.getArtistTracks.bind(this)
  }

  getArtistTracks(event) {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com'
    const options = {
      method: 'get',
      credentials: 'include'
    }
  
    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          this.setState({tracks: [{title: 'Este artista não tem música'}]})  
        } else {
          this.setState({tracks: data})
        }
      })
      
  }

  render() {
    return (
      <Card>
        <h2>{this.props.name}</h2>
        <h3>{this.props.genre}</h3>
        <button onClick={this.getArtistTracks}>Ver músicas</button>
        <ul>
          {this.state.tracks.map(track => ArtistTrack(track))}
        </ul>
      </Card>
    )
  }
}

export default ArtistsCard;