import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import ArtistTrack from './ArtistTrack.js';
import {CollapsibleItem} from 'react-materialize';

class Card extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tracks: []
    }
  }

  componentDidMount() {
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
      <CollapsibleItem className='my-w-27 my-d-inline-block my-mb-10 purple accent-4' header={this.props.children} icon='keyboard_voice'>
        <ul>
          {this.state.tracks.map((track, index) => <ArtistTrack key={index} {...track} />)}
        </ul>
      </CollapsibleItem>
    )
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;