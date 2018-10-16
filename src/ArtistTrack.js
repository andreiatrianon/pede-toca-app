import React from 'react';

function ArtistTrack(props) {
  return (
    <li>
      {props.title}<br />
      <iframe src={props.url} />
    </li>
  )
}

export default ArtistTrack;