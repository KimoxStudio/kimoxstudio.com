import React, { Fragment } from 'react';
import config from '../../config';

import avatar from '../assets/images/avatar.png';

export default function Header() {
  const scrollToTop = () => window.scroll(0, 0);

  return (
    <Fragment>
      <div className="fixed-logo" onClick={scrollToTop}>
        <p>Kimox Studio</p>
        <img src={avatar} alt="Logo" />
      </div>
      <div id="header">
        <h2>{config.heading}</h2>
        <h1>{config.heading2}</h1>
        <p>{config.subHeading}</p>
      </div>
    </Fragment>
  );
}
