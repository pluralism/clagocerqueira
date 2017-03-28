import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Footer from '../../components/common/footer';
import classNames from 'classnames';
import Constants from '../../constants/index';
import GeneralObjectsActions from '../../actions/generalObjects';


class CouncilmenView extends React.Component {
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
  }


  componentDidMount() {
    const { dispatch } = this.props;

    /**
     * This function is invoked immediately after a component is mounted.
     * This is a good place to load data from a remote endpoint and to perform
     * network requests.
     *
     * On this function we try to extract the councilmen from all possible dates
     * on this page the component is always called with the first page
    */
    dispatch(GeneralObjectsActions.getAllDataByPage(1, Constants.COUNCILMEN));
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
     * with the lists of councilmen
    */
    this.currentDate = value;

    // Update the active tab!
    this.setState({
      activeTab: activeTab
    });
  }


  renderUpperSection() {
    return (
      <section id="vereadores_data">
        <div className="g-pt-40">
          <div className="text-center g-mb-30">
            <div className="g-mb-30">
              <h2><span className="g-color-default">Vereadores</span></h2>
            </div>
            <p className="g-page-title">Nam sed erat aliquet libero aliquet commodo.
              Donec euismod augue non quam finibus, nec iaculis tellus gravida. Integer <br /> efficitur eros ut dui laoreet, ut blandit turpis tincidunt.</p>
          </div>


          <div className="search_on_list g-mb-30 text-center font-main">
            <input type="text" placeholder="Pesquisar vereadores&#8230;" />
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


  render() {
    return (
      <div>
        <main className="container-fluid">
          {this.renderHeader()}
          <Footer />
        </main>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  councilmen: state.generalObjects
});


export default connect(mapStateToProps)(CouncilmenView);
