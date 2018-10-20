import React from 'react';
import Card from './Card.js';
import PropTypes from 'prop-types';

function ArtistsCard(props) {
  return ( 
    <Card id={props.id}>
      <h5>{props.name}</h5>
      <p>{props.genre}</p>
    </Card>
  )
}

ArtistsCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired
};

export default ArtistsCard;