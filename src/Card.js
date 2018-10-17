import React from 'react';
import './Card.css';
import PropTypes from 'prop-types';

function Card(props) {
  return (
    <div className="my-card">
      {props.children}
    </div>
      //outra forma de chamar: props.children[0]
  );
}

Card.propTypes = {
  children: PropTypes.node.isRequired
};

export default Card;