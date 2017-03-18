import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import PresidentsActions from '../../actions/presidents';


class RenderItem extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <li className="clearfix g-pb-50">
        <Link to={"#"} className="listing-list-item">
          <div className="listing-list-center-wrap">
            <div className="listing-list-media-wrap listing-list-center">
              <div className="listing-list-media">
                <img className="listing-list-media-img" src={this.props.imgURL} alt={this.props.altText !== undefined ? altText : "Presidente"} />
              </div>
            </div>

            <div className="listing-list-body listing-list-center">
              <span className="listing-list-media-subtitle">{this.props.subtitle}</span>
              <h3 className="listing-list-media-title">{this.props.title}</h3>
              <p className="listing-list-item-text">{this.props.text}</p>
            </div>
          </div>
        </Link>
      </li>
    );
  }
}


class PresidentesView extends React.Component {
  constructor(props) {
    super(props);

    this.currentDate = "1976-2013";
  }


  componentDidMount() {
    const { dispatch } = this.props;

    console.log(this.currentDate);
    // Try to extract the presidents for the current date from the database
    dispatch(PresidentsActions.getDataByDate(this.currentDate));
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


  renderFirstTab(active) {
    const { presidents } = this.props;

    return (
      <div id="first_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>
        <ul className="listing-list">
          {presidents.data.map((president) => {
            return <RenderItem key={president.name} imgURL={president.image}
              subtitle={"Presidentes"} title={president.name}
              text={president.description != null ?
                president.description :
                'Descrição indisponível'} />
          })}
        </ul>


        <div className="control-buttons">
          <div className="prev-button"></div>
          <div className="next-button"></div>
        </div>
      </div>
    );
  }


  renderSecondTab(active) {
    return (
      <div id="second_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>
        <ul className="listing-list">
          <RenderItem imgURL={"http://www.citador.pt/images/autorid01232.jpg"}
            subtitle={"Presidentes"} title={"André Pedro Deus Pinheiro"}
            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet"} />
        </ul>


        <div className="control-buttons">
          <div className="prev-button"></div>
          <div className="next-button"></div>
        </div>
      </div>
    );
  }


  renderThirdTab(active) {
    return (
      <div id="third_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>
        <ul className="listing-list">
          <RenderItem imgURL={"http://www.citador.pt/images/autorid01232.jpg"}
            subtitle={"Presidentes"} title={"André Pedro Deus Pinheiro"}
            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet"} />
        </ul>


        <div className="control-buttons">
          <div className="prev-button"></div>
          <div className="next-button"></div>
        </div>
      </div>
    );
  }



  renderFourthTab(active) {
    return (
      <div id="fourth_date" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>
        <ul className="listing-list">
          <RenderItem imgURL={"http://www.citador.pt/images/autorid01232.jpg"}
            subtitle={"Presidentes"} title={"André Pedro Deus Pinheiro"}
            text={"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ut scelerisque odio, a viverra arcu. Nulla ut suscipit velit, non dictum quam. Proin hendrerit vulputate mauris a imperdiet"} />
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
                <Link to={"#first_tab"} role="tab" data-toggle="tab">1836-1910</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"} role="tab" data-toggle="tab">1910-1926</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"} role="tab" data-toggle="tab">1926-1974</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"} role="tab" data-toggle="tab">1976-2013</Link>
              </li>
            </ul>


            {this.renderTabsContents()}
          </div>
        </div>
      </section>
    );
  }


  renderTabsContents() {
    return (
      <div className="tab-content">
        {this.renderFirstTab(true)}
        {this.renderSecondTab(false)}
        {this.renderThirdTab(false)}
        {this.renderFourthTab(false)}
      </div>
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


  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderUpperSection()}
          {this.renderFooter()}
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  presidents: state.presidents
});

export default connect(mapStateToProps)(PresidentesView);
