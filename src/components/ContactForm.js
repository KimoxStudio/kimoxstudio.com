import React from 'react';
export default function ContactForm() {
  return (
    <form
      action="https://getform.io/f/3d9d6b7f-132e-4ecb-8e47-64c2f90839ec"
      method="POST"
    >
      <div className="row">
        <div className="col-6 col-12-mobilep">
          <input type="text" name="name" placeholder="Nombre" />
        </div>
        <div className="col-6 col-12-mobilep">
          <input type="email" name="email" placeholder="Email" />
        </div>
        <div className="col-12">
          <textarea
            name="message"
            placeholder="¿Cuál es tu idea?"
            rows="6"
          ></textarea>
        </div>
        <div className="col-12">
          <ul className="actions special">
            <li>
              <input type="submit" value="Enviar" />
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
}
