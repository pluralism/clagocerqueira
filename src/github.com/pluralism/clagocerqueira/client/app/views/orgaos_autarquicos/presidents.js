import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classNames from 'classnames';
import Constants from '../../constants/index';
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



class PresidentsTab extends React.Component {
  constructor(props) {
    super(props);
  }


  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.active || nextProps.active == !this.props.active;
  }


  render() {
    const { data } = this.props;

    return (
      <div id={this.props.tabID} role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": this.props.active,
          "fade": true,
          "in": true
        })}>

        <ul className="listing-list">
          {data.objects.map((president) => {
            return <RenderItem key={president.name} imgURL={president.image}
              subtitle={"Presidentes"} title={president.name}
              text={president.description != null ? president.description : 'Descrição indisponível'} />
          })}
        </ul>
      </div>
    );
  }
}



class PresidentesView extends React.Component {
  constructor(props) {
    super(props);

    this.currentDate = "1836-1910";

    this.dateAndPageMappings = {
      [Constants.DATES.d1836_1910]: {
        mapping: 'data1836_1910',
        page: 1
      },
      [Constants.DATES.d1910_1926]: {
        mapping: 'data1910_1926',
        page: 1
      },
      [Constants.DATES.d1926_1974]: {
        mapping: 'data1926_1974',
        page: 1
      },
      [Constants.DATES.d1976_2013]: {
        mapping: 'data1976_2013',
        page: 1
      },
    };


    this.state = {
      activeTab: 1
    };


    document.addEventListener("keydown", ::this.handleKeyDownEvent);
  }


  handleKeyDownEvent(e) {
    if(e.keyCode == 37) {
      // Left arrow was pressed
      this.getPreviousPageContent();
    } else if(e.keyCode == 39) {
      // Right arrow was pressed
      this.getNextPageContent();
    }
  }


  componentDidMount() {
    const { dispatch } = this.props;

    /**
     * This function is invoked immediately after a component is mounted.
     * This is a good place to load data from a remote endpoint and to perform
     * network requests.
     *
     * On this function we try to extract the presidents from all possible dates
     * on this page the component is always called with the first page
    */
    dispatch(PresidentsActions.getAllDataByPage(1));
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



  updateCurrentDate(value, activeTab) {
    const { dispatch } = this.props;

    /**
     * Update the currentDate variable and keep the page
     * as the old one. This allow us to mantain consistency
     * with the lists of presidents
    */
    this.currentDate = value;

    // Update the active tab!
    this.setState({
      activeTab: activeTab
    });
  }


  renderUpperSection() {
    return (
      <section id="presidentes_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Presidentes</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar presidentes&#8230;" />
          </div>


          <div className="tab-v7">
            <ul className="tab-v7-nav" role="tablist">
              <li role="presentation" className="active">
                <Link to={"#first_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1836_1910, 1)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1836_1910}</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1910_1926, 2)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1910_1926}</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1926_1974, 3)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1926_1974}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1976_2013, 4)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1976_2013}</Link>
              </li>
            </ul>


            {this.renderTabsContents()}
          </div>
        </div>
      </section>
    );
  }


  renderTabsContents() {
    const { presidents } = this.props;

    return (
      <div className="tab-content">
        <PresidentsTab
          tabID={'#first_tab'}
          active={this.state.activeTab == 1}
          dateMapping={this.dateAndPageMappings[Constants.DATES.d1836_1910].mapping}
          data={presidents.data[this.dateAndPageMappings[Constants.DATES.d1836_1910].mapping]} />

        <PresidentsTab
          tabID={'#second_tab'}
          active={this.state.activeTab == 2}
          dateMapping={this.dateAndPageMappings[Constants.DATES.d1910_1926].mapping}
          data={presidents.data[this.dateAndPageMappings[Constants.DATES.d1910_1926].mapping]} />

        <PresidentsTab
          tabID={'#third_tab'}
          active={this.state.activeTab == 3}
          dateMapping={this.dateAndPageMappings[Constants.DATES.d1926_1974].mapping}
          data={presidents.data[this.dateAndPageMappings[Constants.DATES.d1926_1974].mapping]} />

        <PresidentsTab
          tabID={'#fourth_tab'}
          active={this.state.activeTab == 4}
          dateMapping={this.dateAndPageMappings[Constants.DATES.d1976_2013].mapping}
          data={presidents.data[this.dateAndPageMappings[Constants.DATES.d1976_2013].mapping]} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}></div>
          <div className="next-button" onClick={() => this.getNextPageContent()}></div>
        </div>
      </div>
    );
  }


  getPreviousPageContent() {
    const { presidents, dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;
    let presidentMapping = presidents.data[obj.mapping];

    if(currentPage > 1) {
      obj.page -= 1;

      dispatch(PresidentsActions.getDataByPage(this.currentDate,
        obj.mapping, obj.page));
    }
  }


  getNextPageContent() {
    const { presidents, dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;
    let presidentMapping = presidents.data[obj.mapping];

    if(currentPage < presidentMapping.total_pages) {
      obj.page += 1;

      dispatch(PresidentsActions.getDataByPage(this.currentDate,
        obj.mapping, obj.page));
    }
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
