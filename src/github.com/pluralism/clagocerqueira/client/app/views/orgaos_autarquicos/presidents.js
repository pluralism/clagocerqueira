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



class PresidentsTab extends React.Component {
  constructor(props) {
    super(props);

    this.date = this.props.date;
    this.currentPage = 1;
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
    this.currentPage = 1;

    this.dateMappings = {
      "1836-1910": 'data1836_1910',
      "1910-1926": 'data1910_1926',
      "1926-1974": 'data1926_1974',
      "1976-2013": 'data1976_2013',
    };
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


  renderPresidentList(dateMapping) {
    const { presidents } = this.props;

    return (
      <ul className="listing-list">
        {presidents.data[dateMapping].objects.map((president) => {
          return <RenderItem key={president.name} imgURL={president.image}
            subtitle={"Presidentes"} title={president.name}
            text={president.description != null ? president.description : 'Descrição indisponível'} />
        })}
      </ul>
    );
  }


  renderSecondTab(active, date) {
    const dateMapping = this.dateMappings[date];

    return (
      <div id="second_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>

        {this.renderPresidentList(dateMapping)}
      </div>
    );
  }


  renderThirdTab(active, date) {
    const dateMapping = this.dateMappings[date];

    return (
      <div id="third_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>

        {this.renderPresidentList(dateMapping)}
      </div>
    );
  }



  renderFourthTab(active, date) {
    const dateMapping = this.dateMappings[date];

    return (
      <div id="fourth_tab" role="tabpanel" className={classNames({
          "tab-pane": true,
          "active": active,
          "fade": true,
          "in": true
        })}>

        {this.renderPresidentList(dateMapping)}
      </div>
    );
  }


  updateCurrentDate(value) {
    const { dispatch } = this.props;

    // Update the currentDate variable
    this.currentDate = value;
    // Reset the current page
    this.currentPage = 1;

    // After updating the date we need to dispatch a new action
    dispatch(PresidentsActions.getDataByPage(this.currentDate,
      this.dateMappings[this.currentDate], this.currentPage));
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
                  onClick={() => this.updateCurrentDate("1836-1910")}
                  role="tab" data-toggle="tab">1836-1910</Link>
              </li>
              <li role="presentation">
                <Link to={"#second_tab"}
                  onClick={() => this.updateCurrentDate("1910-1926")}
                  role="tab" data-toggle="tab">1910-1926</Link>
              </li>
              <li role="presentation">
                <Link to={"#third_tab"}
                  onClick={() => this.updateCurrentDate("1926-1974")}
                  role="tab" data-toggle="tab">1926-1974</Link>
              </li>
              <li role="presentation">
                <Link to={"#fourth_tab"}
                  onClick={() => this.updateCurrentDate("1976-2013")}
                  role="tab" data-toggle="tab">1976-2013</Link>
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
    console.log(presidents);

    return (
      <div className="tab-content">
        <PresidentsTab
          tabID={'#first_tab'}
          active={true}
          date={"1836-1910"}
          dateMapping={this.dateMappings['1836-1910']}
          data={presidents[this.dateMappings['1836-1910']]} />

        <PresidentsTab
          tabID={'#second_tab'}
          active={false}
          date={"1910-1926"}
          dateMapping={this.dateMappings['1910-1926']}
          data={presidents[this.dateMappings['1910-1926']]} />


        <PresidentsTab
          tabID={'#third_tab'}
          active={false}
          date={"1926-1974"}
          dateMapping={this.dateMappings['1926-1974']}
          data={presidents[this.dateMappings['1926-1974']]} />


        <PresidentsTab
          tabID={'#fourth_tab'}
          active={false}
          date={"1976-2013"}
          dateMapping={this.dateMappings['1976-2013']}
          data={presidents[this.dateMappings['1976-2013']]} />


        <div className="control-buttons">
          <div className="prev-button" onClick={() => this.getPreviousPageContent()}></div>
          <div className="next-button" onClick={() => this.getNextPageContent()}></div>
        </div>
      </div>
    );
  }


  getPreviousPageContent() {
    const { presidents, dispatch } = this.props;

    if(this.currentPage > 1) {
      this.currentPage -= 1;

      dispatch(PresidentsActions.getDataByPage(this.currentDate,
        this.dateMappings[this.currentDate], this.currentPage));
    }
  }


  getNextPageContent() {
    const { presidents, dispatch } = this.props;

    if(this.currentPage < presidents.data[this.dateMappings[this.currentDate]].total_pages) {
      this.currentPage += 1;

      dispatch(PresidentsActions.getDataByPage(this.currentDate,
        this.dateMappings[this.currentDate], this.currentPage));
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
