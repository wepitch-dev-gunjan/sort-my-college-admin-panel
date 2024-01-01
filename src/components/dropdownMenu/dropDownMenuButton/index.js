import React, { useState } from 'react';
import './style.scss';

const DropDownMenuButton = ({ onClick, icon: Icon, text }) => {
  return (
    <div className='DropDownMenuButton-container' onClick={onClick}>
      <li className='inner-container'>
        <Icon />
        <span>{text}</span>
      </li>
    </div>
  );
};

export default DropDownMenuButton;
