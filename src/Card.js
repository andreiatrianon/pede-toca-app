import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';
import {CollapsibleItem} from 'react-materialize';

function Card(props) {
  return (
    <CollapsibleItem header={props.children} icon='keyboard_voice'></CollapsibleItem>
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;