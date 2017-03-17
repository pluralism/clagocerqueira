import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';


class PresidentesView extends React.Component {
  constructor(props) {
    super(props);
  }


  renderHeader() {
    return (
      <nav className="clc-header one-page-header navbar navbar-default navbar-fixed-top navbar-toggleable-sm" data-role="navigation">
        <div className="navbar-header">
          <div className="menu-container page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse"
              data-target=".clc-collapse">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>

            <a href="#body" className="navbar-brand main-font">
              <img src={require('../../static/img/logo.jpg')} alt="Logo" className="img-responsive" />
            </a>
          </div>
        </div>

        <div className="collapse navbar-collapse clc-collapse">
          <ul className="nav navbar-nav">
            <li className="page-scroll home">
              <a href="#">Início</a>
            </li>

            <li className="page-scroll">
              <a href="#autores_amarantinos">Autores Amarantinos</a>
            </li>

            <li className="page-scroll">
              <a href="#orgaos_autarquicos">Órgãos Autárquicos</a>
            </li>

            <li className="page-scroll">
              <a href="#associacoes">Associações</a>
            </li>

            <li className="page-scroll">
              <a href="#festividades">Festividades</a>
            </li>

            <li className="page-scroll">
              <a href="#imprensa">Imprensa</a>
            </li>

            <li className="page-scroll">
              <a href="#personalidades">Personalidades</a>
            </li>

            <li className="page-scroll">
              <a href="#contacto">Contacto</a>
            </li>

            <li className="page-scroll">
              <a href="#patrimonio_natural">Património Natural</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }



  renderItem(imgURL, subtitle, title, text, altText = undefined) {
    return (
      <li className="clearfix g-pb-50">
        <Link to={"#"} className="listing-list-item">
          <div className="listing-list-center-wrap">
            <div className="listing-list-media-wrap listing-list-center">
              <div className="listing-list-media">
                <img className="listing-list-media-img" src={imgURL} alt={altText !== undefined ? altText : "Presidente"} />
              </div>
            </div>

            <div className="listing-list-body listing-list-center">
              <span className="listing-list-media-subtitle">{subtitle}</span>
              <h3 className="listing-list-media-title">{title}</h3>
              <p className="listing-list-item-text">{text}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  }


  renderFirstTab() {
    return (
      <div id="first_date" role="tabpanel" className="tab-pane active fade in">
        <ul className="listing-list">
          {this.renderItem("http://www.citador.pt/images/autorid01232.jpg",
          "Intro to UI/UX Design", "Agostinho Alão de Moraes Pimentel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet")}

          {this.renderItem("http://www.citador.pt/images/autorid01232.jpg",
          "Intro to UI/UX Design", "Agostinho Alão de Moraes Pimentel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet")}

          {this.renderItem("http://www.citador.pt/images/autorid01232.jpg",
          "Intro to UI/UX Design", "Agostinho Alão de Moraes Pimentel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet")}

          {this.renderItem("http://www.citador.pt/images/autorid01232.jpg",
          "Intro to UI/UX Design", "Agostinho Alão de Moraes Pimentel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet")}

          {this.renderItem("http://www.citador.pt/images/autorid01232.jpg",
          "Intro to UI/UX Design", "Agostinho Alão de Moraes Pimentel", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet")}
        </ul>


        <div className="control-buttons">
          <div className="prev-button"></div>
          <div className="next-button"></div>
        </div>
      </div>
    );
  }



  renderUpperSection() {
    return (
      <section id="presidentes_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Presidentes</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo. Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar presidentes&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation" className="active">
                <Link to={"#first_date"} role="tab" data-toggle="tab">1836-1910</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_date"} role="tab" data-toggle="tab">1910-1926</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_date"} role="tab" data-toggle="tab">1926-1974</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_date"} role="tab" data-toggle="tab">1976-2013</Link>
              </li>
            </ul>


            <div className="tab-content">
              {this.renderFirstTab()}
            </div>
          </div>
        </div>
      </section>
    );
  }


  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderUpperSection()}
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(PresidentesView);
