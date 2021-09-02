import React from 'react'; 

import './WallText.css';

const WallText = (props) => {
  return <section className="wallText" id={props.id}>
    <h2>
      {props.header}
    </h2>
    <p>
      {props.text}
    </p>
  </section>
}; 

export default WallText;