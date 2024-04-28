import React from 'react';
import './Pills.css';

const Pills = ({ text, onClick }) => { 
  return (
    <span className="skill-pill" onClick={onClick}>
      <span>{text} &times;</span>
    </span>
  );
}

export default Pills;

