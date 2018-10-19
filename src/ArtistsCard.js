import React from 'react';
import Card from './Card.js';
import ArtistTrack from './ArtistTrack.js';
import PropTypes from 'prop-types';
import {Button} from 'react-materialize';

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
        <h5>{this.props.name}</h5>
        <p>{this.props.genre}</p>
        <Button waves='light' className='purple accent-4 small' onClick={this.getArtistTracks}>músicas</Button>
        <ul>
          {this.state.tracks.map((track, index) => <ArtistTrack key={index} {...track} />)}
        </ul>
      </Card>
    )
  }
}

ArtistsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

export default ArtistsCard;