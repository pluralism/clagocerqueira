import React                                from 'react';
import { connect }                          from 'react-redux';
import { Link }                             from 'react-router';


class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);
  }


  componentDidMount() {
    $(function() {
      // Init backstretch with the image we want
      $('.fullscreen-static-image').backstretch(require('../../static/img/cover1.jpg'));


      let gridContainer = $('#grid-container');

      gridContainer.cubeportfolio({
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 50,
        gapVertical: 50,
        gridAdjustment: 'responsive',
        mediaQueries: [{ width: 1440, cols: 5 }, { width: 1024, cols: 2 }, { width: 768, cols: 2 }, { width: 480, cols: 2 }, { width: 320, cols: 1 }],
        caption: 'fadeIn',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100
      });
    });
  }


  renderIntro() {
    return (
      <section id="intro" className="row cover-section">
        <div className="fullscreen-static-image fullheight">
          <div className="flex-container">
            <div className="start">
              <div className="month_photo">
                <Link to={require('../../static/img/cover.jpg')} target="_blank" title="Imagem do Mês">
                  <img src={require('../../static/img/cover.jpg')} width="200" height="150" />
                </Link>
              </div>
            </div>

            <div className="center">
              <div className="title">
                <div className="col-md-12 col-sm-12 col-xs-12 promo-section__promo-info text-center">
                  <input id="search_anything" type="text" name="search" placeholder="Pesquise qualquer coisa&#8230;" autoFocus />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-container end">
            <div className="page-scroll">
              <a href={'#autores_amarantinos'} title="Autores Amarantinos">
                <div className="bounce col-md-12 col-sm-12 col-xs-12 text-center">
                  <i className="fa fa-angle-down down-arrow"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderHeader() {
    return (
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
    );
  }


  renderAutoresAmarantinosItem(year, sec) {
    return (
      <div className="cbp-item">
        <a href="http://scriptpie.com/cubeportfolio/live-preview/img/480x250/13.jpg" className="cbp-caption">
          <div className="cbp-caption-defaultWrap">
            <img src="http://scriptpie.com/cubeportfolio/live-preview/img/480x250/13.jpg" />
          </div>
          <div className="cbp-caption-activeWrap">
            <div className="cbp-l-caption-alignCenter">
              <div className="cbp-l-caption-body">
                <div className="cbp-l-caption-title font-main">{year}</div>
                  <p>Autores Amarantinos que viveram no século {sec}</p>
                </div>
              </div>
            </div>
          </a>
      </div>
    );
  }


  renderAutoresAmarantinos() {
    return (
      <section className="row" id="autores_amarantinos">
        <div className="container-fluid">
          <div className="g-pt-80 g-pb-80">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20 title">Autores Amarantinos</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in. Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper, justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>


            <div className="cube-portfolio">
              <div id="grid-container" className="cbp-l-grid-gallery">
                {this.renderAutoresAmarantinosItem('1401-1500', 'XV')}
                {this.renderAutoresAmarantinosItem('1501-1600', 'XVI')}
                {this.renderAutoresAmarantinosItem('1601-1700', 'XVII')}
                {this.renderAutoresAmarantinosItem('1701-1800', 'XVIII')}
                {this.renderAutoresAmarantinosItem('1801-1900', 'XIX')}
                {this.renderAutoresAmarantinosItem('1901-2000', 'XX')}
              </div>
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
          {this.renderIntro()}
          {this.renderAutoresAmarantinos()}
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(HomeIndexView);
