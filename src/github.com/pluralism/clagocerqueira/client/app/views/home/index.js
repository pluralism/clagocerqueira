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
      let associacoesList = $('.associacoes-list');
      let orgaosAutarquicosList = $('.orgaos_autarquicos_list');

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


      // Initialize owl-carousel for the item with ID associacoes-list
      associacoesList.owlCarousel({
        loop: true,
        margin: 0,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          500: {
            items: 2
          },
          700: {
            items: 4
          }
        },
        navText: [, ],
        nav: true,
        dots: false,
        navContainerClass: 'owl-buttons'
      });


      // Initialize owl-carousel for orgaos_autarquicos_list
      orgaosAutarquicosList.owlCarousel({
        loop: true,
        margin: 20,
        responsive: {
          0: {
            items: 1
          },
          500: {
            items: 2
          },
          650: {
            items: 3
          },
          850: {
            items: 4
          },
          1024: {
            items: 5
          },
          1270: {
            items: 6
          }
        },
        navText: [, ],
        nav: true,
        dots: false,
        navContainerClass: 'owl-buttons'
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
                <Link to={require('../../static/img/month_photo.jpg')} target="_blank" title="Imagem do Mês">
                  <img src={require('../../static/img/month_photo.jpg')} width="200" height="150" />
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


  renderOrgaosAutarquicosCard(title, description) {
    return (
      <div className="orgaos-card">
        <div className="orgaos-card-image">
          <img src={require('../../static/img/orgaos_1.jpg')} alt="Órgãos 1" className="img-responsive" />
        </div>

        <div className="orgaos-card-title">
          <h3>{title}</h3>
        </div>

        <div className="orgaos-card-text">
          <p>{description}</p>
        </div>

        <div className="orgaos-card-footer">
          <div className="view-more">
            <a href="#">Ver mais</a>
          </div>
        </div>
      </div>
    );
  }


  renderOrgaosAutarquicos() {
    return (
      <section className="row" id="orgaos_autarquicos">
        <div className="g-pt-80 g-pb-80 text-center">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20 title">Órgãos Autárquicos</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in. Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper, justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>

            <div className="orgaos_autarquicos_wrapper">
              <div className="orgaos_autarquicos_list">
                {this.renderOrgaosAutarquicosCard('Presidentes', 'Presidentes de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
                {this.renderOrgaosAutarquicosCard('Vereadores', 'Vereadores de Amarante')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderAssociacoesItem(title, description, altText = undefined) {
    return (
      <div className="item associacoes-list-item">
        <div className="img-wrapper img-wrapper--shadow">
          <img src={require('../../static/img/orgaos_1.jpg')} className="img-responsive"
            alt={altText === undefined ? "Órgãos 1" : altText} />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={'#'} className="btn-u btn-u-lg btn-u-upper">Ver Mais</Link>
      </div>
    );
  }


  renderAssociacoes() {
    return (
      <section id="associacoes" className="row">
        <div className="g-pt-80 g-pb-80 text-center">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20">Associações</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in.
                Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper,
                justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>

            <div className="row content-wrapper">
              <div className="col-md-12 associacoes-list-wrapper">
                <div className="associacoes-list">
                  {this.renderAssociacoesItem('Associações Sociais',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Sociais')}

                  {this.renderAssociacoesItem('Associações Cívicas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Cívicas')}

                  {this.renderAssociacoesItem('Associações Desportivas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Desportivas')}

                  {this.renderAssociacoesItem('Associações Recreativas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Recreativas')}

                  {this.renderAssociacoesItem('Associações Culturais',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Culturais')}

                  {this.renderAssociacoesItem('Associações Religiosas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'Associações Religiosas')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  render() {
    return (
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderIntro()}
          {this.renderAutoresAmarantinos()}
          {this.renderOrgaosAutarquicos()}
          {this.renderAssociacoes()}
        </main>
    );
  }
}


const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(HomeIndexView);
