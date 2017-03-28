import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import { GeneralObjectTab } from '../../components/common/generalObjectTab';
import classNames from 'classnames';
import Constants from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class PresidentesView extends React.Component {
  constructor(props) {
    super(props);


    this.currentDate = Constants.DATES.d1836_1910;
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
      [Constants.DATES.d1974_1976]: {
        mapping: 'data1974_1976',
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
    dispatch(GeneralObjectsActions.getAllDataByPage(1, 'presidents'));
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
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1974_1976, 4)}
                  role="tab" data-toggle="tab">{Constants.DATES.d1974_1976}</Link>
              </li>
              <li role="presentation">
                <Link to={"#fifth_tab"}
                  onClick={() => this.updateCurrentDate(Constants.DATES.d1976_2013, 5)}
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
        <GeneralObjectTab
          tabID={'#first_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab == 1}
          dateMapping={Constants.MAPPINGS.d1836_1910}
          data={presidents.data[Constants.MAPPINGS.d1836_1910]} />

        <GeneralObjectTab
          tabID={'#second_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab == 2}
          dateMapping={Constants.MAPPINGS.d1910_1926}
          data={presidents.data[Constants.MAPPINGS.d1910_1926]} />

        <GeneralObjectTab
          tabID={'#third_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab == 3}
          dateMapping={Constants.MAPPINGS.d1926_1974}
          data={presidents.data[Constants.MAPPINGS.d1926_1974]} />

        <GeneralObjectTab
          tabID={'#fourth_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab == 4}
          dateMapping={Constants.MAPPINGS.d1974_1976}
          data={presidents.data[Constants.MAPPINGS.d1974_1976]} />

        <GeneralObjectTab
          tabID={'#fifth_tab'}
          subtitle={"Presidentes"}
          active={this.state.activeTab == 5}
          dateMapping={Constants.MAPPINGS.d1976_2013}
          data={presidents.data[Constants.MAPPINGS.d1976_2013]} />


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

    if(currentPage > 1) {
      obj.page -= 1;

      dispatch(GeneralObjectsActions.getDataByPage(this.currentDate,
        obj.mapping, obj.page, 'presidents'));
    }
  }


  getNextPageContent() {
    const { presidents, dispatch } = this.props;
    let obj = this.dateAndPageMappings[this.currentDate];
    let currentPage = obj.page;
    let presidentMapping = presidents.data[obj.mapping];

    if(currentPage < presidentMapping.total_pages) {
      obj.page += 1;

      dispatch(GeneralObjectsActions.getDataByPage(this.currentDate,
        obj.mapping, obj.page, 'presidents'));
    }
  }


  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
          {this.renderUpperSection()}

          <Footer />
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  presidents: state.generalObjects
});


export default connect(mapStateToProps)(PresidentesView);
