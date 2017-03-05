import React                                from 'react';
import { connect }                          from 'react-redux';


class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
  }


  renderIntro() {
    return (
      <section id="intro" className="row cover-section">
        <div className="fullscreen-static-image fullheight">
          <div className="flex-container">
            <div className="start">
              <div className="month_photo">
              </div>
            </div>

            <div className="center">
              <div className="title">
                <div className="col-md-12 col-sm-12 col-xs-12 promo-section__promo-info text-center">
                  <input id="search_anything" type="text" name="search" placeholder="Pesquise qualquer coisa&#8230;" autofocus />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-container end">
            <div className="page-scroll">
              
            </div>
          </div>
        </div>
      </section>
    );
  }


  render() {
    return (
      <div id="body" data-spy="scroll" className="font-main web-padding-top">
        <main className="container-fluid">
          <nav className="clc-header one-page-header navbar navbar-default navbar-fixed-top navbar-toggleable-sm" data-role="navigation">
            <div className="container-fluid">
              <div className="menu-container page-scroll">
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".clc-collapse">
                  <span className="sr-only">Toggle Navigation</span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>

                <a href="#body" className="navbar-brand main-font">
                  <img src={require('../../static/img/logo.jpg')} alt="Logo" className="img-responsive" />
                </a>
              </div>


              <div className="collapse navbar-collapse clc-collapse">
                <div className="menu-container">
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
                      <a href="#patrimonio_edificado">Património Edificado</a>
                    </li>

                    <li className="page-scroll">
                      <a href="#patrimonio_natural">Património Natural</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {renderIntro()}
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(HomeIndexView);
