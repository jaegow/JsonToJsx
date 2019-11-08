import React from 'react';
import './Header.scss';

// import { buildLoggers } from '../utils/log';
// const { log } = buildLoggers('Header');

/**
 * Header component
 *  (param descriptions coming soon...)
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
function Header({ imageLeftSrc = '', imageLeftHref = '/home', imageRightSrc = '' }) {
  // log('render()', { imageLeftSrc, imageLeftHref, imageRightSrc });
  return (
    <header className="header">
      <a href={imageLeftHref} className="header__logo">
        <img src={imageLeftSrc} alt="header branding logo" />
      </a>
      <div className="header__logo--right">
        <img src={imageRightSrc} alt="header branding right" />
      </div>
    </header>
  );
}

export default Header;
