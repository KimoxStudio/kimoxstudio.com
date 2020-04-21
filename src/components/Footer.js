import React from 'react';
import ContactForm from './ContactForm';
import config from '../../config';
export default function Footer() {
  return (
    <div id="footer">
      <div className="container medium">
        <header className="major last">
          <h2>Contáctanos</h2>
        </header>

        <p>
          <i>Siempre es un buen momento para materializar tus ideas</i>
        </p>

        <ContactForm />

        <ul className="icons">
          {config.socialLinks.map(social => {
            const { icon, name, url } = social;
            return (
              <li key={url}>
                <a
                  href={url}
                  className={`icon ${icon}`}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                >
                  <span className="label">{name}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <ul className="copyright">
          <li>&copy; Directive. All rights reserved.</li>
          <li>
            Design:
            <a
              href="http://html5up.net"
              target={'_blank'}
              rel={'noopener noreferrer'}
            >
              HTML5 UP
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
