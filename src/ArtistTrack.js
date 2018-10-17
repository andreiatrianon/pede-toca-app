import React from 'react';
import PropTypes from 'prop-types';

function ArtistTrack(props) {
  return (
    <li className={props.class}>
      {props.title}<br />
      <iframe src={props.url} />
    </li>
  )
}

ArtistTrack.propTypes = {
  class: PropTypes.string,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default ArtistTrack;