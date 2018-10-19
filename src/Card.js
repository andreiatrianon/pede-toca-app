import React from 'react';
import PropTypes from 'prop-types';
import './Card.css';
import {CollapsibleItem} from 'react-materialize';

function Card(props) {
  return (
    <CollapsibleItem className='my-w-20 my-d-inline-block my-mb-10' header={props.children} icon='keyboard_voice'>teste</CollapsibleItem>
  )
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;