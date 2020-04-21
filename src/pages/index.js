import React from 'react';

import Layout from '../components/Layout';

import Header from '../components/Header';
import Footer from '../components/Footer';

import pic1 from '../assets/images/pic01.jpg';
import pic2 from '../assets/images/pic02.jpg';
import pic3 from '../assets/images/pic03.jpg';

import adrian from '../assets/images/adrian.jpg';
import jese from '../assets/images/jese.jpeg';

import SkillItem from '../components/SkillItem';
import PeopleItem from '../components/PeopleItem';

const IndexPage = () => (
  <Layout>
    <Header />

    <div id="main">
      <header className="major container medium">
        <h2>Nosotros somos...</h2>
      </header>

      <div className="box alt container">
        <SkillItem
          position="left"
          faIcon="fa-puzzle-piece"
          image={pic1}
          title={'Adaptativos'}
          content={
            <p>
              Tus necesidades son <b>nuestra prioridad</b> y nos amoldamos para
              ofrecerte <b>la mejor solución.</b> Tanto en el proceso creativo
              como en el proceso de desarrollo te acompañamos para hacer que el
              producto luzca como te lo habías imaginado.
            </p>
          }
        />
        <SkillItem
          position="right"
          faIcon="fa-mobile"
          image={pic3}
          title={'Polifacéticos'}
          content={
            <p>
              Creamos soluciones de amplio aspectro ya sea para web, móvil o
              escritorio, utilizando las <b>últimas tecnologías</b> y aplicando
              técnicas de <b>desarrollo vanguardistas.</b>
            </p>
          }
        />
        <SkillItem
          position="left"
          faIcon="fa-code"
          image={pic2}
          title={'Profesionales'}
          content={
            <p>
              Ante todo garantizamos que nuestros proyectos emanen
              <b> profesionalidad y calidad</b>, cualidades que a veces quedan
              en segundo plano y para nosotros son <b>indispensables.</b>
            </p>
          }
        />
      </div>

      <div className="gray-background center-line-gray">
        <header className="major container medium gray-background">
          <h2>Y lo conformamos...</h2>
        </header>

        <div className="box alt container people-container">
          <PeopleItem
            image={jese}
            title={'Jesé'}
            content={
              <p>
                <b>Eficiente.</b>
                <br />
                Amante de su trabajo, le apasiona lo que hace, el uso de buenas
                prácticas a la hora de desarrollar software es su máximo
                exponente. Con un amplio recorrido en su carrera profesional,
                aplicando metodologóas y tecnología puntera.
              </p>
            }
          />
          <PeopleItem
            image={adrian}
            title={'Adrián'}
            content={
              <p>
                <b>Apasionado.</b>
                <br />
                Tanto del código como de la música, lleva el ritmo a todas
                partes, una pieza fundamental tomando decisiones arquitectonicas
                y de lógica, aplicando la máxima creatividad y asertividad.
              </p>
            }
          />
        </div>
      </div>
    </div>
    <Footer />
  </Layout>
);

export default IndexPage;
