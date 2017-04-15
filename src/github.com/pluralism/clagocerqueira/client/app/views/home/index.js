import React                                from 'react';
import { connect }                          from 'react-redux';
import { Link }                             from 'react-router';
import Footer                               from '../../components/common/footer';
import classNames                           from 'classnames';
import ContactMessageActions                from '../../actions/contactMessage';


require('jvectormap-next');
require('../../static/jquery-jvectormap/amarante');


class HomeIndexView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      contactFormFields: {
        name: {
          value: "",
          invalid: false
        },
        phone: {
          value: "",
          invalid: false
        },
        email: {
          value: "",
          invalid: false
        },
        subject: {
          value: "",
          invalid: false
        },
        message: {
          value: "",
          invalid: false
        }
      },
      submitButtonDisabled: false
    };


    // Store a reference for the input fields in the contact form
    this.nameInput = "";
    this.phoneInput = "";
    this.emailInput = "";
    this.subjectInput = "";
    this.messageInput = "";

    this.showedMessage = false;
    this.isButtonDisabled = true;
  }


  componentDidMount() {
    // Configuring the default options for messenger
    Messenger.options = {
      theme: 'flat'
    };



    $(function() {
      $(window).on('load', function() {
        if(window.location.hash) {
            $.smoothScroll({
                scrollTarget: window.location.hash
            });
        }
      });


      // Initialize smooth scroll
      $('.page-scroll > a').click((e) => {
          e.preventDefault();
          let link = e.currentTarget;
          $.smoothScroll({
              scrollTarget: link.hash
          });
      });


      // Init backstretch with the image we want
      $('.fullscreen-static-image').backstretch(require('../../static/img/cover.jpg'));


      let gridContainer = $('#grid-container');
      let associacoesList = $('.associacoes-list');
      let orgaosAutarquicosList = $('#orgaos_autarquicos_list');
      let festividadesGrid = $('#festividades-grid');
      let imprensaGrid = $('.imprensa-grid');
      let personalidadesGrid = $('#personalidades-grid');
      let patrimonioNaturalGrid = $('#grid-autores-amarantinos');


      let mapHash = {}, colors = {}, mappings = {};

      mapHash['svg_8'] = 'Amarante, Madalena, Cepelos e Gatão';
      mappings['svg_8'] = 'cepelos_gatao_sao_goncalo';

      for (let i = 194; i <= 227; i++) {
        mapHash['svg_' + i] = 'Amarante, Madalena, Cepelos e Gatão';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'cepelos_gatao_sao_goncalo';
      }

      mapHash['svg_12'] = 'Lufrei';
      mappings['svg_12'] = 'lufrei';

      for (let i = 133; i <= 138; i++) {
        mapHash['svg_' + i] = 'Lufrei';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'lufrei';
      }

      mapHash['svg_17'] = 'Padronelo';
      mappings['svg_17'] = 'padronelo';

      for (let i = 116; i <= 124; i++) {
        mapHash['svg_' + i] = 'Padronelo';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'padronelo';
      }

      mapHash['svg_16'] = 'Gondar';
      mappings['svg_16'] = 'gondar';

      for (let i = 126; i <= 131; i++) {
        mapHash['svg_' + i] = 'Gondar';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'gondar';
      }

      mapHash['svg_13'] = 'Fregim';
      mappings['svg_13'] = 'fregim';

      for (let i = 260; i <= 265; i++) {
        mapHash['svg_' + i] = 'Fregim';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'fregim';
      }

      mapHash['svg_11'] = 'Mancelos';
      mappings['svg_11'] = 'mancelos';

      for (let i = 251; i <= 258; i++) {
        mapHash['svg_' + i] = 'Mancelos';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'mancelos';
      }

      mapHash['svg_18'] = 'Vila Meã';
      mappings['svg_18'] = 'vila_mea';

      for (let i = 276; i <= 282; i++) {
        mapHash['svg_' + i] = 'Vila Meã';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'vila_mea';
      }

      mapHash['svg_14'] = 'Travanca';
      mappings['svg_14'] = 'travanca';

      for (let i = 267; i <= 274; i++) {
        mapHash['svg_' + i] = 'Travanca';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'travanca';
      }

      mapHash['svg_7'] = 'Figueiró, Santiago e Santa Cristina';
      mappings['svg_7'] = 'figueiro_santa_cristina_santiago';

      for (let i = 292; i <= 324; i++) {
        mapHash['svg_' + i] = 'Figueiró, Santiago e Santa Cristina';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'figueiro_santa_cristina_santiago';
      }

      mapHash['svg_6'] = 'Freixo de Cima e de Baixo';
      mappings['svg_6'] = 'freixo_baixo_cima';

      for (let i = 229; i <= 249; i++) {
        mapHash['svg_' + i] = 'Freixo de Cima e de Baixo';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'freixo_baixo_cima';
      }

      mapHash['svg_2'] = 'Telões';
      mappings['svg_2'] = 'teloes';

      for (let i = 187; i <= 192; i++) {
        mapHash['svg_' + i] = 'Telões';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'teloes';
      }

      mapHash['svg_3'] = 'Vila Garcia, Aboim e Chapa';
      mappings['svg_3'] = 'aboim_vila_garcia';

      for (let i = 163; i <= 185; i++) {
        mapHash['svg_' + i] = 'Vila Garcia, Aboim e Chapa';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'aboim_vila_garcia';
      }

      mapHash['svg_5'] = 'Fridão';
      mappings['svg_5'] = 'fridao';

      for (let i = 156; i <= 161; i++) {
        mapHash['svg_' + i] = 'Fridão';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'fridao';
      }

      mapHash['svg_1'] = 'Rebordelo';
      mappings['svg_1'] = 'rebordelo';

      for (let i = 28; i <= 36; i++) {
        mapHash['svg_' + i] = 'Rebordelo';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'rebordelo';
      }

      mapHash['svg_4'] = 'Ôlo e Canadelo';
      mappings['svg_4'] = 'canadelo_olo';

      for (let i = 38; i <= 49; i++) {
        mapHash['svg_' + i] = 'Ôlo e Canadelo';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'canadelo_olo';
      }

      mapHash['svg_9'] = 'Vila Chã do Marão';
      mappings['svg_9'] = 'vila_cha_marao';

      for (let i = 140; i <= 154; i++) {
        mapHash['svg_' + i] = 'Vila Chã do Marão';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'vila_cha_marao';
      }

      mapHash['svg_10'] = 'Aboadela, Sanche e Várzea';
      mappings['svg_10'] = 'aboadela_sanche';

      for (let i = 358; i <= 380; i++) {
        mapHash['svg_' + i] = 'Aboadela, Sanche e Várzea';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'aboadela_sanche';
      }

      mapHash['svg_15'] = 'Ansiães';
      mappings['svg_15'] = 'ansiaes';

      for (let i = 51; i <= 57; i++) {
        mapHash['svg_' + i] = 'Ansiães';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'ansiaes';
      }

      mapHash['svg_20'] = 'Candemil';
      mappings['svg_20'] = 'candemil';

      for (let i = 59; i <= 66; i++) {
        mapHash['svg_' + i] = 'Candemil';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'candemil';
      }

      mapHash['svg_25'] = 'Bustelo, Carneiro e Carvalho de Rei';
      mappings['svg_25'] = 'bustelo_carvalho_rei';

      for (let i = 68; i <= 98; i++) {
        mapHash['svg_' + i] = 'Bustelo, Carneiro e Carvalho de Rei';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'bustelo_carvalho_rei';
      }

      mapHash['svg_26'] = 'Gouveia';
      mappings['svg_26'] = 'gouveia';

      for (let i = 100; i <= 106; i++) {
        mapHash['svg_' + i] = 'Gouveia';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'Gouveia';
      }

      mapHash['svg_23'] = 'Jazente';
      mappings['svg_23'] = 'jazente';

      for (let i = 108; i <= 114; i++) {
        mapHash['svg_' + i] = 'Jazente';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'jazente';
      }

      mapHash['svg_21'] = 'Lomba';
      mappings['svg_21'] = 'lomba';

      for (let i = 326; i <= 330; i++) {
        mapHash['svg_' + i] = 'Lomba';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'lomba';
      }

      mapHash['svg_19'] = 'Louredo';
      mappings['svg_19'] = 'louredo';

      for (let i = 284; i <= 290; i++) {
        mapHash['svg_' + i] = 'Louredo';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'louredo';
      }

      mapHash['svg_22'] = 'Salvador do Monte';
      mappings['svg_22'] = 'salvador';

      for (let i = 332; i <= 347; i++) {
        mapHash['svg_' + i] = 'Salvador do Monte';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'salvador';
      }

      mapHash['svg_24'] = 'Vila Caíz';
      mappings['svg_24'] = 'vila_caiz';

      for (let i = 349; i <= 356; i++) {
        mapHash['svg_' + i] = 'Vila Caíz';
        colors['svg_' + i] = '#5D2F30';
        mappings['svg_' + i] = 'vila_caiz';
      }


      $('#map_amarante').vectorMap({
          map: 'amarante',
          selectedRegion: null,
          showTooltip: true,
          hoverOpacity: null,
          enableZoom: false,
          zoomStep: 1.6,
          borderOpacity: 0.25,
          borderWidth: 1,
          series: {
              regions: [{
                  values: colors
              }]
          },
          backgroundColor: '#5D2F30',
          onRegionTipShow: function (e, el, code) {
              if (code in mapHash)
                el.html(mapHash[code]);
              else
                el.html(el.html());
          },
          onRegionClick: function (e, code) {
              window.open('/pt/festividades/' + mappings[code], '_blank');
          }
      });


      gridContainer.cubeportfolio({
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 50,
        gapVertical: 50,
        gridAdjustment: 'responsive',
        mediaQueries: [
            { width: 1440, cols: 3 },
            { width: 1024, cols: 3 },
            { width: 768, cols: 2 },
            { width: 480, cols: 2 },
            { width: 320, cols: 1 }],
        caption: 'fadeIn',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100
      });


      personalidadesGrid.cubeportfolio({
          layoutMode: 'grid',
          scrollByPage: false,
          defaultFilter: '*',
          gridAdjustment: 'responsive',
          gapHorizontal: 0,
          gapVertical: 0,
          mediaQueries: [{
              width: 1100,
              cols: 3
          }, {
              width: 800,
              cols: 3
          }, {
              width: 500,
              cols: 1
          }],
          caption: 'fadeIn',
          displayType: 'sequentially',
          displayTypeSpeed: 100
      });


      patrimonioNaturalGrid.cubeportfolio({
        layoutMode: 'grid',
        rewindNav: true,
        scrollByPage: false,
        defaultFilter: '*',
        animationType: 'slideLeft',
        gapHorizontal: 70,
        gapVertical: 50,
        gridAdjustment: 'alignCenter',
        mediaQueries: [
            { width: 1440, cols: 3 },
            { width: 1024, cols: 3 },
            { width: 768, cols: 1 },
            { width: 480, cols: 1 },
            { width: 320, cols: 1 }],
        caption: 'fadeIn',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100
      });


      festividadesGrid.cubeportfolio({
        layoutMode: 'grid',
        defaultFilter: '*',
        animationType: 'fadeOutTop',
        gapHorizontal: 0,
        gapVertical: 2,
        gridAdjustment: 'responsive',
        mediaQueries: [{
            width: 1500,
            cols: 2
        }, {
            width: 1100,
            cols: 2
        }, {
            width: 800,
            cols: 2
        }, {
            width: 480,
            cols: 2
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'zoom',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100
      });



      associacoesList.owlCarousel({
        loop: false,
        margin: 0,
        responsiveClass: true,
        responsive: {
          0: {
            items: 1
          },
          500: {
            items: 2
          },
          1100: {
            items: 4
          }
        },
        navText: [, ],
        nav: true,
        dots: false,
        navContainerClass: 'owl-buttons'
      });


      imprensaGrid.owlCarousel({
        loop: true,
        margin: 30,
        responsive: {
          300: {
            items: 1
          },
          768: {
            items: 2,
          },
          992: {
            items: 3
          },
          1200: {
            items: 4
          }
        },
        navText: [, ],
        nav: true,
        dots: false,
        navContainerClass: 'owl-buttons'
      });



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
          1270: {
            items: 4
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
          <div className="flex-container-photo">
            <div className="start">
              <div className="month_photo">
                <Link to={require('../../static/img/month_photo.jpg')} target="_blank"
                  title="Imagem do Mês">
                  <img src={require('../../static/img/month_photo.jpg')} width="200" height="150" />
                </Link>
              </div>
            </div>

            <div className="center">
              <div className="title">
                <div className="col-md-12 col-sm-12 col-xs-12 promo-section__promo-info text-center">
                  <input id="search_anything" type="text" name="search"
                    placeholder="Pesquise qualquer coisa&#8230;" autoFocus />
                </div>
              </div>
            </div>
          </div>

          <div className="flex-container">
            <div className="end">
              <div className="bounce-icon page-scroll">
                <a href="#autores_amarantinos" title="Autores Amarantinos">
                  <div className="bounce col-md-12 col-sm-12 col-xs-12 text-center">
                    <i className="fa fa-angle-down down-arrow" />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderHeader() {
    return (
      <nav className="clc-header one-page-header navbar header-homepage navbar-default navbar-fixed-top navbar-toggleable-sm">
        <div className="navbar-header">
          <div className="menu-container page-scroll">
            <button type="button" className="navbar-toggle" data-toggle="collapse"
              data-target=".clc-collapse">
              <span className="sr-only">Toggle Navigation</span>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
              <span className="icon-bar"/>
            </button>

            <a href="#body" className="navbar-brand main-font">
              <img src={require('../../static/img/logo.jpg')} alt="Logo" className="img-responsive" />
            </a>
          </div>
        </div>

        <div className="collapse navbar-collapse clc-collapse">
          <div className="menu-container">
            <ul className="nav navbar-nav">
              <li className="page-scroll home">
                <a href="#intro">Início</a>
              </li>

              <li className="page-scroll">
                <a href="#" data-toggle="modal" data-target="#associationModal">A Associação</a>
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
                <a href="#patrimonio_natural">Património Natural</a>
              </li>

              <li className="page-scroll">
                <a href="#contacto">Contacto</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }


  renderPatrimonioNaturalItem(name, desc, image, link) {
    return (
        <div className="cbp-item">
          <Link to={link} target="_blank" className="cbp-caption">
            <div className="cbp-caption-defaultWrap">
              <img src={image} />
            </div>

            <div className="cbp-caption-activeWrap">
              <div className="cbp-l-caption-alignCenter">
                <div className="cbp-l-caption-body">
                  <div className="cbp-l-caption-title font-main">{name}</div>
                  <p>{desc}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
    );
  }


  renderAutoresAmarantinosItem(year, sec, image, link) {
    return (
      <div className="cbp-item">
        <Link to={link} target="_blank"
          className="cbp-caption">
          <div className="cbp-caption-defaultWrap">
            <img src={image} />
          </div>
          <div className="cbp-caption-activeWrap">
            <div className="cbp-l-caption-alignCenter">
              <div className="cbp-l-caption-body">
                <div className="cbp-l-caption-title font-main">{year}</div>
                  <p>Autores Amarantinos que nasceram no século {sec}</p>
                </div>
              </div>
            </div>
          </Link>
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
                {this.renderAutoresAmarantinosItem('1400-1500', 'XV',
                    '/public/prod/images/1600.jpg', 'autores/1400-1500')}
                {this.renderAutoresAmarantinosItem('1501-1600', 'XVI',
                    '/public/prod/images/1600.jpg', 'autores/1501-1600')}
                {this.renderAutoresAmarantinosItem('1601-1700', 'XVII',
                    '/public/prod/images/1600.jpg', 'autores/1601-1700')}
                {this.renderAutoresAmarantinosItem('1701-1800', 'XVIII',
                    '/public/prod/images/1700.jpg', 'autores/1701-1800')}
                {this.renderAutoresAmarantinosItem('1801-1900', 'XIX',
                    '/public/prod/images/1600.jpg', 'autores/1801-1900')}
                {this.renderAutoresAmarantinosItem('1901-2000', 'XX',
                    '/public/prod/images/1600.jpg', 'autores/1901-2000')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderPatrimonioNatural() {
    return (
        <section className="row" id="patrimonio_natural">
          <div className="container-fluid">
            <div className="g-pt-80 g-pb-80">
              <div className="heading-v12 font-main text-center">
                <h2 className="heading-v12__block-name font-main g-mb-20 title">Património Natural</h2>
                <p className="heading-v12__block-text">
                  Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in. Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper, justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
                </p>
              </div>

              <div className="cube-portfolio">
                <div id="grid-autores-amarantinos" className="cbp-l-grid-gallery">
                  {this.renderPatrimonioNaturalItem('Ribeiros', 'Ribeiros(as) de Amarante',
                    '/public/prod/images/orgaos_1.jpg', 'patrimonio_natural/brooks')}
                  {this.renderPatrimonioNaturalItem('Rios', 'Rios de Amarante',
                      '/public/prod/images/orgaos_1.jpg', 'patrimonio_natural/rivers')}
                  {this.renderPatrimonioNaturalItem('Serras', 'Serras de Amarante',
                      '/public/prod/images/orgaos_1.jpg', 'patrimonio_natural/mountains')}
                </div>
              </div>
            </div>
          </div>
        </section>
    );
  }


  renderOrgaosAutarquicosCard(title, description, link) {
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
            <Link to={link} target="_blank">Ver mais</Link>
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
              <div id="orgaos_autarquicos_list">
                {this.renderOrgaosAutarquicosCard('Presidentes',
                    'Presidentes da câmara de Amarante',
                    'presidentes')}

                {this.renderOrgaosAutarquicosCard('Vereadores',
                    'Vereadores da câmara de Amarante',
                    'vereadores')}

                {this.renderOrgaosAutarquicosCard('Presidentes',
                    'Presidentes da Assembleia Municipal',
                    'assembleia')}

                {this.renderOrgaosAutarquicosCard('Presidentes',
                    'Presidentes das juntas de freguesia',
                    'assembleia')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderAssociacoesItem(title, description, link, imageName, altText = undefined) {
    return (
      <div className="item associacoes-list-item">
        <div className="img-wrapper img-wrapper--shadow">
          <img src={require('../../static/img/site/homepage/' + imageName)} className="img-responsive"
               alt={altText === undefined ? "Órgãos 1" : altText} />
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
        <Link to={link} target="_blank" className="btn-u btn-u-lg btn-u-upper">Ver Mais</Link>
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

            <div className="content-wrapper">
              <div className="col-md-12 associacoes-list-wrapper">
                <div className="associacoes-list">
                  {this.renderAssociacoesItem('Associações Sociais',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/social',
                    'social_bundle.jpg',
                    'Associações Sociais')}

                  {this.renderAssociacoesItem('Associações Cívicas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/civic',
                    'civic_bundle.jpg',
                    'Associações Cívicas')}

                  {this.renderAssociacoesItem('Associações Desportivas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/sports',
                    'sports_bundle.jpg',
                    'Associações Desportivas')}

                  {this.renderAssociacoesItem('Associações Recreativas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/recreational',
                    'recreational_bundle.jpg',
                    'Associações Recreativas')}

                  {this.renderAssociacoesItem('Associações Culturais',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/cultural',
                    'cultural_bundle.jpg',
                    'Associações Culturais')}

                  {this.renderAssociacoesItem('Associações Religiosas',
                    'Cras sit amet varius velit. Maecenas porta condimentum tortor at sagittis. Cum sociis natoque penatibus et magnis dis',
                    'associacoes/religious',
                    'cultural_bundle.jpg',
                    'Associações Religiosas')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderFestividadesItem(title, subTitle) {
    return (
      <div className="cbp-item">
        <Link to={'festividades'} target="_blank" className="cbp-caption"
          data-title="Festividades">
          <div className="cbp-caption-defaultWrap">
            <img src={require('../../static/img/orgaos_1.jpg')} />
          </div>
        </Link>

        <div className="item-content">
          <h1 className="title">{title}</h1>
          <h2 className="subtitle">{subTitle}</h2>
        </div>
      </div>
    );
  }


  renderFestividades() {
    return (
      <section id="festividades" className="row">
        <div className="g-pt-80 g-pb-80 text-center">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20">Festividades</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in.
                Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper,
                justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>

            <div className="grid">
              <div id="festividades-grid" className="cbp-l-grid-gallery">
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
              </div>
            </div>


            <div id="map_amarante"
                 className="col-md-6 col-sm-12 col-sm-offset-0 col-md-offset-3"
                 style={{height: '400px'}} />
          </div>
        </div>
      </section>
    );
  }


  renderImprensaItem(title, description, link) {
    return (
      <div className="item text-left">
        <div className="item-info">
          <div className="item-info__block">
            <img className="item-info__img" src={require('../../static/img/orgaos_1.jpg')} />
            <h2 className="item-info__title font-main">
              <Link to={link} className="item-info__link" target="_blank">
                {title}
              </Link>
            </h2>
          </div>

          <div className="item-info__bottom">
            <p className="item-info__b_desc">
              <span className="item-info__b_desc--big">
                {description}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }


  renderImprensa() {
    return (
      <section id="imprensa" className="row">
        <div className="g-pt-80 g-pb-80 text-center">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20">Imprensa</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in.
                Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper,
                justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>


            <div className="imprensa-grid imprensa-theme">
              {this.renderImprensaItem('Jornais', 'Jornais com origem Amarantina',
                  'imprensa/journals/')}
              {this.renderImprensaItem('Jornais Online', 'Jornais com origem Amarantina',
                  'imprensa/online_journals/')}
              {this.renderImprensaItem('Revistas', 'Revistas com origem Amarantina',
                  'imprensa/magazines/')}
              {this.renderImprensaItem('Rádios', 'Rádios com origem Amarantina',
                  'imprensa/radios/')}
              {this.renderImprensaItem('Rádios Online', 'Rádios online de Amarante',
                  'imprensa/online_radios/')}
              {this.renderImprensaItem('Televisão', 'Canais televisivos de Amarante',
                  'imprensa/televisions/')}
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderPersonalidadesItem(personalidadeName, personalidadeImg, altText = undefined) {
    return (
      <div className="cbp-item">
        <div className="cbp-caption">
          <Link to={'personalidades'} target="_blank">
            <div className="cbp-caption-defaultWrap">
              <img src={require('../../static/img/site/' + personalidadeImg)}
                alt={altText !== undefined ? altText : 'Item de personalidade'} />
            </div>

            <div className="popup-title font-main">
              <h3>
                <em>{personalidadeName}</em>
              </h3>
            </div>
          </Link>
        </div>
      </div>
    );
  }


  renderPersonalidades() {
    return (
      <section id="personalidades" className="row">
        <div className="g-pt-80 g-pb-80 text-center">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20">Personalidades</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in.
                Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper,
                justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>

            <div className="personalidades-wrapper">
              <div id="personalidades-grid">
                {this.renderPersonalidadesItem('Amadeo de Souza Cardoso',
                  'amadeo_homepage.jpg')}
                {this.renderPersonalidadesItem('António do Lago Cerqueira',
                  'lago_cerqueira_homepage.jpg')}
                {this.renderPersonalidadesItem('Teixeira de Pascoaes',
                  'teixeira_pascoaes_homepage.jpg')}
              </div>
            </div>


            <div className="view_all_personalidades">
              <Link type="button" target="_blank" className="btn-u btn-u-lg btn-u-upper" to={'personalidades'}>Ver Todos</Link>
            </div>
          </div>
        </div>
      </section>
    );
  }



  handleContactInputChange(event) {
    const target = event.target;
    const name = target.id;
    const value = target.value;

    // Update the object with key "name"
    const item = this.state.contactFormFields[name];
    item.value = value;
    item.invalid = this.isInvalidContactFormField(name, value);

    this.setState({
      [this.state.contactFormFields[name]]: item
    });
  }



  handleContactFormSubmit(event) {
    event.preventDefault();
    let foundInvalidField = false;
    let contactFormFieldsKeys = Object.keys(this.state.contactFormFields);
    // Extract last element from the contactFormFields object
    const [lastElement] = contactFormFieldsKeys.slice(-1);

    /**
     * Validate the form fields
     *
     * Iterate over each one and check whether it is valid or not
    */
    contactFormFieldsKeys.forEach((field) => {
      const item = this.state.contactFormFields[field];
      item.invalid = this.isInvalidContactFormField(field,
        item.value);

      this.setState({
        [this.state.contactFormFields[field]]: item
      }, () => {
        if(this.state.contactFormFields[field].invalid)
          foundInvalidField = true;

        /**
         * We just analyzed the last element and we didn't find any invalid element,
         * which means we can now submit the form
        */
        if(field === lastElement && !foundInvalidField) {
          this.submitContactForm();
        }
      });
    });
  }




  submitContactForm() {
    const { dispatch } = this.props;


    const contactFormData = {
      name: this.state.contactFormFields.name.value,
      email: this.state.contactFormFields.email.value,
      phone: this.state.contactFormFields.phone.value,
      subject: this.state.contactFormFields.subject.value,
      content: this.state.contactFormFields.message.value
    };

    // Disabled the send button
    this.setState({
      submitButtonDisabled: true
    }, () => {
      this.showedMessage = false;
      this.isButtonDisabled = true;

      // Dispatch the action
      dispatch(ContactMessageActions.sendMessage(contactFormData));
    });
  }


  isInvalidContactFormField(name, value) {
    // For these fields we just check if the fields are not empty
    if(name === "name" || name === "subject" || name === "message") {
      return value.length === 0;
    } else if(name === "phone") {
      // Check if the phone matches a certain regex
      const nameRegex = /^\+?(\d{9,})$/;
      return nameRegex.test(value) !== true;
    } else if(name === "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value) !== true;
    }
    return true;
  }



  renderContacto() {
    return (
      <section id="contacto" className="row">
        <div className="g-pt-80 g-pb-80">
          <div className="container-fluid">
            <div className="heading-v12 font-main text-center">
              <h2 className="heading-v12__block-name font-main g-mb-20">Contacto</h2>
              <p className="heading-v12__block-text">
                Sed feugiat porttitor nunc, non dignissim ipsum vestibulum in.
                Donec in blandit dolor. Vivamus a fringilla lorem, vel faucibus ante. Nunc ullamcorper,
                justo a iaculis elementum, enim orci viverra eros, fringilla porttitor lorem eros vel.
              </p>
            </div>

            <div className="form-wrapper">
              <div className="row">
                <div className="col-md-9 col-sm-6 form no-side-padding">
                  <form className="sky-form contact-style" onSubmit={::this.handleContactFormSubmit}>
                    <fieldset>
                      <div className="row margin-bottom-30">
                        <div className="col-md-6">
                          <input type="text" ref={(ref) => this.nameInput = ref} id="name"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.name.invalid
                            })}
                            placeholder="Nome"
                            onChange={::this.handleContactInputChange} />
                        </div>

                        <div className="col-md-6">
                          <input type="text" ref={(ref) => this.phoneInput = ref} id="phone"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.phone.invalid
                            })}
                            placeholder="Telemóvel"
                            onChange={::this.handleContactInputChange} />
                        </div>
                      </div>


                      <div className="row margin-bottom-30">
                        <div className="col-md-6">
                          <input type="email" ref={(ref) => this.emailInput = ref} id="email"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.email.invalid
                            })}
                            placeholder="Email *"
                            onChange={::this.handleContactInputChange} />
                        </div>

                        <div className="col-md-6">
                          <input type="text" ref={(ref) => this.subjectInput = ref} id="subject"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.subject.invalid
                            })}
                            placeholder="Assunto"
                            onChange={::this.handleContactInputChange} />
                        </div>
                      </div>


                      <div className="row margin-bottom-30">
                        <div className="col-md-12">
                          <textarea rows="4" ref={(ref) => this.messageInput = ref} id="message"
                            className={classNames({
                              "form-control": true,
                              "g-textarea-noresize": true,
                              "invalid": this.state.contactFormFields.message.invalid
                            })}
                            placeholder="Mensagem&#8230;"
                            onChange={::this.handleContactInputChange} />
                        </div>
                      </div>

                      <p>
                        <button type="submit"
                          className="submit-button btn-u btn-u-lg btn-u-bg-default btn-u-upper"
                          disabled={this.state.submitButtonDisabled}>
                          {this.state.submitButtonDisabled ? 'A enviar...' : 'Enviar Mensagem'}
                        </button>
                      </p>
                    </fieldset>
                  </form>
                </div>


                <div className="col-md-3 col-sm-6 contact-list">
                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-directions icon"/></li>
                    <li className="first-item">Morada</li>
                    <li className="second-item">Apartado 35, Amarante</li>
                  </ul>

                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-call-in icon"/></li>
                    <li className="first-item">Telemóvel</li>
                    <li className="second-item">+351 918 601 719</li>
                  </ul>

                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-envelope-open icon"/></li>
                    <li className="first-item">Email</li>
                    <li className="second-item">info@clagocerqueira.com</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }



  componentDidUpdate() {
    const { contactMessage } = this.props;

    if(!this.showedMessage && this.isButtonDisabled) {
      if(contactMessage.sent) {
        let message = "";
        let type = "";

        if(!contactMessage.sentWithSuccess) {
          message = "Ocorreu um erro ao enviar a mensagem!";
          type = "error";
        }
        else {
          message = "A mensagem foi enviada com sucesso! Obrigado pelo seu contacto!";
          type = "success";

          let keys = Object.keys(this.state.contactFormFields);
          // Update the state
          keys.forEach((val) => {
            const item = this.state.contactFormFields[val];
            item.value = "";
            item.invalid = false;

            this.setState({
              [this.state.contactFormFields[val]]: item
            });
          });


          // And finally clear the fields...
          this.nameInput.value = "";
          this.emailInput.value = "";
          this.phoneInput.value = "";
          this.subjectInput.value = "";
          this.messageInput.value = "";
        }

        // Creates the new Messenger object
        Messenger().post({
          type: type,
          message: message,
          showCloseButton: true
        });

        this.showedMessage = true;
        /**
         * By setting isButtonDisabled to false we prevent the app from
         * entering in an infinite loop
         */
        this.isButtonDisabled = false;

        // Now we can update the state of the app
        this.setState({
          submitButtonDisabled: false
        });
      }
    }
  }


  renderAssociacaoModal() {
    return (
        <div id="associationModal" className="modal fade" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body font-main">
                <h2>A Associação</h2>

                <hr align="center" />

                <p>
                  Com o propósito de dar a conhecer profundamente a história e a cultura de Amarante, nas
                  suas mais diversas áreas temáticas, o Círculo Lago Cerqueira reformulou o seu Sítio da
                  Internet, para que os amarantinos e todos aqueles cidadãos que queiram saber mais sobre a
                  nossa terra encontrem neste espaço digital uma plataforma navegável orientada, para a
                  descoberta da nossa memória coletiva.
                </p>

                <p>
                  Convidamos também todos aqueles que pretendam colaborar com informação relevante sobre
                  os assuntos tratados que enviem o seu contributo para o seguinte correio eletrónico <strong>info@clagocerqueira.pt</strong>.
                </p>

                <div id="modalCloseButton">
                  <button type="button" className="btn btn-lg" data-dismiss="modal">Fechar</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }



  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderIntro()}
          {this.renderAutoresAmarantinos()}
          {this.renderOrgaosAutarquicos()}
          {this.renderAssociacoes()}
          {this.renderFestividades()}
          {this.renderImprensa()}
          {this.renderPersonalidades()}
          {this.renderPatrimonioNatural()}
          {this.renderContacto()}
          {this.renderAssociacaoModal()}
          <Footer />
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  contactMessage: state.contactMessage
});


export default connect(mapStateToProps)(HomeIndexView);
