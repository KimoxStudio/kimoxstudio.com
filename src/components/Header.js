import React from 'react';
import config from '../../config';

import avatar from '../assets/images/avatar.png';

export default function Header() {
  return (
    <div id="header">
      <img src={avatar} alt="Logo" />
      <h1>{config.heading}</h1>
      <h2>{config.heading2}</h2>
      <p>{config.subHeading}</p>
    </div>
  );
}
