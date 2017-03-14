import React                                from 'react';
import { connect }                          from 'react-redux';
import { Link }                             from 'react-router';
import classNames                           from 'classnames';
import ContactMessageActions                from '../../actions/contactMessage';


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
      }
    };


    this.showedMessage = false;
  }


  componentDidMount() {
    // Configuring the default options for messenger
    Messenger.options = {
      theme: 'flat'
    };

    $(function() {
      // Init backstretch with the image we want
      $('.fullscreen-static-image').backstretch(require('../../static/img/cover1.jpg'));


      let gridContainer = $('#grid-container');
      let associacoesList = $('.associacoes-list');
      let orgaosAutarquicosList = $('.orgaos_autarquicos_list');
      let festividadesGrid = $('#festividades-grid');
      let imprensaGrid = $('.imprensa-grid');
      let personalidadesGrid = $('#personalidades-grid');


      personalidadesGrid.cubeportfolio({
        layoutMode: 'grid',
        mediaQueries: [{
          width: 1100,
          cols: 3
        }, {
          width: 800,
          cols: 2
        }, {
          width: 500,
          cols: 1
        }],
        defaultFilter: '*',
        animationType: 'rotateSides',
        gapHorizontal: 0,
        gapVertical: 0,
        gridAdjustment: 'responsive',
        caption: 'fadeIn',
        displayType: 'sequentially',
        displayTypeSpeed: 100
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
        mediaQueries: [{ width: 1440, cols: 5 }, { width: 1024, cols: 2 }, { width: 768, cols: 2 }, { width: 480, cols: 2 }, { width: 320, cols: 1 }],
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
            cols: 3
        }, {
            width: 1100,
            cols: 3
        }, {
            width: 800,
            cols: 1
        }, {
            width: 480,
            cols: 1
        }, {
            width: 320,
            cols: 1
        }],
        caption: 'zoom',
        displayType: 'lazyLoading',
        displayTypeSpeed: 100
      });



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


  renderAutoresAmarantinosItem(year, sec) {
    return (
      <div className="cbp-item">
        <a href="http://scriptpie.com/cubeportfolio/live-preview/img/480x250/13.jpg"
          className="cbp-caption">
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

            <div className="content-wrapper">
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


  renderFestividadesItem(title, subTitle) {
    return (
      <div className="cbp-item">
        <Link to={require('../../static/img/orgaos_1.jpg')} className="cbp-caption"
          data-title="Sed feugiat porttitor nunc<br>by Vivamus">
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
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
                {this.renderFestividadesItem('Festividades', 'Festividades subtítulo')}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderImprensaItem(title, description) {
    return (
      <div className="item text-left">
        <div className="item-info">
          <div className="item-info__block">
            <img className="item-info__img" src={require('../../static/img/orgaos_1.jpg')} />
            <h2 className="item-info__title font-main">
              <Link to={'#'} className="item-info__link">
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
              {this.renderImprensaItem('Jornais', 'Jornais com origem Amarantina')}
              {this.renderImprensaItem('Revistas', 'Revistas com origem Amarantina')}
              {this.renderImprensaItem('Rádios', 'Rádios com origem Amarantina')}
              {this.renderImprensaItem('Rádios Online', 'Rádios online de Amarante')}
              {this.renderImprensaItem('Televisão', 'Canais televisivos de Amarante')}
            </div>
          </div>
        </div>
      </section>
    );
  }


  renderPersonalidadesItem(personalidadeName, personalidadeImgUrl, altText = undefined) {
    return (
      <div className="cbp-item">
        <div className="cbp-caption">
          <Link to={require('../../static/img/orgaos_1.jpg')} target="_blank">
            <div className="cbp-caption-defaultWrap">
              <img src={personalidadeImgUrl}
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
                  'https://ciberduvidas.iscte-iul.pt/autores/145/photo')}
                {this.renderPersonalidadesItem('Amadeo de Souza Cardoso',
                  'https://s-media-cache-ak0.pinimg.com/736x/e7/65/e2/e765e26c56e1f707b0d83832e871754e.jpg')}
                {this.renderPersonalidadesItem('Amadeo de Souza Cardoso',
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Amadeo_de_Souza_Cardoso_with_tie_and_looking_right.jpg/1200px-Amadeo_de_Souza_Cardoso_with_tie_and_looking_right.jpg')}
              </div>
            </div>


            <div className="view_all_personalidades">
              <button type="button" className="btn-u btn-u-lg btn-u-upper">Ver Todos</button>
            </div>
          </div>
        </div>
      </section>
    );
  }



  handleContactInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    // Update the object with key "name"
    const item = this.state.contactFormFields[name];
    item.value = value;
    item.invalid = this.isInvalidContactFormField(name, value)

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
        if(field == lastElement && !foundInvalidField) {
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

    // Reset the showedMessage flag, so new errors can be shown to the user
    this.showedMessage = false;
    // Dispatch the action
    dispatch(ContactMessageActions.sendMessage(contactFormData));
  }


  isInvalidContactFormField(name, value) {
    // For these fields we just check if the fields are not empty
    if(name == "name" || name == "subject" || name == "message") {
      return value.length == 0;
    } else if(name == "phone") {
      // Check if the phone matches a certain regex
      const nameRegex = /^\+?(\d{9,})$/;
      return nameRegex.test(value) != true;
    } else if(name == "email") {
      const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(value) != true;
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
                          <input type="text" name="name" id="name"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.name.invalid
                            })}
                            placeholder="Nome"
                            onChange={::this.handleContactInputChange} />
                        </div>

                        <div className="col-md-6">
                          <input type="text" name="phone" id="phone"
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
                          <input type="email" name="email" id="email"
                            className={classNames({
                              "form-control": true,
                              "invalid": this.state.contactFormFields.email.invalid
                            })}
                            placeholder="Email *"
                            onChange={::this.handleContactInputChange} />
                        </div>

                        <div className="col-md-6">
                          <input type="text" name="subject" id="subject"
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
                          <textarea rows="4" name="message" id="message"
                            className={classNames({
                              "form-control": true,
                              "g-textarea-noresize": true,
                              "invalid": this.state.contactFormFields.message.invalid
                            })}
                            placeholder="Mensagem&#8230;"
                            onChange={::this.handleContactInputChange}></textarea>
                        </div>
                      </div>

                      <p>
                        <button type="submit" className="submit-button btn-u btn-u-lg btn-u-bg-default btn-u-upper">
                          Enviar Mensagem
                        </button>
                      </p>
                    </fieldset>
                  </form>
                </div>


                <div className="col-md-3 col-sm-6 contact-list">
                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-directions icon"></span></li>
                    <li className="first-item">Morada</li>
                    <li className="second-item">Apartado 35, Amarante</li>
                  </ul>

                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-call-in icon"></span></li>
                    <li className="first-item">Telemóvel</li>
                    <li className="second-item">+351 918 601 719</li>
                  </ul>

                  <ul className="list-unstyled margin-bottom-30">
                    <li><span aria-hidden="true" className="icon-envelope-open icon"></span></li>
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


  renderFooter() {
    return (
      <section id="footer" className="row">
        <div className="informations container-fluid page-scroll">
          <div className="vertical-center">
            <ul className="list-inline footer-list">
              <li><Link to={'#'}><i className="fa fa-twitter"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-facebook"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-instagram"></i></Link></li>
              <li><Link to={'#'}><i className="fa fa-youtube"></i></Link></li>
            </ul>
          </div>
        </div>
      </section>
    );
  }


  renderMessenger() {
    const { contactMessage } = this.props;

    if(!this.showedMessage) {
      if(!contactMessage.sentWithSuccess && contactMessage.sent) {
        let message = "Ocorreu um erro ao enviar a mensagem!";

        // Creates the new Messenger object
        Messenger().post({
          type: 'error',
          message: message,
          showCloseButton: true
        });

        this.showedMessage = true;
      } else if(contactMessage.sentWithSuccess && contactMessage.sent) {
        let message = "A mensagem foi enviada com sucesso! Obrigado pelo seu contacto!";

        // Creates the new Messenger object here
        Messenger().post({
          type: 'success',
          message: message,
          showCloseButton: true
        });

        this.showedMessage = true;
      }
    }

    return false;
  }



  render() {
    return (
      <div>
        {this.renderMessenger()}
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderIntro()}
          {this.renderAutoresAmarantinos()}
          {this.renderOrgaosAutarquicos()}
          {this.renderAssociacoes()}
          {this.renderFestividades()}
          {this.renderImprensa()}
          {this.renderPersonalidades()}
          {this.renderContacto()}
          {this.renderFooter()}
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  contactMessage: state.contactMessage
});

export default connect(mapStateToProps)(HomeIndexView);
