import React from 'react';
import './Card.css';

function Card(props) {
  return (
    <div className="my-card">
      {props.children}
    </div>
      //outra forma de chamar: props.children[0]
  );
}

export default Card;