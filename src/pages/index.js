import React from 'react';

import Layout from '../components/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';

const IndexPage = () => (
  <Layout>
    <Header />

    <div id="main">
      <header className="major container medium">
        <h2>Nosotros somos...</h2>
      </header>

      <div className="box alt container">
        <section className="feature left">
          <a href="/#" className="image icon fa-puzzle-piece">
            <img src={pic1} alt="" />
          </a>
          <div className="content">
            <h3>Adaptativos</h3>
            <p>
              Tus necesidades son <b>nuestra prioridad</b> y nos amoldamos para
              ofrecerte <b>la mejor solución.</b> Tanto en el proceso creativo como en
              el proceso de desarrollo te acompañamos para hacer que el producto
              luzca como te lo habías imaginado.
            </p>
          </div>
        </section>
        <section className="feature right">
          <a href="/#" className="image icon fa-mobile">
            <img src={pic3} alt="" />
          </a>
          <div className="content">
            <h3>Polifacéticos</h3>
            <p>
              Creamos soluciones de amplio aspectro ya sea para web, móvil o
              escritorio, utilizando las <b>últimas tecnologías</b> y aplicando
              técnicas de <b>desarrollo vanguardistas.</b>
            </p>
          </div>
        </section>
        <section className="feature left">
          <a href="/#" className="image icon fa-code">
            <img src={pic2} alt="" />
          </a>
          <div className="content">
            <h3>Profesionales</h3>
            <p>
              Ante todo garantizamos que nuestros proyectos emanen
              profesionalidad y calidad, cualidades que a veces quedan en
              segundo plano y para nosotros son <b>indispensable.</b>
            </p>
          </div>
        </section>
      </div>

    </div>
    <Footer />
  </Layout>
);

export default IndexPage;
