import React from 'react';
import './Card.scss';

/**
 * The card that makes all other cards look lame
 *
 * @version 0.0.1
 * @author [Justin Gow](https://github.com/jaegow)
 */
function Card({ title = 'placeholder title', content = 'placeholder content', style, footer }) {
  return (
    <div className="card" style={style}>

      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder thing for a thing" />
        </figure>
      </div>

      <header className="card-header">
        <p className="card-header-title">{title}</p>
      </header>

      <div className="card-content">
        <div className="content">
          {content}
        </div>
      </div>
      {
        footer && (
          <footer className="card-footer">
            {footer}
            {/* <a href="#" className="card-footer-item">Save</a> */}
            {/* <a href="#" className="card-footer-item">Edit</a> */}
            {/* <a href="#" className="card-footer-item">Delete</a> */}
          </footer>
        )
      }
    </div>
  );
}

export default Card;
