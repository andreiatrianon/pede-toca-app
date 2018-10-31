import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';
import {Icon} from 'react-materialize';

localStorage.setItem('playlist', []);
localStorage.setItem('favoriteArtists', []);

let favoriteArtists = localStorage.getItem('favoriteArtists').split(',');

class ArtistsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favoriteArtists
    }
    this.addArtistToFavorite = this.addArtistToFavorite.bind(this);
  }

  addArtistToFavorite(e) {
    let artistId = e.target.parentElement.getAttribute('data-id');
    if (e.target.className === 'material-icons small icon-button my-gray') {
      this.state.favoriteArtists.push(artistId);
      localStorage.setItem('favoriteArtists', this.state.favoriteArtists);
      e.target.className = 'material-icons small icon-button my-orange';
    } else {
      this.setState({favoriteArtists: this.state.favoriteArtists.filter(el => el !== artistId)});
      localStorage.setItem('favoriteArtists', this.state.favoriteArtists);
      e.target.className = 'material-icons small icon-button my-gray';
    }
  }

  render() {
    return (
      <Card id={this.props.id}>
        <h5>{this.props.name}</h5>
        <p>{this.props.genre}</p>
        <div data-id={this.props.id} onClick={this.addArtistToFavorite}><Icon className='icon-button my-gray' small>favorite</Icon></div>
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